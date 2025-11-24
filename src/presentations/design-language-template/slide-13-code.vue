<script setup lang="ts">
import { computed } from 'vue'
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const code = `// 示例：构建索引并查询
export async function demo() {
  const index = await buildIndex(docs)
  const engine = index.asQueryEngine({ similarity_top_k: 5 })
  const answer = await engine.query('示例问题')
  return answer
}`

const keywords = new Set([
  'const',
  'let',
  'var',
  'function',
  'return',
  'async',
  'await',
  'export',
  'import',
  'from',
  'new',
  'class',
  'try',
  'catch',
  'if',
  'else',
  'for',
  'while'
])

const escapeHtml = (s: string) => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

const isWordChar = (ch: string) => /[A-Za-z0-9_]/.test(ch)

const renderToken = (tok: string) => {
  const t = escapeHtml(tok)
  if (keywords.has(tok)) return `<span class='text-indigo-300 font-semibold'>${t}</span>`
  if (/^\d+(?:\.\d+)?$/.test(tok)) return `<span class='text-amber-300'>${t}</span>`
  if (tok === 'similarity_top_k') return `<span class='text-emerald-300'>${t}</span>`
  if (tok === 'buildIndex' || tok === 'asQueryEngine' || tok === 'query') return `<span class='text-cyan-300'>${t}</span>`
  return t
}

const highlight = (input: string) => {
  let out = ''
  let token = ''
  let i = 0
  const n = input.length
  let state: 'normal' | 'stringSingle' | 'stringDouble' | 'lineComment' | 'blockComment' = 'normal'
  while (i < n) {
    const ch = input[i]
    const next = i + 1 < n ? input[i + 1] : ''
    if (state === 'normal') {
      if (ch === '/' && next === '/') {
        if (token) { out += renderToken(token); token = '' }
        state = 'lineComment'
        out += `<span class='text-slate-400'>${escapeHtml('//')}`
        i += 2
        continue
      }
      if (ch === '/' && next === '*') {
        if (token) { out += renderToken(token); token = '' }
        state = 'blockComment'
        out += `<span class='text-slate-400'>${escapeHtml('/*')}`
        i += 2
        continue
      }
      if (ch === '\'' || ch === '"') {
        if (token) { out += renderToken(token); token = '' }
        const delim = ch
        state = ch === '\'' ? 'stringSingle' : 'stringDouble'
        out += `<span class='text-fuchsia-300'>${escapeHtml(delim)}`
        i++
        while (i < n) {
          const c = input[i]
          if (c === '\\') {
            out += escapeHtml(c)
            i++
            if (i < n) { out += escapeHtml(input[i]); i++ }
            continue
          }
          if (c === delim) {
            out += escapeHtml(c)
            out += '</span>'
            state = 'normal'
            i++
            break
          }
          out += escapeHtml(c)
          i++
        }
        continue
      }
      if (isWordChar(ch)) {
        token += ch
        i++
        continue
      }
      if (token) { out += renderToken(token); token = '' }
      out += escapeHtml(ch)
      i++
      continue
    }
    if (state === 'lineComment') {
      if (ch === '\n') {
        out += '</span>'
        out += '\n'
        state = 'normal'
        i++
        continue
      }
      out += escapeHtml(ch)
      i++
      continue
    }
    if (state === 'blockComment') {
      if (ch === '*' && next === '/') {
        out += escapeHtml('*/')
        out += '</span>'
        i += 2
        state = 'normal'
        continue
      }
      out += escapeHtml(ch)
      i++
      continue
    }
  }
  if (token) out += renderToken(token)
  return out
}

const highlightedCode = computed(() => highlight(code))

const highlights = [
  '结构清晰：索引构建 → 查询引擎 → 提问',
  '参数可调：如 similarity_top_k 展示检索范围',
  '讲解友好：适合技术分享中的代码走读'
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        代码展示（占位）
      </h2>
      <p class="mt-2 text-slate-600">用于技术分享与架构评审，突出关键片段与要点。</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        class="bg-slate-900/80 text-slate-100 rounded-2xl border border-white/10 p-6 font-mono text-sm leading-relaxed"
      >
        <pre class="whitespace-pre-wrap break-words"><code class="whitespace-pre-wrap break-words" v-html="highlightedCode" /></pre>
      </div>
      <div class="space-y-4">
        <div
          v-for="(h, i) in highlights"
          :key="i"
          class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-2xl p-5"
        >
          <h3 class="font-bold text-slate-900">要点 {{ i + 1 }}</h3>
          <p class="mt-1 text-slate-700 text-sm">{{ h }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
