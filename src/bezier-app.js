import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import _ from 'lodash';

import "./bezier.scss";

const sketch = (p5) => {
  window.p5 = p5;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  }

  var pa = { x: 100, y: 100 };
  var pb = { x: 500, y: 500 };
  var ca = { x: _.random(100,500), y: _.random(100, 500) }
  var cb = { x: _.random(100,500), y: _.random(100, 500) }
  var selectedPoint;

  p5.draw = () => {
    p5.background(p5.color("LightGoldenRodYellow"));

    p5.stroke(p5.color("rgba(0, 0, 0, 0.1)"));
    p5.strokeWeight(10);
    p5.line(pa.x, pa.y, pb.x, pb.y);

    p5.stroke(p5.color("rgba(0, 0, 0, 0.3)"));
    p5.strokeWeight(5);
    p5.line(pa.x, pa.y, ca.x, ca.y);

    p5.stroke(p5.color("rgba(0, 0, 0, 0.3)"));
    p5.strokeWeight(5);
    p5.line(pb.x, pb.y, cb.x, cb.y);

    p5.stroke(p5.color("rgba(120, 0, 0, 0.7)"));
    p5.noFill();
    p5.bezier(
      pa.x, pa.y,
      ca.x, ca.y,
      cb.x, cb.y,
      pb.x, pb.y
    )

    p5.strokeWeight(1);
    p5.fill("white");
    p5.stroke("black");
    p5.ellipse(pa.x, pa.y, 20);
    p5.ellipse(pb.x, pb.y, 20);

    p5.fill("teal");
    p5.stroke("blue");
    p5.ellipse(ca.x, ca.y, 20);

    p5.fill("pink");
    p5.stroke("magenta");
    p5.ellipse(cb.x, cb.y, 20);

    if (p5.mouseIsPressed && selectedPoint) {
      selectedPoint.x = p5.mouseX;
      selectedPoint.y = p5.mouseY;
    }
  }

  p5.mousePressed = () => {
    selectedPoint = _.find([ca, cb, pa, pb], (point) => {
      return p5.abs(point.x - p5.mouseX) < 10 && p5.abs(point.y - p5.mouseY) < 10;
    });
    // console.log(selectedPoint);
  }

  p5.mouseReleased = () => {
    // console.log("mouseReleased");
    selectedPoint = null;

    var codeDiv = document.getElementById("code");
    codeDiv.textContent = `p5.bezier(${pa.x}, ${pa.y}, ${ca.x}, ${ca.y}, ${cb.x}, ${cb.y}, ${pb.x}, ${pb.y});`;
  }
}

new p5(sketch);
