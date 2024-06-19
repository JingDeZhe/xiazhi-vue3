<script setup>
import p5 from 'p5'
import { ref } from 'vue'
import { useP5 } from './util'

const ctn = ref()
useP5((p) => {
  const s = 600
  const ct = s / 2
  const r = s / 2 - 20
  const posC = p.createVector(0, 0)

  class Dot {
    constructor(x, y, v0) {
      this.r = 4
      this.pos = p.createVector(x, y)
      this.v = v0 || p.createVector(0, 0)
    }

    checkCollision() {
      if (this.pos.dist(posC) > r) {
        this.v.mult(-1)
        this.pos.setMag(r - this.r)
      }
    }

    update() {
      this.pos.add(this.v)
    }

    display() {
      this.update()
      p.strokeWeight(this.r)
      p.stroke(30)
      p.point(this.pos.x, this.pos.y)
    }
  }

  const dots = []
  p.setup = () => {
    const offset = 0
    const v0mag = 5
    const total = 100
    p.createCanvas(s, s)
    for (let alpha = 0; alpha <= p.TWO_PI; alpha += p.PI / total) {
      const t = p.createVector(p.sin(alpha), p.cos(alpha))
      dots.push(new Dot(t.x * offset, t.y * offset, t.mult(v0mag * (alpha / p.TWO_PI))))
    }
  }

  p.draw = () => {
    p.translate(ct, ct)
    p.background(250)
    p.strokeWeight(2)
    p.stroke(30)
    p.circle(0, 0, r * 2)

    dots[0].checkCollision()
    dots[0].display()
    for (let i = 1, len = dots.length; i < len; i++) {
      dots[i].checkCollision()
      dots[i].display()
    }
  }
}, ctn)
</script>

<template>
  <div class="screen-box theme-dark all-center" ref="ctn"></div>
</template>

<style lang="scss"></style>
