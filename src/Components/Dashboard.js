// Importing React and Client Socket Headers
import React, { useEffect } from "react";
import Peer from 'peerjs';
import io from "socket.io-client"


const peers = {}

const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
})

//Change Endpoint to local Host if You are runnign along with backend
const ENDPOINT = "http://localhost:4040/";
// const ENDPOINT = "https://task1-backend.herokuapp.com/";

var socket = io.connect(ENDPOINT)


navigator.getUserMedia = (
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);


function Dashboard(props) {

  useEffect(() => {
    clicked()
  }, [])

  var miniVideo = document.createElement("video")
  miniVideo.setAttribute("id","minivideo")
  miniVideo.muted=true
  miniVideo.onloadedmetadata={onload}

  function clicked() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        startStream(miniVideo, stream);

        myPeer.on('call', call => {
          call.answer(stream)
          const video = document.createElement('video')
          call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
          })
        })
      
        socket.on('user-connected', userId => {
          connectToNewUser(userId, stream)
        })

      });
  }
  
  socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
  })
  
  myPeer.on('open', id => {
    socket.emit('join-room', props.LoginRoomID, id)
  })
  
  function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
      video.remove()
    })
  
    peers[userId] = call
  }
  
  function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    document.getElementById("videobox").append(video)
  }

  function startStream(miniVideo, stream) {
    miniVideo.srcObject = stream;
    onload(miniVideo);
    document.getElementById("videobox").append(miniVideo);
  }
  
   function onload(miniVideo){
    miniVideo.play();
  }



  return (
    <div id="main">
      <div>Room ID : {props.LoginRoomID}</div>
      <div id="videobox">
      </div>
    </div>
  );
}

export default Dashboard;
