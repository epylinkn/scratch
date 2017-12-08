import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import _ from 'lodash';

const sketch = (p5) => {
  window.p5 = p5;

  var randomImage = require('./assets/heart.svg');
  // var img;
  var step = 0;

  var colors = [];

  p5.preload = () => {
    img = p5.loadImage(randomImage);
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  }

  p5.draw = () => {
    let color = p5.color("#c0ffee");

    function displayTitle(text) {
      p5.fill(color);
      p5.textFont("Roboto");
      p5.textSize(100);
      p5.textStyle("BOLD");
      p5.textAlign(p5.CENTER);
      p5.text("WELCOME", p5.windowWidth / 2, p5.windowHeight / 2);
    }

    if (step === 0) {
      p5.background("black");
      displayTitle("WELCOME");
    } else if (step === 1) {
      p5.background("black");


    }
  }

  p5.mouseClicked = () => {
  }

  p5.keyPressed = () => {
    // SPACEBAR
    if (p5.keyCode === 32) {
      step++;
    }
  }
}

new p5(sketch);
