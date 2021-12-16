import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";

let unsubscribe = () => {};

export default function Todo({ user }) {
  const [text, setText] = useState("");
  const [myTodos, setTodos] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      const docRef = db.collection("todos").doc(user.uid);
      unsubscribe = docRef.onSnapshot((docsnap) => {
        if (docsnap.exists) {
          // console.log(docsnap.data().todos);
          setTodos(docsnap.data().todos);
        } else {
          console.log("no docs");
        }
      });
    } else {
      history.push("/login");
    }
    return () => {
      unsubscribe();
      console.log("unsubscribe");
    };
  }, []);

  const addTodo = () => {
    db.collection("todos")
      .doc(user.uid)
      .set({
        todos: [...myTodos, text],
      });
  };

  const deleteTodo = (deleteTodo) => {
    const docRef = db.collection("todos").doc(user.uid);
    docRef.get().then((docsnap) => {
      let del = false;
      const result = docsnap.data().todos.filter((todo) => {
        //when the todo in array is equal to the todo to be deleted return false, but keep on returing the values that was not to be deleted.
        if (todo === deleteTodo && !del) {
          del = true;
          return false;
        } else {
          return true;
        }
      });

      docRef.update({
        todos: result,
      });
    });
  };

  return (
    <div>
      <h1 style={{ fontFamily: "sans-serif", marginLeft: "20px" }}>
        Add Todos
      </h1>
      <div className="input-field  ">
        <input
          style={{ fontFamily: "sans-serif", marginLeft: "20px" }}
          type="text"
          placeholder="Add Todos"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button
        className="btn green"
        style={{ fontFamily: "sans-serif", marginLeft: "20px" }}
        onClick={addTodo}
      >
        Add
      </button>
      <h2 style={{ fontFamily: "sans-serif", marginLeft: "20px" }}>
        Your Todos
      </h2>
      <ul className="collection">
        {myTodos.map((todo, i) => {
          return (
            <li className="collection-item" key={i}>
              {todo}

              <i
                style={{ cursor: "pointer" }}
                className="material-icons right"
                onClick={() => deleteTodo(todo)}
              >
                delete
              </i>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
