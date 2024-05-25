<script setup>
import anime from 'animejs'
const grid = [40, 20]
const gridCount = grid[0] * grid[1]

let index = anime.random(0, gridCount - 1)
function play() {
  const colorRange = [anime.random(0, 256), anime.random(0, 256)]
  const lightnessRange = [anime.random(60, 80), anime.random(20, 40)]
  const saturation = 75

  function staggeredGridColors(el, i, total) {
    const hue = Math.floor(anime.stagger(colorRange, { grid, from: index })(el, i, total))
    const lightness = Math.floor(anime.stagger(lightnessRange, { grid, from: index })(el, i, total))
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  anime({
    targets: '.d-02 .dot',
    keyframes: [
      {
        zIndex: function (el, i, total) {
          return Math.round(anime.stagger([gridCount, 0], { grid, from: index })(el, i, total))
        },
        translateX: anime.stagger('-.001rem', { grid, from: index, axis: 'x' }),
        translateY: anime.stagger('-.001rem', { grid, from: index, axis: 'y' }),
        duration: 200,
      },
      {
        translateX: anime.stagger('.075rem', { grid, from: index, axis: 'x' }),
        translateY: anime.stagger('.075rem', { grid, from: index, axis: 'y' }),
        scale: anime.stagger([2, 0.2], { grid, from: index }),
        backgroundColor: staggeredGridColors,
        duration: 450,
      },
      {
        translateX: 0,
        translateY: 0,
        scale: 1,
        duration: 500,
      },
    ],
    delay: anime.stagger(60, { grid: grid, from: index }),
    easing: 'easeInOutQuad',
    complete: play,
  })

  index = anime.random(0, gridCount - 1)
}

play()
</script>

<template>
  <div class="theme-dark screen-box d-02">
    <div class="dot" v-for="_ in gridCount"></div>
  </div>
</template>

<style lang="scss">
.d-02 {
  display: grid;
  align-items: center;
  align-content: center;
  justify-content: center;
  gap: 10px;
  grid-template-columns: repeat(v-bind('grid[0]'), 10px);
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ccc;
  }
}
</style>
