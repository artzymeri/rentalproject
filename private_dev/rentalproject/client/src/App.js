import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import HomeView from "./components/User/Home";
import "./App.css";
import DashboardRoot from "./components/Dashboard/DashboardRoot";
import Cars from "./components/User/Cars";
import SignIn from "./components/User/SignIn";
import SignUp from "./components/User/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />}></Route>
        <Route path="/dashboard" element={<DashboardRoot />}></Route>
        <Route path="/cars" element={<Cars />}></Route>
        {/* <Route path="/cars/:index" element={<EstateDetails />} /> */}
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
