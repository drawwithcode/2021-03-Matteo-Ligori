function preload() {
  myImage = loadImage("./assets/bulgari.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  colorMode(RGB);
  background(14, 14, 14);
  image(myImage, 0, 0, 800, 800);

  var myText = "Hello";

  textFont("Lobster");
  textAlign(CENTER);
  textSize(60);
  fill(255);
  text(myText, 1200, height / 2);
}
