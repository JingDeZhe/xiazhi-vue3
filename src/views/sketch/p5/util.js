import { onMounted } from 'vue'
import p5 from 'p5'

/**
 * @param {(p: import('p5')) => void} fn
 */
export function useP5(fn, ctn) {
  onMounted(() => {
    new p5(fn, ctn.value)
  })
}
