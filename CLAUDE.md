# CLAUDE.md

为 Claude Code (claude.ai/code) 向此仓库贡献代码的指南。

## 常用命令

- 运行开发服务器: `npm run dev`
- 构建生产版本: `npm run build`
- 项目类型检查: `vue-tsc --noEmit`

## 高层架构

- 应用启动入口: `src/main.ts`
- 路由设置: `src/router/index.ts`
- 全局布局 / 落地页: `src/views/Home.vue`
- 演示文稿源文件: `src/presentations/<slug>/index.vue`
- 共享 UI 和工具: `src/shared/`
- 状态存储 (Pinia-ready): `src/stores/`
- 样式入口: `src/style.css`

## 共享演示文稿基础组件

- `src/shared/ppt-container.vue`
  - 幻灯片集的基础外壳。接受一个由 Vue 组件构成的 `slides` 数组，并提供键盘导航 (← → 空格 Home End Esc) 及进度 UI。
  - 使用此组件，而不是为每个演示文稿重复构建导航。
- `src/shared/backgrounds/`
  - 背景模块位于 `modules/<id>/background.vue` 下，并通过 `index.ts` 的导出进行自我注册。
  - `background-manager.vue` 渲染当前活动的背景，并连接设置浮层 (通过 `Ctrl/⌘ + Shift + P` 切换，`Esc` 关闭)。
  - 设置 UI: `background-settings-overlay.vue`。当快捷键更改时，请更新此处的文案。
  - 背景元数据类型: `types.ts`；注册表位于 `registry.ts`。
  - 背景、主题和本地化的协调必须遵循 [docs/presentation_i18n_theming.md](../docs/presentation_i18n_theming.md) 中的共享演示文稿规则。

## 添加新演示文稿 (强制工作流)

1.  **搭建文件结构**
    -   创建 `src/presentations/<slug>/index.vue` 作为入口文件。
    -   构建幻灯片组件 (例如 `slides/slide-1.vue`)，并在入口文件中将它们聚合，传递给 `<ppt-container>`。
2.  **接入背景系统**
    -   在演示文稿的根组件中导入并嵌入 `<BackgroundManager>`。从 `backgrounds/registry.ts` 提供一个 `default-background` ID。
    -   当演示文稿需要定制背景时，在 `src/shared/backgrounds/modules/<new-id>/` 下添加一个模块，导出元数据，并在 `registry.ts` 中注册。
3.  **注册路由**
    -   在 `src/router/index.ts` 中追加一条新路由，包含 `path: '/<slug>'` 和 `component: () => import('@/presentations/<slug>/index.vue')`。
4.  **更新落地页**
    -   编辑 `src/views/Home.vue`，添加一个指向新路由的导航项。保持列表有序且易于理解。
5.  **为资源添加文档**
    -   如果演示文稿包含定制的工具或背景，请在入口文件中留下简短注释，描述覆盖的内容，以便未来的智能体可以复用这些工作。

## 编码规范

- 在 `<script setup lang="ts">` 块中使用 TypeScript。
- 优先使用 Vue 的组合式 API 辅助函数 (`ref`, `computed` 等)。
- 保持共享逻辑的可复用性。新的跨演示文稿功能应置于 `src/shared/` 中。
- 在修改 `ppt-container` 或背景管理器的快捷键时，尊重键盘可访问性。
- 确保热键与 UI 提示 (`background-settings-overlay.vue` 及任何可见的辅助文本) 保持同步。
- 使用 ASCII 字符，除非周围文件已包含非 ASCII 内容 (UI 字符串中可接受中文标签)。
- 幻灯片集的本地化字符串必须来自 `src/locales/<locale>/deck-<slug>.json` (每种语言一个文件)。避免在 Vue 文件中硬编码多语言文案。

## 工具链说明

- 使用 Vite + Vue 3 技术栈，并配备 `@vitejs/plugin-vue`。
- Tailwind 必须保持在 v3 版本；避免使用 v4 及以上版本独有的指令 (`@theme`、新的 `@apply` 语义等)，并且在更改版本前需要进行协调。
- 在发布重要的组件重构之前，运行 `vue-tsc --noEmit` 来捕获类型退化问题。

## 变更审查清单

- 新的幻灯片集需要同时出现在路由和主页导航中。
- 背景选择应按预期持久化 (通过 `contextKey` 限定作用域的 localStorage)。
- 快捷键帮助文本需反映实际的按键组合 (`Ctrl/⌘ + Shift + P`)。
- 共享组件需保持框架无关 (不允许将特定于某个演示文稿的状态泄露到 `src/shared/` 中)。