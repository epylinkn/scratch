import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import _ from 'lodash';


const sketch = (p5) => {
  window.p5 = p5;

  var randomImage = require('./assets/heart.svg');
  // var img;
  var step = 0;
  var clips;
  var bicep = require('./assets/bicep.mp4');
  var gosh = require('./assets/gosh.mp4');
  var playing = false;
  var videoIndex = 0;

  // SPIKE
  var groupOptions = ['vegan', 'left-handed people', 'beliebers'];
  var labelOptions = ['illegal', 'radical', 'criminal'];
  var narrativeOptions = {
    'vegan.illegal': [
      'narrative 1',
      'narrative 2',
      'narrative 3',
    ],
    'vegan.radical': [
      'narrative 1',
      'narrative 2',
      'narrative 3',
    ],
  }

  p5.preload = () => {
    // img = p5.loadImage(randomImage);
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    clips = [
      {
        start: 0,
        end: 10,
        video: p5.createVideo([bicep]),
      },
      {
        start: 15,
        end: 25,
        video: p5.createVideo([gosh])
      }
    ]
    _.map(clips, (clip) => { clip.video.hide() });
    clips[1].video.time(15);
  }

  p5.draw = () => {
    let color = p5.color("#c0ffee");
    function debug(text) {
      p5.fill(p5.color("magenta"));
      p5.textFont("Roboto");
      p5.textSize(20);
      p5.textAlign(p5.CENTER);
      p5.text(text, p5.windowWidth / 2, p5.windowHeight - 100);
    }

    function displayTitle(text) {
      p5.fill(color);
      p5.textFont("Roboto");
      p5.textSize(100);
      p5.textStyle("BOLD");
      p5.textAlign(p5.CENTER);
      p5.text(text, p5.windowWidth / 2, p5.windowHeight / 2);
    }

    function dispalyOptions(options) {
      p5.fill(color);
      p5.textFont("Roboto");
      p5.textSize(100);
      p5.textStyle("BOLD");
      p5.textAlign(p5.CENTER);
      p5.text(text, p5.windowWidth / 2, p5.windowHeight / 2);

    }

    switch(step) {
      case 0:
        p5.background("black");
        displayTitle("WELCOME");
        break;
      case 1:
        videoIndex = 0;
        if (!playing) {
          clips[videoIndex].video.play();
          playing = true;
        }

        p5.background("black");
        p5.image(clips[videoIndex].video, 0, 0, p5.windowWidth, p5.windowHeight);
        break;
      case 2:
        if (playing) {
          clips[videoIndex].video.pause()
          playing = false;
        }

        p5.background("black");
        displayTitle("SELECT A TARGET GROUP");
        break;
      case 3:
        videoIndex = 1;
        if (!playing) {
          clips[videoIndex].video.play()
          playing = true;
        }

        p5.background("black");
        p5.image(clips[videoIndex].video, 0, 0, p5.windowWidth, p5.windowHeight);
        break;
      case 4:
        if (playing) {
          clips[videoIndex].video.pause()
          playing = false;
        }

        p5.background("black");
        displayTitle("SELECT A LABEL");
        break;
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
