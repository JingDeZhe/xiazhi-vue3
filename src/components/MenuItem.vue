<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
})

const isLeaf = computed(() => !!props.item.component)
</script>

<template>
  <el-menu-item v-if="isLeaf" :index="item.path">{{ item.name }}</el-menu-item>
  <el-sub-menu :index="item.name" v-else>
    <template #title>
      <span>{{ item.name }}</span>
    </template>
    <menu-item v-for="d in item.children" :item="d"></menu-item>
  </el-sub-menu>
</template>

<style lang="scss"></style>
