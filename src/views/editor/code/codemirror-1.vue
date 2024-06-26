<script setup>
import { onMounted, ref, shallowRef } from 'vue'
import { basicSetup, EditorView } from 'codemirror'
import { EditorState, Compartment } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import { cpp } from '@codemirror/lang-cpp'
import { oneDark } from '@codemirror/theme-one-dark'
import { tags } from '@lezer/highlight'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { codeJs, codeCpp } from './data/code-snippets'
import { toggleDark } from '@/utils'

toggleDark(true)
const ctn = ref()
const view = shallowRef()

const langConfig = new Compartment()
const readonlyConfig = new Compartment()

onMounted(() => {
  const themeNord = EditorView.theme(
    {
      '&': {
        color: 'var(--nord6)',
        backgroundColor: 'var(--nord0)',
        fontSize: '1rem',
      },
      '.cm-content': {
        caretColor: 'var(--nord6)',
        fontFamily: `'Fira Code', lxgw, monospace`,
      },
      '&.cm-focused .cm-cursor': {
        borderLeftColor: 'var(--nord13)',
        borderLeftWidth: '2px',
      },
      '&.cm-focused .cm-selectionBackground, ::selection': {
        backgroundColor: 'var(--nord3)',
      },
      '.cm-gutters': {
        backgroundColor: 'var(--nord2)',
        color: 'var(--nord4)',
        border: 'none',
      },
    },
    { dark: true }
  )

  const highlightNord = syntaxHighlighting(
    HighlightStyle.define([
      { tag: tags.keyword, color: 'var(--nord9)' },
      { tag: tags.comment, color: 'var(--nord14)', fontStyle: 'italic' },
      { tag: tags.number, color: 'var(--nord15)' },
      { tag: tags.string, color: 'var(--nord14)' },
      { tag: tags.bool, color: 'var(--nord13)' },
      { tag: tags.variableName, color: 'var(--nord12)' },
    ])
  )

  const state = EditorState.create({
    doc: codeJs,
    extensions: [
      basicSetup,
      langConfig.of(javascript()),
      readonlyConfig.of(EditorState.readOnly.of(false)),
      // oneDark,
      themeNord,
      highlightNord,
    ],
  })

  view.value = new EditorView({
    state,
    parent: ctn.value,
  })
})

let activeLang = 'js'
function toggleLanguage() {
  const v = view.value
  activeLang = activeLang === 'js' ? 'cpp' : 'js'
  const isJs = activeLang === 'js'
  v.dispatch({
    changes: [
      {
        from: 0,
        to: v.state.doc.length,
        insert: isJs ? codeJs : codeCpp,
      },
    ],
    effects: langConfig.reconfigure(isJs ? javascript() : cpp()),
  })
}

let readonly = false
function toggleReadonly() {
  const v = view.value
  readonly = !readonly
  v.dispatch({
    effects: readonlyConfig.reconfigure(EditorState.readOnly.of(readonly)),
  })
}

function focus() {
  const v = view.value
  v.focus()
  v.dispatch({
    selection: { anchor: v.state.doc.length },
  })
}

function printValue() {
  const v = view.value
  console.log(v.state.doc.toString())
}
</script>

<template>
  <div class="app-ctn col-ctn dcm">
    <div class="p-2 flex items-center gap-2 justify-end">
      <el-button @click="toggleReadonly">Toggle Readonly</el-button>
      <el-button @click="toggleLanguage">Toggle Language</el-button>
      <el-button @click="focus">Focus</el-button>
      <el-button @click="printValue">Print Value</el-button>
    </div>
    <div class="ctn-body overflow-hidden" ref="ctn"></div>
  </div>
</template>

<style lang="scss">
.dcm {
  .cm-editor {
    --at-apply: h-full;
  }
}
</style>
