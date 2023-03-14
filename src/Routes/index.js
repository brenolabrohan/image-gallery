import { Route, Routes } from "react-router-dom";
import Landing from "../pages/landing";
import Search from "../pages/search";

const ProjectRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dashboard/:search' element={<Search />} />
      </Routes>
    </div>
  );
}

export default ProjectRoutes;
