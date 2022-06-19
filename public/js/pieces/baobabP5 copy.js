

let particles = [];

const num = 2000;

const noiseScale = 0.01;

var ab = 70;  //Set up the horizontal amplitute
var b = 50;  //Set up the vertical amplitute
var angle = 0;

function setup() {
  createCanvas(500, 500);
  for(let i = 0; i < num; i ++) {
    particles.push(createVector(random(width), random(height)));
  }
  stroke(0, 200);
  background(109,77,52, 20);

  a2LocationX = height;
  a2LocationY = height;

  // a3LocationX = random(1000);
  // a3LocationY = random(1000);

  
}


function draw() {
  background(255, 0);
  for(let i = 0; i < num; i ++) {
    let p = particles[i];
    point(p.x, p.y);
    let n = noise(p.x * noiseScale, p.y * noiseScale);
    let a = (TAU * n);
    let a2 = atan2(a2LocationY/2-p.y, a2LocationX/2-p.x)
    
    if(closeAngle(a, a2)){
      if (inRadius(a2LocationY, a2LocationX, p, height)) {
        // let xBorderR = random(width - (50*height/500),height - (30*height/500))
        // let xBorderL = random((30*height/500),(50*height/500))
        // let yBorderT = random(width - (50*height/500),height - (30*height/500))
        // let yBorderB = random((30*height/500),(50*height/500))
        // if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {
          p.x += cos(a2-HALF_PI);
          p.y += sin(a2-HALF_PI);
        // }
      }  else {
        // let xBorderR = random(width - (50*height/500),height - (30*height/500))
        // let xBorderL = random((30*height/500),(50*height/500))
        // let yBorderT = random(width - (50*height/500),height - (30*height/500))
        // let yBorderB = random((30*height/500),(50*height/500))
        // if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {
          p.x += cos(a);
          p.y += sin(a);
        // }
      }
    } else {
      // let xBorderR = random(width - (50*height/500),height - (30*height/500))
      // let xBorderL = random((30*height/500),(50*height/500))
      // let yBorderT = random(width - (50*height/500),height - (30*height/500))
      // let yBorderB = random((30*height/500),(50*height/500))
        // if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {
          stroke(0, 100);
          p.x += cos(a);
          p.y += sin(a);
        // } else {
          // stroke(0, 5);
          // p.x += cos(a);
          // p.y += sin(a);
        // }
          
        
    }


    if(!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }
}


function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

function closeAngle(a, a2) {
  return ((sin(a) - sin(a2-HALF_PI)  <= PI/4) && (cos(a) - cos(a2-HALF_PI) <= PI/4) );
}

// function closeAngle2(a, a3) {
//   return (sin(a) - sin(a3-HALF_PI)  >= -PI/4) && (cos(a) - cos(a3-HALF_PI) >= -PI/4);
// }

function inRadius(locationY, locationX, v, h) {
  return (locationY - v.y)*(locationY - v.y) + (locationX - v.x)*(locationX - v.x) <= (450 * (h*h/500));
}

function yCoordinate(v) {
  return v.x >= 200 && v.x <= 250 && v.y >= 200 && v.y <= 250;
}

