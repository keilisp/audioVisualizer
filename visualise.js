// var audio = document.getElementById('audio')
// var input = document.getElementById('chooseFile')
// var logo = document.getElementById('logo').style
// var arr, src, context, analyser

// window.addEventListener('click', () => {
// 	if (!context) {
// 		preparation();
// 	}
// 	if (audio.paused) {
// 		audio.play();
// 		loop();
// 	} else {
// 		audio.pause();
// 	}
// })

// function preparation() {
// 	context = new AudioContext()
// 	analyser = context.createAnalyser()
// 	src = context.createMediaElementSource(audio)
// 	src.connect(analyser)
// 	analyser.connect(context.destination)
// 	loop()
// }

// function loop() {
// 	if (!audio.paused) {
// 		window.requestAnimationFrame(loop);
// 	}
// 	arr = new Uint8Array(1024)
// 	analyser.getByteFrequencyData(arr)

// 	logo.minHeight = (arr[40]) + 'px'
// 	logo.width = (arr[40]) + 'px'

// }

window.onload = function () {
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");

  file.onchange = function () {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");
    // ctx.fillStyle = #EA4F9D;

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var r = barHeight + 35 * (i / bufferLength);
        var g = 250 * (i / bufferLength);
        var b = 110;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
  };
};
