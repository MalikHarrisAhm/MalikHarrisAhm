

let particles = [];

const num = 2000;

const noiseScale = 0.005;

var ab = 70;  //Set up the horizontal amplitute
var b = 50;  //Set up the vertical amplitute
var angle = 0;

function setup() {
  createCanvas(500, 500);
  for(let i = 0; i < num; i ++) {
    particles.push(createVector(random(width), random(height)));
  }
  background(109,77,52, 20);

  a2LocationX = random(1000);
  a2LocationY = random(1000);


  a3LocationX = random(500);
  a3LocationY = random(500);

  
}


function draw() {



  for(let i = 0; i < num; i ++) {
    let alpha = random(100)
    stroke(109,77,52, alpha);
    let p = particles[i];
    let xBorderR = random(450,470)
    let xBorderL = random(30,50)
    let yBorderT = random(450,470)
    let yBorderB = random(30,50)
    if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {
      point(p.x, p.y);
    }
   
    let n = noise(p.x * noiseScale, p.y * noiseScale);
    let a = (TAU * n);

    p.x -= tan(TAU/2 - 1.6);
    p.y += sin(a);


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

  // for(let i = 0; i < num; i ++) {
  //   let alpha = random(100)
  //   stroke(109,77,52, alpha);
  //   let p = particles[i];
  //   point(p.x, p.y);
  //   let margin = 100;
  //   let curlx = randomGaussian() + width/2;
  //   let curly = random(margin, height-margin);
  //   let n = noise(p.x * noiseScale, p.y * noiseScale);
  //   let a = (TAU * n);
  //   let a2 = atan2(a2LocationY/2-p.y, a2LocationX/2-p.x)
  //   let a3 = atan2(a3LocationY/2-p.y, a3LocationX/2-p.x)
  //   let circleChoice = random(2);

  //   if(closeAngle(a, a2)){
  //     if(circleChoice >= 1) {
  //       if (inRadius(a2LocationY, a2LocationX, p)) {
  //         p.x += cos(a2-HALF_PI);
  //         p.y += sin(a2-HALF_PI/1.3);
  //       }  else {
  //         p.x += cos(a);
  //         p.y += sin(a);
  //       }
  //     }
  //    } else if(closeAngle(a, a3)) {
  //       if (inRadius(a3LocationY, a3LocationX, p)) {
  //         p.x += cos(a3-HALF_PI);
  //         p.y += sin(a3-HALF_PI/1.7);
  //       }  else {
  //         p.x += cos(a);
  //         p.y += tan(a);
  //       }
  //     } else {
  //       p.x += cos(a);
  //       p.y += tan(TAU - 1);
  //   }


  //   if(!onScreen(p)) {
  //     p.x = random(width);
  //     p.y = random(height);
  //   }
  // }