let myImage;
let mySong;
var analyzer;
let play;
let button;
let pause;
var fft;
var vedoPlay = true;
//var col = get(x, y);
function preload() {
  //carico immagini e suono
  myImage = loadImage("./assets/bulgari.png");
  play = loadImage("./assets/play-01.png");
  pause = loadImage("./assets/pause-01.png");
  mySong = loadSound("./assets/campane.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  colorMode(RGB);
  background(14, 14, 14);
  //aggiungo due elementi FFT e amplitude che permettono di leggere le informazioni della frequenza del suono che viene trasmesso
  fft = new p5.FFT();
  //creo div trasparente che quando clicco attiva la funzione musicStart
  button = createDiv();
  button.size(50, 50);
  button.position(width - 375, height / 2 + 75);
  button.mousePressed(musicStart);
  button.style("background-alpha", 0);
  //legge l'ampiezza dell'onda sonora, ovvero il volume
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
}

function draw() {
  background(14, 14, 14);
  // getLevel permette di registrare il valore dell'ampiezza in volume (da un valore da 0 ad 1)
  volume = analyzer.getLevel();
  //mappo il volume in un'unità maggiore scelta da me per modificare la grandezza dell'immagine a seconda del volume della musica
  volume = map(volume, 0, 1, 800, 900);
  image(myImage, 400, height / 2, volume, volume);
  //con la variabile vedoPlay cambio immagine tra play e pause cambiando vedoPlay tra true e false
  if (vedoPlay == true) {
    image(play, width - 350, height / 2 + 100, 50, 50);
  } else {
    image(pause, width - 350, height / 2 + 100, 50, 50);
  }

  stroke(255);
  //tramite waveform(), è possibile trasformare i numeri letti da fft nel disegno di un'onda
  let waveform = fft.waveform();
  var myText = "Start your meditation";
  //scelgo il font, grandezza e posizione
  textFont("Lobster");
  textAlign(CENTER);
  textSize(55);
  fill(255);
  text(myText, width - 350, height / 2);

  translate(0, height / 2);
  beginShape();
  noFill();
  stroke(255);
  //creo il disegno dell'onda che rendo semicircolare e mappo il raggio r utilizzando i valori di partenza dell'onda (compresi tra -1 ed 1 )
  for (let i = 0; i <= 180; i++) {
    let r = map(waveform[i], -1, 1, width / 2 - 200, width / 2 + 200);
    let x = r * sin(i);
    let y = r * cos(i);
    vertex(x, y);
  }
  endShape();
}

//cliccando con il mouse faccio partire e fermare la musica e cambio lo stato della variabile vedoPlay
function musicStart() {
  if (mySong.isPlaying()) {
    mySong.pause();
    vedoPlay = true;
  } else {
    mySong.play();
    vedoPlay = false;
  }
}
