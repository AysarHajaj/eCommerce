import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Button from "@mui/material/Button";
import Layout from "./root/layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
