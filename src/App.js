import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Todo from "./components/Todo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import React from "react";
import { auth } from "./firebase";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <NavBar user={user} />
      <Switch>
        <Route exact path="/">
          <Todo user={user} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
