<script setup>
import { computed } from 'vue'
import routes from '~pages'
import MenuItem from './MenuItem.vue'

const buildRouteTree = (items) => {
  let tree = { name: 'root', children: [] }

  for (let item of items) {
    let parts = item.path.split('/')
    if (parts[0] === '') parts.shift()

    let currentNode = tree
    for (let i = 0; i < parts.length; i++) {
      let part = parts[i]
      let existingPath = currentNode.children.find((child) => child.name === part)

      if (i === parts.length - 1) {
        let leafNode = { name: part, ...item }
        leafNode.name = leafNode.path.replace(/.*\/(.*)$/, '$1')
        currentNode.children.push(leafNode)
      } else {
        if (!existingPath) {
          let newNode = { name: part, children: [] }
          currentNode.children.push(newNode)
          existingPath = newNode
        }
        currentNode = existingPath
      }
    }
  }

  return tree.children
}

const routeTree = computed(() => buildRouteTree(routes))
</script>

<template>
  <el-popover popper-class="menu-pop" placement="top-start" :width="400" trigger="click">
    <el-scrollbar height="60vh">
      <el-menu mode="vertical" router>
        <menu-item v-for="d in routeTree" :item="d"></menu-item>
      </el-menu>
    </el-scrollbar>
    <template #reference>
      <el-button class="m-2 fixed bottom-0 left-0">
        <i class="i-tabler-menu-2"></i>
      </el-button>
    </template>
  </el-popover>
</template>

<style lang="scss">
.menu-pop {
  overflow: hidden;
  padding: 0 !important;
  .el-menu {
    border-right: none;
  }
}
</style>
