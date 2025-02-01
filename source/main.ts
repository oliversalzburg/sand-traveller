/* eslint-disable no-use-before-define */
import { Random, randomRange, seedFromString } from "@oliversalzburg/js-utils/data/random.js";
import { getDocumentElementTypeByIdStrict } from "@oliversalzburg/js-utils/dom/core.js";
import { CanvasSandbox } from "@oliversalzburg/js-utils/graphics/canvas-sandbox.js";
import {
  Canvas2D,
  putPixel32,
  putPixel32Add,
  putPixel32Sub,
} from "@oliversalzburg/js-utils/graphics/canvas2d.js";
import { fromRGBA } from "@oliversalzburg/js-utils/graphics/core.js";
import { Palette, palette } from "@oliversalzburg/js-utils/graphics/palette.js";

const TWO_PI = Math.PI * 2;

const canvasNode = getDocumentElementTypeByIdStrict(document, "main", HTMLCanvasElement);
const canvas = new Canvas2D(canvasNode);
canvas.refreshCanvasNode();

// ----------------------- Non-boilerplate code starts here -----------------------

const applicationOptions = {
  blendingAdditive: true,
  blendingSubtractive: true,
  canvasColorDark: fromRGBA(0, 0, 0, 5),
  canvasColorLight: fromRGBA(255, 255, 255, 5),
  cityCount: 400,
  darkMode: true,
  distanceMinimum: 333,
  drawTravelers: false,
  drawTravelersPerpendicular: true,
  iterationsMax: 120 * 20,
  iterationsPerUpdate: 4,
  sandPainterCount: 3,
  seed: seedFromString("Sand Traveler by Jared Tarbell"),
  velocity: 20,
  viewport: {
    x: 0,
    y: 0,
    w: 1,
    h: 1,
  },
};
type ApplicationOptions = typeof applicationOptions;

class SandPainter {
  readonly host: Application;
  readonly canvas: Canvas2D;

  readonly color: number;
  grainDistance: number;
  p: number;
  readonly maxAlpha: number;
  readonly plotter: (canvas: Canvas2D, x: number, y: number, color: number, alpha: number) => void;

  constructor(host: Application) {
    this.host = host;
    this.canvas = this.host.canvas;

    this.color = this.host.palette.someColor();
    this.grainDistance = this.host.random.nextRange(0.01, 0.1);
    this.p = this.host.random.nextFloat();

    if (this.host.options.blendingAdditive && this.host.options.blendingSubtractive) {
      // Both additive and subtractive blending (pick random)
      const r = this.host.random.nextFloat();
      if (r > 0.5) {
        this.plotter = putPixel32Add;
      } else {
        this.plotter = putPixel32Sub;
      }
      this.maxAlpha = 128;
    } else if (this.host.options.blendingAdditive) {
      // Only additive blending
      this.plotter = putPixel32Add;
      this.maxAlpha = 128;
    } else if (this.host.options.blendingSubtractive) {
      // Only subtractive blending
      this.plotter = putPixel32Sub;
      this.maxAlpha = 128;
    } else {
      // Alpha blending
      this.plotter = putPixel32;
      this.maxAlpha = 255;
    }
  }

  /**
   * Renders a line of grains.
   * @param x - The X coordinate to draw to.
   * @param y - The Y coordinate to draw to.
   * @param ox - The X coordinate of the origin.
   * @param oy - The Y coordinate of the origin.
   */
  render(x: number, y: number, ox: number, oy: number) {
    // draw painting sweeps
    const sinp = Math.sin(this.p);
    this.plotter(
      this.canvas,
      ox + (x - ox) * sinp,
      oy + (y - oy) * sinp,
      this.color,
      this.maxAlpha / 10,
    );

    this.grainDistance += randomRange(-0.05, 0.05);
    const maxg = 0.22;
    if (this.grainDistance < -maxg) {
      this.grainDistance = -maxg;
    }
    if (this.grainDistance > maxg) {
      this.grainDistance = maxg;
    }

    this.p += randomRange(-0.05, 0.05);
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
      this.plotter(
        this.canvas,
        Math.trunc(ox + (x - ox) * sin1),
        Math.trunc(oy + (y - oy) * sin1),
        this.color,
        a,
      );
      this.plotter(
        this.canvas,
        Math.trunc(ox + (x - ox) * sin2),
        Math.trunc(oy + (y - oy) * sin2),
        this.color,
        a,
      );
    }
  }

  /**
   * Renders a line of grains.
   * @param x - The X coordinate to draw to.
   * @param y - The Y coordinate to draw to.
   * @param ox - The X coordinate of the origin.
   * @param oy - The Y coordinate of the origin.
   */
  renderPerpendicular(x: number, y: number, ox: number, oy: number) {
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

    this.grainDistance += randomRange(-0.05, 0.05);
    const maxg = 0.22;
    if (this.grainDistance < -maxg) {
      this.grainDistance = -maxg;
    }
    if (this.grainDistance > maxg) {
      this.grainDistance = maxg;
    }

    this.p += randomRange(-0.05, 0.05);
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
      this.plotter(
        this.canvas,
        Math.trunc(ox1 + (x1 - ox1) * sin1),
        Math.trunc(oy1 + (y1 - oy1) * sin1),
        this.color,
        a,
      );
      this.plotter(
        this.canvas,
        Math.trunc(ox1 + (x1 - ox1) * sin2),
        Math.trunc(oy1 + (y1 - oy1) * sin2),
        this.color,
        a,
      );
    }
  }
}

class City {
  readonly host: Application;
  readonly canvas: Canvas2D;
  x: number;
  y: number;
  vx: number;
  vy: number;
  idx: number;
  friend: number;

  readonly myc: number;
  readonly maxAlpha: number;
  readonly plotter: (canvas: Canvas2D, x: number, y: number, color: number, alpha: number) => void;
  sands: Array<SandPainter>;

  /**
   * Constructs a City
   * @param host - Application
   * @param canvas - Target canvas
   * @param Dx - X position
   * @param Dy - Y position
   * @param Vx - X velocity
   * @param Vy - Y velocity
   * @param Idx - Index
   */
  constructor(
    host: Application,
    canvas: Canvas2D,
    Dx: number,
    Dy: number,
    Vx: number,
    Vy: number,
    Idx: number,
  ) {
    this.host = host;
    this.canvas = canvas;

    this.x = Dx;
    this.y = Dy;
    this.vx = Vx;
    this.vy = Vy;
    this.idx = Math.trunc(Idx);

    this.friend = 0;
    this.myc = palette.someColor();
    this.maxAlpha = 0;

    this.sands = new Array<SandPainter>(this.host.options.sandPainterCount);

    // create sand painters
    for (let n = 0; n < this.host.options.sandPainterCount; ++n) {
      this.sands[n] = new SandPainter(host);
    }

    if (this.host.options.blendingAdditive && this.host.options.blendingSubtractive) {
      // Both additive and subtractive blending (pick random)
      const r = Math.random();
      if (r > 0.5) {
        this.plotter = putPixel32Add;
      } else {
        this.plotter = putPixel32Sub;
      }
      this.maxAlpha = 16;
    } else if (this.host.options.blendingAdditive) {
      // Only additive blending
      this.plotter = putPixel32Add;
      this.maxAlpha = 16;
    } else if (this.host.options.blendingSubtractive) {
      // Only subtractive blending
      this.plotter = putPixel32Sub;
      this.maxAlpha = 16;
    } else {
      // Alpha blending
      this.plotter = putPixel32;
      this.maxAlpha = 48;
    }
  }

  move() {
    this.vx += (this.host.cities[this.friend].x - this.x) / 1000;
    this.vy += (this.host.cities[this.friend].y - this.y) / 1000;

    this.vx *= 0.936;
    this.vy *= 0.936;

    this.x += this.vx;
    this.y += this.vy;

    if (this.host.options.drawTravelers) {
      this.drawTravelers();
    }
    if (0 < this.host.options.sandPainterCount) {
      if (this.host.cityDistance(this.idx, this.friend) < this.host.options.distanceMinimum) {
        this.drawSandPainters();
      }
    }
  }

  findFriend() {
    this.friend =
      (this.idx + Math.trunc(1 + Math.random() * (this.host.options.cityCount / 5))) %
      this.host.options.cityCount;
    if (this.friend === this.idx) {
      this.findFriend();
    }
  }

  drawTravelers() {
    const nt = 11;
    for (let i = 0; i < nt; ++i) {
      // pick random distance between city
      const distance = Math.random() * TWO_PI;
      // draw traveler
      let dx =
        (Math.sin(distance) * (this.x - this.host.cities[this.friend].x)) / 2 +
        (this.x + this.host.cities[this.friend].x) / 2;
      let dy =
        (Math.sin(distance) * (this.y - this.host.cities[this.friend].y)) / 2 +
        (this.y + this.host.cities[this.friend].y) / 2;
      if (Math.random() * 1000 > 990) {
        // noise
        dx += Math.random() * 3 - Math.random() * 3;
        dy += Math.random() * 3 - Math.random() * 3;
      }
      this.plotter(
        this.canvas,
        Math.trunc(dx),
        Math.trunc(dy),
        this.host.cities[this.friend].myc,
        this.maxAlpha,
      );
      // draw anti-traveler
      dx =
        (-1 * Math.sin(distance) * (this.x - this.host.cities[this.friend].x)) / 2 +
        (this.x + this.host.cities[this.friend].x) / 2;
      dy =
        (-1 * Math.sin(distance) * (this.y - this.host.cities[this.friend].y)) / 2 +
        (this.y + this.host.cities[this.friend].y) / 2;
      if (Math.random() * 1000 > 990) {
        // noise
        dx += Math.random() * 3 - Math.random() * 3;
        dy += Math.random() * 3 - Math.random() * 3;
      }
      this.plotter(
        this.canvas,
        Math.trunc(dx),
        Math.trunc(dy),
        this.host.cities[this.friend].myc,
        this.maxAlpha,
      );
    }
  }

  drawSandPainters() {
    if (this.host.options.drawTravelersPerpendicular) {
      for (const sandPainter of this.sands) {
        sandPainter.renderPerpendicular(
          this.x,
          this.y,
          this.host.cities[this.friend].x,
          this.host.cities[this.friend].y,
        );
      }
    } else {
      for (const sandPainter of this.sands) {
        sandPainter.render(
          this.x,
          this.y,
          this.host.cities[this.friend].x,
          this.host.cities[this.friend].y,
        );
      }
    }
  }
}

class Application {
  canvas: Canvas2D;
  options: ApplicationOptions;
  random: Random;
  palette: Palette;
  readonly cities: Array<City>;
  iterationCount: number;
  paused = false;

  constructor(canvas: Canvas2D, options: ApplicationOptions) {
    this.options = options;
    this.canvas = canvas;
    this.random = new Random(options.seed);
    this.palette = palette;

    this.cities = new Array<City>(this.options.cityCount);
    this.iterationCount = 0;
  }

  reconfigure(canvas: Canvas2D, options: Partial<ApplicationOptions> = {}) {
    this.options = { ...this.options, ...options };
    this.canvas = canvas;
    this.random = new Random(this.options.seed);
  }

  onDraw() {
    if (this.paused) {
      return;
    }

    for (let iter = 0; iter < this.options.iterationsPerUpdate; ++iter) {
      for (const city of this.cities) {
        city.move();
      }

      if (++this.iterationCount > this.options.iterationsMax) {
        this.start();
        return;
      }
    }
  }

  /**
   * Calculate the distance between two cities.
   * @param a - City index A
   * @param b - City index B
   * @returns Distance between the two cities.
   */
  cityDistance(a: number, b: number) {
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

  start(options: Partial<ApplicationOptions> = {}) {
    this.reconfigure(this.canvas, options);

    this.paused = false;

    this.iterationCount = 0;

    this.canvas.clearWith(
      ((this.options.darkMode ? this.options.canvasColorDark : this.options.canvasColorLight) <<
        2) |
        0xff,
    );
    this.canvas.update();

    let velocity = this.options.velocity;
    let vvt = 0.2;
    const ot = Math.random() * TWO_PI;
    for (let cityIdx = 0; cityIdx < this.options.cityCount; ++cityIdx) {
      // This is the original implementation, but in Processing "( 1.1 - cityIdx / NUM_CITIES )" always evaluates to 1.1
      //const tinc = ot + ( 1.1 - cityIdx / NUM_CITIES ) * 2 * cityIdx * TWO_PI / NUM_CITIES;
      const tinc = ot + (1.1 * 2 * cityIdx * TWO_PI) / this.options.cityCount;
      const vx = velocity * Math.sin(tinc);
      const vy = velocity * Math.cos(tinc);
      this.cities[cityIdx] = new City(
        this,
        this.canvas,
        this.canvas.width / 2 + vx * 2,
        this.canvas.height / 2 + vy * 2,
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

  pause(paused: boolean): void {
    this.paused = paused;
  }
}

const urlParameters = new URLSearchParams(document.location.search);
const devMode = urlParameters.get("devMode") !== null;
const canvasSandbox = new CanvasSandbox(
  window,
  canvasNode,
  Canvas2D,
  Application,
  applicationOptions,
  {
    devMode,
  },
);
canvasSandbox.run();
