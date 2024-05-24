<script setup>
import anime from 'animejs'
import { onMounted, ref } from 'vue'
const ctn = ref()
const lineCount = 60
const width = 600
const height = 600
const padding = 20

const yFuncs = [Math.sin, Math.cos]
onMounted(() => {
  const lineSize = width / (lineCount * 1.2)
  anime({
    targets: '.ctn > .line-point',
    borderRadius: lineSize,
    width: lineSize,
    height: lineSize,
    translateX: function (_, i) {
      return padding + (i / lineCount) * (width - padding * 2)
    },
    translateY: yFuncs.map((fn) => {
      return function (_, i) {
        return fn((i / lineCount) * 2 * Math.PI) * (height / 2 - padding) + height / 2
      }
    }),
    backgroundColor: '#E06C63',
  })
})

const px = (d) => `${d}px`
</script>

<template>
  <div class="p-2 d-01">
    <div ref="ctn" class="ctn" :style="{ width: px(width), height: px(height) }">
      <div class="line-point" v-for="_ in lineCount"></div>
    </div>
  </div>
</template>

<style lang="scss">
.d-01 {
  .ctn {
    position: relative;
    outline: 1px solid #ddd;
    > div {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
