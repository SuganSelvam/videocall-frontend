import React, { useState } from "react";
import "./App.css"

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

function App() {
  const [state, setstate] = useState("Login");
  const [name, setName] = useState("");
  const [LoginRoomID, setLoginRoomID] = useState("")

  return (
    <div>
        {state === "Login" ? (
          <Login setName={setName} setstate={setstate} setLoginRoomID={setLoginRoomID}/>
        ) : (
          <Dashboard name={name} LoginRoomID={LoginRoomID} />
        )}
    </div>
  );
}

export default App;
