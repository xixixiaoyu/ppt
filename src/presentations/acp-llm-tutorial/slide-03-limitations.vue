<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const quote = '我们公司项目管理应该用什么工具？'
const author = '一位新同事的提问'
</script>

<template>
  <section class="h-full w-full grid place-items-center p-6 lg:p-10">
    <div class="max-w-4xl">
      <div
        class="rounded-3xl border border-slate-200/30 bg-white/70 backdrop-blur-md shadow-2xl p-8 md:p-12 transition hover:-translate-y-0.5"
      >
        <blockquote
          class="text-3xl md:text-4xl leading-tight font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500"
        >
          “{{ quote }}”
        </blockquote>
        <div class="mt-8 flex items-center justify-center">
          <div class="text-slate-600">
            — <span class="font-medium text-slate-700">{{ author }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
