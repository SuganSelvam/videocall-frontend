// Importing React and Client Socket Headers
import React, { useState } from "react";

//Change Endpoint to local Host if You are runnign along with backend
// const ENDPOINT = "http://localhost:4040/";
const ENDPOINT = "https://task1-backend.herokuapp.com/";

navigator.getUserMedia = (
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

function clicked() {
  console.log("Clicked");
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      var miniVideo = document.createElement("video")
      miniVideo.setAttribute("id","minivideo")
      miniVideo.muted=true
      miniVideo.onloadedmetadata={onload}
      startStream(miniVideo, stream);
      console.log("Stream",stream,miniVideo);
    });
}

function startStream(miniVideo, stream) {
  miniVideo.srcObject = stream;
  onload(miniVideo);
  document.getElementById("videobox").append(miniVideo);
}

 function onload(miniVideo){
  console.log("Meta data");
  miniVideo.play();
}

function Dashboard(props) {
  return (
    <div id="main">
      <button type="button" onClick={clicked}>
        Start Video Stream
      </button>
      <div id="videobox">
      </div>
    </div>
  );
}

export default Dashboard;
