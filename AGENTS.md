# AGENTS.md

用于在此仓库中进行多智能体协作的协调手册。

## 仓库地图

- `vue_ppt/src/presentations/<slug>/index.vue` – 每个幻灯片集的入口点。
- `vue_ppt/src/shared/ppt-container.vue` – 共享的幻灯片导航 UI。
- `vue_ppt/src/shared/backgrounds/` – 背景模块、管理器和设置浮层。
- `vue_ppt/src/router/index.ts` – 注册演示文稿路由。
- `vue_ppt/src/views/Home.vue` – 链接到可用幻灯片集的落地页。
- `docs/` – 为即将推出的幻灯片集准备的规划笔记和提纲。

## 操作原则

1.  **单一事实来源**: 幻灯片导航和背景位于 `src/shared/` 中。不要为每个项目复刻这些功能——应通过注册表或 props 进行扩展。
2.  **可发现性优先**: 每个新的幻灯片集都必须在路由配置和主页导航列表中可见。
3.  **键盘操作对等**: 保持浮层快捷键的一致性 (`Ctrl/⌘ + Shift + P` 用于切换，`Esc` 用于关闭)。修改绑定时请更新 UI 提示。
4.  **中文 UI 文案**: 在演示文稿内容需要时允许使用；代码注释和结构性文档请保持英文，以确保跨智能体的清晰度。
5.  **统一的演示文稿上下文**: 主题、背景和本地化流程必须与 [docs/presentation_i18n_theming.md](../docs/presentation_i18n_theming.md) 保持一致。
6.  **本地化资源存于 JSON**: 将每个幻灯片集特定的字符串存储在 `src/locales/<locale>/deck-<slug>.json` 下，避免在 Vue 组件内部硬编码多语言文案。
7.  **Tailwind CSS 基线**: 代码库固定使用 Tailwind v3——不要引入 v4+ 的 API 或在未经协调的情况下提升依赖版本。

## 标准工作流 – 创建新的 PPT 幻灯片集

1.  **搭建演示文稿结构**
    -   使用 `<script setup lang="ts">` 创建 `src/presentations/<slug>/index.vue`。
    -   将幻灯片构建为独立的组件或内联对象，然后将它们传递给 `<ppt-container :slides="slides" :title="..." />`。
2.  **添加背景支持**
    -   在幻灯片集的根组件中嵌入 `<BackgroundManager default-background="<background-id>" context-key="<slug>" />`。
    -   如果需要自定义背景，请创建 `src/shared/backgrounds/modules/<id>/background.vue`，通过 `index.ts` 导出元数据，并在 `backgrounds/registry.ts` 中注册。
3.  **接入路由与导航**
    -   在 `src/router/index.ts` 中追加路由 (`path` 必填, `name` 可选, `component` 懒加载)。
    -   更新 `src/views/Home.vue` 以包含一个描述性的幻灯片集链接。除非有指示，否则保持字母顺序。
4.  **记录细微差别**
    -   在幻灯片集入口文件或文档中注明特殊设置 (例如，定制的背景选项、数据源)。
    -   添加共享工具时，请为未来的智能体附上最简使用注释。
5.  **验证**
    -   `npm run dev` → 确保幻灯片集能加载，背景切换器能响应 `Ctrl/⌘ + Shift + P`，并且浮层能通过 `Esc` 关闭。
    -   `vue-tsc --noEmit` → 在大型重构后确认类型定义无误。

## 任务分配模板

-   **规划智能体 (Planner Agent)**: 确认需求，选择 slug，勾勒幻灯片大纲，决定是否需要新的背景模块。
-   **构建智能体 (Builder Agent)**: 实现幻灯片，集成 `ppt-container` 和 `BackgroundManager`，注册路由/导航，确保代码符合 lint/类型安全规范。
-   **质检智能体 (QA Agent)**: 运行开发服务器，测试键盘快捷键，验证 localStorage 持久性 (根据 `contextKey`)，审查文档的准确性。
-   **文档智能体 (Docs Agent)**: 当工作流或规则发生变化时，更新相关的 markdown 文件 (例如 roadmaps, CLAUDE.md)。

## 更新共享背景时

-   在 `background-manager.vue`、`background-settings-overlay.vue` 和任何演示文稿的 UI 提示中同步快捷键描述。
-   保持共享背景无状态；在模块内部使用局部引用 (local refs)，并释放资源 (`onUnmounted`)。
-   始终在 `registry.ts` 中注册新模块，并提供有意义的 `name`、`description` 和 `tags`。

## 快速命令参考

-   开发服务器: `npm run dev`
-   构建: `npm run build`
-   类型检查: `vue-tsc --noEmit`

在开始工作前，使用此手册向新智能体进行简报。