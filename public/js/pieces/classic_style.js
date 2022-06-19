

let particles = [];

const num = 2000;

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

  background(215,209,201, 100);

  a2LocationX = random(1000);
  a2LocationY = random(1000);


  a3LocationX = random(500);
  a3LocationY = random(500);

  
}

function curl(x, y){
  var EPSILON = 0.001;//sampling interval
  //Find rate of change in X direction
  var n1 = noise(x + EPSILON, y);
  var n2 = noise(x - EPSILON, y);
  //Average to find approximate derivative
  var cx = (n1 - n2)/(2 * EPSILON);

  //Find rate of change in Y direction
  n1 = noise(x, y + EPSILON);
  n2 = noise(x, y - EPSILON);

  //Average to find approximate derivative
  var cy = (n1 - n2)/(2 * EPSILON);
  
  //return new createVector(cx, cy);//gradient toward higher position
  return new createVector(cy, -cx);//rotate 90deg
}

function draw() {

  for(let i = 0; i < num; i ++) {
    let alpha = random(100)
    stroke(198,179,175, 10);
    
    strokeWeight(1);
    let p = particles[i];
    let xBorderR = random(430,470);
    let xBorderL = random(30,70);
    let yBorderT = random(430,470);
    let yBorderB = random(30,70);
    p.add(curl(p.x/noiseScale, p.y/noiseScale));
    if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {

      stroke(0, 100);
      point(p.x - 5, p.y);
    } else {
      stroke(0, 5);
      point(p.x - 5, p.y);
    }
    
  }

  for(let i = 0; i < num; i ++) {
    let alpha = random(100)
    stroke(169,122,88, 100);
    
    strokeWeight(1);
    let p = particles[i];
    let xBorderR = random(430,470);
    let xBorderL = random(30,70);
    let yBorderT = random(430,470);
    let yBorderB = random(30,70);
    p.add(curl(p.x/noiseScale, p.y/noiseScale));
    if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {

      stroke(0, 100);
      point(p.x + 5, p.y);
    } else {
      stroke(0, 5);
      point(p.x + 5, p.y);
    }
    
  }


  for(let i = 0; i < num; i ++) {
    let alpha = random(100)
    stroke(132,74,55, 100);
    strokeWeight(1);
    let p = particles[i];
    let xBorderR = random(430,470);
    let xBorderL = random(30,70);
    let yBorderT = random(430,470);
    let yBorderB = random(30,70);
    if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {
    
      stroke(0, 100);
      point(p.x + 5, p.y);
    } else {
      stroke(0, 5);
      point(p.x + 5, p.y);
    }
    
   
    let n = noise(p.x * noiseScale, p.y * noiseScale);
    let a = (TAU * n);

    p.x -= sin(a);
    p.y += tan(PI - 1);


    if(!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }

  for(let i = 0; i < num; i ++) {
    let alpha = random(100)
    stroke(50,39,29, 100);
    strokeWeight(1);
    let p = particles[i];
    let xBorderR = random(430,470);
    let xBorderL = random(30,70);
    let yBorderT = random(430,470);
    let yBorderB = random(30,70);
    if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {
      stroke(0, 100);
      point(p.x, p.y);
    } else {
      stroke(0, 5);
      point(p.x, p.y);
    }
    
   
    let n = noise(p.x * noiseScale, p.y * noiseScale);
    let a = (TAU * n);

    p.x -= sin(a);
    p.y += tan(PI - 1);


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

  function genNoiseImg(){
    noiseImg = createGraphics(width, height);
    noiseImg.loadPixels();
    var widthd = width*pixelDensity();
    var heightd = height*pixelDensity();
    for(var i=0; i<widthd; i++){
      for(var j=0; j<heightd; j++){
        var x = i/pixelDensity();
        var y = j/pixelDensity();
        var bright = pow(noise(x/noiseScale, y/noiseScale)-0.3, 1/2.0)*400;
        noiseImg.pixels[(i+j*widthd)*4] = (159, 70, 25);
        noiseImg.pixels[(i+j*widthd)*4+1] = (159, 70, 25);
        noiseImg.pixels[(i+j*widthd)*4+2] = (159, 70, 25);
        noiseImg.pixels[(i+j*widthd)*4+3] = (159, 70, 25);
      }
    }
    noiseImg.updatePixels();
  }