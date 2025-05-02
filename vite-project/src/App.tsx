import { TextField } from "@mui/material";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <TextField
        label="Search Widgets"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "60px", height: "10px", width: "200px" }}
      />

      <Dashboard searchQuery={searchQuery} />
    </>
  );
}

export default App;
