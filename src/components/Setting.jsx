import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Setting = ({ open, change, start }) => {
  const [audiochecked, setAudioChecked] = useState(true);
  const [videochecked, setVideoChecked] = useState(true);

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } w-[300px] transition-all p-5 rounded-md absolute top-1/2 left-1/2 bg-gray-700 -translate-x-1/2 -translate-y-1/2`}
    >
      <div className="flex justify-between">
        <p className="text-gray-300 font-bold">Setting</p>
        <p
          className="text-gray-300 font-bold text-lg cursor-pointer"
          onClick={() => change(false)}
        >
          <IoIosCloseCircleOutline />
        </p>
      </div>
      <div className="flex mt-3 justify-between items-center">
        <span className="text-gray-300">Audio</span>
        <label className="switch ">
          <input
            type="checkbox"
            defaultChecked={audiochecked}
            onChange={() => setAudioChecked(!audiochecked)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="flex justify-between mt-3 items-center">
        <span className="text-gray-300">Video</span>
        <label className="switch ">
          <input
            type="checkbox"
            defaultChecked={videochecked}
            onChange={() => setVideoChecked(!videochecked)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="flex justify-between mt-3 items-center">
        <span className="text-gray-300">Password</span>
        <span className="text-gray-300">23jk123</span>
      </div>

      <div
        onClick={() => change(false)}
        className="w-full cursor-pointer mt-3 h-[40px] flex items-center rounded-md justify-center bg-primary text-white"
      >
        <p>{start ? "Start" : "Save"}</p>
      </div>
    </div>
  );
};

export default Setting;
