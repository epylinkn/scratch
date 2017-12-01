import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import _ from 'lodash';

const sketch = (p5) => {
  window.p5 = p5;

  // TODO can i get a sharper image?
  var randomImage = require('./assets/heart.svg');
  var img;
  var capture;
  var imageGrid = new Array(9);
  var imageWidth, imageHeight;
  var isCapturing = false;
  var position;

  var colors = [];

  p5.preload = () => {
    img = p5.loadImage(randomImage);
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    capture = p5.createCapture(p5.VIDEO);
    capture.size(p5.windowWidth, p5.windowHeight);
    capture.hide();

    imageWidth = p5.windowWidth / 3;
    imageHeight = p5.windowHeight / 3;

    _.times(9, function() {
      colors.push(p5.color(p5.random(255), p5.random(255), p5.random(255)));
    });
  }

  p5.draw = () => {
    if (isCapturing) {
      p5.background("black");
      p5.image(capture.get(), 0, 0, p5.width, p5.height);

      // better record screen...
      p5.fill(p5.color("#c0ffee"));
      p5.rect(0, 0, 100, 100);

      var row = Math.floor(position / 3);
      var col = position % 3;

      p5.image(
        img,
        0,
        0,
        p5.windowWidth,
        p5.windowHeight,
        col * img.width / 3,
        row * img.height / 3,
        img.width / 3,
        img.height / 3
      )

    } else {
      p5.background(p5.color("#c0ffee"), 45);

      for (var i = 0; i < imageGrid.length; i++) {
        var row = Math.floor(i / 3);
        var col = i % 3;

        if (imageGrid[i] === undefined) {
          p5.fill(colors[i]);
          p5.rect(
            col * imageWidth,
            row * imageHeight,
            imageWidth,
            imageHeight
          );
        } else {
          p5.image(
            imageGrid[i],
            col * imageWidth,
            row * imageHeight,
            imageWidth,
            imageHeight
          );
        }
      }
    }
  }

  p5.mouseClicked = () => {
  }

  p5.keyPressed = () => {

    // SPACEBAR
    if (p5.keyCode === 32) {
      if (isCapturing === true) {
        isCapturing = false;
        return;
      }

      position = Math.floor(Math.random() * 9);
      isCapturing = true;
      console.log('taking a photo');

      setTimeout(function() {
        imageGrid[position] = capture.get();
        isCapturing = false;
      }, 3000);
    }
  }
}

new p5(sketch);
