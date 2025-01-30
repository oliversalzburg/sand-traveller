/* eslint-disable no-use-before-define */
class MathHelper {
  static get TWO_PI() {
    return Math.PI * 2;
  }

  /**
   * Generate random value in range.
   * @param {number} min - Range start
   * @param {number} max - Range end
   * @returns {number} Random value
   */
  static randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * The sine for the given degree value.
   * @param {number} val - Value to convert
   * @returns {number} The sine
   */
  static sinDeg(val) {
    return Math.sin(MathHelper.deg2rad(val));
  }

  /**
   * The cosine for the given degree value.
   * @param {number} val - Value to convert
   * @returns {number} The cosine
   */
  static cosDeg(val) {
    return Math.cos(MathHelper.deg2rad(val));
  }

  /**
   * Convert degrees to radians.
   * @param {number} deg - Degree value
   * @returns {number} The value in radians
   */
  static deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  /**
   * Convert radians to degrees.
   * @param {number} rad - Radian value
   * @returns {number} The value in degrees.
   */
  static rad2deg(rad) {
    return rad * (180 / Math.PI);
  }

  /**
   * Calculate the distance between two points.
   * @param {number} x1 - X coordinate 1
   * @param {number} y1 - Y coordinate 1
   * @param {number} x2 - X coordinate 2
   * @param {number} y2 - Y coordinate 2
   * @returns {number} The distance between the two points.
   */
  static distance(x1, y1, x2, y2) {
    const distx = x2 - x1;
    const disty = y2 - y1;
    return Math.sqrt(distx * distx + disty * disty);
  }

  /**
   * Finds the integer square root of a positive number
   * @param {number} num - The number
   * @returns {number} The square root of the number.
   */
  static Isqrt(num) {
    if (0 === num) {
      return 0;
    } // Avoid zero divide
    let n = num / 2 + 1; // Initial estimate, never low
    let n1 = (n + num / n) / 2;
    while (n1 < n) {
      n = n1;
      n1 = (n + num / n) / 2;
    }
    return n;
  }

  /**
   * Check if the given number is an integer.
   * @param {number} num - The value to check
   * @returns {boolean} true for integers
   */
  static isInteger(num) {
    return Math.trunc(num) === num;
  }
}

class ColorHelper {
  static get PALETTE_DEFAULT() {
    return [
      0x3a242b, 0x3b2426, 0x352325, 0x836454, 0x7d5533, 0x8b7352, 0xb1a181, 0xa4632e, 0xbb6b33,
      0xb47249, 0xca7239, 0xd29057, 0xe0b87e, 0xd9b166, 0xf5eabe, 0xfcfadf, 0xd9d1b0, 0xfcfadf,
      0xd1d1ca, 0xa7b1ac, 0x879a8c, 0x9186ad, 0x776a8e, 0x000022, 0x000022, 0x000022, 0x000022,
      0x000022, 0x000022, 0x000022, 0x000022, 0x000022, 0x000022,
    ];
  }
  static get PALETTE_ALTERNATIVE() {
    return [
      0x3a242b, 0x3b2426, 0x352325, 0x836454, 0x7d5533, 0x8b7352, 0xb1a181, 0xa4632e, 0xbb6b33,
      0xb47249, 0xca7239, 0xd29057, 0xe0b87e, 0xd9b166, 0xf5eabe, 0xfcfadf, 0xd9d1b0, 0xfcfadf,
      0xd1d1ca, 0xa7b1ac, 0x879a8c, 0x9186ad, 0x776a8e, 0x000000, 0x000000, 0x000000, 0x000000,
      0x000000, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0x000000, 0x000000, 0x000000,
      0x000000, 0x000000, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff,
    ];
  }

  /**
   * Clamps the value in safe RGB range (0-255)
   * @param {number} c - The RGB component.
   * @returns {number} The clamped value.
   */
  static safeRGBComponent(c) {
    if (c < 0) {
      c = 0;
    }
    if (255 < c) {
      c = 255;
    }
    return Math.trunc(c);
  }

  /**
   * Constructs a 32bit integer representing an RGB color.
   * @param {number} r - Red component.
   * @param {number} g - Green component.
   * @param {number} b - Blue component.
   * @returns {number} The color
   */
  static fromRGB(r, g, b) {
    return ColorHelper.fromRGBA(r, g, b, 255);
  }

  /**
   * Constructs a 32bit integer representing an RGBA color.
   * @param {number} r - Red component.
   * @param {number} g - Green component.
   * @param {number} b - Blue component.
   * @param {number} a - Alpha component.
   * @returns {number} The color
   */
  static fromRGBA(r, g, b, a) {
    if (r > 255) {
      r = 255;
    }
    if (g > 255) {
      g = 255;
    }
    if (b > 255) {
      b = 255;
    }
    if (a > 255) {
      a = 255;
    }

    r = ColorHelper.safeRGBComponent(r);
    g = ColorHelper.safeRGBComponent(g);
    b = ColorHelper.safeRGBComponent(b);
    a = ColorHelper.safeRGBComponent(a);

    return (r << 24) | (g << 16) | (b << 8) | a;
  }

  /**
   * Retrieve the red component from an RGBA color.
   * @param {number} color - Source color.
   * @returns {number} Red component only.
   */
  static getR(color) {
    return (color >> 24) & 0xff;
  }

  /**
   * Retrieve the green component from an RGBA color.
   * @param {number} color - Source color.
   * @returns {number} Green component only.
   */
  static getG(color) {
    return (color >> 16) & 0xff;
  }

  /**
   * Retrieve the blue component from an RGBA color.
   * @param {number} color - Source color.
   * @returns {number} Blue component only.
   */
  static getB(color) {
    return (color >> 8) & 0xff;
  }

  /**
   * Retrieve the alpha component from an RGBA color.
   * @param {number} color - Source color.
   * @returns {number} Alpha component only.
   */
  static getA(color) {
    return color & 0xff;
  }

  /**
   * Blend between two colors.
   * @param {number} src - Source color.
   * @param {number} dst - Destination color.
   * @param {number} alpha - Blend factor.
   * @returns {number} The blended color.
   */
  static blend(src, dst, alpha) {
    if (alpha >= 255) {
      return dst;
    }
    if (alpha <= 0) {
      return src;
    }
    src |= 0;
    dst |= 0;

    return ColorHelper.fromRGB(
      (alpha * ColorHelper.getR(dst) + (255 - alpha) * ColorHelper.getR(src)) >> 8,
      (alpha * ColorHelper.getG(dst) + (255 - alpha) * ColorHelper.getG(src)) >> 8,
      (alpha * ColorHelper.getB(dst) + (255 - alpha) * ColorHelper.getB(src)) >> 8,
    );
  }

  /**
   * Blend between two colors additively.
   * @param {number} src - Source color.
   * @param {number} dst - Destination color.
   * @param {number} alpha - Blend factor.
   * @returns {number} The blended color.
   */
  static blendAdditive(src, dst, alpha) {
    if (alpha >= 255) {
      return dst;
    }
    if (alpha <= 0) {
      return src;
    }

    return ColorHelper.fromRGB(
      ((alpha * ColorHelper.getR(dst)) >> 8) + ColorHelper.getR(src),
      ((alpha * ColorHelper.getG(dst)) >> 8) + ColorHelper.getG(src),
      ((alpha * ColorHelper.getB(dst)) >> 8) + ColorHelper.getB(src),
    );
  }

  /**
   * Blend between two colors subtractively.
   * @param {number} src - Source color.
   * @param {number} dst - Destination color.
   * @param {number} alpha - Blend factor.
   * @returns {number} The blended color.
   */
  static blendSubtractive(src, dst, alpha) {
    if (alpha >= 255) {
      return dst;
    }
    if (alpha <= 0) {
      return src;
    }

    const r = ColorHelper.getR(src) - ((alpha * ColorHelper.getR(dst)) >> 8);
    const g = ColorHelper.getG(src) - ((alpha * ColorHelper.getG(dst)) >> 8);
    const b = ColorHelper.getB(src) - ((alpha * ColorHelper.getB(dst)) >> 8);
    return ColorHelper.fromRGB(r < 0 ? 0 : r, g < 0 ? 0 : g, b < 0 ? 0 : b);
  }

  static putPixel32(canvas, x, y, color, alpha) {
    x = Math.trunc(x);
    y = Math.trunc(y);

    if (x > canvas.width || y > canvas.height) {
      return;
    }
    if (alpha > 255) {
      alpha = 255;
    }
    const srcColor = canvas.getPixel32(x, y);
    const newColor = ColorHelper.blend(srcColor, color, alpha);
    canvas.setPixel32(x, y, newColor);
  }

  static putPixel32Add(canvas, x, y, color, alpha) {
    x = Math.round(x);
    y = Math.round(y);

    if (x > canvas.width || y > canvas.height) {
      return;
    }
    if (alpha > 255) {
      alpha = 255;
    }
    const srcColor = canvas.getPixel32(x, y);
    const newColor = ColorHelper.blendAdditive(srcColor, color, alpha);
    canvas.setPixel32(x, y, newColor);
  }

  static putPixel32Sub(canvas, x, y, color, alpha) {
    x = Math.round(x);
    y = Math.round(y);

    if (x > canvas.width || y > canvas.height) {
      return;
    }
    if (alpha > 255) {
      alpha = 255;
    }
    const srcColor = canvas.getPixel32(x, y);
    const newColor = ColorHelper.blendSubtractive(srcColor, color, alpha);
    canvas.setPixel32(x, y, newColor);
  }

  static putSubPixel32(canvas, x, y, color, alpha) {
    if (x > canvas.width || y > canvas.height) {
      return;
    }
    const xweight = x - Math.trunc(x);
    const yweight = y - Math.trunc(y);
    const xweightn = 1 - xweight;
    const yweightn = 1 - yweight;

    const alpha0 = xweightn * yweightn * alpha;
    const alpha1 = xweight * yweightn * alpha;
    const alpha2 = xweightn * yweight * alpha;
    const alpha3 = xweight * yweight * alpha;

    ColorHelper.putPixel32(canvas, x + 0, y + 0, color, alpha0);
    ColorHelper.putPixel32(canvas, x + 1, y + 0, color, alpha1);
    ColorHelper.putPixel32(canvas, x + 0, y + 1, color, alpha2);
    ColorHelper.putPixel32(canvas, x + 1, y + 1, color, alpha3);
  }

  static somecolor() {
    // pick some random good color
    const color =
      this.PALETTE_DEFAULT[Math.trunc(Math.random() * ColorHelper.PALETTE_DEFAULT.length)];
    return (color << 8) | 0xff;
  }

  /**
   * Convert a color to a grayscale equivalent.
   * @param {number} color - The color to convert.
   * @returns {number} The grayscale equivalent of the color.
   */
  static toGrayScale(color) {
    const gs =
      ColorHelper.getR(color) * 0.3 +
      ColorHelper.getG(color) * 0.59 +
      ColorHelper.getB(color) * 0.11;
    return ColorHelper.fromRGBA(gs, gs, gs, ColorHelper.getA(color));
  }
}

class CanvasHelper {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;

    this.context = this.canvas.getContext("2d");
    this.pixMap = this.context.createImageData(width, height);
    this.buffer = this.pixMap.data;

    this.context.font = "12px sans-serif";
  }

  lock() {
    // noop
  }
  unlock() {
    this.context.putImageData(this.pixMap, 0, 0);
  }

  getPixel32(x, y) {
    const bufferOffset = Math.trunc((x + y * this.width) * 4);
    return ColorHelper.fromRGBA(
      this.buffer[bufferOffset + 0],
      this.buffer[bufferOffset + 1],
      this.buffer[bufferOffset + 2],
      this.buffer[bufferOffset + 3],
    );
  }

  setPixel32(x, y, color) {
    const bufferOffset = Math.trunc((x + y * this.width) * 4);
    this.buffer[bufferOffset + 0] = ColorHelper.getR(color);
    this.buffer[bufferOffset + 1] = ColorHelper.getG(color);
    this.buffer[bufferOffset + 2] = ColorHelper.getB(color);
    this.buffer[bufferOffset + 3] = ColorHelper.getA(color);
  }

  clearWith(color) {
    const r = ColorHelper.getR(color);
    const g = ColorHelper.getG(color);
    const b = ColorHelper.getB(color);
    const a = ColorHelper.getA(color);
    for (let bufferOffset = 0; bufferOffset < this.width * this.height * 4; bufferOffset += 4) {
      this.buffer[bufferOffset + 0] = r;
      this.buffer[bufferOffset + 1] = g;
      this.buffer[bufferOffset + 2] = b;
      this.buffer[bufferOffset + 3] = a;
    }
  }
}

class RenderHelper {
  constructor(canvas, renderLoop) {
    this.canvas = canvas;
    this.renderLoop = renderLoop;
    this.previousTimestamp = 0;
    this.boundMain = this.main.bind(this);
  }

  main(timestamp) {
    const timeDelta = timestamp - this.previousTimestamp;
    this.drawFrame(timestamp, timeDelta);

    window.requestAnimationFrame(this.boundMain);

    this.previousTimestamp = timestamp;
  }

  drawFrame(timestamp, delta) {
    this.renderLoop(this.canvas, delta, timestamp);

    this.canvas.unlock();

    const fps = `${Math.round(1000 / delta)}fps`;
    this.canvas.context.strokeStyle = "rgba( 255, 255, 255, 0.85 )";
    this.canvas.context.lineWidth = 5;
    this.canvas.context.strokeText(fps, 4, 14);
    this.canvas.context.fillStyle = "#000000";
    this.canvas.context.fillText(fps, 4, 14);
  }
}

const nodeCanvas = document.getElementById("main");
const core = new RenderHelper(
  new CanvasHelper(nodeCanvas, nodeCanvas.width, nodeCanvas.height),
  render,
);

// ----------------------- Non-boilerplate code starts here -----------------------

const CANVAS_BACKGROUND_COLOR = 0x000000ff;
const ITERATIONS_PER_UPDATE = 1;
const CANVAS_SIZE_X = nodeCanvas.width;
const CANVAS_SIZE_Y = nodeCanvas.height;
const USE_SANDPAINTER = true;
const DRAW_TRAVELLERS = false;
const DRAW_PERPENDICULAR = true;
const ADDITIVE_BLENDING = true;
const SUBTRACTIVE_BLENDING = true;
const VELOCITY = 20;
const MAX_ITERATIONS = 120 * 20;
const NUM_CITIES = 400;
const MIN_DISTANCE = 333;
const NUM_SANDPAINTERS = 3;

class SandPainter {
  constructor(canvas) {
    this.p = Math.random();
    this.color = ColorHelper.somecolor();
    this.grainDistance = MathHelper.randomRange(0.01, 0.1);

    this.canvas = canvas;
    this.plotter = null;

    this.maxAlpha = 0;

    if (ADDITIVE_BLENDING && SUBTRACTIVE_BLENDING) {
      // Both additive and subtractive blending (pick random)
      const r = Math.random();
      if (r > 0.5) {
        this.plotter = ColorHelper.putPixel32Add;
      } else {
        this.plotter = ColorHelper.putPixel32Sub;
      }
      this.maxAlpha = 128;
    } else if (ADDITIVE_BLENDING) {
      // Only additive blending
      this.plotter = ColorHelper.putPixel32Add;
      this.maxAlpha = 128;
    } else if (SUBTRACTIVE_BLENDING) {
      // Only subtractive blending
      this.plotter = ColorHelper.putPixel32Sub;
      this.maxAlpha = 128;
    } else {
      // Alpha blending
      this.plotter = ColorHelper.putPixel32;
      this.maxAlpha = 256;
    }
  }

  /**
   * Render a line of sand grains at a certain location
   */
  render(x, y, ox, oy) {
    // draw painting sweeps
    const sinp = Math.sin(this.p);
    this.plotter(
      this.canvas,
      ox + (x - ox) * sinp,
      oy + (y - oy) * sinp,
      this.color,
      this.maxAlpha / 10,
    );

    this.grainDistance += MathHelper.randomRange(-0.05, 0.05);
    const maxg = 0.22;
    if (this.grainDistance < -maxg) {
      this.grainDistance = -maxg;
    }
    if (this.grainDistance > maxg) {
      this.grainDistance = maxg;
    }

    this.p += MathHelper.randomRange(-0.05, 0.05);
    if (this.p < 0) {
      this.p = 0;
    }
    if (this.p > 1.0) {
      this.p = 1.0;
    }

    //const grains = int( Math.sqrt( ( ox - x ) * ( ox - x ) + ( oy - y ) * ( oy - y ) ) );
    const grains = 11;

    const w = this.grainDistance / 10.0;
    for (let i = 0; i < grains; ++i) {
      const a = (0.1 - i / (grains * 10)) * this.maxAlpha;
      const siniw = Math.sin(i * w);
      const sin1 = Math.sin(this.p + siniw);
      const sin2 = Math.sin(this.p - siniw);
      this.plotter(this.canvas, ox + (x - ox) * sin1, oy + (y - oy) * sin1, this.color, a);
      this.plotter(this.canvas, ox + (x - ox) * sin2, oy + (y - oy) * sin2, this.color, a);
    }
  }

  renderPerpendicular(x, y, ox, oy) {
    // transform perpendicular
    const mx = (x + ox) / 2;
    const my = (y + oy) / 2;

    const g = 0.42;
    const x1 = mx + (y - my) * g;
    const y1 = my - (x - mx) * g;

    const ox1 = mx + (oy - my) * g;
    const oy1 = my - (ox - mx) * g;

    // draw painting sweeps
    const sinp = Math.sin(this.p);
    this.plotter(
      this.canvas,
      ox1 + (x1 - ox1) * sinp,
      oy1 + (y1 - oy1) * sinp,
      this.color,
      this.maxAlpha / 10,
    );

    this.grainDistance += MathHelper.randomRange(-0.05, 0.05);
    const maxg = 0.22;
    if (this.grainDistance < -maxg) {
      this.grainDistance = -maxg;
    }
    if (this.grainDistance > maxg) {
      this.grainDistance = maxg;
    }

    this.p += MathHelper.randomRange(-0.05, 0.05);
    if (this.p < 0) {
      this.p = 0;
    }
    if (this.p > 1.0) {
      this.p = 1.0;
    }

    //const grains:int = int( Math.sqrt( ( ox - x ) * ( ox - x ) + ( oy - y ) * ( oy - y ) ) );
    const grains = 11;

    const w = this.grainDistance / 10.0;
    for (let i = 0; i < grains; ++i) {
      const a = (0.1 - i / (grains * 10)) * this.maxAlpha;
      const siniw = Math.sin(i * w);
      const sin1 = Math.sin(this.p + siniw);
      const sin2 = Math.sin(this.p - siniw);
      this.plotter(this.canvas, ox1 + (x1 - ox1) * sin1, oy1 + (y1 - oy1) * sin1, this.color, a);
      this.plotter(this.canvas, ox1 + (x1 - ox1) * sin2, oy1 + (y1 - oy1) * sin2, this.color, a);
    }
  }
}

class City {
  constructor(sandTraveller, canvas, Dx, Dy, Vx, Vy, Idx) {
    this.sandTraveller = sandTraveller;
    this.canvas = canvas;

    // position
    this.x = Dx;
    this.y = Dy;
    this.vx = Vx;
    this.vy = Vy;
    this.idx = Math.trunc(Idx);

    this.friend = 0;
    this.myc = ColorHelper.somecolor();

    this.plotter = null;
    this.MAX_ALPHA = 0;

    this.sands = new Array(NUM_SANDPAINTERS);

    // create sand painters
    for (let n = 0; n < NUM_SANDPAINTERS; ++n) {
      this.sands[n] = new SandPainter(canvas);
    }

    if (ADDITIVE_BLENDING && SUBTRACTIVE_BLENDING) {
      // Both additive and subtractive blending (pick random)
      const r = Math.random();
      if (r > 0.5) {
        this.plotter = ColorHelper.putPixel32Add;
      } else {
        this.plotter = ColorHelper.putPixel32Sub;
      }
      this.MAX_ALPHA = 16;
    } else if (ADDITIVE_BLENDING) {
      // Only additive blending
      this.plotter = ColorHelper.putPixel32Add;
      this.MAX_ALPHA = 16;
    } else if (SUBTRACTIVE_BLENDING) {
      // Only subtractive blending
      this.plotter = ColorHelper.putPixel32Sub;
      this.MAX_ALPHA = 16;
    } else {
      // Alpha blending
      this.plotter = ColorHelper.putPixel32;
      this.MAX_ALPHA = 48;
    }
  }

  move() {
    this.vx += (this.sandTraveller.cities[this.friend].x - this.x) / 1000;
    this.vy += (this.sandTraveller.cities[this.friend].y - this.y) / 1000;

    this.vx *= 0.936;
    this.vy *= 0.936;

    this.x += this.vx;
    this.y += this.vy;

    if (DRAW_TRAVELLERS) {
      this.drawTravelers();
    }
    if (USE_SANDPAINTER) {
      if (this.sandTraveller.cityDistance(this.idx, this.friend) < MIN_DISTANCE) {
        this.drawSandPainters();
      }
    }
  }

  findFriend() {
    this.friend = (this.idx + Math.trunc(1 + Math.random() * (NUM_CITIES / 5))) % NUM_CITIES;
    if (this.friend === this.idx) {
      this.findFriend();
    }
  }

  drawTravelers() {
    const nt = 11;
    for (let i = 0; i < nt; ++i) {
      // pick random distance between city
      const distance = Math.random() * MathHelper.TWO_PI;
      // draw traveler
      let dx =
        (Math.sin(distance) * (this.x - this.sandTraveller.cities[this.friend].x)) / 2 +
        (this.x + this.sandTraveller.cities[this.friend].x) / 2;
      let dy =
        (Math.sin(distance) * (this.y - this.sandTraveller.cities[this.friend].y)) / 2 +
        (this.y + this.sandTraveller.cities[this.friend].y) / 2;
      if (Math.random() * 1000 > 990) {
        // noise
        dx += Math.random() * 3 - Math.random() * 3;
        dy += Math.random() * 3 - Math.random() * 3;
      }
      this.plotter(this.canvas, dx, dy, this.sandTraveller.cities[this.friend].myc, this.MAX_ALPHA);
      // draw anti-traveler
      dx =
        (-1 * Math.sin(distance) * (this.x - this.sandTraveller.cities[this.friend].x)) / 2 +
        (this.x + this.sandTraveller.cities[this.friend].x) / 2;
      dy =
        (-1 * Math.sin(distance) * (this.y - this.sandTraveller.cities[this.friend].y)) / 2 +
        (this.y + this.sandTraveller.cities[this.friend].y) / 2;
      if (Math.random() * 1000 > 990) {
        // noise
        dx += Math.random() * 3 - Math.random() * 3;
        dy += Math.random() * 3 - Math.random() * 3;
      }
      this.plotter(this.canvas, dx, dy, this.sandTraveller.cities[this.friend].myc, this.MAX_ALPHA);
    }
  }

  drawSandPainters() {
    if (DRAW_PERPENDICULAR) {
      for (const sandPainter of this.sands) {
        sandPainter.renderPerpendicular(
          this.x,
          this.y,
          this.sandTraveller.cities[this.friend].x,
          this.sandTraveller.cities[this.friend].y,
        );
      }
    } else {
      for (const sandPainter of this.sands) {
        sandPainter.render(
          this.x,
          this.y,
          this.sandTraveller.cities[this.friend].x,
          this.sandTraveller.cities[this.friend].y,
        );
      }
    }
  }
}

class SandTraveller {
  constructor(canvas) {
    this.canvas = canvas;

    this.cities = new Array(NUM_CITIES);
    this.iterationCount = 0;
  }

  onDraw() {
    this.canvas.lock();

    for (let iter = 0; iter < ITERATIONS_PER_UPDATE; ++iter) {
      for (const city of this.cities) {
        city.move();
      }
      //canvas.copyPixels( canvas, new Rectangle( 0, 1, CANVAS_SIZE_X, CANVAS_SIZE_Y - 1 ), new Point( 0, 0 ) );
      //canvas.fillRect( new Rectangle( 0, CANVAS_SIZE_Y - 1, CANVAS_SIZE_X, 1 ), 0x000000 );

      if (++this.iterationCount > MAX_ITERATIONS) {
        this.startApp();
        return;
      }
    }

    this.canvas.unlock();
  }

  cityDistance(a, b) {
    a = Math.trunc(a);
    b = Math.trunc(b);
    if (a !== b) {
      // calculate and return distance between cities
      const dx = this.cities[b].x - this.cities[a].x;
      const dy = this.cities[b].y - this.cities[a].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      return d;
    }
    return 0.0;
  }

  startApp() {
    this.iterationCount = 0;

    this.canvas.clearWith(CANVAS_BACKGROUND_COLOR);

    let velocity = VELOCITY;
    let vvt = 0.2;
    const ot = Math.random() * MathHelper.TWO_PI;
    for (let cityIdx = 0; cityIdx < NUM_CITIES; ++cityIdx) {
      // This is the original implementation, but in Processing "( 1.1 - cityIdx / NUM_CITIES )" always evaluates to 1.1
      //const tinc = ot + ( 1.1 - cityIdx / NUM_CITIES ) * 2 * cityIdx * MathHelper.TWO_PI / NUM_CITIES;
      const tinc = ot + (1.1 * 2 * cityIdx * MathHelper.TWO_PI) / NUM_CITIES;
      const vx = velocity * Math.sin(tinc);
      const vy = velocity * Math.cos(tinc);
      this.cities[cityIdx] = new City(
        this,
        this.canvas,
        CANVAS_SIZE_X / 2 + vx * 2,
        CANVAS_SIZE_Y / 2 + vy * 2,
        vx,
        vy,
        cityIdx,
      );
      vvt -= 0.00033;
      velocity += vvt;
    }

    for (const city of this.cities) {
      city.findFriend();
    }
  }
}

const application = new SandTraveller(core.canvas);

function render() {
  application.onDraw();
}

application.startApp();
core.main();
