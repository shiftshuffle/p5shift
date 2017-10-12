// Daniel Shiffman
// http://codingtra.in
// Mathematical Roses
// Video: https://youtu.be/f5QBExMNB1I
// Based on: https://en.wikipedia.org/wiki/Rose_(mathematics)

var d = 29;
var n = 5;
var sliderD;
var sliderN;
var tree = [];

function setup() {
  createCanvas(1000, 800);
  sliderD = createSlider(1, 90, 10, .02);
  sliderN = createSlider(1, 20, 10, 1);
  sliderR = createSlider(1, 20, 10, 1);
  sliderP = createSlider(1, 500, 10, .02);
  sliderD.input(draw);
  sliderN.input(draw);
  sliderR.input(draw);
  sliderP.input(draw);
  sliderD.position(750, 50);
  sliderN.position(750, 20);
  sliderR.position(750, 80);
  sliderP.position(750, 110);

  // var a = createVector(0, height-height/2);
  // var b = createVector(0, height - 200 -height/2);
  // var root = new Branch(a, b);
  //
  // tree[0] = root;
}

function draw() {
  d = sliderD.value();
  n = sliderN.value();
  ru = sliderR.value();
  p = sliderP.value();
  var k = n / ru;
  background(51);




  fill(255);
    text("N ="+n, sliderN.x  + sliderN.width + 30, 30);
    text("D ="+d, sliderD.x  + sliderD.width + 30, 60);
    text("R ="+ru, sliderR.x  + sliderR.width + 30, 90);
    text("P ="+p, sliderP.x  + sliderP.width + 30, 120);


  push();
  translate(width / 2, height / 2);

  for (var i = 0; i < tree.length; i++) {

    tree[i].show();
    // tree[i].jitter();
  }



  beginShape();
  stroke(0,0,255);
  noFill();
  strokeWeight(1);
  for (var a = 0; a < TWO_PI * reduceDenominator(n, ru); a += 0.02) {
    var r = 400 * sin(k * a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
  noLoop();

  for (var a = 0; a < p; a += 1) {
    var r = 400 * sin( k * a * d );
    var x = r * cos(a*d);
    var y = r * sin(a*d);

    var r1 = 400 * sin(k * (a+1) * d);
    var x1 = r1 * cos((a+1)*d);
    var y1 = r1 * sin((a+1)*d);

    var a1=createVector(x,y);
    var b1=createVector(x1,y1);

    // var u = new Branch(a1, b1);
    // tree.push(u);
    stroke(0,255,160);
    fill(255);
    line(a1.x + width/2, a1.y + height/2, b1.x + width/2, b1.y + height/2);

  }
}



function reduceDenominator(numerator, denominator) {
    function rec(a, b) {
        return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
}


function keyPressed() {
  if (keyCode == 's') {
    // saveCanvas("maurer",'png');
    save("maurer###.png");

  } else if (keyCode == DOWN_ARROW) {
 // save("screen-####.jpg");
  }
  return false; // prevent default
}


function Branch(begin, end) {
  this.begin = begin;
  this.end = end;

  this.jitter = function() {
    this.end.x += random(-1, 1);
    this.end.y += random(-1, 1);
  }

  this.show = function() {
    stroke(255);
    fill(255);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }
}
