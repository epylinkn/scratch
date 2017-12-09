import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import _ from 'lodash';

require('./assets/otheringmachine.scss');


const sketch = (p5) => {
  window.p5 = p5;

  var randomImage = require('./assets/heart.svg');
  // var img;
  var step = 0;
  var clips;
  var bicep = require('./assets/bicep.mp4');
  var gosh = require('./assets/gosh.mp4');
  var clip1 = require('./assets/clip1.mp4');
  var playing = false;
  var videoIndex = 0;
  var groupButtons;
  var groupSelection;
  var labelButtons;
  var labelSelection;

  // SPIKE
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
        end: 0,
        video: p5.createVideo([clip1])
      },
      {
        start: 0,
        end: 10,
        video: p5.createVideo([bicep]),
      },
      {
        start: 15,
        end: 25,
        video: p5.createVideo([gosh])
      },
    ]
    _.map(clips, (clip) => { clip.video.hide() });
    clips[0].video.time(10);
    clips[2].video.time(15);
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
          playing = false;

          clips[videoIndex].video.pause()

          let groupOptions = ['vegan', 'leftists', 'beliebers', 'elders'];
          groupButtons = _.map(groupOptions, function(option, i) {
            let width = p5.windowWidth / groupOptions.length;
            let button = p5.createButton(option, option);
            button.class("group-option");
            button.position(i * width, 0, width, 100);
            button.mousePressed(groupMousePressed);

            return button;
          });
        }

        p5.background("black");
        displayTitle("SELECT A TARGET GROUP");

        break;
      case 3:
        videoIndex = 1;
        if (!playing) {
          // remove all the buttons...
          _.map(groupButtons, function(button) { button.remove(); });
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

        var labelOptions = ['illegal', 'radical', 'militant', 'criminal'];
        labelButtons = _.map(labelOptions, function(option, i) {
          let width = p5.windowWidth / labelOptions.length;
          let button = p5.createButton(option, option);
          button.class("label-option");
          button.position(i * width, 0, width, 100);
          button.mousePressed(labelMousePressed);

          return button;
        });

        break;
      case 5:
        videoIndex = 2;
        if (!playing) {
          // remove all the buttons...
          _.map(labelButtons, function(button) { button.remove(); });
          clips[videoIndex].video.play();
          playing = !playing;
        }

        p5.background("black");
        p5.image(clips[videoIndex].video, 0, 0, p5.windowWidth, p5.windowHeight);

        break;
      case 6:
        if (playing) {
          clips[videoIndex].video.pause();
          playing = !playing;
        }

        p5.background("black");
        displayTitle("SELECT A NARRATIVE");

        // var narrativeOptions = ['one', 'two', 'three'];
        // buttons = _.map(labelOptions, function(option, i) {
        //   let width = p5.windowWidth / labelOptions.length;
        //   let button = p5.createButton(option, option);
        //   button.class("narrative-option");
        //   button.position(i * width, 0, width, 100);
        //
        //   return button;
        // });

        break;

      case 7:
        // videoIndex = 2;
        // if (!playing) {
        //   // remove all the buttons...
        //   _.map(buttons, function(button) { button.remove(); });
        //   clips[videoIndex].video.play()
        //   playing = true;
        // }
        //
        // p5.background("black");
        // p5.image(clips[videoIndex].video, 0, 0, p5.windowWidth, p5.windowHeight);

        break;

    }


    debug("group: " + groupSelection + " --- label: " + labelSelection);
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
    }
  }

}

new p5(sketch);
