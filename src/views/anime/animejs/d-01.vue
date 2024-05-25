<script setup>
import anime from 'animejs'
import { onMounted, ref } from 'vue'
const ctn = ref()

const easings = [...Object.keys(anime.penner)]
easings.push(`steps(${anime.random(5, 20)})`)
easings.push(`cubicBezier(0.545, 0.475, 0.145, 1)`)

const easing = ref()
const count = 101
function myAinme() {
  easing.value = easings[anime.random(0, easings.length - 1)]
  const duration = 450

  anime
    .timeline({
      complete: myAinme,
      easing: easing.value,
      duration,
    })
    .add({
      targets: '.d-01 .bar',
      scaleY: anime.stagger([1, 100], {
        easing: easing.value,
        from: 'center',
        direction: 'reverse',
      }),
      delay: anime.stagger(14, { from: 'center' }),
    })
    .add(
      {
        targets: '.d-01 .point',
        translateY: anime.stagger([-100, 100], {
          easing: easing.value,
          from: 'last',
        }),
        delay: anime.stagger(10, { from: 'center' }),
      },
      0
    )
}

myAinme()
</script>

<template>
  <div class="bg-gray-800 screen-box all-center d-01">
    <div class="text-white font-serif">{{ easing }}</div>
    <div ref="ctn" class="ctn relative">
      <div class="wrapper">
        <div class="bar" v-for="_ in count"></div>
      </div>
      <div class="wrapper">
        <div class="point" v-for="_ in count"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.d-01 {
  .ctn {
    width: 100%;
    max-width: 1000px;
    height: 500px;
    position: relative;
    .wrapper {
      display: flex;
      align-items: center;
      position: absolute;
      inset: 0;
    }
    .bar {
      width: 4px;
      height: 4px;
      margin: 0 3px;
      background-color: #ccc;
      transform-origin: 50% 50%;
    }
    .point {
      width: 10px;
      height: 10px;
      background-color: #fc573f;
      border-radius: 50%;
    }
  }
}
</style>
