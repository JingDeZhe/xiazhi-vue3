<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  item: { type: Object, required: true },
})

const isLeaf = computed(() => !!props.item.component)
const handleClick = (e) => {
  router.push({ path: e.index })
}
</script>

<template>
  <el-menu-item v-if="isLeaf" :index="item.path" @click="handleClick">{{ item.name }}</el-menu-item>
  <el-sub-menu :index="item.name" v-else>
    <template #title>
      <span>{{ item.name }}</span>
    </template>
    <menu-item v-for="d in item.children" :item="d"></menu-item>
  </el-sub-menu>
</template>

<style lang="scss"></style>
