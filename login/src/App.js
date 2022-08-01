import "./App.css";
import LoginPage from "./LoginPage";
import { Route, Routes } from "react-router-dom";
import success from "./success";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} exact={true} />
      <Route path="/success" element={<success />} />
    </Routes>
    </>
  );
}

export default App;
