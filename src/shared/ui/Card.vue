<script setup lang="ts">
import { computed } from 'vue'

type Tone = 'default' | 'dark'
type Pad = 'none' | 'sm' | 'md' | 'lg' | 'xl'
type Round = '2xl' | '3xl' | '[2rem]'

const props = defineProps<{
  tone?: Tone
  padding?: Pad
  rounded?: Round
  hoverLift?: boolean
  as?: 'div' | 'section' | 'article'
  class?: string
}>()

const baseClass = computed(() => {
  if ((props.tone ?? 'default') === 'dark') {
    return 'relative overflow-hidden border rounded-2xl bg-slate-800/80 border-slate-700/80 text-slate-200 shadow-2xl backdrop-blur-sm'
  }
  return 'relative overflow-hidden border rounded-3xl bg-white/70 border-slate-200/30 shadow-2xl backdrop-blur-md'
})

const roundClass = computed(() => {
  const map: Record<Round, string> = {
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    '[2rem]': 'rounded-[2rem]',
  }
  return map[props.rounded ?? '3xl']
})

const padClass = computed(() => {
  const map: Record<Pad, string> = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'px-8 py-16',
  }
  return map[props.padding ?? 'lg']
})

const hoverClass = computed(() =>
  props.hoverLift === false ? 'transition' : 'transition hover:-translate-y-0.5'
)

const tag = computed(() => props.as ?? 'div')
</script>

<template>
  <component :is="tag" :class="[baseClass, roundClass, padClass, hoverClass, props.class]">
    <slot />
  </component>
</template>
