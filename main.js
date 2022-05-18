let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
let box = document.querySelector("#box");
var data = null;



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
    data = formatImageData(newData);
   	// data url of the image
    //console.log(newData);
    document.getElementById("display").innerHTML = "Select Pixel To Begin";

});


function formatImageData(imageData){
  var data = imageData;
  // remove every 4rth element as it associates with opacity and we dont use that
  for (var i = 0; i < imageData.length; i++) {
    if ((i+1) % 3 === 0) {
      imageData.splice(i+1, 1);
    }
  }
  // enclose data into pixel arrays
  var pixelVals = [];
  for (var i = 1; i < data.length/3 + 1; i++) {
    pixelVals.push([data[(i*3)- 3], data[(i*3) - 2], data[(i*3)-1]]);
  }
  return pixelVals;
}
function coordToPixIndex(x, y){
  // round x and y
  if (x === -1) {
    x = 0;
  }
  if (y === -1) {
    y = 0;
  }
  x = Math.floor(x);
  y = Math.floor(y);


  console.log([x, y]);
  var width = 320;
  var height = 240;
  var index = x + y * width;
  return index;
}
function setColor(index){

  var ctx = box.getContext('2d');
  ctx.beginPath();
  ctx.lineWidth = "6";
  var rgb = "rgb( "+data[index][0] + "," + data[index][1]+ " ," + data[index][2]+")";
  document.getElementById("display").innerHTML = rgb;
  ctx.fillStyle = rgb;
  ctx.rect(0, 0, 200, 200);
  ctx.fill();
}

function click(canvas, event) {
   let rect = canvas.getBoundingClientRect();
   let x = event.clientX - rect.left;
   let y = event.clientY - rect.top;
   setColor(coordToPixIndex(x, y));
   //console.log("Coordinate x: " + x, "Coordinate y: " + y);
}
canvas.addEventListener("mousedown", function(e){
  click(canvas, e);
});
