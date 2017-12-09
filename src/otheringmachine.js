import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
window.p5 = p5;
require("./assets/p5.serialport.js");
window.p5.SerialPort = p5.SerialPort;
import _ from 'lodash';

require('./assets/otheringmachine.scss');

const sketch = (p5) => {
  const DEBUG_FLAG = false;
  var serial;

  var randomImage = require('./assets/heart.svg');
  var step = 6;
  var clips;
  var clip1 = require('./assets/clip1.mp4');
  var clip2 = require('./assets/clip2.mp4');
  var clip3 = require('./assets/clip3.mp4');
  var clip4 = require('./assets/clip4.mp4');
  var clip5 = require('./assets/clip5.mp4');
  var clip6 = require('./assets/clip6.mp4'); // after effects grid gif
  var clip7 = require('./assets/clip7.mp4');
  var newStep = true;

  var videoIndex = 0;
  var groupSelection = 1;
  var labelSelection = 1;
  var narrativeSelection = 1;
  var width;
  var length;
  var grid;

  var bgTitle;
  var bgGray;
  var bgBlack;
  var bgGreen;

  var awaitingInteraction = false;

  // SPIKE
  var narrativeOptions;
  var fakeNews;
  var fakeNewsVideo;
  var fakeNewsVideos = {
    "vegans.illegal": require('./assets/vegans.illegal.mov')
  }

  p5.preload = () => {
    bgTitle = p5.loadImage(require('./assets/bg-title.jpg'));
    bgGray = p5.loadImage(require('./assets/bg-gray.jpg'));
    bgBlack = p5.loadImage(require('./assets/bg-black.jpg'));
    bgGreen = p5.loadImage(require('./assets/bg-green.jpg'));

    narrativeOptions = p5.loadJSON(require('./assets/narratives.json'));
    fakeNews = p5.loadJSON(require('./assets/fakenews.json'));
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    serial = new p5.SerialPort();
    serial.open("/dev/cu.usbmodem14411");
    //
    // serial.on("connected", function() {
    //   alert('serial connected');
    // });

    clips = [
      {
        video: p5.createVideo([clip1])
      },
      {
        video: p5.createVideo([clip2])
      },
      {
        video: p5.createVideo([clip3])
      },
      {
        video: p5.createVideo([clip4])
      },
      {
        video: p5.createVideo([clip5])
      },
      {
        video: p5.createVideo([clip6])
      },
      {
        video: p5.createVideo([clip7])
      },
    ];

    _.map(clips, (clip) => { clip.video.hide() });
  }

  p5.draw = () => {
    let color = p5.color("#c0ffee");
    function debug(text) {
      p5.fill(p5.color("magenta"));
      p5.textFont("Roboto");
      p5.textSize(20);
      p5.textAlign(p5.CENTER);
      p5.text(text, p5.windowWidth / 2, 100);
    }

    function displayBackground(img) {
      p5.image(img, 0, 0, p5.windowWidth, p5.windowHeight);
    }

    function displayTitle(text) {
      p5.fill(color);
      p5.textFont("Roboto");
      p5.textSize(40);
      p5.textStyle("BOLD");
      p5.textAlign(p5.CENTER);
      p5.text(text, p5.windowWidth / 2, p5.windowHeight / 2);
    }

    function displayVideo(videoIndex) {
      let verticalMargin = 80;
      let horizontalMargin = 120;
      p5.image(
        clips[videoIndex].video,
        horizontalMargin,
        verticalMargin,
        p5.windowWidth - 2 * horizontalMargin,
        p5.windowHeight - 2 * verticalMargin
      );
    }

    function displayFakeNews(key, small) {
      if (small) {
        let verticalMargin = 203;
        let horizontalMargin = 322;

        p5.image(
          fakeNewsVideo,
          horizontalMargin,
          verticalMargin,
          p5.windowWidth - 2 * horizontalMargin,
          p5.windowHeight - 2 * verticalMargin
        );

        // TODO headline
      } else {
        let verticalMargin = 75;
        let horizontalMargin = 100;

        p5.image(
          fakeNewsVideo,
          horizontalMargin,
          verticalMargin,
          p5.windowWidth - 2 * horizontalMargin,
          p5.windowHeight - 2 * verticalMargin
        );
      }
    }

    function displayOption(text, i, width, active) {
      if (active) {
        p5.fill(color);
        p5.rect(i * width, p5.windowHeight - 100, width, 100);
      } else {
        p5.fill("black");
        p5.rect(i * width, p5.windowHeight - 100, width, 100);
      }

      p5.fill("white");
      p5.textFont("Roboto");
      p5.textSize(32);
      p5.textStyle("BOLD");
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text(_.upperCase(text), i * width, p5.windowHeight - 100, width, 100);
    }

    switch(step) {
      case 0:
        if (newStep) {
          newStep = false;
          displayBackground(bgTitle);
        }

        // displayTitle("WELCOME");

        break;
      case 1:
        if (newStep) {
          newStep = false;

          videoIndex = 0;
          clips[videoIndex].video.play();
          displayBackground(bgGray);
        }

        displayVideo(videoIndex);

        break;
      case 2:
        if (newStep) {
          newStep = false;

          clips[videoIndex].video.pause()
        }

        displayBackground(bgBlack);
        displayTitle("SELECT A TARGET GROUP");

        let groupOptions = ['vegans', 'lefties', 'beliebers'];
        length = groupOptions.length;
        width = p5.windowWidth / length;
        for (var i = 0; i < length; i++) {
          displayOption(groupOptions[i], i, width, i === groupSelection)
        }

        break;
      case 3:
        if (newStep) {
          newStep = false;

          videoIndex = 1;
          clips[videoIndex].video.play();
          displayBackground(bgGray);
        }

        displayVideo(videoIndex);

        break;
      case 4:
        if (newStep) {
          newStep = false;
          clips[videoIndex].video.pause()
          displayBackground(bgBlack);
        }

        displayTitle("SELECT A LABEL");

        var labelOptions = ['radical', 'illegal', 'militant'];
        length = labelOptions.length;
        width = p5.windowWidth / length;
        for (var i = 0; i < length; i++) {
          displayOption(labelOptions[i], i, width, i === labelSelection);
        }

        break;
      case 5:
        if (newStep) {
          newStep = false;

          videoIndex = 2;
          clips[videoIndex].video.play();
          displayBackground(bgGray);
        }

        displayVideo(videoIndex);

        break;
      case 6:
        if (newStep) {
          newStep = false;
          clips[videoIndex].video.pause();
          displayBackground(bgBlack);
        }

        displayTitle("SELECT A NARRATIVE");

        groupSelection = "vegans";
        labelSelection = "illegal";

        var narratives = narrativeOptions[`${groupSelection}.${labelSelection}`];
        length = narratives.length;
        width = p5.windowWidth / length;
        for (var i = 0; i < length; i++) {
          if (i === narrativeSelection) {
            p5.fill(color);
          } else {
            p5.fill("black");
          }
          p5.rect(i * width, 0, width, p5.windowHeight);

          p5.fill("white");
          p5.textFont("Roboto");
          p5.textSize(24);
          p5.textStyle("BOLD");
          p5.textAlign(p5.CENTER, p5.CENTER);
          p5.text(narratives[i], i * width + 20, 0, width - 40, p5.windowHeight);
        }

        break;
      case 7:
        // you're a natural... here are some notable works
        if (newStep) {
          newStep = false;

          videoIndex = 3;
          clips[videoIndex].video.play();
          displayBackground(bgGray);
        }

        displayVideo(videoIndex);

        break;
      case 8:
        // grid
        if (newStep) {
          newStep = false;

          videoIndex = 4;
          clips[videoIndex-1].video.pause();
          clips[videoIndex].video.play();
          displayBackground(bgBlack);
        }

        displayVideo(videoIndex);

        break;
      case 9:
        // white man: and here is what you've done so far
        if (newStep) {
          newStep = false;

          videoIndex = 5;
          clips[videoIndex-1].video.pause();
          clips[videoIndex].video.play();
          displayBackground(bgGray);
        }

        displayVideo(videoIndex);

        break;
      case 10:
        // fake news
        if (newStep) {
          newStep = false;

          clips[videoIndex].video.pause();
          fakeNewsVideo = p5.createVideo([fakeNewsVideos[`${groupSelection}.${labelSelection}`]]);
          fakeNewsVideo.hide();
          fakeNewsVideo.play();

          displayBackground(bgBlack);
        }

        displayFakeNews(`${groupSelection}.${labelSelection}`);

        break;
      case 11:
        // picture in grid
        if (newStep) {
          newStep = false;

          videoIndex = 4;
          clips[videoIndex].video.play();
          displayBackground(bgGray);
        }

        displayVideo(videoIndex);
        displayFakeNews(`${groupSelection}.${labelSelection}`, true);

        break;
      case 12:
        // closing statement
        if (newStep) {
          newStep = false;

          videoIndex = 6;
          fakeNews[`${groupSelection}.${labelSelection}`].video.pause();
          clips[videoIndex].video.play();
          displayBackground(bgGray);
        }

        displayVideo(videoIndex);

        break;
    }

    if (DEBUG_FLAG) {
      debug("step: " + step + " group: " + groupSelection + " --- label: " + labelSelection);
    }
  }

  function groupMousePressed(event) {
    event.preventDefault();
    groupSelection = event.target.value;
  }

  function labelMousePressed(event) {
    event.preventDefault();
    labelSelection = event.target.value;
  }

  p5.mouseClicked = () => {
  }

  p5.keyPressed = () => {
    // SPACEBAR
    if (p5.keyCode === 32) {
      step++;
      newStep = true;
    }
  }

}

new p5(sketch);
