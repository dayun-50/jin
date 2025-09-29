import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./log/Login";
import Register from "./log/Register";


// 글로벌 상태 저장소
export const UserContext = React.createContext();

function App() {
  const [users, setUsers] = useState([]); // 프론트 저장소

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
