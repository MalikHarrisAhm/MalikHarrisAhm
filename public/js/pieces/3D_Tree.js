//TODO: with simple circle blur straight forward.

var particles = [];
var n = 1000;//number of particle
var noiseScale = 100;//noise scale;

function setup() {
  
  createCanvas(500, 500);
  background(62, 28, 3, 20);
  noiseDetail(0, 1);
  console.log(pixelDensity());
  //generate noise image
  genNoiseImg();
  image(noiseImg, 0, 0);
  
  //initialize particle
  for(var i=0; i<n; i++){
    var particle = new Object();
    
    particle.pos = createVector(random(width), random(height));
    particles.push(particle);//add particle to particle list
  }
}


//get gradient vector
function curl(x, y){
  var EPSILON = 0.01;//sampling interval
  //Find rate of change in X direction
  var n1 = noise(x + EPSILON + 10000, y);
  var n2 = noise(x - EPSILON + 10000, y);
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
  tint(255, 0);
  image(noiseImg, 0, 0);//fill with transparent noise image
  // fill(0, 4);
  // rect(0, 0, width, height);
  
  for(var i=0; i<particles.length; i++){
    strokeWeight(2);//particle size


    var p = particles[i];//pick a particle
    p.pos.add(curl(p.pos.x/noiseScale, p.pos.y/noiseScale));
    let xBorderR = random(450,470)
    let xBorderL = random(30,50)
    let yBorderT = random(450,470)
    let yBorderB = random(30,50)
    if (p.pos.x  < xBorderR && p.pos.x  > xBorderL && p.pos.y < yBorderT && p.pos.y > yBorderB) {

      // stroke(215, 129, 45);
      stroke(0);
      point(p.pos.x - 5 , p.pos.y);
    } else {
      stroke(0, 5);
      point(p.pos.x - 5 , p.pos.y);
    }
  }
  for(var i=0; i<particles.length; i++){
    strokeWeight(4);//particle size

  
    var p = particles[i];//pick a particle
    p.pos.add(curl(p.pos.x/noiseScale, p.pos.y/noiseScale));
    let xBorderR = random(450,470)
    let xBorderL = random(30,50)
    let yBorderT = random(450,470)
    let yBorderB = random(30,50)
    if (p.pos.x  < xBorderR && p.pos.x  > xBorderL && p.pos.y < yBorderT && p.pos.y > yBorderB) {

      stroke(0, 40);
      // stroke(0);
      point(p.pos.x + 7, p.pos.y);
    } else {
      stroke(0, 5);
      point(p.pos.x + 7, p.pos.y);
    }
   
  }
  for(var i=0; i<particles.length; i++){
    strokeWeight(1);//particle size


    var p = particles[i];//pick a particle
    p.pos.add(curl(p.pos.x/noiseScale, p.pos.y/noiseScale));
    let xBorderR = random(450,470)
        let xBorderL = random(30,50)
        let yBorderT = random(450,470)
        let yBorderB = random(30,50)
    if (p.pos.x < xBorderR && p.pos.x > xBorderL && p.pos.y  < yBorderT && p.pos.y  > yBorderB) {
 
      // stroke(159, 70, 25);
      stroke(0);
      point(p.pos.x, p.pos.y - 5);
    } else {
      stroke(0, 5);
      point(p.pos.x, p.pos.y - 5);
    }
  }
  for(var i=0; i<particles.length; i++){
    strokeWeight(4);//particle size


    var p = particles[i];//pick a particle
    p.pos.add(curl(p.pos.x/noiseScale, p.pos.y/noiseScale));
    let xBorderR = random(450,470)
        let xBorderL = random(30,50)
        let yBorderT = random(450,470)
        let yBorderB = random(30,50)
    if (p.pos.x < xBorderR && p.pos.x > xBorderL && p.pos.y < yBorderT && p.pos.y > yBorderB) {
  
      stroke(255, 40);
      point(p.pos.x - 7, p.pos.y);
    } else {
      stroke(255, 5);
      point(p.pos.x - 7, p.pos.y);
    }
  }

  for(var i=0; i<particles.length; i++){
    strokeWeight(2);//particle size


    var p = particles[i];//pick a particle
    p.pos.add(curl(p.pos.x/noiseScale, p.pos.y/noiseScale));
    let xBorderR = random(450,470)
        let xBorderL = random(30,50)
        let yBorderT = random(450,470)
        let yBorderB = random(30,50)
    if (p.pos.x < xBorderR && p.pos.x > xBorderL && p.pos.y < yBorderT && p.pos.y > yBorderB) {

      // stroke(249, 170, 51);
      stroke(0);
      point(p.pos.x - 7, p.pos.y);
    } else {
      stroke(0, 5);
      point(p.pos.x - 7, p.pos.y);
    }
  }

}

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
      noiseImg.pixels[(i+j*widthd)*4] = (159, 70, 25, 0);
      noiseImg.pixels[(i+j*widthd)*4+1] = (159, 70, 25, 0);
      noiseImg.pixels[(i+j*widthd)*4+2] = (159, 70, 25, 0);
      noiseImg.pixels[(i+j*widthd)*4+3] = (159, 70, 25, 0);
    }
  }
  noiseImg.updatePixels();
}

function inRadius(locationY, locationX, v) {
  return (locationY/2 - v.y)*(locationY/2 - v.y) + (locationX/2 - v.x)*(locationX/2 - v.x) <= 10000;
}