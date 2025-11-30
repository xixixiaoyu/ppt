<script setup lang="ts">
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: 'grid' | 'list'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: 'grid' | 'list']
}>()

const viewMode = computed({
  get: () => props.modelValue,
  set: (value: 'grid' | 'list') => emit('update:modelValue', value),
})
</script>

<template>
  <div class="view-toggle">
    <div
      class="inline-flex rounded-lg border border-accent/20 bg-surface/40 p-1"
    >
      <button
        @click="viewMode = 'grid'"
        :class="[
          'rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
          viewMode === 'grid'
            ? 'bg-accent/20 text-accent shadow-sm'
            : 'text-text-muted hover:text-text-primary',
        ]"
        title="网格视图"
      >
        <Squares2X2Icon class="h-4 w-4" />
      </button>
      <button
        @click="viewMode = 'list'"
        :class="[
          'rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
          viewMode === 'list'
            ? 'bg-accent/20 text-accent shadow-sm'
            : 'text-text-muted hover:text-text-primary',
        ]"
        title="列表视图"
      >
        <ListBulletIcon class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.view-toggle {
  @apply relative;
}
</style>
