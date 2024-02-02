import React, { useState } from "react";
import InputBox from "../components/InputBox";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { IoManOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import UserService from "../services/UserServices";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
    if (!emailRegex.test(email)) {
      return alert("Email is invalid")
  }
  if (!passwordRegex.test(password)) {
      return alert("Password should be 6 to 20 character long with a numeric m lowercase and 1 uppercase letters")
  }
    try {

      await UserService.register(firstname, lastname, email, password);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[85vh]">
      <form className="w-[85%] max-w-[400px]" onSubmit={handleRegistration}>
        <h1 className="entryText log-reg-color mb-24">Registration</h1>
        <InputBox
          type="text"
          placeholder="First name"
          icon={IoManOutline}
          value={firstname}
          required={true}
          onChange={(event) => setFirstname(event.target.value)}
        />
        <InputBox
          type="text"
          placeholder="Last name"
          icon={IoManOutline}
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
          required={true}
        />
        <InputBox
          type="email"
          placeholder="Email"
          icon={MdOutlineMailOutline}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <InputBox
          type="password"
          placeholder="Password"
          icon={IoKeyOutline}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required={true}
        />
        <div className="text-center text-red-600">{error}</div>
        <div className="flex justify-center items-center mt-10">
          <button
            className="border-2 log-reg-color text-white p-3 px-10 rounded-full font-bold"
            type="submit"
          >
            Register
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
