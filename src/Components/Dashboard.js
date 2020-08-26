// Importing React and Client Socket Headers
import React, { useState } from "react";
import io from "socket.io-client";
import Peer from "peerjs";

//Change Endpoint to local Host if You are runnign along with backend
// const ENDPOINT = "http://localhost:4040/";
const ENDPOINT = "https://task1-backend.herokuapp.com/";

//Creating socket to connect to SERVER
var socket = io.connect(ENDPOINT);

var VideoBox = document.getElementById("video-box");

const myPeer = new Peer(undefined, { host: "/", port: "4040" });

const miniVideo = document.createElement("video");
miniVideo.muted = true;

const peers = {};

navigator.getUserMedia = ~(
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
      startStream(miniVideo, stream);
      console.log("Stream");
    });
}

function startStream(miniVideo, stream) {
  miniVideo.srcObject = stream;
  miniVideo.addEventListener("loadmetadata", () => {
    console.log("Meta data");
    var playPromise = miniVideo.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          // Automatic playback started!
          // Show playing UI.
          console.log("audio played auto");
        })
        .catch((error) => {
          // Auto-play was prevented
          // Show paused UI.
          console.log("playback prevented");
        });
    }
  });
  VideoBox.append(miniVideo);
}

function Dashboard(props) {
  return (
    <div id="main">
      <button type="button" onClick={clicked}>
        CLick here
      </button>
      <div id="video-box"></div>
    </div>
  );
}

export default Dashboard;
