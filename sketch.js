let myImage;
let mySong;
var analyzer;
var fft;
//var col = get(x, y);
function preload() {
  myImage = loadImage("./assets/bulgari.png");
  mySong = loadSound("./assets/campane.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  colorMode(RGB);
  background(14, 14, 14);
  fft = new p5.FFT();
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
}

function draw() {
  background(14, 14, 14);

  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 800, 900);
  image(myImage, 400, height / 2, volume, volume);

  stroke(255);
  let waveform = fft.waveform();
  var myText = "Click and concentrate";

  textFont("Lobster");
  textAlign(CENTER);
  textSize(60);
  fill(255);
  text(myText, 1200, height / 2);

  translate(0, height / 2);
  beginShape();
  noFill();
  stroke(255);
  for (let i = 0; i <= 180; i++) {
    let r = map(waveform[i], -1, 1, width / 2 - 100, width / 2 + 200);
    let x = r * sin(i);
    let y = r * cos(i);
    vertex(x, y);
  }
  endShape();
}
function mouseClicked() {
  if (mySong.isPlaying()) {
    mySong.pause();
  } else {
    mySong.loop();
  }
}
