# AI 协作项目指南

欢迎！我是你的良师益友。这份指南是我们的协作基石，旨在帮助你快速融入项目，遵循最佳实践，并与我高效协作，共同打造出色的演示文稿。

---

## 1. 黄金原则 (The Golden Rules)

这些是指导我们所有决策和编码的最高准则。请务必内化于心。

- **单一来源 (Single Source of Truth)**
  - **目标**: 杜绝重复，保证一致。
  - **实践**: 所有幻灯片集共享的功能（如导航、背景）**必须**位于 `src/shared/`。通过 Props 或注册表机制扩展，而非复制粘贴。

- **复用优于创造 (Reuse over Reinvention)**
  - **目标**: 提高效率，降低维护成本。
  - **实践**: 优先使用 `src/shared/` 中的现有组件（如 `ppt-container`）和功能。

- **代码即英文 (Code is English)**
  - **目标**: 保证代码的全局可读性和可维护性。
  - **实践**: 所有代码（变量、函数、类名、注释）**必须**使用英文。UI 中面向用户的文本则使用中文。

- **可发现性 (Discoverability)**
  - **目标**: 确保新功能可以被用户访问到。
  - **实践**: 每个新幻灯片集**必须**在 `src/router/index.ts` 注册路由，并在 `src/views/Home.vue` 的导航菜单中添加入口。

- **体验一致 (Consistent Experience)**
  - **目标**: 提供可预测、无缝的用户体验。
  - **实践**: 核心交互（如快捷键）需保持全局一致。若修改，**必须**同步更新所有 UI 提示。例如，背景浮层的快捷键是 `Ctrl / ⌘ + Shift + P`，关闭是 `Esc`。

- **配置优于硬编码 (Configuration over Hardcoding)**
  - **目标**: 提升灵活性和可维护性。
  - **实践**: 幻灯片集特有的文案应在 `src/locales/` 中管理。功能模块（如背景）应通过注册表动态加载。

---

## 2. 项目剖析 (Project Anatomy)

理解文件结构是高效工作的第一步。

| 类别 (Category)     | 关键文件/目录 (Key File/Directory)                  | 描述 (Description)                                     |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------ |
| **应用入口**        | `src/main.ts`                                       | Vue 应用的启动点。                                     |
|                     | `src/style.css`                                     | 全局样式。                                             |
| **核心导航与路由**  | `src/router/index.ts`                               | **注册新幻灯片集的地方**。                             |
|                     | `src/views/Home.vue`                                | 项目主页，**需要在这里链接到新的幻灯片集**。           |
| **幻灯片内容**      | `src/presentations/<slug>/index.vue`                | 单个幻灯片集的入口文件和内容组织。                     |
| **共享模块**        | `src/shared/presentation/ppt-container.vue`         | **所有幻灯片集都必须使用的基础容器**。                 |
|                     | `src/shared/backgrounds/`                           | 共享的背景系统。                                       |
|                     | `src/shared/backgrounds/registry.ts`                | 注册和管理所有可用背景。                               |
| **状态管理**        | `src/stores/`                                       | Pinia 状态管理。                                       |
| **文档**            | `docs/`                                             | 项目的规划笔记和草稿。                                 |

---

## 3. 开发者手册 (Developer's Playbook)

遵循标准工作流，确保规范和一致。

### 3.1 创建一个新的幻灯片集

1.  **创建文件**: 在 `src/presentations/` 下创建新目录 `<slug>`，并在其中创建 `index.vue`。
2.  **构建内容**: 在 `index.vue` 中，使用 `<script setup lang="ts">`，将幻灯片内容组织成数组，并传递给 `<ppt-container>`。
3.  **集成背景**: 导入并使用 `<BackgroundManager>` 组件。**禁止**硬编码背景，所有背景由共享组件统一管理。
4.  **注册路由**: 在 `src/router/index.ts` 中，为新幻灯片集添加一个**懒加载**的路由。
5.  **更新导航**: 在 `src/views/Home.vue` 的列表中，添加指向新幻灯片集的链接。
6.  **验证**: 运行 `npm run dev`，在浏览器中确保新幻灯片集可正常加载、导航和切换背景。

### 3.2 更新共享背景

- **同步快捷键**: 若修改快捷键，务必在 `background-manager.vue` 和 `background-settings-overlay.vue` 中同步更新描述文本。
- **保持无状态**: 共享背景模块自身不应持有状态。使用局部 `ref`，并在 `onUnmounted` 中清理资源。
- **注册新模块**: 新背景模块必须在 `registry.ts` 中注册，并提供有意义的 `name`、`description` 和 `tags`。

### 3.3 常用命令

| 命令                 | 描述 (Description)                     |
| -------------------- | -------------------------------------- |
| `npm run dev`        | 启动本地开发服务器。                   |
| `npm run build`      | 构建生产环境版本。                     |
| `vue-tsc --noEmit`   | 对整个项目进行 TypeScript 类型检查。   |

---

## 4. 设计系统 (The Design System)

本节定义了项目的视觉规范和组件模式，是确保所有演示文稿视觉一致性的核心。

### 4.1 设计令牌 (Design Tokens)

| 类别       | 元素             | 样式 (Tailwind CSS v3)                                                                          |
| ---------- | ---------------- | ----------------------------------------------------------------------------------------------- |
| **颜色**   | 品牌渐变         | `from-indigo-500` → `fuchsia-500` → `emerald-400`                                               |
|            | 前景表面 (玻璃态) | `bg-white/70`, `backdrop-blur-md`, `border border-slate-200/30`                                   |
|            | 强文本           | `text-slate-900`                                                                                |
|            | 次文本           | `text-slate-600`                                                                                |
|            | 渐变文本         | `text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400` |
| **排版**   | H1               | `text-6xl` - `8xl`, `font-black`, `tracking-tight`                                              |
|            | H2               | `text-4xl` - `5xl`, `font-extrabold`                                                            |
|            | 正文             | `text-lg`, `leading-relaxed`                                                                    |
|            | 代码             | `font-mono`, `text-sm`, `bg-slate-900/80`, `text-slate-100`                                      |
| **布局**   | 容器             | `max-w-6xl`, `mx-auto`, `px-6 md:px-8`, `py-12 lg:py-16`                                         |
|            | 圆角             | `rounded-3xl`                                                                                   |
|            | 阴影             | `shadow-xl` 或 `shadow-2xl`                                                                     |

### 4.2 组件模式 (Component Patterns)

- **玻璃态卡片 (Glassmorphism Card)**: `bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6 md:p-8`
- **渐变标题 (Gradient Heading)**: `text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400`
- **Pill 按钮/标签 (Pill Button/Tag)**: `inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/40 backdrop-blur-md`
- **代码面板 (Code Panel)**: `bg-slate-900/80 text-slate-100 rounded-2xl border border-white/10 p-6`

### 4.3 页面模板 (Page Templates)

| 模板类型         | 核心功能与建议实现                                           |
| ---------------- | ------------------------------------------------------------ |
| **封面 (Hero)**  | 建立主视觉，使用 H1 渐变标题和简短副标题。                   |
| **目录 (TOC)**   | 提供章节索引，使用带编号的 Pill 列表。                       |
| **指标 (Stats)** | 展示关键数据，使用 2-3 列的指标卡网格。                      |
| **对比 (Compare)** | 并列对比多个选项，对推荐项使用品牌渐变描边高亮。             |
| **结束 (CTA)**   | 引导下一步操作，包含一个主按钮（品牌渐变）和一个次按钮（玻璃态）。 |

---

## 5. 质量与协作 (Quality & Collaboration)

### 5.1 变更审查清单

在你完成一项任务后，请对照以下清单进行自我审查：

- [ ] **可发现性**: 新幻灯片集是否已添加到路由 (`router/index.ts`) 和主页导航 (`views/Home.vue`)？
- [ ] **持久化**: 背景选择是否能根据 `contextKey` 正确地持久化到 `localStorage`？
- [ ] **一致性**: UI 中的快捷键提示是否与实际功能完全一致？
- [ ] **通用性**: 共享组件是否保持通用，没有被特定业务逻辑污染？

### 5.2 协作模型

在复杂任务中，我们可以模拟以下角色分工，清晰地沟通和协作：

- **规划师 (Planner)**: 负责确认需求、设计大纲、决定技术方案。
- **构建师 (Builder)**: 负责实现功能、集成组件、编写代码并确保规范。
- **质检员 (QA)**: 负责运行和测试应用，验证功能是否符合预期。
- **文档员 (Documenter)**: 负责在规则或流程变更时，更新本文档。
