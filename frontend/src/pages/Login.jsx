import React from "react";
import InputBox from "../components/InputBox";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex justify-center items-center w-full h-[85vh] ">
      <form className="w-[85%] max-w-[400px]">
        <h1 className="entryText log-reg-color mb-2">Welcome to the blog</h1>
        <h2 className="entryText log-reg-color mb-24">Login</h2>
        <InputBox
          type="email"
          placeholder="email"
          icon={MdOutlineMailOutline}
        />
        <InputBox        
          type="password"
          placeholder="password"
          icon={IoKeyOutline}
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
