<script setup lang="ts">
import type { Category, Presentation } from '@/config/presentations'
import { AcademicCapIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  categories: Category[]
  viewMode: 'grid' | 'list'
}>()

const difficultyLabels = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
}

const difficultyColors = {
  beginner: 'text-green-500 bg-green-500/10',
  intermediate: 'text-yellow-500 bg-yellow-500/10',
  advanced: 'text-red-500 bg-red-500/10',
}

function getDifficultyColor(difficulty?: string) {
  return (
    difficultyColors[difficulty as keyof typeof difficultyColors] ||
    'text-gray-500 bg-gray-500/10'
  )
}

function getCategoryColor(categoryId: string) {
  const colors: Record<string, string> = {
    llm: 'from-teal-500 to-teal-400',
    templates: 'from-purple-500 to-purple-400',
    'data-visualization': 'from-blue-500 to-blue-400',
    'web-development': 'from-green-500 to-green-400',
  }
  return colors[categoryId] || 'from-accent to-accent/70'
}

function getCategoryIcon(categoryId: string) {
  const icons: Record<string, string> = {
    llm: '🧠',
    templates: '🎨',
    'data-visualization': '📊',
    'web-development': '💻',
  }
  return icons[categoryId] || '📁'
}

// 将所有演示文稿合并为一个数组
const allPresentations = computed(() => {
  const presentations: (Presentation & {
    categoryId: string
    categoryName: string
  })[] = []

  props.categories.forEach(category => {
    category.presentations.forEach(presentation => {
      presentations.push({
        ...presentation,
        categoryId: category.id,
        categoryName: category.name,
      })
    })
  })

  return presentations
})

// 按分类分组的演示文稿（用于列表视图）
const groupedPresentations = computed(() => {
  return props.categories.map(category => ({
    ...category,
    presentations: category.presentations.map(presentation => ({
      ...presentation,
      categoryId: category.id,
      categoryName: category.name,
    })),
  }))
})
</script>

<template>
  <div class="simple-presentation-container">
    <!-- 网格视图 - 极简卡片 -->
    <div v-if="viewMode === 'grid'" class="grid-view">
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
      >
        <RouterLink
          v-for="presentation in allPresentations"
          :key="presentation.id"
          :to="presentation.route"
          class="group relative bg-surface/40 border border-accent/10 rounded-lg overflow-hidden transition-all duration-200 hover:border-accent/30 hover:shadow-md hover:-translate-y-0.5 block"
          :class="
            presentation.route === '#' ? 'pointer-events-none opacity-60' : ''
          "
        >
          <!-- 极简卡片头部 -->
          <div
            class="relative h-16 bg-gradient-to-br p-3"
            :class="getCategoryColor(presentation.categoryId)"
          >
            <div
              class="flex h-6 w-6 items-center justify-center rounded bg-white/20 backdrop-blur-sm text-white text-xs font-bold"
            >
              {{ getCategoryIcon(presentation.categoryId) }}
            </div>
            <!-- 难度标识（右上角） -->
            <div v-if="presentation.difficulty" class="absolute top-2 right-2">
              <span
                :class="[
                  'inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium',
                  getDifficultyColor(presentation.difficulty),
                ]"
              >
                <AcademicCapIcon class="h-3 w-3" />
                {{ difficultyLabels[presentation.difficulty] }}
              </span>
            </div>
          </div>

          <!-- 极简卡片内容 -->
          <div class="p-3">
            <h3
              class="font-medium text-text-primary text-sm truncate group-hover:text-accent transition-colors"
            >
              {{ presentation.title }}
            </h3>
            <!-- 只显示分类名称，不显示其他元信息 -->
            <p class="text-xs text-accent/70 mt-1">
              {{ presentation.categoryName }}
            </p>
          </div>
        </RouterLink>
      </div>
    </div>

    <!-- 列表视图 - 极简列表 -->
    <div v-else class="list-view space-y-2">
      <div
        v-for="category in groupedPresentations"
        :key="category.id"
        class="category-section bg-surface/40 border border-accent/10 rounded-lg overflow-hidden"
      >
        <!-- 极简分类标题 -->
        <div
          class="flex items-center gap-3 p-3 border-b border-accent/10 bg-surface/60"
        >
          <div
            class="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br text-white text-xs font-bold"
            :class="getCategoryColor(category.id)"
          >
            {{ getCategoryIcon(category.id) }}
          </div>
          <h3 class="font-medium text-text-primary text-sm">
            {{ category.name }}
          </h3>
        </div>

        <!-- 极简演示文稿列表 -->
        <div class="divide-y divide-accent/10">
          <RouterLink
            v-for="presentation in category.presentations"
            :key="presentation.id"
            :to="presentation.route"
            class="flex items-center gap-3 p-3 transition-colors duration-200 hover:bg-accent/5 block"
            :class="
              presentation.route === '#' ? 'pointer-events-none opacity-60' : ''
            "
          >
            <div
              class="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br text-white text-xs font-bold flex-shrink-0"
              :class="getCategoryColor(presentation.categoryId)"
            >
              {{ getCategoryIcon(presentation.categoryId) }}
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h4 class="font-medium text-text-primary text-sm truncate">
                  {{ presentation.title }}
                </h4>
                <span
                  v-if="presentation.difficulty"
                  :class="[
                    'inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium flex-shrink-0',
                    getDifficultyColor(presentation.difficulty),
                  ]"
                >
                  <AcademicCapIcon class="h-3 w-3" />
                  {{ difficultyLabels[presentation.difficulty] }}
                </span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="allPresentations.length === 0" class="text-center py-16">
      <div
        class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted/60 mb-4"
      >
        <svg
          class="h-6 w-6 text-text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-text-primary mb-2">
        没有找到匹配的演示文稿
      </h3>
      <p class="text-sm text-text-muted">尝试调整搜索条件或清除筛选器</p>
    </div>
  </div>
</template>

<style scoped>
.simple-presentation-container {
  @apply w-full;
}

/* 极简网格样式 */
.grid-view .group:hover {
  @apply shadow-accent/20;
}

/* 极简列表样式 */
.category-section {
  @apply shadow-sm;
}

/* 去除所有不必要的装饰 */
.simple-presentation-container * {
  @apply focus:outline-none;
}

.simple-presentation-container *:focus-visible {
  @apply outline-2 outline-offset-2 outline-[rgb(var(--accent))];
}
</style>
