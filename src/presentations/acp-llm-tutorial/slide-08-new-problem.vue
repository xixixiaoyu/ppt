<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <section class="h-full w-full grid place-items-center p-6 md:p-8">
    <div class="text-center max-w-5xl">
      <h2 class="text-3xl md:text-4xl font-bold text-slate-800">新问题：答案依然不够好？</h2>
      <blockquote
        class="mt-8 text-4xl md:text-6xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"
      >
        “张伟是哪个部门的？”
      </blockquote>
      <p class="mt-6 text-lg md:text-xl text-slate-600">— 用户的又一个新问题</p>
      <p class="text-sm text-slate-500 mt-12">
        RAG 应用面临的新挑战：检索召回不准确，导致大模型回答错误。
      </p>
    </div>
  </section>
</template>
