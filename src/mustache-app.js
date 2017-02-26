import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import _ from 'lodash';

var img = require('./assets/rex.jpeg');

const sketch = (p5) => {
  var wormies = [];
  var center;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.frameRate(5);

    img = p5.loadImage(img);

    center = { xpos: p5.windowWidth / 2, ypos: p5.windowHeight / 2 }

    _.times(300, (index) => {
      wormies.push({
        xpos: p5.random(center.xpos - 150, center.xpos + 150),
        ypos: center.ypos + p5.random(-5, 5)
      });
    });
  }

  p5.draw = () => {
    p5.background(p5.color("LightGoldenRodYellow"), 85);
    p5.noFill();

    p5.image(img, 0, 0);

    _.each(wormies, (worm) => {
      p5.bezier(
        worm.xpos - p5.random(10), worm.ypos + p5.abs(worm.xpos - center.xpos) / 4,
        worm.xpos, worm.ypos + p5.abs(worm.xpos - center.xpos) / 4,
        worm.xpos + (worm.xpos - center.xpos) / 6, worm.ypos + 100 + p5.random(-100, 0),
        worm.xpos + (worm.xpos - center.xpos) / 2, worm.ypos + 100 + p5.random(-10, 10)
      );
    });
  }
}

class Mustache {
  // construct the base hairs -- maybe accepting range for follicles?
  constructor() {}

  // move all the hairs by one "tick"
  tick() {}

  // returns an array of arrays specifying bezier curve points, e.g.
  // [ [<bezier curve 1>], ..., [<bezier curve N>] ]
  getHairs() {}
}

new p5(sketch);
