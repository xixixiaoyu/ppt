<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const quote = '张伟是哪个部门的？'
const author = '用户的又一个新问题'
const role = 'RAG 应用面临的新挑战：检索召回不准确，导致大模型回答错误。'
</script>

<template>
  <section class="h-full w-full grid place-items-center p-6 md:p-8">
    <div class="max-w-4xl text-center">
      <h2 class="text-5xl font-extrabold tracking-tight text-slate-800">
        新问题：答案依然不够好？
      </h2>
      <div class="mt-10 rounded-3xl border border-slate-200/30 bg-white/70 backdrop-blur-md shadow-2xl p-8 transition hover:-translate-y-0.5">
        <blockquote
          class="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"
        >
          “{{ quote }}”
        </blockquote>
        <div class="mt-6 flex items-center justify-center">
          <div class="text-slate-600">
            <span class="font-semibold text-slate-800">— {{ author }}</span>
            <p class="mt-2 text-sm">{{ role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
