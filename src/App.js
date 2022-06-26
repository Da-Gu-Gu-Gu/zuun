import "./App.css";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Meeting from "./components/Meeting";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  // console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/me"
          element={user.token ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/meeting/:token"
          element={user.token ? <Meeting /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
