import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
// import 'p5/lib/addons/p5.sound';
import _ from 'lodash';

class TetheredFigure {
  constructor(x, y, r, color, noise) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.noise = noise || 300;
    this.t = Math.random();
  }

  render() {
    let p5 = window.p5;
    let color = p5.color(this.color)
    p5.noStroke();
    p5.fill(color);

    let noiseX = this.noise * (p5.noise(this.t) - 0.5);
    let noiseY = this.noise * (p5.noise(this.t+1) - 0.5);
    p5.ellipse(this.x / 2 + noiseX, this.y / 2 + noiseY, this.r);
    this.t = this.t + 0.01;
  }
}

const sketch = (p5) => {
  window.p5 = p5;

  var x1 = p5.windowWidth;
  var y1 = p5.windowWidth;
  var x2 = p5.windowWidth;
  var y2 = p5.windowHeight;
  var t = 0.01;
  var inside;
  var r = 0;

  var w = p5.windowWidth;
  var h = p5.windowHeight;
  var baseCircle = new TetheredFigure(w, h, 500, "cyan");
  var midCircle = new TetheredFigure(w, h, 300, "magenta", 500);
  var topCircle = new TetheredFigure(w, h, 150, "yellow", 1000);
  var song;

  p5.preload = () => {
    // song = p5.loadSound("./digital-arpeggios.wav");
    // var foo = new p5.Amplitude();
  }

  p5.setup = () => {
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    // canvas.mouseClicked(togglePlay);
    // song.setVolume(0.5);
    // fft = new p5.FFT();
  }

  p5.draw = () => {
    p5.background(p5.color("black"), 85);

    baseCircle.render();
    midCircle.render();
    topCircle.render();

    // x1 = p5.windowWidth + 200 * p5.noise(t + 1);
    // y1 = p5.windowWidth + 200 * p5.noise(t + 2);

    // // Do noise for 2, but make sure it stays within 1!
    // while (!inside) {
    //
    //   x2 = p5.windowWidth + 500 * p5.noise(t + 3);
    //   y2 = p5.windowWidth + 500 * p5.noise(t + 4);
    //
    //   // if (x2, y2 inside y1, y2)
    //   inside = true;
    // }

    // p5.noStroke();
    // p5.fill(p5.color("magenta"));
    // p5.ellipse(x1 / 2, y1 / 2, 500);
    //
    // p5.fill(p5.color("cyan"));
    // p5.ellipse(x2 / 2, y2 / 2, 300);

    // t = t + 0.01;
  }
}

new p5(sketch);
