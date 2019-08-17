<template>
  <div id="app">
    <transition
      appear
      :name="$route.meta.appearance"
      mode="out-in"
      @before-enter="shake()">
      <router-view :key="$route.name"/>
    </transition>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
class Vertex {
  constructor(x, y, baseY) {
    this.baseY = baseY;
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.targetY = 0;
    this.friction = 0.15;
    this.deceleration = 0.95;
  }

  updateY(diffVal) {
    this.targetY = diffVal + this.baseY;
    this.vy += this.targetY - this.y;
    this.y += this.vy * this.friction;
    this.vy *= this.deceleration;
  }
}
export default {
  name: 'App',

  data() {
    return {
      canvas: null,
      ctx: null,
      vertexes: [],
      diffPt: [],
      autoDiff: 1000,
      verNum: 250,
      canvasW: window.innerWidth + 40,
      color: '#6ca0f6',
      xx: 150,
      dd: 15
    };
  },

  mounted() {
    this.addListener(window, 'load', this.init);
  },

  methods: {
    addListener(e, str, func) {
      if (e.addEventListener) {
        e.addEventListener(str, func, false);
      } else if (e.attachEvent) {
        e.attachEvent(`on${str}`, func);
      }
    },
    resize() {
      this.initCanvas(this.canvasW, window.innerHeight);
      const cW = this.canvas.width;
      const cH = this.canvas.height;
      for (let i = 0; i < this.verNum; i++) {
        this.vertexes[i] = new Vertex((cW / (this.verNum - 1)) * i, cH / 2, cH / 2);
      }
      this.initDiffPt();
    },
    shake(e) {
      let mouseX;
      let mouseY;
      if (e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
      } else {
        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;
      }
      if (
        (((window.innerHeight / 2) - mouseY) < 500) &&
        (((window.innerHeight / 2) - mouseY) > -500)
      ) {
        this.autoDiff = 1000;
        if (this.canvas && mouseX < (this.canvas.width - 2)) {
          this.xx = 1 + Math.floor(((this.verNum - 2) * mouseX) / this.canvas.width);
          this.diffPt[this.xx] = this.autoDiff;
        }
      }
    },
    init() {
      this.resize();
      const FPS = 60;
      const interval = Math.round(1000 / FPS);
      const timer = setInterval(this.update, interval);
      this.addListener(window, 'resize', this.resize);
      this.canvas.onmousedown = this.shake;
    },
    draw() {
      this.ctx.beginPath();
      this.ctx.moveTo(0, window.innerHeight);
      this.ctx.fillStyle = this.color;
      this.ctx.lineTo(this.vertexes[0].x, this.vertexes[0].y);
      for (let i = 1; i < this.vertexes.length; i++) {
        this.ctx.lineTo(this.vertexes[i].x, this.vertexes[i].y);
      }
      this.ctx.lineTo(this.canvas.width, window.innerHeight);
      this.ctx.lineTo(0, window.innerHeight);
      this.ctx.fill();
    },
    initDiffPt() {
      for (let i = 0; i < this.verNum; i++) {
        this.diffPt[i] = 0;
      }
    },
    update() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.autoDiff -= this.autoDiff * 0.9;
      this.diffPt[this.xx] = this.autoDiff;
      for (let i = this.xx - 1; i > 0; i--) {
        let d = this.xx - i;
        if (d > this.dd) d = this.dd;
        this.diffPt[i] -= (this.diffPt[i] - this.diffPt[i + 1]) * (1 - (0.01 * d));
      }
      for (let i = this.xx + 1; i < this.verNum; i++) {
        let d = i - this.xx;
        if (d > this.dd) d = this.dd;
        this.diffPt[i] -= (this.diffPt[i] - this.diffPt[i - 1]) * (1 - (0.01 * d));
      }
      for (let i = 0; i < this.vertexes.length; i++) {
        this.vertexes[i].updateY(this.diffPt[i]);
      }
      this.draw();
    },
    initCanvas(width, height) {
      this.canvas = document.getElementById('canvas');
      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx = this.canvas.getContext('2d');
    }
  }
};
</script>

<style>
.slide-right-to-left-enter {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}
.slide-right-to-left-enter-to.slide-right-to-left-enter-active {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
.slide-right-to-left-leave {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
.slide-right-to-left-leave-to.slide-right-to-left-leave-active {
  transform: translate3d(-100%, 0, 0);
  opacity: 0;
}

.page-wrapper {
  width: 100%;
  height: 100vh;
  transition: transform .16s ease-out, opacity .2s ease-out;
}
.page-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.page-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
#canvas {
  position: absolute;
  top: 0;
  left: -40px;
  z-index: -1;
}
</style>
