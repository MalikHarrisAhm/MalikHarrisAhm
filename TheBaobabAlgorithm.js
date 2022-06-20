// TheBaobab Algorithm, by Malik Harris Ahmed ©

function setup() {
  valaueue = 0;
  reset = false;
  density = 0.2;
  frameRate(60);
  resetSketch();
}
function touched() {
  valaueue = 0;
  loop();
  reset = true;
  noiseSeedNumber = random(100);
  noiseSeed(noiseSeedNumber);
  resetSketch();
}
function resetSketch() {
  loop();
  if (reset) {
    let compNum = random(3)
    if(compNum <= 1) {
      noiseDetail(4, 0.5); 
      composition = "POWER";
    } else if (compNum <= 2 && compNum > 1) {
      noiseDetail(4, 0.5); 
      composition = "DECAY";
    } else if (compNum <= 3 && compNum > 2) {
      noiseDetail(1, 0.5); //NEEDS TO BE (1,0) OR (0,0) FOR "DISCOVERY"
      composition = "DISCOVERY";
    }
  } else {
    composition = "POWER";
  }
  if (width <= height) {
    if (windowWidth <= windowHeight) { //IF THIS WINDOW WIDTH OCCURS REARRANGE THE CSS GRID
      ww = windowWidth;
    } else if (windowWidth <= height/5*6) { //IF THIS WINDOW WIDTH OCCURS REARRANGE THE CSS GRID
      ww = windowWidth*0.9;
    } else {
      ww = windowHeight;
    }
  }
  num = 10000;
  // numSTREAK = 1000;
  pixelDensity(4);
  particles = [];
  // particleSTREAK = [];
  var mycanvas = createCanvas(ww, ww);
  mycanvas.parent('canvas');
  mycanvas.mouseClicked(touched);
  backgroundColor();
  if (composition == "POWER") {
    noiseScale = 0.01 * (500/(ww));
    a2LocationX = ww;
    a2LocationY = ww;
    // xSTREAK = ww/2;
    // ySTREAK = ww/2;
  } else if (composition == "DECAY") {
    noiseScale = 0.01 * (500/(ww));
    a2LocationX = random(ww/3, ww*2);
    a2LocationY = random(ww/3, ww*2);
    // xSTREAK = a2LocationX/2;
    // ySTREAK = a2LocationY/2;
  } else if (composition == "DISCOVERY") {
    noiseScale = 100 * (500/(height));
    a2LocationX = random(ww);
    a2LocationY = random(ww);
    // xSTREAK = a2LocationX/2;
    // ySTREAK = a2LocationY/2;
  }
  xBorderR = random(width - (50*width/500), width - (30*width/500))
  xBorderL = random((30*width/500),(50*width/500))
  yBorderT = random(height - (50*height/500), height - (30*height/500))
  yBorderB = random((30*height/500),(50*height/500))
  for(let i = 0; i < num; i ++) {
      append(particles, createVector(random(width), random(height)));
  }
  // for(let i = 0; i < numSTREAK; i ++) {
  //   append(particleSTREAK, createVector(xSTREAK, ySTREAK));
  // }
}
function drawOutput(num, particles, colorCode) {
  for(let i = 0; i < num; i ++) {
    valaueue++
    colorGenerator(colorCode, 100);
    fill(0, 100);
    p = particles[i];
    n = noise(p.x * noiseScale, p.y * noiseScale);
    if (composition == "DISCOVERY") {
      a = (TAU *  TAU*  TAU*  TAU*  TAU*  TAU);
      a2 = atan2(a2LocationY/2-p.y, a2LocationX/2-p.x);
    } else {
      a = (TAU * n);
      a2 = atan2(a2LocationY/2-p.y, a2LocationX/2-p.x);
    }
    if(ang(a, a2, composition)){
      if (composition != "DISCOVERY") {
        if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {
          p.x += cos(a2-HALF_PI);
          p.y += sin(a2-HALF_PI);
        }
      }
      if (composition == "DECAY") {
        if (inRadius(a2LocationY, a2LocationX, p, composition)) {
          if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {
            p.x += sin(a*2);
            p.y += tan(PI);
          } else {
            colorGenerator(colorCode, 5);
            fill(0, 5);
            p.x += sin(a*2);
            p.y += tan(PI);
          }
        } 
      } else if (composition == "DISCOVERY") {
        if (inRadius(a2LocationY, a2LocationX, p, composition)) {
          if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {
            p.add(f(cos(a2-HALF_PI), sin(a2-HALF_PI)));
            p.x += cos(a2-HALF_PI);
            p.y += sin(a2-HALF_PI);
          } 
        } else {
          p.add(f(p.x/noiseScale, p.y/noiseScale));
          p.x += cos(a2-HALF_PI);
          p.y += sin(a2-HALF_PI);
          point(p.x, p.y);
        }
      }
    } else if (composition == "POWER") {
        if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {
          p.x += cos(a);
          p.y += sin(a);
        } else {
          colorGenerator(colorCode, 100);
          fill(0, 100);
          p.x += cos(a);
          p.y += sin(a);
        }
    } else if (composition == "DECAY") {
      colorGenerator(colorCode, 5);
      fill(0, 5);
        p.x += sin(a*2);
        p.y += tan(a);
    }
    // ellipse(p.x, p.y, 1, 1); //change from grainy to smooth texture, must disable "point(p.x, p.y)"
    point(p.x, p.y);
  }
}


function f(x, y){
  var interv = 0.001;
  var noiseX1 = noise(x + interv + 10000, y);
  var noiseX2 = noise(x - interv + 10000, y);
  var noiseY1 = noise(x, y + interv);
  var noiseY2 = noise(x, y - interv);
  var gx = ((noiseX1-noiseX2)/interv)/2; // *2 for different tree bark pattern
  var gy = ((noiseY1-noiseY2)/interv)/2; // *2 for different tree bark pattern
  return new createVector(gy, -gx);
}


function draw() {
    // colorSTREAK = [240, 140, 140];
    drawOutput(num, particles, [0,0,0]);
    if (valaueue >= 5000000) {
      noLoop();
    } 
}

function keyPressed() {
  if ((keyIsPressed == true) && ((key == 'D') || (key == 'd'))) {
    valaueue = 0;
    loop();
    reset = true;
    noiseSeedNumber = random(100);
    noiseSeed(noiseSeedNumber);
    resetSketch();
  } 
}



function ang(a, a2, composition) {
  if (composition == "POWER") {
    return ((sin(a) - sin(a2-HALF_PI)  <= PI/8) && (cos(a) - cos(a2-HALF_PI) <= PI/8) );
  } else if (composition == "DECAY") {
    return ((sin(a) - sin(a2-HALF_PI)  <= PI/4) && (cos(a) - cos(a2-HALF_PI) <= PI/4)  );
  } else if (composition == "DISCOVERY") {
    return ((sin(a) - sin(a2-HALF_PI)  <= PI/2) && (cos(a) - cos(a2-HALF_PI) <= PI/2)  );
  }
}

function inRadius(locationY, locationX, v, composition) {
  if (composition == "POWER") {
    return (locationY - v.y)*(locationY - v.y) + (locationX - v.x)*(locationX - v.x) <= 0000;
  } else if (composition == "DECAY") {
    return (locationY/2 - v.y)*(locationY/2 - v.y) + (locationX/2 - v.x)*(locationX/2 - v.x) <= 10000*(height/1500);
  } else if (composition == "DISCOVERY") {
    return (locationY - v.y)*(locationY - v.y) + (locationX - v.x)*(locationX - v.x) <= 80000*(height/500);
  }
}


function colorGenerator(colorCode, alpha) {
  return stroke(colorCode[0], colorCode[1], colorCode[2], alpha);
}

function backgroundColor() {
  return background(255, 255, 255, 100);
}








