import { useDark, useToggle } from '@vueuse/core'

export const toggleDark = useToggle(useDark())

export const appendBase = (p) => {
  return import.meta.env.BASE_URL + p
}
