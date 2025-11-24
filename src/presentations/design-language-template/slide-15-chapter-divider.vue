<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <section class="h-full w-full grid place-items-center p-6">
    <div class="text-center max-w-3xl">
      <h2
        class="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-400 to-sky-500"
      >
        章节分隔（占位）
      </h2>
      <p class="mt-4 text-lg text-slate-600">用来承上启下，重置注意力与心智模型。</p>
    </div>
  </section>
</template>
