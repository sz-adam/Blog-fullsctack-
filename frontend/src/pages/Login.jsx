import React, { useContext, useState } from "react";
import axios from "axios";
import InputBox from "../components/InputBox";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { storeInSession } from "../common/session";
import UserService from "../services/UserServices";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userData = await UserService.login(email, password);
      storeInSession("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[85vh] ">
      <form className="w-[85%] max-w-[400px]" onSubmit={handleLogin}>
        <h1 className="entryText log-reg-color mb-2">Welcome to the blog</h1>
        <h2 className="entryText log-reg-color mb-24">Login</h2>
        <InputBox
          type="email"
          placeholder="email"
          icon={MdOutlineMailOutline}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <InputBox
          type="password"
          placeholder="password"
          icon={IoKeyOutline}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="text-center text-red-600">{error}</div>
        <div className="flex justify-center items-center mt-10">
          <button
            className="border-2 log-reg-color text-white p-3 px-10 rounded-full font-bold"
            type="submit"
          >
            Login
          </button>
        </div>
        <p className="mt-6 text-slate-400 text-lg text-center">
          Don't have account ?{" "}
          <Link to="/register" className="underline text-slate-400">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
