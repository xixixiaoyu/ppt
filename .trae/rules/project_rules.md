
# 指导 AI 生成演示文稿的规则

本文档旨在为 AI 提供明确的指导，以生成符合 `presentations_by_ai` 项目规范的演示文稿。

## 1. 基本原则

- **文件格式**：每一页幻灯片都是一个独立的 Vue 3 单文件组件。
- **技术栈**：项目使用 Vue 3 (`<script setup>`)、TypeScript 和 Tailwind CSS。AI 生成的代码必须严格遵循这些技术。
- **文件命名**：幻灯片文件应遵循 `slide-XX-kebab-case-title.vue` 的格式，其中 `XX` 是两位数的幻灯片编号。
- **响应式设计**：所有幻灯片都必须是响应式的，能在从小屏幕到大屏幕的各种设备上良好显示。

## 2. 组件结构

每个幻灯片 Vue 组件都应包含以下部分：

- **`<script setup lang="ts">`**：
    - 必须使用 `defineProps` 定义 `isActive` 和 `isPreview` 两个布尔类型的 props。
    - 如果页面内容是动态的（如目录、列表），应在此处定义数据数组或对象。
- **`<template>`**：
    - 包含幻灯片的 HTML 结构。
    - 布局应使用 `<section>` 或 `<div>` 标签，并利用 Tailwind CSS 进行布局。

## 3. 内容指南

- **标题**：使用 `<h1>` (主标题) 或 `<h2>` (副标题) 标签。
- **正文**：使用 `<p>` 标签。
- **列表**：对于有序或无序列表，可以使用 `v-for` 指令动态渲染，数据源定义在 `<script>` 部分。
- **引用**：使用 `<blockquote>` 标签。
- **代码**：使用 `<pre>` 和 `<code>` 标签，并配合适当的样式。

## 4. 样式规范

- **禁止使用 `<style>` 块**：所有样式都必须通过 Tailwind CSS 的原子化类来实现。
- **布局**：
    - 使用 Flexbox (`flex`, `items-center`, `justify-between`, 等) 和 Grid (`grid`, `grid-cols-*`, `gap-*`) 进行布局。
    - 使用 `container`, `mx-auto`, `px-*` 来控制内容的边距和内边距。
- **文本**：
    - 使用 `text-*` (如 `text-5xl`, `text-center`, `text-slate-700`) 控制字体大小、对齐和颜色。
    - 使用 `font-*` (如 `font-bold`, `font-extrabold`) 控制字重。
    - 使用 `tracking-*` 控制字间距。
- **颜色**：
    - 优先使用项目预设的调色板 (如 `slate`, `indigo`, `fuchsia`, `emerald`)。
    - 可以使用渐变色 (`bg-gradient-to-*`) 来创造视觉吸引力。
- **动效**：
    - 使用 `transition` 和 `hover:*` 来添加平滑的交互效果。

## 示例：创建一个简单的内容页

```vue
<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <section class="h-full w-full grid place-items-center p-6">
    <div class="text-center max-w-3xl">
      <h2 class="text-4xl font-bold text-slate-800">
        这里是标题
      </h2>
      <p class="mt-4 text-lg text-slate-600">
        这里是正文内容。使用 Tailwind CSS 来确保排版清晰、美观。
      </p>
    </div>
  </section>
</template>
```
