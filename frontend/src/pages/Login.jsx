import React, { useContext, useState } from "react";
import axios from "axios";
import InputBox from "../components/InputBox";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { storeInSession } from "../common/session";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    user: { acces_token },
    setUser,
  } = useContext(UserContext);

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post(import.meta.env.VITE_API_LOGIN, { email, password })
      .then((res) => {
        storeInSession("user", JSON.stringify(res.data));
        setUser(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.error("Hiba a bejelentkezés során", err);
        alert("Hiba a bejelentkezés során");
      });
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
