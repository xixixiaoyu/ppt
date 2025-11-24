<script setup lang="ts">
import { computed } from 'vue'

type Max = '4xl' | '5xl' | '6xl' | '7xl'
type Pad = 'sm' | 'md' | 'lg' | 'xl'

const props = defineProps<{ max?: Max; p?: Pad; class?: string }>()

const maxClass = computed(() => {
  const map: Record<Max, string> = {
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  }
  return map[props.max ?? '6xl']
})

const padClass = computed(() => {
  const map: Record<Pad, string> = {
    sm: 'px-6 md:px-8 lg:px-10 py-8 lg:py-10',
    md: 'px-6 md:px-8 lg:px-12 py-10 lg:py-12',
    lg: 'px-6 md:px-8 lg:px-12 py-12 lg:py-16',
    xl: 'px-6 md:px-10 lg:px-14 py-16 lg:py-20',
  }
  return map[props.p ?? 'lg']
})
</script>

<template>
  <section class="container mx-auto" :class="[maxClass, padClass, props.class]">
    <slot />
  </section>
</template>
