

let particles = [];
const num = 17000;
const noiseScale = 0.01 * (500/1500) ;



function setup() {
  createCanvas(1500, 1500);


  for(let i = 0; i < num; i ++) {
    particles.push(createVector(random(width), random(height)));
  }
  background(109,77,52, 10);

  a2LocationX = random(1000, 3000);
  a2LocationY = random(1000, 3000);



  
}


function draw() {
  for(let i = 0; i < num; i ++) {
    stroke(0, 100);
    strokeWeight(1);
    let p = particles[i];
    let xBorderR = random(width - (50*width/500), width - (30*width/500))
    let xBorderL = random((30*width/500),(50*width/500))
    let yBorderT = random(height - (50*height/500), height - (30*height/500))
    let yBorderB = random((30*height/500),(50*height/500))
    let n = noise(p.x * noiseScale, p.y * noiseScale);
    let a = (TAU * n);
    let a2 = atan2(a2LocationY/2-p.y, a2LocationX/2-p.x)

    if(closeAngle(a, a2)){
      if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {
        p.x += cos(a2-HALF_PI);
        p.y += sin(a2-HALF_PI);
      } 
      if (inRadius(a2LocationY, a2LocationX, p)) {
        if (p.x < xBorderR && p.x > xBorderL && p.y < yBorderT && p.y > yBorderB) {
          // stroke(0, 100);
          p.x += sin(a*2);
          p.y += tan(PI);
        } else {
          stroke(0, 5);
          p.x += sin(a*2);
          p.y += tan(PI);
        }
      } 
    } else {
      stroke(0, 5);
      p.x += sin(a*2);
      p.y += tan(a);
    }
  point(p.x, p.y);
    


    // if(!onScreen(p)) {
    //   p.x = random(width);
    //   p.y = random(height);
    // }
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

