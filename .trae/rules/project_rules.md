# 项目规则：AI 智能体协作指南

你好！我是你的良师益友。这份文档是我们的协作基石，旨在帮助你理解项目结构、遵循核心原则，并高效地完成任务。请仔细阅读，让我们一起打造出色的演示文稿。

## 1. 核心原则 (Core Principles)

这些是你在本项目中必须遵守的最高准则。

- **单一来源 (Single Source of Truth)**: 所有幻灯片集共享的功能（如导航、背景）都必须位于 `src/shared/` 目录中。不要复制代码，而是通过 Props 或注册表机制进行扩展。
- **代码即英文 (Code is English)**: 为了确保代码的清晰性和可维护性，所有代码（包括变量名、函数名、类名和注释）**必须**使用英文。UI 中面向用户的文本可以使用中文。
- **可发现性 (Discoverability)**: 每个新的幻灯片集**必须**在 `src/router/index.ts` 中注册路由，并在 `src/views/Home.vue` 的导航菜单中添加入口。
- **体验一致 (Consistent Experience)**: 保持核心交互的一致性。例如，背景设置浮层的快捷键是 `Ctrl / ⌘ + Shift + P`，关闭浮层是 `Esc`。如果修改，请务必同步更新 UI 上的提示文案。
- **配置优于硬编码 (Configuration over Hardcoding)**: 幻灯片集特有的文案应存储在 `src/locales/<locale>/deck-<slug>.json` 中，而不是硬编码在 Vue 组件里。功能模块（如背景）应通过注册表动态加载。

## 2. 架构与关键文件 (Architecture & Key Files)

理解文件结构是高效工作的第一步。

- **应用入口**:
  - `src/main.ts`: Vue 应用的启动点。
  - `src/style.css`: 全局样式。
- **核心导航与路由**:
  - `src/router/index.ts`: **注册新幻灯片集的地方**。
  - `src/views/Home.vue`: 项目主页，**需要在这里链接到新的幻灯片集**。
- **幻灯片内容**:
  - `src/presentations/<slug>/index.vue`: 单个幻灯片集的入口文件和内容组织。
- **共享模块**:
  - `src/shared/ppt-container.vue`: **所有幻灯片集都必须使用的基础容器**，提供导航和进度条。
  - `src/shared/backgrounds/`: 共享的背景系统。
    - `modules/`: 存放各个背景的组件。
    - `registry.ts`: 注册和管理所有可用背景。
- **状态管理**:
  - `src/stores/`: Pinia 状态管理。
- **文档**:
  - `docs/`: 项目的规划笔记和草稿。

## 3. 标准工作流 (Standard Workflows)

请遵循以下步骤执行常见任务，确保规范和一致。

### 创建一个新的幻灯片集

1.  **创建文件结构**: 在 `src/presentations/` 目录下创建一个新的文件夹，以你选择的 `slug` 命名，并在其中创建 `index.vue` 文件。
2.  **构建幻灯片内容**: 在 `index.vue` 中，使用 `<script setup lang="ts">`。将你的幻灯片内容（可以是独立组件或内联模板）组织成一个数组，并传递给 `<ppt-container>` 组件。
3.  **集成背景系统**: 在 `index.vue` 中导入并使用 `<BackgroundManager>` 组件，并为其提供一个 `default-background` ID 和唯一的 `context-key`（通常就是 `slug`）。
4.  **注册路由**: 打开 `src/router/index.ts`，为新的幻灯片集添加一个**懒加载**的路由记录。
5.  **更新主页导航**: 打开 `src/views/Home.vue`，在列表中添加一个指向新幻灯片集的链接。
6.  **验证**:
    - 运行 `npm run dev`，在浏览器中访问新的幻灯片集，确保它可以正常加载、导航和切换背景。
    - 在进行重要修改后，运行 `vue-tsc --noEmit` 确保没有类型错误。

### 更新共享背景

- **同步快捷键**: 如果修改了快捷键，请务必在 `background-manager.vue` 和 `background-settings-overlay.vue` 中同步更新描述文本。
- **保持无状态**: 共享背景模块自身不应持有状态。使用局部 `ref`，并在 `onUnmounted` 中清理资源。
- **注册新模块**: 新的背景模块必须在 `registry.ts` 中注册，并提供有意义的 `name`、`description` 和 `tags`。

## 4. 技术与编码规范 (Technical & Coding Standards)

- **技术栈**:
  - **Vue 3**: 使用 `<script setup>` 和组合式 API (`ref`, `computed` 等)。
  - **Vite**: 项目的构建工具。
  - **Tailwind CSS v3**: **禁止**使用 v4+ 的新特性（如 `@theme` 指令），不要轻易升级版本。
- **编码规范**:
  - 共享逻辑必须放在 `src/shared/` 中，并保持其通用性，不得包含特定于某个幻灯片集的状态。
  - 尊重并保持键盘可访问性。
  - 本地化字符串必须通过 `src/locales/` 目录下的 JSON 文件管理。

## 5. 常用命令 (Common Commands)

- `npm run dev`: 启动本地开发服务器。
- `npm run build`: 构建生产环境版本。
- `vue-tsc --noEmit`: 对整个项目进行 TypeScript 类型检查。

## 6. 变更审查清单 (Change Review Checklist)

在你完成一项任务后，请对照以下清单进行自我审查：

- [ ] 新的幻灯片集是否已同时添加到路由 (`router/index.ts`) 和主页导航 (`views/Home.vue`)？
- [ ] 背景选择是否能根据 `contextKey` 正确地持久化到 `localStorage`？
- [ ] UI 中的快捷键提示是否与实际功能完全一致？
- [ ] 共享组件是否保持通用，没有被特定业务逻辑污染？

## 7. 任务分配建议 (Task Allocation Suggestions)

在复杂的任务中，我们可以模拟以下角色分工协作：

- **规划智能体 (Planner Agent)**: 负责确认需求、设计大纲、决定技术方案。
- **构建智能体 (Builder Agent)**: 负责实现功能、集成组件、编写代码并确保规范。
- **质检智能体 (QA Agent)**: 负责运行和测试应用，验证功能是否符合预期，检查交互和文档。
- **文档智能体 (Docs Agent)**: 负责在工作流或规则变更时，更新本文档或其他相关 `.md` 文件。

## 8. 设计语言与页面模板 (Design Language & Page Templates)

本章节定义了项目的视觉设计规范和可复用的页面模板，旨在确保所有演示文稿在视觉上保持一致性。所有示例均可直接映射到 Tailwind CSS v3 的原子类。

### 8.1 全局设计令牌 (Design Tokens)

- **颜色系统 (Color System)**
  - **背景舞台**: 使用由背景组件生成的全幅柔和渐变，确保低视觉干扰。
  - **品牌渐变**: 从蓝紫 (`indigo-500`) → 品红 (`fuchsia-500`) → 翠绿 (`emerald-400`) 的高饱和度渐变，用于标题、强调文本和分隔元素。
  - **前景表面**: 半透明白色玻璃态效果。
    - 底色: `bg-white/70` 到 `bg-white/80`
    - 边框: `border border-slate-200/30`
    - 背景模糊: `backdrop-blur-md` 或 `backdrop-blur-lg`
  - **文本颜色**:
    - 强文本: `text-slate-900`
    - 次文本: `text-slate-600`
    - 反白文本: `text-slate-50` (用于深色背景)
    - 渐变文本: `text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400`
  - **状态色**:
    - 成功: `emerald-500`
    - 信息: `sky-500`
    - 警告: `amber-500`
    - 危险: `rose-500`

- **字体与排版 (Typography)**
  - **字体族**: 通用无衬线字体 (如 Inter, `system-ui`)，数字使用等宽样式 (`tabular-nums`)。
  - **层级与字号**:
    - H1: `text-6xl` - `8xl`, `font-black`, `tracking-tight`
    - H2: `text-4xl` - `5xl`, `font-extrabold`
    - H3: `text-2xl` - `3xl`, `font-bold`
    - 正文: `text-lg`, `leading-relaxed`
    - 辅助: `text-sm`, `text-slate-600`
    - 代码: 等宽字体, `text-sm`, `bg-slate-900/80`, `text-slate-100`

- **布局与间距 (Layout & Spacing)**
  - **容器**: 居中，最大宽度 `max-w-6xl`，`mx-auto`，`px-6 md:px-8`，`py-12 lg:py-16`。
  - **圆角**: `rounded-3xl` (约 24px)。
  - **阴影**: `shadow-xl` 或 `shadow-2xl`。
  - **边框**: `1px`, `border-slate-200/30`。

### 8.2 基础组件模式 (Component Patterns)

- **玻璃态卡片 (Glassmorphism Card)**: `bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6 md:p-8`
- **渐变标题 (Gradient Heading)**: `text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400`
- **Pill 按钮/标签 (Pill Button/Tag)**: `inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/40 backdrop-blur-md`
- **指标卡 (Stat Card)**: 玻璃态卡片 + `flex flex-col gap-2`，数值 `text-5xl font-black`，标签 `text-sm text-slate-600`。
- **代码面板 (Code Panel)**: `bg-slate-900/80 text-slate-100 rounded-2xl border border-white/10 p-6`

### 8.3 页面模板 (Page Templates)

以下是可按功能复用的标准页面模板：

- **封面 (Hero)**: 用于建立主视觉，突出核心信息。通常包含一个 H1 渐变标题和一个简短的副标题。
- **目录 (Table of Contents)**: 提供页面或章节的索引。通常使用带编号的 Pill 列表。
- **配置/参数 (Configuration/Parameters)**: 使用 Tab + Panel 结构展示多维度设置。
- **指标/统计 (Stats Grid)**: 使用 2-3 列的指标卡网格展示关键数据。
- **可视化/嵌入 (Visualization/Embed)**: 用于承载图表、地图或其他外部内容。通常使用深色代码面板作为容器。
- **清单/建议 (Checklist/Guides)**: 以要点形式传达指南或最佳实践。可使用带状态色的卡片列表。
- **对比/选择 (Comparison/Decision)**: 并列对比多个选项。可对推荐选项使用品牌渐变描边进行高亮。
- **问答/FAQ (Q&A/FAQ)**: 使用手风琴或卡片组来组织常见问题。
- **行动号召/结束 (CTA/End)**: 引导用户进行下一步操作。通常包含一个主按钮（品牌渐变）和一个次按钮（玻璃态）。
- **分隔页 (Divider)**: 在长内容中分割章节，通常只包含一个大号的渐变标题和简短摘要。

### 8.4 实施速查表 (Implementation Cheatsheet)

- **页面外层容器**: `container mx-auto max-w-6xl px-6 md:px-8 py-12 lg:py-16`
- **玻璃态卡片**: `bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6 md:p-8`
- **渐变标题**: `text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400`
- **指标数值**: `text-6xl font-black tracking-tight`
- **Tab 激活项**: `rounded-full bg-gradient-to-r from-indigo-500/20 to-emerald-400/20 border border-white/40 px-4 py-2`
- **深色面板**: `bg-slate-900/80 text-slate-100 rounded-2xl border border-white/10 shadow-xl p-6`
