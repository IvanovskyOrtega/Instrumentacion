var Sensores = ['Temperatura', 'Distancia', 'Potenciometrico', 'Proximidad'];
var Escalas = ['Celsius','Fahrenheit','Kelvin']

var serial; // variable to hold an instance of the serialport library
var portName = 'COM8'; // fill in your serial port name here
var value;
var scaledValue;
var options = {
  baudrate: 9600
};

// gui
var visible = true;
var gui, gui2;

function setup() {

  createCanvas(windowWidth, windowHeight);
  // Create Layout GUI
  gui = createGui('Sensores');
  sliderRange(0, 100, 1);
  gui.addGlobals('Sensores','Escalas');

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors

  serial.open(portName, options); // open a serial port
  serial.clear();

}


function draw() {

  // clear all
  clear();

	var x = width / 2;
	var y = 3 * height / 4;
	var d = 100.0;

  // pick a shape
	if(Sensores == 'Temperatura') {
	    drawTermometer(x,y,d);

	}

}

function drawTermometer(x,y,d){
  if(value === undefined)
    return null;
  push();
  stroke([255, 26, 26]);
  fill([255, 26, 26]);
  arc(x, y+45, d, d,-57*PI/180,-123*PI/180,CHORD);
  noStroke();
  fill(0);
  textSize(32);
  fill(255);
  textAlign(CENTER);
  fill(255);
  text(value+"°", x, y + 50);
  fill([33, 129, 247]);
  text("La temperatura es: \n"+scaledValue, x+200, windowHeight/2);
  pop();
  push();
  noFill();
  stroke(50);
  strokeWeight(4);
  arc(x, y+45, d+10, d+10,-56*PI/180,-123*PI/180);
  line(x-30,y-(d-5)/2+45,x-30,y-505);
  line(x+31,y-(d-5)/2+45,x+31,y-505);
  line(x-30,y-505,x+31,y-505);
  pop();
  rectMode(CORNERS);
  stroke([255, 26, 26]);
  strokeWeight(3);
  fill([255, 26, 26]);
  rect(x-25, y,x+25, y-value*10);
  push();
  noStroke();
  fill(0);
  pop();
  push();
  stroke(50);
  strokeWeight(3);
  line(x+30,y-10,x+20,y-10);
  line(x+30,y-20,x+20,y-20);
  line(x+30,y-30,x+20,y-30);
  line(x+30,y-40,x+20,y-40);
  line(x+30,y-50,x+10,y-50);
  line(x+30,y-60,x+20,y-60);
  line(x+30,y-70,x+20,y-70);
  line(x+30,y-80,x+20,y-80);
  line(x+30,y-90,x+20,y-90);
  line(x+30,y-100,x,y-100);
  line(x+30,y-110,x+20,y-110);
  line(x+30,y-120,x+20,y-120);
  line(x+30,y-130,x+20,y-130);
  line(x+30,y-140,x+20,y-140);
  line(x+30,y-150,x+10,y-150);
  line(x+30,y-160,x+20,y-160);
  line(x+30,y-170,x+20,y-170);
  line(x+30,y-180,x+20,y-180);
  line(x+30,y-190,x+20,y-190);
  line(x+30,y-200,x,y-200);
  line(x+30,y-210,x+20,y-210);
  line(x+30,y-220,x+20,y-220);
  line(x+30,y-230,x+20,y-230);
  line(x+30,y-240,x+20,y-240);
  line(x+30,y-250,x+10,y-250);
  line(x+30,y-260,x+20,y-260);
  line(x+30,y-270,x+20,y-270);
  line(x+30,y-280,x+20,y-280);
  line(x+30,y-290,x+20,y-290);
  line(x+30,y-300,x,y-300);
  line(x+30,y-310,x+20,y-310);
  line(x+30,y-320,x+20,y-320);
  line(x+30,y-330,x+20,y-330);
  line(x+30,y-340,x+20,y-340);
  line(x+30,y-350,x+10,y-350);
  line(x+30,y-360,x+20,y-360);
  line(x+30,y-370,x+20,y-370);
  line(x+30,y-380,x+20,y-380);
  line(x+30,y-390,x+20,y-390);
  line(x+30,y-400,x,y-400);
  line(x+30,y-410,x+20,y-410);
  line(x+30,y-420,x+20,y-420);
  line(x+30,y-430,x+20,y-430);
  line(x+30,y-440,x+20,y-440);
  line(x+30,y-450,x+10,y-450);
  line(x+30,y-460,x+20,y-460);
  line(x+30,y-470,x+20,y-470);
  line(x+30,y-480,x+20,y-480);
  line(x+30,y-490,x+20,y-490);
  line(x+30,y-500,x,y-500);
  pop();
}


// check for keyboard events
function keyPressed() {
  switch(key) {
    // type [F1] to hide / show the GUI
    case 'p':
      visible = !visible;
      if(visible) gui.show(); else gui.hide();
      break;
  }
}


// draw a regular n-gon with n sides
function ngon(n, x, y, d) {
  beginShape();
  for(var i = 0; i < n; i++) {
    var angle = TWO_PI / n * i;
    var px = x + sin(angle) * d / 2;
    var py = y - cos(angle) * d / 2;
    vertex(px, py);
  }
  endShape(CLOSE);
}


// draw a regular n-pointed star
function star(n, x, y, d1, d2) {
  beginShape();
  for(var i = 0; i < 2 * n; i++) {
    var d = (i % 2 === 1) ? d1 : d2;
    var angle = PI / n * i;
    var px = x + sin(angle) * d / 2;
    var py = y - cos(angle) * d / 2;
    vertex(px, py);
  }
  endShape(CLOSE);
}

function serialEvent() {
  // read a byte from the serial port:
  var inByte = serial.read();
  if(Sensores == 'Temperatura')
    value = termometerValue(inByte);
  //console.log(inByte);
}

function termometerValue(val){
  var termometerValue = 0;
  for(var i = 7; i >=0 ; i--){
    if((val >> i) & 1 )
      termometerValue += Math.pow(2,i);
  }
  termometerValue *= 0.19;
  switch (Escalas) {
    case 'Celsius':
      scaledValue = termometerValue;
      scaledValue = scaledValue.toFixed(2);
      scaledValue = scaledValue+" ° Celsius";
      break;
    case 'Kelvin':
      scaledValue = termometerValue+273.15;
      scaledValue = scaledValue.toFixed(2);
      scaledValue = scaledValue+" Kelvin";
      break;
    case 'Fahrenheit':
      scaledValue = (termometerValue*1.8)+32;
      scaledValue = scaledValue.toFixed(2);
      scaledValue = scaledValue+" ° Fahrenheit";
      break;
  }
  return termometerValue.toFixed(2);
}

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}