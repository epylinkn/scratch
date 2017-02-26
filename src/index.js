import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import _ from 'lodash';

var img = require('./assets/rex.jpeg');

const sketch = (p5) => {
  window.p5 = p5;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    img = p5.loadImage(img);
  }

  var x = p5.windowWidth;
  var y = p5.windowHeight;
  var r = 0;

  p5.draw = () => {
    p5.background(p5.color("LightGoldenRodYellow"), 85);

    p5.noStroke();
    p5.fill(p5.color("white"));
    p5.ellipse(x / 2, y / 2, 250 + r % p5.min([p5.windowWidth, p5.windowHeight]));

    p5.stroke(p5.color("LightGoldenRodYellow"));
    p5.strokeWeight(150);
    p5.noFill();
    p5.image(img, p5.windowWidth/2 - img.width/2, p5.windowHeight/2 - img.height/2);

    p5.ellipse(x / 2, y / 2, 500);

    r += 2;
  }
}

new p5(sketch);
