import React from "react";
import Google from "./Google";

const Home = () => {
  return (
    <div className="w-screen h-screen  flex items-center justify-center gradient  ">
      <div className="form w-[300px] bg-white p-5 rounded-md dark:bg-amel">
        <h2 className="text-4xl font-semibold welcome ">
          Welcome to <br />
          <span className="text-4xl font-extrabold  ">Guun</span>
        </h2>
        <span className="text-sm text-gray-300 dark:text-white ">
          Let close together with this.
        </span>
        <Google />
      </div>
    </div>
  );
};

export default Home;
