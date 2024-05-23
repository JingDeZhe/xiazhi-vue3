<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { onMounted } from 'vue'

const editor = new Editor({
  content: 'talk is cheap',
  extensions: [StarterKit],
})

onMounted(() => {})
</script>

<template>
  <div class="p-2">
    <editor-content :editor="editor"></editor-content>
  </div>
</template>

<style lang="scss"></style>
