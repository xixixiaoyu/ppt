<script setup lang="ts">
import KeyboardShortcuts from '@/components/KeyboardShortcuts.vue'
import SimplePresentationGrid from '@/components/SimplePresentationGrid.vue'
import SimpleSearchAndFilter from '@/components/SimpleSearchAndFilter.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import ViewToggle from '@/components/ViewToggle.vue'
import { categoriesConfig } from '@/config/presentations'
import {
  useCategoryExpansion,
  useKeyboardNavigation,
  useLocalStorage,
  useResponsive,
  useSearchAndFilter,
} from '@/utils/composables'
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

// 使用组合式函数
const { filteredCategories } = useSearchAndFilter()
const { expandAll } = useCategoryExpansion()
const { isMobile } = useResponsive()

// 视图模式状态
const [viewMode, setViewMode] = useLocalStorage<'grid' | 'list'>(
  'presentation-view-mode',
  'grid'
)

// 响应式状态
const isFilterOpen = ref(false)

// 根据屏幕尺寸自动调整视图模式
const effectiveViewMode = computed(() => {
  if (isMobile.value) return 'list'
  return viewMode.value
})

// 键盘导航
const keyboardCallbacks = {
  '/': () => {
    const searchInput = document.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement
    searchInput?.focus()
  },
  f: () => {
    isFilterOpen.value = !isFilterOpen.value
  },
  escape: () => {
    isFilterOpen.value = false
  },
  g: () => {
    if (!isMobile.value) {
      setViewMode(viewMode.value === 'grid' ? 'list' : 'grid')
    }
  },
}

useKeyboardNavigation(keyboardCallbacks)

// 组件挂载时的初始化
onMounted(() => {
  // 默认展开第一个分类
  if (categoriesConfig.length > 0) {
    expandAll()
  }
})
</script>

<template>
  <div
    class="home-shell relative min-h-screen overflow-hidden bg-surface text-text-primary"
  >
    <!-- 简化背景效果 -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute inset-0 bg-gradient-to-br from-surface/30 via-surface/5 to-accent/5"
      ></div>
    </div>

    <div class="relative z-10 flex min-h-screen flex-col">
      <!-- 极简头部 -->
      <header class="container mx-auto max-w-7xl px-4 md:px-6 pt-12 pb-4">
        <div class="flex items-center justify-between">
          <!-- 标题 -->
          <div>
            <p class="text-xs uppercase tracking-[0.4em] text-accent/60 mb-1">
              演示文稿
            </p>
            <h1
              class="text-xl md:text-2xl font-bold tracking-tight text-text-primary"
            >
              演示文稿集合
            </h1>
          </div>

          <!-- 操作按钮 -->
          <div class="flex items-center gap-3">
            <RouterLink
              to="/template"
              class="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1.5 text-sm font-medium text-accent transition-all duration-200 hover:bg-accent/30 hover:scale-105"
            >
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
              模板
            </RouterLink>

            <!-- 视图切换 -->
            <ViewToggle v-if="!isMobile" v-model="viewMode" />

            <!-- 工具按钮 -->
            <div class="flex items-center gap-2">
              <ThemeToggle />
              <KeyboardShortcuts />
            </div>
          </div>
        </div>
      </header>

      <!-- 主要内容 -->
      <main class="flex-1">
        <section class="container mx-auto max-w-7xl px-4 md:px-6 pb-6">
          <!-- 极简搜索和筛选 -->
          <div class="mb-6">
            <SimpleSearchAndFilter v-model="isFilterOpen" />
          </div>

          <!-- 极简演示文稿展示 -->
          <SimplePresentationGrid
            :categories="filteredCategories"
            :view-mode="effectiveViewMode"
          />
        </section>
      </main>

      <!-- 极简页脚 -->
      <footer class="border-t border-accent/10 bg-surface-muted/30">
        <div class="container mx-auto max-w-7xl px-4 md:px-6 py-3">
          <div
            class="flex items-center justify-between text-xs text-text-muted"
          >
            <span>© 2024 演示文稿集合</span>
            <div class="flex items-center gap-3">
              <span
                >按
                <kbd
                  class="rounded border border-accent/20 bg-surface/60 px-1 py-0.5"
                  >?</kbd
                >
                查看快捷键</span
              >
              <span v-if="!isMobile"
                >按
                <kbd
                  class="rounded border border-accent/20 bg-surface/60 px-1 py-0.5"
                  >G</kbd
                >
                切换视图</span
              >
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.home-shell {
  /* 简化背景效果 */
}

.home-shell::after {
  content: '';
  position: absolute;
  inset: -30%;
  background: conic-gradient(
    from 90deg at 50% 50%,
    rgb(var(--accent) / 0.08),
    transparent 40%,
    transparent 60%,
    rgb(var(--accent) / 0.08)
  );
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
}

/* 极简移动端优化 */
@media (max-width: 768px) {
  .home-shell {
    @apply pb-12;
  }
}

/* 极简焦点样式 */
:focus-visible {
  @apply outline-1 outline-offset-1 outline-[rgb(var(--accent))];
}

/* 极简滚动条 */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  background: rgba(var(--surface-muted) / 0.2);
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb {
  background: rgb(var(--accent) / 0.4);
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--accent) / 0.6);
}

/* 极简动画优化 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
