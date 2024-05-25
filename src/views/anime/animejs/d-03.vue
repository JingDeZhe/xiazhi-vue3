<script setup>
import anime from 'animejs'
import xiazhi from './xiazhi.vue'
import { onMounted } from 'vue'

onMounted(() => {
  const logoAnimation = anime.timeline({
    loop: true,
    direction: 'alternate',
  })
  const offsetTime = 600

  logoAnimation
    .add(
      {
        targets: '.d-03 #rl path',
        translateX: [-1000, 0],
        opacity: {
          value: [0, 1],
          duration: 100,
        },
        delay: (el, i) => offsetTime + i * 75,
        duration: 400,
        easing: 'easeOutExpo',
      },
      0
    )
    .add(
      {
        targets: '.d-03 #lr path',
        translateX: [1000, 0],
        opacity: {
          value: [0, 1],
          duration: 100,
        },
        delay: (el, i) => offsetTime + i * 75,
        duration: 400,
        easing: 'easeOutExpo',
      },
      0
    )
    .add(
      {
        targets: '.d-03 #tb path',
        translateY: [-1000, 0],
        opacity: {
          value: [0, 1],
          duration: 1000,
        },
        stroke: '#bf3553',
        delay: (el, i) => offsetTime + i * 75,
        duration: 1000,
        easing: 'easeOutExpo',
      },
      0
    )
    .add(
      {
        targets: '.d-03 #lbrt path',
        translateX: [-1000, 0],
        translateY: [1000, 0],
        opacity: {
          value: [0, 1],
          duration: 1000,
        },
        delay: (el, i) => offsetTime + i * 75,
        duration: 1000,
        easing: 'easeOutExpo',
      },
      0
    )
    .add(
      {
        targets: '.d-03 #rblt path',
        translateX: [1000, 0],
        translateY: [1000, 0],
        opacity: {
          value: [0, 1],
          duration: 1000,
        },
        delay: (el, i) => offsetTime + i * 75,
        duration: 1000,
        easing: 'easeOutExpo',
      },
      0
    )
    .add({
      duration: 1000,
    })
})
</script>

<template>
  <div class="screen-box theme-dark d-03">
    <xiazhi></xiazhi>
  </div>
</template>

<style lang="scss">
.d-03 {
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    stroke: #ccc;
  }
}
</style>
