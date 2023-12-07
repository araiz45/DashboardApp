import Index from "./pages/Index/Index";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import User from "./pages/Dashboard/User/User";
import Overview from "./pages/Dashboard/Overview/Overview";
import Entry from "./pages/Dashboard/Entry/Entry";
import ShowEntry from "./pages/Dashboard/ShowEntry/ShowEntry";
import EditPage from "./pages/Dashboard/Edit/Edit";
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path="/dashboard/user" element={<User />} />
        <Route path="/dashboard/entry" element={<Entry />} />
        <Route path="/dashboard/show-entry" element={<ShowEntry />} />
        <Route path="/dashboard/edit-entry/:id" element={<EditPage />} />
      </Route>
    </Routes>
  );
};

export default App;
