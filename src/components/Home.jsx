import React, { useState } from "react";
import Google from "./Google";

const Home = () => {
  const [login, setLogin] = useState(false);

  return (
    <div className="w-screen h-screen  flex items-center justify-center gradient  ">
      <div className="form w-[300px] bg-white p-5 rounded-md dark:bg-amel">
        <h2 className="text-4xl font-semibold welcome ">
          Welcome to <br />
          <span className="text-4xl font-extrabold  ">Zuun</span>
        </h2>
        <span className="text-sm text-gray-300 dark:text-white ">
          Let close together with this.
        </span>
        <Google login={login} />
        {login ? (
          <p className="text-xs text-gray-300">
            Don't have an account?{" "}
            <span
              className="text-green-300 cursor-pointer"
              onClick={() => setLogin(false)}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-xs text-gray-300">
            Already have an account?{" "}
            <span
              className="text-green-300 cursor-pointer"
              onClick={() => setLogin(true)}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
