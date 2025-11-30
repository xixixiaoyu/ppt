<script setup lang="ts">
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const isOpen = ref(false)

const shortcuts = [
  { key: '/', description: '聚焦搜索框' },
  { key: 'f', description: '打开/关闭筛选器' },
  { key: 'Escape', description: '关闭弹窗/清除搜索' },
  { key: 'g', description: '切换视图模式（网格/列表）' },
  { key: 't', description: '切换主题' },
  { key: '?', description: '显示/隐藏此帮助面板' },
  { key: '→', description: '下一张幻灯片' },
  { key: '←', description: '上一张幻灯片' },
  { key: 'PageDown', description: '下一张幻灯片' },
  { key: 'PageUp', description: '上一张幻灯片' },
  { key: 'Home', description: '第一张幻灯片' },
  { key: 'End', description: '最后一张幻灯片' },
  { key: '1-9', description: '快速跳转到对应幻灯片' },
]
</script>

<template>
  <div class="keyboard-shortcuts">
    <!-- 触发按钮 -->
    <button
      @click="isOpen = !isOpen"
      class="group rounded-full border border-accent/20 bg-surface/40 p-2.5 transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[rgb(var(--accent))] focus-visible:outline-offset-2"
      title="键盘快捷键"
    >
      <QuestionMarkCircleIcon
        class="h-5 w-5 text-text-primary transition-transform duration-200 group-hover:scale-110"
      />
    </button>

    <!-- 快捷键面板 -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="fixed right-4 top-20 z-50 w-80 rounded-2xl border border-accent/20 bg-surface/60 shadow-2xl backdrop-blur-xl"
        @click.stop
      >
        <!-- 头部 -->
        <div
          class="flex items-center justify-between border-b border-accent/10 px-6 py-4"
        >
          <h3 class="text-lg font-semibold text-text-primary">键盘快捷键</h3>
          <button
            @click="isOpen = false"
            class="rounded-lg p-1 text-text-muted transition-colors duration-200 hover:bg-accent/10 hover:text-text-primary"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- 快捷键列表 -->
        <div class="max-h-96 overflow-y-auto p-6">
          <div class="space-y-3">
            <div
              v-for="shortcut in shortcuts"
              :key="shortcut.key"
              class="flex items-center justify-between gap-4"
            >
              <span class="text-sm text-text-muted">{{
                shortcut.description
              }}</span>
              <kbd
                class="rounded-md border border-accent/20 bg-surface/80 px-2 py-1 text-xs font-mono font-medium text-text-primary shadow-sm"
              >
                {{ shortcut.key }}
              </kbd>
            </div>
          </div>
        </div>

        <!-- 底部提示 -->
        <div class="border-t border-accent/10 px-6 py-3">
          <p class="text-xs text-text-muted text-center">
            按
            <kbd
              class="rounded border border-accent/20 bg-surface/80 px-1 py-0.5 text-xs"
              >Esc</kbd
            >
            关闭此面板
          </p>
        </div>
      </div>
    </transition>

    <!-- 遮罩层 -->
    <transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        @click="isOpen = false"
      ></div>
    </transition>
  </div>
</template>

<style scoped>
.keyboard-shortcuts {
  @apply relative;
}
</style>
