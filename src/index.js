import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';

const sketch = (p5) => {
  window.p5 = p5;

  p5.setup = () => {
    p5.line(15, 25, 70, 20);
  }
}

new p5(sketch);
