<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const quote = '张伟是哪个部门的？'
const author = '用户的新问题'
const role = '挑战：召回不准，回答错误。'
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70">
        新问题：答案仍不够好？
      </h2>
      <div class="mt-10 rounded-3xl border border-slate-200/30 bg-white/70 backdrop-blur-md shadow-2xl p-8 transition hover:-translate-y-0.5">
        <blockquote
          class="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
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
