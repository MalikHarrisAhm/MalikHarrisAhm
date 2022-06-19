

let particles = [];

const num = 4000;

const noiseScale = 0.01;
// var noiseScale2 = 100;//noise scale;

var ab = 70;  //Set up the horizontal amplitute
var b = 50;  //Set up the vertical amplitute
var angle = 0;

function setup() {
  weight = random(3,6);
  createCanvas(500, 500);


  for(let i = 0; i < num; i ++) {
    particles.push(createVector(random(width), random(height)));
  }
  background(109,77,52, 10);

  a2LocationX = random(1000);
  a2LocationY = random(1000);


  a3LocationX = random(500);
  a3LocationY = random(500);

  
}


function draw() {


  for(let i = 0; i < num; i ++) {
    let alpha = random(100)
    stroke(0, 100);
    strokeWeight(0.5);
    let p = particles[i];
    let xBorderR = random(430,470);
    let xBorderL = random(30,70);
    let yBorderT = random(430,470);
    let yBorderB = random(30,70);
    if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {
      point(p.x, p.y);
    }
   
    let n = noise(p.x * noiseScale, p.y * noiseScale);
    let a = (TAU * n);
    let a2 = atan2(height/2-p.y, width/2-p.x);

    p.x += sin(a*2);
    p.y += tan(PI);


    if(!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }

  

}


function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height + 200;
}

function closeAngle(a, aa) {

  return ((sin(a) - sin(aa-HALF_PI)  <= PI/4) && (cos(a) - cos(aa-HALF_PI) <= PI/4)  );

}

function inRadius(locationY, locationX, v) {
  return (locationY/2 - v.y)*(locationY/2 - v.y) + (locationX/2 - v.x)*(locationX/2 - v.x) <= 10000;
}

function yCoordinate(v) {
  return v.x >= 200 && v.x <= 250 && v.y >= 200 && v.y <= 250;
}

