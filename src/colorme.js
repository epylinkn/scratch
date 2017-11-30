import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import _ from 'lodash';

const sketch = (p5) => {
  window.p5 = p5;

  let points = [];
  var colors = [];
  var color_meta = [
    {
      name: "LightGoldenRodYellow",
      hex: "#FAFAD2",
      description: "A quirky color that is included in the limited set of HTML colors that are able to be referenced by name. " +
        "I include it here because it’s a color I pull up a lot for a light, non-white shade. " +
        "But in all honesty, I like this color because it has the longest name among all HTML color names.",
      text: "#000000"
    }, {
      name: "C0FFEE",
      hex: "#C0FFEE",
      description: "A cute color with a cute hex code for the one and only love of our lives: coffee.",
      text: "#000000"
    },
    {
      name: "C0FFEE-PINK",
      hex: "#FFCCC0",
      description: "C0FFEE’s complementary color according to the color wheel.",
      text: "#000000"
    },
    {
      name: "Machine-Learned Red",
      hex: "#D95E50",
      description: "An orangish-red, this color was machine-learned from the rest of the palette. A subtle reminder of our impending doom and soon-to-be overlords.",
      text: "#FFFFFF"
    },
    {
      name: "Eigengrau",
      hex: "#16161D",
      description: "A dark gray that literally translates to \"intrinsic gray\" or \"own gray\", " +
        "Eigengrau is the dark gray the human eye sees in absolute darkness. " +
        "\n\nEigengrau is a phenonomenon believed to be caused by intrinsic noise in our optic nerves. " +
        "As a result, it is often referred to as \"visual noise\".",
      text: "#FFFFFF"
    },
    {
      name: "Metallic Gold",
      hex: "#D4AF37",
      description: "A material / color / texture that just really brings me a lot of joy. Especially the way it breathes when it reflects light. Did I mention you can eat it? #ediblegoldleaf",
      text: "#000000"
    }
  ]

  var goldimg = require('./assets/gold-leaf.jpg');
  console.log(goldimg);
  var img;
  var active = null;
  var width;



  p5.setup = () => {
    width = p5.windowWidth / 6;

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
    colors.push(p5.color("#c0ffee")); // main brand
    colors.push(p5.color("#FFCCC0")); // light accent
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

    img = p5.loadImage(goldimg);


     _.times(5, function() {
      colors.push( p5.color(p5.random(255), p5.random(255), p5.random(255)) );
    });
  }

  p5.draw = () => {
    function display_meta() {
      p5.fill(color_meta[active]["text"]);
      p5.textFont("Roboto");
      p5.textSize(48);
      p5.textStyle("BOLD");
      p5.text(color_meta[active]["name"], 200, 200);

      p5.fill(color_meta[active]["text"]);
      p5.textFont("Roboto");
      p5.textSize(20);
      p5.textStyle("NORMAL");
      p5.text(color_meta[active]["description"], 200, 290, 450, p5.windowHeight);

      p5.fill(color_meta[active]["text"]);
      p5.textFont("Inconsolata");
      p5.textSize(32);
      p5.text(color_meta[active]["hex"], 200, 250);
    }

    p5.background(p5.color("white"), 85);

    p5.noStroke();

    if (active != null && active != 5) {
      p5.background(colors[active]);
      //console.log(color_meta[active]["name"]);
      display_meta();
    } else if (active == 5) {
      p5.image(img, 0, 0, p5.windowWidth, p5.windowHeight);
      display_meta();
    } else {
      for (var i = 0; i < 6; i++) {
        p5.fill(colors[i]);

        if (p5.mouseX > width * i && p5.mouseX < width * (i+1)) {
          p5.rect(width * i, 0, width, p5.windowHeight);
        } else {
          p5.rect(width * i, 0.1 * p5.windowHeight, width, 0.8 * p5.windowHeight);
        }
      }

      // gold!
      if (p5.mouseX > width * 5 && p5.mouseX < width * 6) {
        p5.image(img, p5.windowWidth - width, 0, width, p5.windowHeight, 0, 0, width, p5.windowHeight);
      } else {
        p5.image(img, p5.windowWidth - width, 0.1 * p5.windowHeight, width, 0.8 * p5.windowHeight, 0, 0.1 * p5.windowHeight, width, 0.8 * p5.windowHeight);
      }
    }

    // var noiseScale=0.02;
    // background(0);

    // for (var x=0; x < width; x++) {
    //   var noiseVal = noise((mouseX+x)*noiseScale, mouseY*noiseScale);
    //   stroke(noiseVal*255);
    //   line(x, mouseY+noiseVal*80, x, height);
    // }
  }

  p5.mouseClicked = () => {
    if (active == null) {
      active = _.floor(p5.mouseX / width);
    } else {
      active = null;
    }
  }

//  p5.keyPressed = () => {
//    active = null;
//  }
}

// MEDIUMAQUAMARINE
// MEDIUMSEAGREEN
// MEDIUMSPRINGGREEN
// MEDIUMSLATEBLUE
// LIGHTGOLDENRODYELLOW
// MEDIUMVIOLETRED

new p5(sketch);
