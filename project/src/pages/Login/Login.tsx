import { useState } from "react";
import { instance } from "../../instance";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    try {
      const response = await instance.post("/api/user/login", {
        username,
        password,
      });
      toast.success(response.data);
      navigate("/dashboard")
    } catch (error: any) {
        toast.error(error.response.data)
    }
  }
  return (
    <div className="h-screen bg-dBlack flex justify-center items-center">
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
      <form
        className="bg-black flex flex-col gap-5 py-[3rem] px-[2rem] justify-center items-center rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold text-white font-primary">Login</h1>
        <input
          type="text"
          name="username"
          id="username"
          className="p-2 outline-none w-96 border-4 rounded-md border-dBlack"
          placeholder="Enter Your Username"
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          className="p-2 outline-none w-96 border-4 rounded-md border-dBlack"
          placeholder="Enter Your Password"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          type="submit"
          className="bg-blue w-[8rem] text-white font-primary py-2 px-4 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
