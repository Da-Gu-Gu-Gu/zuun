import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import Setting from "./Setting";
import { SocketContext } from "../socket/socket";
import { useNavigate } from "react-router-dom";
import { setControls } from "../redux/User";

const Dashboard = () => {
  let user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [start, setStart] = useState(true);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const createRoom = (mic, camera) => {
    socket.emit("addRoom", user?.meetingid);
    dispatch(setControls({ audio: mic, video: camera }));
    navigate(`/meeting/${user?.meetingid}`);
  };

  const saveSetting = (mic, camera) => {
    dispatch(setControls({ audio: mic, video: camera }));
    setPopup(false);
  };

  const startHandler = () => {
    setStart(true);
    setPopup(true);
  };

  const settignHandler = () => {
    setStart(false);
    setPopup(true);
  };

  return (
    <div className="w-screen h-screen bg-amel pt-5 relative">
      <div className="mx-auto lg:w-3/5  w-4/5  ">
        <h2 className="welcome text-3xl font-extrabold">Zuun</h2>
        <img
          src={
            user?.profile ? user.profile : "https://api.multiavatar.com/df.png"
          }
          alt="profile"
          className="w-[50px] h-[50px] rounded-md bg-gray-600 mx-auto my-3"
        />
        <p className="text-center text-2xl font-bold mb-3 text-gray-300">
          {user?.name ? user.name : "Unknown"}
        </p>
        <div className="bg-gray-700 w-max mx-auto px-10 py-3 rounded-md">
          <h1 className="mb-3 font-bold text-center text-white tracking-widest">
            {user?.meetingid ? user.meetingid : "123 123 123"}
          </h1>
          <div className="flex  justify-between w-max">
            <div
              className="bg-gray-800 rounded-md py-2 px-5 cursor-pointer"
              onClick={startHandler}
            >
              <p className="text-white text-center">Start</p>
            </div>
            <div
              onClick={() => settignHandler()}
              className="bg-gray-800 rounded-md py-2 px-5 ml-4 cursor-pointer"
            >
              <p className="text-white text-center">Setting</p>
            </div>
          </div>
        </div>

        <div className="config mt-7">
          <span className="text-gray-500 text-sm ">DISPLAY NAME</span>
          <p className="text-white tracking-wide mb-5">
            {" "}
            {user?.name ? user.name : "Unknown"}
          </p>

          <span className="text-gray-500 text-sm ">EMAIL ADDRESS</span>
          <p className="text-white tracking-wide mb-5">
            {" "}
            {user?.email ? user.email : "Unknown Email"}
          </p>

          <span className="text-gray-500 text-sm ">DATE</span>
          <p className="text-white tracking-wide mb-5">
            {new Date().toLocaleDateString()}
          </p>

          <span className="text-gray-500 text-sm ">LOCAL TIME</span>
          <p className="text-white tracking-wide mb-5">
            {new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p>
        </div>
      </div>
      <Setting
        open={popup}
        saveSetting={saveSetting}
        start={start}
        create={createRoom}
      />
    </div>
  );
};

export default Dashboard;
