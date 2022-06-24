import React from "react";
import FirebaseApp from "../utils/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/User";
import { useNavigate } from "react-router-dom";

FirebaseApp();

const Google = ({ login }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const SignUpwithGoogle = async () => {
    await signInWithPopup(auth, provider).then((res) => {
      console.log(res.user.displayName, res.user.photoURL);
      axios
        .post(`${process.env.REACT_APP_API}/user`, {
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
        })
        .then((res) => {
          console.log(res);
          if (res.data.err) {
            alert("This account is already created");
          } else {
            dispatch(
              setUser({
                email: res.data.user.email,
                name: res.data.user.name,
                profile: res.data.user.profile,
                meetingid: res.data.user.meetingid,
                token: res.data.token,
              })
            );
            navigate("/me");
          }
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <div
      className="flex mt-5 mb-2 bg-blue-700 items-center rounded-md"
      onClick={SignUpwithGoogle}
    >
      <div className="icon bg-white dark:bg-white p-3 rounded-md">
        <FcGoogle />
      </div>
      <p className="ml-3 bg-blue-700 text-white h-max">
        {login ? "Login" : "Signup"} With Google
      </p>
    </div>
  );
};

export default Google;
