import React from "react";
import InputBox from "../components/InputBox";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { IoManOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="flex justify-center items-center w-full h-[85vh] ">
      <form className="w-[85%] max-w-[400px]">
        <h1 className="entryText log-reg-color mb-24">Registration</h1>
        <InputBox type="text" placeholder="First name" icon={IoManOutline} />
        <InputBox type="text" placeholder="Last name" icon={IoManOutline} />
        <InputBox
          type="email"
          placeholder="Email"
          icon={MdOutlineMailOutline}
        />
        <InputBox type="password" placeholder="Password" icon={IoKeyOutline} />
        <div className="flex justify-center items-center mt-10">
          <button
            className="border-2 log-reg-color text-white p-3 px-10 rounded-full font-bold"
            type="submit"
          >
            Login
          </button>
        </div>
        <p className="mt-6 text-slate-400 text-lg text-center">
          You are already a member ?{" "}
          <Link to="/login" className="underline text-slate-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
