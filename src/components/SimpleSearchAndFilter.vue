<script setup lang="ts">
import { difficulties, sortOptions } from '@/config/presentations'
import { useSearchAndFilter } from '@/utils/composables'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const {
  searchQuery,
  selectedDifficulty,
  selectedCategory,
  sortBy,
  clearFilters,
} = useSearchAndFilter()

const isFilterOpen = ref(props.modelValue)

watch(
  () => props.modelValue,
  newVal => {
    isFilterOpen.value = newVal
  }
)

watch(isFilterOpen, newVal => {
  emit('update:modelValue', newVal)
})

const activeFiltersCount = computed(() => {
  let count = 0
  if (searchQuery.value.trim()) count++
  if (selectedDifficulty.value !== 'all') count++
  if (selectedCategory.value !== 'all') count++
  return count
})

const difficultyLabels = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
}
</script>

<template>
  <div class="simple-search-filter">
    <!-- 极简搜索栏 -->
    <div class="relative">
      <div class="relative">
        <MagnifyingGlassIcon
          class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索..."
          class="w-full rounded-lg border border-accent/20 bg-surface/40 px-10 py-2 text-sm text-text-primary placeholder-text-muted transition-all duration-200 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
        />
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-text-muted/20 p-0.5 text-text-muted transition hover:bg-text-muted/30"
        >
          <XMarkIcon class="h-full w-full" />
        </button>
      </div>
    </div>

    <!-- 极简筛选控制 -->
    <div class="flex items-center justify-between mt-3">
      <button
        @click="isFilterOpen = !isFilterOpen"
        class="flex items-center gap-2 rounded-lg border border-accent/20 bg-surface/40 px-3 py-1.5 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent/40 hover:bg-accent/10"
      >
        <svg
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707L6.586 16H4a1 1 0 01-1-1v-2zm0 8a1 1 0 011-1h2.586l6.414 6.414a1 1 0 00.707.293L21 14.414V17a1 1 0 01-1 1h-2.586l12.707 12.707a1 1 0 00.293-.707L19.414 16H21a1 1 0 001-1v-2z"
          />
        </svg>
        <span>筛选</span>
        <span
          v-if="activeFiltersCount > 0"
          class="rounded-full bg-accent/20 px-1.5 py-0.5 text-xs font-bold text-accent min-w-[1.25rem] text-center"
        >
          {{ activeFiltersCount }}
        </span>
      </button>

      <button
        v-if="activeFiltersCount > 0"
        @click="clearFilters"
        class="text-xs text-text-muted transition-colors duration-200 hover:text-text-primary"
      >
        清除
      </button>
    </div>

    <!-- 极简筛选面板 -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="isFilterOpen"
        class="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 rounded-lg border border-accent/20 bg-surface/40 p-3"
      >
        <!-- 分类筛选 -->
        <div>
          <h3
            class="mb-2 text-xs font-medium text-text-muted uppercase tracking-wider"
          >
            分类
          </h3>
          <select
            v-model="selectedCategory"
            class="w-full rounded-md border border-accent/20 bg-surface/60 px-2 py-1.5 text-xs text-text-primary transition-colors duration-200 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
          >
            <option value="all">所有分类</option>
            <option value="llm">大模型</option>
            <option value="templates">设计模板</option>
            <option value="data-visualization">数据可视化</option>
            <option value="web-development">Web 开发</option>
          </select>
        </div>

        <!-- 难度筛选 -->
        <div>
          <h3
            class="mb-2 text-xs font-medium text-text-muted uppercase tracking-wider"
          >
            难度
          </h3>
          <div class="flex gap-1">
            <button
              v-for="difficulty in difficulties"
              :key="difficulty"
              @click="
                selectedDifficulty =
                  selectedDifficulty === difficulty ? 'all' : difficulty
              "
              :class="[
                'rounded-md border px-2 py-1 text-xs font-medium transition-all duration-200',
                selectedDifficulty === difficulty
                  ? 'border-accent bg-accent/20 text-accent'
                  : 'border-accent/20 bg-surface/60 text-text-primary hover:border-accent/40',
              ]"
            >
              {{ difficultyLabels[difficulty] }}
            </button>
          </div>
        </div>

        <!-- 排序选项 -->
        <div>
          <h3
            class="mb-2 text-xs font-medium text-text-muted uppercase tracking-wider"
          >
            排序
          </h3>
          <select
            v-model="sortBy"
            class="w-full rounded-md border border-accent/20 bg-surface/60 px-2 py-1.5 text-xs text-text-primary transition-colors duration-200 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
          >
            <option
              v-for="option in sortOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.simple-search-filter {
  @apply space-y-3;
}

/* 极简样式，去除所有装饰 */
.simple-search-filter * {
  @apply focus:outline-none;
}

.simple-search-filter *:focus-visible {
  @apply outline-1 outline-offset-1 outline-[rgb(var(--accent))];
}
</style>
