import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import 'p5.serialserver/lib/p5.serialport';
import _ from 'lodash';

const sketch = (p5) => {
  window.p5 = p5;

  let points = [];
  var colors = [];
  var serial;

  p5.setup = () => {
    // serial = new p5.SerialPort();
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    // function getRandomPoint() {
    //   return {
    //     x: random(p5.windowWidth),
    //     y: random(p5.windowHeight)
    //   }
    // }

    // colors.push(p5.color("lightgoldenrodyellow")); // an html fave
    // colors.push(p5.color("#EEC0FF"));
    // colors.push(p5.color("#c0ffee"));
    // colors.push(p5.color("#C26167"));
    // colors.push(p5.color("#16161D")); // 16161D - EIGENGRAU
    // colors.push(p5.color("#D4AF37")); // metallic gold

    colors.push(p5.color("#FAFAD2")); // lightgoldenrodyellow
    colors.push(p5.color("#FFC0D0")); // light accent
    colors.push(p5.color("#c0ffee")); // main brand
    colors.push(p5.color("#D95E50")); // dark accent
    colors.push(p5.color("#16161D")); // dark shades
    colors.push(p5.color("#D4AF37")); // metallic gold

    // colors.push(p5.color("#A89447")); // gold leaf

    // colors.push(p5.color('cyan'));
    // colors.push(p5.color("#09ffc3")); // slurp

    // colors.push(p5.color("magenta"));
    // colors.push(p5.color("#ff05f3")); // orchidia

    // colors.push(p5.color("yellow"));
    // colors.push(p5.color("#fff14c")); // pina juice

    // colors.push(p5.color("#FA5C1A"));



     _.times(5, function() {
      colors.push( p5.color(p5.random(255), p5.random(255), p5.random(255)) );
    });
  }

  p5.draw = () => {
    p5.background(p5.color("yellow"), 85);

    var width = p5.windowWidth / 6;

    p5.noStroke();

    for (var i = 0; i < 6; i++) {
      p5.fill(colors[i]);
      p5.rect(width * i, 0, width, p5.windowHeight);
    }
  }
}

// MEDIUMAQUAMARINE
// MEDIUMSEAGREEN
// MEDIUMSPRINGGREEN
// MEDIUMSLATEBLUE
// LIGHTGOLDENRODYELLOW
// MEDIUMVIOLETRED

new p5(sketch);
