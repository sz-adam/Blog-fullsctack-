import { useState } from "react";
import MessageService from "../services/MessageServices";
import { getAccessToken } from "../common/utils";
import { Toaster, toast } from "react-hot-toast";
import AnimatedMotion from "../common/AnimatedMotion";

function AdminWritemodal({ setShowAdminWrite }) {
  const [adminMessage, setAdminMessage] = useState("");
  const access_token = getAccessToken();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await MessageService.createAdminMessage(access_token, {
        message: adminMessage,
      });
      toast.success("Message successfully delivered.");
      setTimeout(() => {
        setShowAdminWrite(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      {" "}
      <Toaster />
      <form
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onSubmit={handleSubmit}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t relative">
              <h3 className="text-3xl font-semibold">
                Write a message to the admin !!
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <textarea
                value={adminMessage}
                placeholder="Message to admin maximum 200 caracters"
                rows="8"
                className="resize-none w-full md:w-30 lg:w-50"
                onChange={(event) => setAdminMessage(event.target.value)}
                required
                maxlength="200"
              />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <AnimatedMotion animationName="buttonAnimation">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowAdminWrite(false)}
                >
                  Close
                </button>
              </AnimatedMotion>
              <AnimatedMotion animationName="buttonAnimation">
                <button className="btn-dark  px-6 py-2 mr-1 mb-1" type="submit">
                  Send
                </button>
              </AnimatedMotion>
            </div>
          </div>
        </div>
      </form>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default AdminWritemodal;
