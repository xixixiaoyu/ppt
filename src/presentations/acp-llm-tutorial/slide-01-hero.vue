<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <section
    class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16 h-full grid place-items-center"
  >
    <div class="text-center">
      <h1
        class="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400"
      >
        构建生产级大模型问答系统
      </h1>
      <p class="mt-5 text-lg md:text-2xl text-slate-700 max-w-4xl mx-auto">
        从入门到部署的全链路实践
      </p>
    </div>
  </section>
</template>
