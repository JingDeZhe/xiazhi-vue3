<script setup>
import { Graph } from '@antv/g6'
import { onMounted, ref } from 'vue'

const ctn1 = ref()
onMounted(() => {
  const graph1 = new Graph({
    container: ctn1.value,
    width: 500,
    height: 500,
    data: getData(),
    layout: {
      type: 'force',
      linkDistance: 30,
      nodeStrength: 10,
      preventOverlap: true,
    },
    defaultNode: {
      size: 10,
      style: {
        fill: '#303030',
        stroke: '#303030',
      },
    },
    defaultEdge: {
      style: {
        stroke: '#303030',
      },
    },
    behaviors: [{ type: 'drag-element-force' }, 'zoom-canvas'],
  })

  graph1.render()
})

function getData(size = 10) {
  const nodes = Array.from({ length: size * size }, (_, i) => ({ id: `${i}` }))
  const edges = []
  for (let y = 0; y < size; ++y) {
    for (let x = 0; x < size; ++x) {
      if (y > 0) edges.push({ source: `${(y - 1) * size + x}`, target: `${y * size + x}` })
      if (x > 0) edges.push({ source: `${y * size + (x - 1)}`, target: `${y * size + x}` })
    }
  }
  return { nodes, edges }
}
</script>

<template>
  <div class="er-1">
    <div ref="ctn1" class="ctn"></div>
  </div>
</template>

<style lang="scss"></style>
