<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

interface Presentation {
  id: string
  title: string
  description: string
  route: string
}

interface Category {
  id: string
  name: string
  expanded: boolean
  presentations: Presentation[]
}

const categories = ref<Category[]>([
  {
    id: 'demo',
    name: '大模型',
    expanded: true,
    presentations: [
      {
        id: 'acp-llm-tutorial',
        title: 'acp',
        description: '',
        route: '/llm',
      },
    ],
  },
])

const toggleCategory = (categoryId: string) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  if (category) {
    category.expanded = !category.expanded
  }
}
</script>

<template>
  <div
    class="home-shell relative min-h-screen overflow-hidden bg-surface text-text-primary"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute inset-0 bg-gradient-to-br from-surface/40 via-surface/10 to-accent/10"
      ></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgb(var(--accent)/0.25),transparent_50%),radial-gradient(circle_at_80%_30%,rgb(var(--accent)/0.2),transparent_45%)]"
      ></div>
    </div>

    <div class="relative z-10 flex min-h-screen flex-col">
      <header
        class="container mx-auto max-w-6xl px-6 md:px-8 pt-20 text-center"
      >
        <p class="text-xs uppercase tracking-[0.6em] text-accent/70">
          PRESENTATION DECKS
        </p>
        <h1
          class="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
        >
          演示文稿集合
        </h1>
        <div class="mt-8">
          <RouterLink
            to="/design-language-template"
            class="inline-flex items-center gap-2 rounded-full bg-accent/20 px-6 py-3 text-sm font-medium text-accent transition-all duration-200 hover:bg-accent/30 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[rgb(var(--accent))] focus-visible:outline-offset-2"
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
            设计语言模板
          </RouterLink>
        </div>
      </header>

      <main class="flex-1">
        <section class="container mx-auto max-w-6xl px-6 md:px-8 pb-16">
          <div
            class="rounded-3xl border border-accent/20 bg-surface-muted/60 backdrop-blur-xl shadow-[0_0_120px_-60px_rgba(var(--accent),0.35)] overflow-hidden"
          >
            <div
              class="border-b border-accent/10 px-8 py-6 flex items-end justify-between"
            >
              <h2 class="text-lg font-medium text-text-primary">演示列表</h2>
              <span class="text-xs uppercase tracking-widest text-accent/70"
                >{{ categories.length }} Categories</span
              >
            </div>

            <div class="px-6 md:px-8 py-6">
              <div class="space-y-6">
                <section
                  v-for="category in categories"
                  :key="category.id"
                  class="rounded-2xl border border-accent/10 bg-surface/40"
                >
                  <button
                    @click="toggleCategory(category.id)"
                    :aria-expanded="category.expanded"
                    class="group flex w-full items-center justify-between gap-6 rounded-2xl px-5 py-4 text-left transition-colors duration-200 hover:bg-accent/10"
                  >
                    <div class="flex items-center gap-3">
                      <span
                        class="inline-flex w-[2px] h-4 bg-gradient-to-b from-accent to-accent/40"
                        aria-hidden="true"
                      ></span>
                      <div>
                        <h3
                          class="text-base font-bold uppercase tracking-widest text-text-primary"
                        >
                          {{ category.name }}
                        </h3>
                        <p class="text-xs text-text-muted">
                          {{ category.presentations.length }} 个演示文稿
                        </p>
                      </div>
                    </div>
                    <svg
                      class="h-4 w-4 text-accent transition-transform duration-200"
                      :class="{ 'rotate-180': category.expanded }"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  <transition
                    enter-active-class="transition duration-200 ease-out"
                    enter-from-class="opacity-0 -translate-y-2"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition duration-150 ease-in"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-2"
                  >
                    <ul
                      v-show="category.expanded"
                      class="divide-y divide-accent/10 border-t border-accent/10"
                    >
                      <li
                        v-for="presentation in category.presentations"
                        :key="presentation.id"
                      >
                        <RouterLink
                          :to="presentation.route"
                          class="flex items-start gap-3 px-5 py-4 transition-colors duration-200"
                          :class="[
                            presentation.route === '#'
                              ? 'pointer-events-none text-text-muted'
                              : 'hover:bg-accent/10',
                            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[rgb(var(--accent))] focus-visible:outline-offset-2',
                          ]"
                        >
                          <span
                            class="inline-flex w-[2px] h-3 mt-[3px] bg-gradient-to-b from-accent to-accent/40"
                            aria-hidden="true"
                          ></span>
                          <div class="flex-1">
                            <p class="text-sm font-medium text-text-primary">
                              {{ presentation.title }}
                            </p>
                            <p
                              class="mt-1 text-sm leading-relaxed text-text-muted"
                            >
                              {{ presentation.description }}
                            </p>
                          </div>
                          <svg
                            v-if="presentation.route !== '#'"
                            class="mt-1 h-4 w-4 text-accent"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          >
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                        </RouterLink>
                      </li>
                    </ul>
                  </transition>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.home-shell::after {
  content: '';
  position: absolute;
  inset: -40%;
  background: conic-gradient(
    from 90deg at 50% 50%,
    rgb(var(--accent) / 0.12),
    transparent 30%,
    transparent 60%,
    rgb(var(--accent) / 0.12)
  );
  filter: blur(120px);
  opacity: 0.5;
  pointer-events: none;
}
</style>
