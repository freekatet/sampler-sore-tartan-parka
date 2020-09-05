//declare variable that selects video element in html
let video = document.querySelector("#videoElement");

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}



getVideo();



//code for accessing the getUserMedia API:
// if (navigator.mediaDevices.getUserMedia) {       
//     navigator.mediaDevices.getUserMedia({audio: false, video: true}) //constraints in ({})
//   .then(function(stream) {
//     video.srcObject = stream; //set stream to video source element property
//   })
//   .catch(function(error) { //catch any errors here
//     console.log("Something went wrong!");
//   });
// }

/* getUserMedia returns a promise that returns an object of type mediaStreanm. 
syntax: var promise = navigator.mediaDevices.getUserMedia(constraints); */

