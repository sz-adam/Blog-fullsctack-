import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function InputBox({ name, type, placeholder, icon: Icon }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={
          type == "password" ? (passwordVisible ? "text" : "password") : type
        }
        placeholder={placeholder}
        className=" w-[100%] rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent placeholder:text-black"
      />

      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="text-gray-500" />
        </div>
      )}

      {type === "password" && (
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setPasswordVisible((currentEyeValue) => !currentEyeValue)}
        >
          {passwordVisible ? (
            <FaEye className="text-gray-500" />
          ) : (
            <FaEyeSlash className="text-gray-500" />
          )}
        </div>
      )}
    </div>
  );
}

export default InputBox;
