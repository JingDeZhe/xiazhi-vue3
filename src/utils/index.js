import { useDark, useToggle } from '@vueuse/core'

export const toggleDark = useToggle(useDark())
