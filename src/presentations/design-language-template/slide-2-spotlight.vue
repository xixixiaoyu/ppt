<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <section class="h-full w-full flex items-center justify-center p-[clamp(2rem,5vw,6rem)] bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.08),transparent_55%),radial-gradient(circle_at_20%_70%,rgba(14,165,233,0.05),transparent_60%)]">
    <div class="text-center max-w-[960px]">
      <h2 class="mx-auto text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[1.05] text-slate-900/90">
        <span>用 </span>
        <span class="inline-block text-[1.2em] font-black tracking-tight text-transparent bg-clip-text bg-[linear-gradient(120deg,#6366f1,#d946ef,#34d399)] bg-[length:200%_200%]">关键字</span>
        <span> 点亮叙事</span>

      </h2>
    </div>
  </section>
</template>
