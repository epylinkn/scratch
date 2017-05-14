import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import _ from 'lodash';

var img = require('./assets/rex.jpeg');

class Matrix {
  constructor() {
    this.matrix = [];
    _.times(24, () => this.matrix.push(new Array(12)));
  }

  getCol(col) {
    return _.map(this.matrix, (row) => { row[col] });
  }

  getRow(row) {
    return this.matrix[row];
  }

  numRows() {
    return this.matrix.length;
  }

  numCols() {
    return 12;
  }
}

class Line {
  constructor() {
    this.color = "Red";
  }

  getColor() {
    return this.color;
  }

  getCoordinates() {
    return [
      {
        x: 1,
        y: 1
      },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 }
    ]
  }
}

const sketch = (p5) => {
  window.p5 = p5;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  }

  var grid = new Matrix();
  var pieces = [new Line()];
  var width = 30;
  var height = 30;

  p5.draw = () => {
    // if (p5.millis() % 60 == 0) {
    //   pieces.push(new Line())
    // }
    p5.background(p5.color("LightGoldenRodYellow"), 85);

    p5.stroke(p5.color("Black"));
    p5.strokeWeight(1);
    p5.noFill();

    for (var row = 0; row < grid.numRows(); row++) {
      for (var col = 0; col < grid.numCols(); col++) {
        let ypos = (p5.windowHeight - 200) - row * height;
        let xpos = 200 + col * width;
        p5.rect(xpos, ypos, width, height);
      }
    }

    for (var i = 0; i < pieces.length; i++) {
      // pieces[i].render();
      let piece = pieces[i];
      p5.fill(piece.getColor());
      p5.noStroke();
      _.each(piece.getCoordinates(), function(coordinate) {
        var xpos = 200 + coordinate.x * width;
        var ypos = (p5.windowHeight - 200) - coordinate.y * height;
        p5.rect(xpos, ypos, width, height);
      });
    }
  }
}

new p5(sketch);
