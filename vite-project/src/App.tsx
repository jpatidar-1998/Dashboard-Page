import { TextField } from "@mui/material";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Search Box */}
      <TextField
        label="Search Widgets"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {/* Pass searchQuery to Dashboard */}
      <Dashboard searchQuery={searchQuery} />
    </>
  );
}

export default App;