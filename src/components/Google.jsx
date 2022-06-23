import React from "react";
import FirebaseApp from "../utils/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

FirebaseApp();

const Google = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const LoginWithGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
      console.log(res.user);
    });
  };

  return (
    <div
      className="flex mt-5 mb-2 bg-blue-700 items-center rounded-md"
      onClick={LoginWithGoogle}
    >
      <div className="icon bg-white dark:bg-white p-3 rounded-md">
        <FcGoogle />
      </div>
      <p className="ml-3 bg-blue-700 text-white h-max">Login With Google</p>
    </div>
  );
};

export default Google;
