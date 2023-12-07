import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";
import { instance } from "../../instance";
import {useEffect, useContext} from 'react'
import { UserContext, UserContextProps } from "../../context/context";
import { useNavigate } from "react-router-dom";
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const {setUsername, setId, setAdmin} = useContext(
    UserContext
  ) as UserContextProps

 async function verifyUser () {
  try {
    const response = await instance.get("/api/user/verify");
    setUsername(response.data.username)
    setAdmin(response.data.admin)
    setId(response.data.id)
  } catch (error) {
   console.log(error) 
   navigate("/login")
  }

}
useEffect(() => {
  verifyUser();
}, [])
  return (
    <div className="flex w-[100%]">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <SideBar />
      <div className="w-[20%]"></div>
      <div className="w-[80.3%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
