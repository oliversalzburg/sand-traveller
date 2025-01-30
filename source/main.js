import { getDocumentElementTypeByIdStrict } from "@oliversalzburg/js-utils/dom/core.js";
import {
  Canvas2D,
  putPixel32,
  putPixel32Add,
  putPixel32Sub,
} from "@oliversalzburg/js-utils/graphics/canvas2d.js";

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

class RenderHelper {
  /**
   * Constructs a RenderHelper.
   * @param {Canvas2D} canvas - Target canvas
   * @param {Function} renderLoop - Render loop
   */
  constructor(canvas, renderLoop) {
    this.canvas = canvas;
    this.renderLoop = renderLoop;
    this.previousTimestamp = 0;
    this.boundMain = this.main.bind(this);
  }

  /**
   * Main render loop
   * @param {number} timestamp - Current time
   */
  main(timestamp) {
    const timeDelta = timestamp - this.previousTimestamp;
    this.drawFrame(timestamp, timeDelta);

    window.requestAnimationFrame(this.boundMain);

    this.previousTimestamp = timestamp;
  }

  /**
   * Draw one frame.
   * @param {number} timestamp - Current time
   * @param {number} delta - Time elapsed since last frame
   */
  drawFrame(timestamp, delta) {
    this.renderLoop(this.canvas, delta, timestamp);

    const fps = `${Math.round(1000 / delta)}fps`;
    this.canvas.context.strokeStyle = "rgba( 255, 255, 255, 0.85 )";
    this.canvas.context.lineWidth = 5;
    this.canvas.context.strokeText(fps, 4, 14);
    this.canvas.context.fillStyle = "#000000";
    this.canvas.context.fillText(fps, 4, 14);
  }
}

const nodeCanvas = getDocumentElementTypeByIdStrict(document, "main", HTMLCanvasElement);
const core = new RenderHelper(new Canvas2D(nodeCanvas, { supportReadBack: true }), render);

// ----------------------- Non-boilerplate code starts here -----------------------

const CANVAS_BACKGROUND_COLOR = 0x000000ff;
const ITERATIONS_PER_UPDATE = 1;
const CANVAS_SIZE_X = nodeCanvas.width;
const CANVAS_SIZE_Y = nodeCanvas.height;
const USE_SANDPAINTER = true;
const DRAW_TRAVELERS = false;
const DRAW_PERPENDICULAR = true;
const ADDITIVE_BLENDING = true;
const SUBTRACTIVE_BLENDING = true;
const VELOCITY = 20;
const MAX_ITERATIONS = 120 * 20;
const NUM_CITIES = 400;
const MIN_DISTANCE = 333;
const NUM_SANDPAINTERS = 3;

class SandPainter {
  /**
   * Construct new SandPainter.
   * @param {Canvas2D} canvas - Canvas element
   */
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
        this.plotter = putPixel32Add;
      } else {
        this.plotter = putPixel32Sub;
      }
      this.maxAlpha = 128;
    } else if (ADDITIVE_BLENDING) {
      // Only additive blending
      this.plotter = putPixel32Add;
      this.maxAlpha = 128;
    } else if (SUBTRACTIVE_BLENDING) {
      // Only subtractive blending
      this.plotter = putPixel32Sub;
      this.maxAlpha = 128;
    } else {
      // Alpha blending
      this.plotter = putPixel32;
      this.maxAlpha = 256;
    }
  }

  /**
   * Render a line of sand grains at a certain location
   * @param {number} x - X
   * @param {number} y - Y
   * @param {number} ox - Origin X
   * @param {number} oy - Origin Y
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

  /**
   * Renders a line of grains.
   * @param {number} x - The X coordinate to draw to.
   * @param {number} y - The Y coordinate to draw to.
   * @param {number} ox - The X coordinate of the origin.
   * @param {number} oy - The Y coordinate of the origin.
   */
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
  /**
   * Constructs a City
   * @param {SandTraveler} sandTraveler - SandTraveler
   * @param {Canvas2D} canvas - Target canvas
   * @param {number} Dx - X position
   * @param {number} Dy - Y position
   * @param {number} Vx - X velocity
   * @param {number} Vy - Y velocity
   * @param {number} Idx - Index
   */
  constructor(sandTraveler, canvas, Dx, Dy, Vx, Vy, Idx) {
    this.sandTraveler = sandTraveler;
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
        this.plotter = putPixel32Add;
      } else {
        this.plotter = putPixel32Sub;
      }
      this.MAX_ALPHA = 16;
    } else if (ADDITIVE_BLENDING) {
      // Only additive blending
      this.plotter = putPixel32Add;
      this.MAX_ALPHA = 16;
    } else if (SUBTRACTIVE_BLENDING) {
      // Only subtractive blending
      this.plotter = putPixel32Sub;
      this.MAX_ALPHA = 16;
    } else {
      // Alpha blending
      this.plotter = putPixel32;
      this.MAX_ALPHA = 48;
    }
  }

  move() {
    this.vx += (this.sandTraveler.cities[this.friend].x - this.x) / 1000;
    this.vy += (this.sandTraveler.cities[this.friend].y - this.y) / 1000;

    this.vx *= 0.936;
    this.vy *= 0.936;

    this.x += this.vx;
    this.y += this.vy;

    if (DRAW_TRAVELERS) {
      this.drawTravelers();
    }
    if (USE_SANDPAINTER) {
      if (this.sandTraveler.cityDistance(this.idx, this.friend) < MIN_DISTANCE) {
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
        (Math.sin(distance) * (this.x - this.sandTraveler.cities[this.friend].x)) / 2 +
        (this.x + this.sandTraveler.cities[this.friend].x) / 2;
      let dy =
        (Math.sin(distance) * (this.y - this.sandTraveler.cities[this.friend].y)) / 2 +
        (this.y + this.sandTraveler.cities[this.friend].y) / 2;
      if (Math.random() * 1000 > 990) {
        // noise
        dx += Math.random() * 3 - Math.random() * 3;
        dy += Math.random() * 3 - Math.random() * 3;
      }
      this.plotter(this.canvas, dx, dy, this.sandTraveler.cities[this.friend].myc, this.MAX_ALPHA);
      // draw anti-traveler
      dx =
        (-1 * Math.sin(distance) * (this.x - this.sandTraveler.cities[this.friend].x)) / 2 +
        (this.x + this.sandTraveler.cities[this.friend].x) / 2;
      dy =
        (-1 * Math.sin(distance) * (this.y - this.sandTraveler.cities[this.friend].y)) / 2 +
        (this.y + this.sandTraveler.cities[this.friend].y) / 2;
      if (Math.random() * 1000 > 990) {
        // noise
        dx += Math.random() * 3 - Math.random() * 3;
        dy += Math.random() * 3 - Math.random() * 3;
      }
      this.plotter(this.canvas, dx, dy, this.sandTraveler.cities[this.friend].myc, this.MAX_ALPHA);
    }
  }

  drawSandPainters() {
    if (DRAW_PERPENDICULAR) {
      for (const sandPainter of this.sands) {
        sandPainter.renderPerpendicular(
          this.x,
          this.y,
          this.sandTraveler.cities[this.friend].x,
          this.sandTraveler.cities[this.friend].y,
        );
      }
    } else {
      for (const sandPainter of this.sands) {
        sandPainter.render(
          this.x,
          this.y,
          this.sandTraveler.cities[this.friend].x,
          this.sandTraveler.cities[this.friend].y,
        );
      }
    }
  }
}

class SandTraveler {
  /**
   * Constructs a new SandTraveler
   * @param {Canvas2D} canvas - The canvas to draw to.
   */
  constructor(canvas) {
    this.canvas = canvas;

    this.cities = new Array(NUM_CITIES);
    this.iterationCount = 0;
  }

  onDraw() {
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
  }

  /**
   * Calculate the distance between two cities.
   * @param {number} a - City index A
   * @param {number} b - City index B
   * @returns {number} Distance between the two cities.
   */
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

const application = new SandTraveler(core.canvas);

function render() {
  application.onDraw();
}

application.startApp();
core.main(0);
