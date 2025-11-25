# 项目基本情况

本项目是一个基于 Vue.js 和 Vite 的现代化幻灯片（Presentation）生成工具。旨在通过组件化的方式，快速创建、定制和部署高质量的在线演示文稿。

- **技术栈**: Vue 3, TypeScript, Vite, Tailwind CSS
- **项目结构**:
  - `src/presentations`: 存放所有幻灯片主题的核心目录。每个子目录代表一个独立的幻灯片主题。
  - `src/presentations/design-language-template`: 这是一个基础设计模板，包含了多种预设的幻灯片页面组件，是你创建新主题的起点。
  - `src/router/index.ts`: 路由配置文件，用于将新的幻灯片主题集成到应用中。
  - `src/shared`: 存放共享组件、工具函数和样式。

# 如何创建新的幻灯片主题

1.  **参考模板目录**:
    - `src/presentations/design-language-template`。

2.  **新建幻灯片**:
    - 创建主题目录（例如 `src/presentations/my-new-theme`）。
    - 参考 `design-language-template` 目录下的文件结构和丰富模板创建我们自己的主题结构。
    - 创建 `index.vue` 文件，它是该主题的入口，它负责组织和串联所有的幻灯片页面。

3.  **注册路由**:
    - 打开 `src/router/index.ts` 文件。
    - 仿照现有代码，为你的新主题添加一个新的路由记录。这通常需要你 `import` 你的主题的 `index.vue` 文件，并为其指定一个访问路径（URL）。

4.  **预览和测试**:
    - 启动开发服务器（通常是 `npm run dev`）。
    - 访问你刚刚在路由中设置的路径，检查你的新幻灯片主题是否能正确显示。

通过遵循以上步骤，你可以快速地创建出风格统一且功能强大的新幻灯片。
