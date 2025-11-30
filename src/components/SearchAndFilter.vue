<script setup lang="ts">
import { difficulties, sortOptions, tagsList } from '@/config/presentations'
import { useSearchAndFilter } from '@/utils/composables'
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  compact?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const {
  searchQuery,
  selectedTags,
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
  if (selectedTags.value.length > 0) count++
  if (selectedDifficulty.value !== 'all') count++
  if (selectedCategory.value !== 'all') count++
  return count
})

const difficultyLabels = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
}

function toggleTag(tag: string) {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

function removeTag(tag: string) {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="search-filter-container" :class="{ compact: props.compact }">
    <!-- 紧凑型搜索栏 -->
    <div class="relative">
      <div class="relative">
        <MagnifyingGlassIcon
          class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        />
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          placeholder="搜索演示文稿..."
          class="w-full rounded-xl border border-accent/20 bg-surface/40 px-10 py-2.5 text-sm text-text-primary placeholder-text-muted transition-all duration-200 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
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

    <!-- 紧凑型筛选控制 -->
    <div class="flex items-center justify-between mt-3">
      <button
        @click="isFilterOpen = !isFilterOpen"
        class="flex items-center gap-2 rounded-lg border border-accent/20 bg-surface/40 px-3 py-1.5 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent/40 hover:bg-accent/10"
      >
        <AdjustmentsHorizontalIcon class="h-4 w-4" />
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
        清除筛选
      </button>
    </div>

    <!-- 紧凑型筛选面板 -->
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
        class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 rounded-xl border border-accent/20 bg-surface/40 p-4"
      >
        <!-- 分类筛选 -->
        <div>
          <h3
            class="mb-2 text-xs font-semibold text-text-primary uppercase tracking-wider"
          >
            分类
          </h3>
          <select
            v-model="selectedCategory"
            class="w-full rounded-lg border border-accent/20 bg-surface/60 px-2 py-1.5 text-xs text-text-primary transition-colors duration-200 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
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
            class="mb-2 text-xs font-semibold text-text-primary uppercase tracking-wider"
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
            class="mb-2 text-xs font-semibold text-text-primary uppercase tracking-wider"
          >
            排序
          </h3>
          <select
            v-model="sortBy"
            class="w-full rounded-lg border border-accent/20 bg-surface/60 px-2 py-1.5 text-xs text-text-primary transition-colors duration-200 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
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

        <!-- 快速标签 -->
        <div>
          <h3
            class="mb-2 text-xs font-semibold text-text-primary uppercase tracking-wider"
          >
            快速标签
          </h3>
          <div class="flex flex-wrap gap-1">
            <button
              v-for="tag in tagsList.slice(0, 6)"
              :key="tag"
              @click="toggleTag(tag)"
              :class="[
                'rounded-md border px-2 py-1 text-xs font-medium transition-all duration-200',
                selectedTags.includes(tag)
                  ? 'border-accent bg-accent/20 text-accent'
                  : 'border-accent/20 bg-surface/60 text-text-primary hover:border-accent/40',
              ]"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 已选标签（紧凑显示） -->
    <div v-if="selectedTags.length > 0" class="mt-3 flex items-center gap-2">
      <span class="text-xs text-text-muted">已选:</span>
      <div class="flex flex-wrap gap-1">
        <span
          v-for="tag in selectedTags.slice(0, 5)"
          :key="tag"
          class="flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent"
        >
          {{ tag }}
          <button
            @click="removeTag(tag)"
            class="rounded-full p-0.5 transition hover:bg-accent/30"
          >
            <XMarkIcon class="h-2.5 w-2.5" />
          </button>
        </span>
        <span
          v-if="selectedTags.length > 5"
          class="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent/60"
        >
          +{{ selectedTags.length - 5 }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-filter-container {
  @apply space-y-3;
}

.search-filter-container.compact {
  @apply space-y-2;
}

/* 紧凑模式下的调整 */
.compact input {
  @apply py-2 text-sm;
}

.compact button {
  @apply text-sm;
}
</style>
