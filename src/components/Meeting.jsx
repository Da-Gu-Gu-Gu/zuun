import React, { useEffect, useRef, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { BsChatSquareDots } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { CgScreen } from "react-icons/cg";
import { IoVideocamOffOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setControls } from "../redux/User";
import { useParams } from "react-router-dom";
import { SocketContext } from "../socket/socket";
import { useContext } from "react";
import Peer from "simple-peer";

const Meeting = () => {
  const user = useSelector((state) => state.user);

  const { token } = useParams();

  const socket = useContext(SocketContext);

  const disptach = useDispatch();
  const [stream, setStream] = useState();

  const myVideo = useRef();
  const otherVideo = useRef();

  const [other, setOther] = useState();

  useEffect(() => {
    socket.emit("entermeetingroom", {
      roomid: Number(token),
      sender: user,
    });
    socket.on(`getMessage${Number(token)}`, (data) => {
      console.log(data);
      if (Number(token) === user?.meetingid) {
        if (data?.sender.meetingid !== Number(token)) {
          setOther(data.sender);
        }
      }
      if (Number(token) !== user?.meetingid) {
        if (data?.sender.meetingid === Number(token)) {
          setOther(data.sender);
        }
      }
    });
  }, [socket]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: user?.video,
        audio: user?.audio,
      })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
        videoshare(currentStream);
      });
    socket.emit("entermeetingroom", {
      roomid: Number(token),
      sender: user,
    });
  }, [user?.audio, user?.video]);

  const videoshare = (x) => {
    console.log("hahah");
    console.log(x);
    let peer = new Peer({
      initiator: true,
      stream: x,
    });
    peer.on("signal", (data) => {
      console.log(data);
      socket.emit("video", { user: user, signal: data });
    });

    socket.on(`video${user?.email}`, (data) => {
      console.log(data);
      peer.signal(data);
    });

    peer.on("stream", (stream) => {
      console.log(stream);
      otherVideo.current.srcObject = stream;
    });
  };

  return (
    <div className="w-screen  min-h-max h-screen py-5 bg-amel">
      {/* <h2 className="px-7 py-4 text-3xl font-bold welcome">Zuun</h2> */}
      <div className="mx-auto w-4/5  flex  rounded-md h-full  ">
        <div className="meet px-3 py-5 bg-gray-900 rounded-md relative grow min-h-max">
          <div className="flex text-gray-400 cursor-pointer justify-between">
            <div className="border border-gray-400 flex items-center p-1 rounded-md">
              <IoIosPeople className="text-2xl" />
              &nbsp;2
              <AiOutlineCaretDown />
            </div>

            <div className="bg-red-600 text-white cursor-pointer flex items-center px-1 rounded-md">
              Leave Room
            </div>
          </div>
          <div className="mt-2 bg-gray-400 text-gray-400 w-full h-px"></div>
          <div className=" p-3 pb-0   h-full">
            <div className=" flex lg:flex-row flex-col h-4/5">
              <div className="you  flex items-center justify-center bg-amel border rounded-md grow border-primary lg:w-1/2 h-1/2 lg:h-full">
                {user?.video ? (
                  <video
                    playsInline
                    ref={myVideo}
                    autoPlay
                    className="w-full h-full"
                  />
                ) : (
                  <div className="rounded ">
                    <img
                      src={
                        user?.profile
                          ? user.profile
                          : "https://api.multiavatar.com/df.png"
                      }
                      alt="profile"
                      className="w-[50px] h-[50px] rounded-md bg-gray-600 mx-auto my-3"
                    />
                    <p className="text-center text-2xl text-white">You</p>
                  </div>
                )}
              </div>
              {other && (
                <div className="other  flex items-center relative justify-center bg-amel lg:w-1/2 h-1/2 lg:h-full">
                  {other?.video ? (
                    <video
                      playsInline
                      ref={otherVideo}
                      autoPlay
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="rounded ">
                      <img
                        src={
                          other?.profile
                            ? other.profile
                            : "https://api.multiavatar.com/df.png"
                        }
                        className="w-[50px] h-[50px] rounded-md bg-gray-600 mx-auto my-3"
                      />
                      <p className="text-center text-2xl text-white">
                        {other?.name}
                      </p>
                    </div>
                  )}
                  <div className="flex absolute bottom-0 left-1 items-center pb-1">
                    <div className=" text-[15px] p-3 bg-gray-900 text-white rounded-md ">
                      {other?.audio ? (
                        <AiOutlineAudio />
                      ) : (
                        <AiOutlineAudioMuted />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="absolute bottom-0 h-[60px] rounded-br-none w-full left-0 gradient rounded-md flex items-center justify-center">
              <div
                className="p-3 bg-gray-500/50 rounded-md cursor-pointer"
                onClick={() =>
                  disptach(
                    setControls({ audio: !user?.audio, video: user?.video })
                  )
                }
              >
                {user?.audio ? <AiOutlineAudio /> : <AiOutlineAudioMuted />}
              </div>
              <div
                className="p-3 bg-gray-500/50 rounded-md mx-4 cursor-pointer"
                onClick={() =>
                  disptach(
                    setControls({ audio: user?.audio, video: !user?.video })
                  )
                }
              >
                {user?.video ? (
                  <VscDeviceCameraVideo />
                ) : (
                  <IoVideocamOffOutline />
                )}
              </div>
              <div className="p-3 lg:hidden bg-gray-500/50 rounded-md mr-4 cursor-pointer">
                <BsChatSquareDots />
              </div>
              <div className="p-3 bg-gray-500/50 rounded-md mr-4 cursor-pointer">
                {/* <div className="p-3 text-sm bg-violet-700 text-white  rounded-md  cursor-pointer"> */}
                <CgScreen />
              </div>
            </div>
          </div>
        </div>
        <div className="chat w-[300px] relative bg-gray-800 rounded-md lg:inline hidden">
          <p className=" text-white m-4 mb-2 bg-gray-500 inline-block p-2 rounded-md cursor-pointer">
            <AiOutlineArrowLeft />
          </p>
          <p className=" text-white ml-4 font-bold">Chat</p>
          <div className="me flex w-4/5  justify-end rounded-md mr-3 float-right  my-3">
            <p className="float-right bg-primary text-white p-2 rounded-md ">
              Hi
            </p>
          </div>
          <div className="other flex w-4/5  rounded-md ml-3 float-left my-3">
            <div className="rounded w-[35px]">
              <img
                src="https://api.multiavatar.com/gg.png"
                alt="profile"
                className="w-[30px] h-[30px] rounded-md bg-amel mt-2"
              />
            </div>
            <p className="inline bg-gray-500 max:w-4/5 text-white p-2 rounded-md">
              Hi
            </p>
          </div>
          <div className="absolute bottom-0 flex items-center w-full">
            <input
              type="text"
              name="chat"
              className="bg-gray-500 h-[40px] p-3 border-none outline-none text-white w-3/4"
              placeholder="Aa"
            />
            <div className="h-[40px] leading-[40px] text-center  bg-primary text-white w-1/4">
              Send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meeting;
