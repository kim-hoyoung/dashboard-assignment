import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./page/DashboardPage";

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
