import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import ProjectRoutes from "./Routes";

function App() {
  return (
    <Router>
      <ProjectRoutes />
    </Router>
  );
}

export default App;
