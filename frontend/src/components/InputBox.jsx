import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function InputBox({ name, type, placeholder, icon: Icon, defaultValue,value,onChange,required }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex items-center justify-center">
    <div className="relative w-[100%] mb-4">
      
      <input
        name={name}
        type={
          type == "password" ? (passwordVisible ? "text" : "password") : type
        }
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required || false}
        className=" w-[100%] pl-12 border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
      />

      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="text-gray-500" />
        </div>
      )}

      {type === "password" && (
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() =>
            setPasswordVisible((currentEyeValue) => !currentEyeValue)
          }
        >
          {passwordVisible ? (
            <FaEye className="text-gray-500" />
          ) : (
            <FaEyeSlash className="text-gray-500" />
          )}
        </div>
      )}
    </div>
    </div>
  );
}

export default InputBox;
