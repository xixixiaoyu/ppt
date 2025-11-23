<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <section class="h-full w-full grid place-items-center p-6 md:p-8">
    <div class="text-center max-w-5xl">
      <blockquote class="text-4xl md:text-6xl font-semibold tracking-tight text-slate-800">
        “我们公司项目管理应该用什么工具？”
      </blockquote>
      <p class="mt-6 text-lg md:text-xl text-slate-600">— 一位新同事的提问</p>
    </div>
  </section>
</template>
