import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputs, setInputs] = useState({ name: "", phone: "" });
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState([]);

  const handler = (e, key) => {
    setInputs({ ...inputs, [key]: e.target.value });
  };

  const create = () => {
    try {
      axios
        .post("http://localhost:5000/create", {
          ...inputs,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            alert(res.data.msg);
            read();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const read = () => {
    try {
      axios.get("http://localhost:5000/read").then((res) => {
        // console.log(res.data);
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const remove = (id) => {
    try {
      axios.delete(`http://localhost:5000/remove/${id}`).then((res) => {
        if (res.data.status) {
          alert(res.data.msg);
          read();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = () => {
    try {
      axios
        .put(`http://localhost:5000/update/${update[0]._id}`, {
          ...inputs,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            alert(res.data.msg);
            canceler();
            read();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateSet = (item) => {
    setInputs(item);
    setUpdate([item]);
  };

  const canceler = () => {
    setUpdate([]);
    setInputs({ name: "", phone: "" });
  };

  useEffect(() => {
    read();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="name"
        value={inputs?.name}
        onChange={(e) => handler(e, "name")}
      />
      <input
        type="Number"
        placeholder="phone"
        value={inputs?.phone}
        onChange={(e) => handler(e, "phone")}
      />

      {update.length > 0 ? (
        <div style={{ display: "flex", gap: 5 }}>
          <button onClick={updateHandler}> Update !</button>
          <button onClick={canceler}> Cancel !</button>.
        </div>
      ) : (
        <button onClick={create}> Save !</button>
      )}

      <div>
        {data.map((item, index) => {
          return (
            <div key={index} style={{ display: "flex", gap: 20, margin: 5 }}>
              <p>{item.name}</p>
              <p>{item.phone}</p>
              <button onClick={() => remove(item._id)}>Delete</button>
              <button onClick={() => updateSet(item)}>Edit</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
