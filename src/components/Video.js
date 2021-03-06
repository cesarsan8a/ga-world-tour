import React from 'react'
import Webcam from "react-webcam";
import ReactDOM from 'react-dom'
import {storage} from './fire'

const WebcamCapture = (props) => {

  const webcamRef = React.useRef(null);
  const [url, setUrl] = React.useState("");

  const capture = () => { //Take a picture and save it in firbase storage
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc !== null){
      const uploadTask = storage.ref(`images/${props.user.uid}`);
      uploadTask.putString(imageSrc.split("").slice(23).join(""),"base64");
    }
  };

  
  const download = () => { //Get the from the storage if it is available.
    const downloadTask = storage.ref(`images/${props.user.uid}`);
    if (downloadTask !== null){
      downloadTask.getDownloadURL().then((dlUrl)=>{
        setUrl(dlUrl)
      })
    }
  }

  const refreshPage = () =>{ //Refresh the page and show the changes
    window.location.reload(false);
  }

  return (
    <div className="camera">
      <Webcam
          id= "webcam"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
      />
      <button className="btn btn-info" onClick={capture}>Capture photo</button>
      <button className="btn btn-info" onClick={download}>See the photo</button>
      <button className="btn btn-info" onClick={refreshPage}>Apply changes</button>
      
      <img
        src={url || "http://via.placeholder.com/300"}
        id="image"
        alt= "profile"
      />
      
    </div>
    );
  };
  
  ReactDOM.render(<WebcamCapture />, document.getElementById("root"));

  export default WebcamCapture
