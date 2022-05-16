let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");



camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;
});

click_button.addEventListener('click', function() {
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');
    var imageData = canvas.getContext('2d').getImageData(0, 0, 320, 240).data;

    //canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    //canvas.getContext('2d').putImageData(data, 0, 0);
    var newData = Array.prototype.slice.call(imageData);
    var data = formatImageData(newData);
   	// data url of the image
   	console.log(imageData);
    //console.log(newData);
});


function formatImageData(imageData){
  console.log(imageData);
  var data = imageData;
  // remove every 4rth element as it associates with opacity and we dont use that
  for (var i = 0; i < imageData.length; i++) {
    if ((i+2) % 3 === 0) {
      console.log(data.splice(i, 1));
    }

  }
  console.log(data);
  return data;
}
