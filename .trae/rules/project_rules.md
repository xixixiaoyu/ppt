# 项目规则文档

## 项目概述

本项目是一个基于 Vue 3 和 Vite 的现代化幻灯片（Presentation）生成工具，旨在通过组件化的方式，快速创建、定制和部署高质量的在线演示文稿。项目采用 TypeScript 开发，使用 Tailwind CSS 进行样式设计，并集成了 ECharts 图表库和 Three.js 3D 渲染引擎。

### 技术栈

- **前端框架**: Vue 3 (Composition API)
- **类型系统**: TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **路由**: Vue Router 4
- **图表库**: ECharts + vue-echarts
- **3D 渲染**: Three.js
- **图标库**: @heroicons/vue
- **包管理器**: pnpm

### 项目结构

```
src/
├── presentations/           # 幻灯片主题目录
│   ├── design-language-template/  # 设计语言模板（29种幻灯片类型）
│   └── llm/                 # LLM 主题示例
├── shared/                 # 共享组件和工具
│   ├── backgrounds/         # 背景组件系统
│   ├── charts/             # 图表组件
│   ├── i18n/               # 国际化支持
│   ├── presentation/       # 演示文稿核心组件
│   └── ui/                 # UI 组件库
├── views/                  # 页面视图
├── router/                 # 路由配置
└── utils/                  # 工具函数
```

## 开发规范

### 代码风格

- 使用 ESLint + Prettier 进行代码格式化
- Vue 组件使用单引号、无分号、两空格缩进
- 组件命名采用 PascalCase
- 文件命名采用 kebab-case
- 中文与英文/数字间加空格

### 组件开发规范

#### 幻灯片组件结构

每个幻灯片组件应遵循以下结构：

```vue
<script setup lang="ts">
// 导入依赖
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

// 组件逻辑
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 py-12">
    <!-- 幻灯片内容 -->
  </section>
</template>

<style scoped>
/* 组件特定样式 */
</style>
```

#### 组件 Props 规范

- `isActive`: 当前幻灯片是否处于活动状态
- `isPreview`: 是否在缩略图预览模式下

### 主题开发指南

#### 1. 创建新主题

1. **创建主题目录**:
   ```bash
   mkdir src/presentations/my-new-theme
   ```

2. **创建入口文件** (`index.vue`):
   ```vue
   <script setup lang="ts">
   import { providePresentationContext } from '@/shared/presentation/presentation-context'
   import BackgroundManager from '@/shared/backgrounds/background-manager.vue'
   import PptContainer from '@/shared/presentation/ppt-container.vue'
   
   // 导入幻灯片组件
   import Slide1Hero from './slide-1-hero.vue'
   // ... 其他幻灯片
   
   const presentationContext = createPresentationContext({
     defaults: {
       backgroundId: 'soft-mesh',
       locale: 'zh-Hans',
     },
     backgrounds: backgroundRegistry,
     locales: [...localeOptions],
     contextKey: 'my-new-theme',
     persist: true,
   })
   
   providePresentationContext(presentationContext)
   
   const slides = [
     Slide1Hero,
     // ... 其他幻灯片
   ]
   </script>
   
   <template>
     <div class="relative flex h-screen w-screen overflow-hidden">
       <BackgroundManager />
       <main class="relative z-10 flex h-full w-full items-center justify-center">
         <div class="deck-shell h-full w-full">
           <PptContainer :slides="slides" title="我的新主题" />
         </div>
       </main>
     </div>
   </template>
   ```

#### 2. 注册路由

在 `src/router/index.ts` 中添加新路由：

```typescript
{
  path: '/my-new-theme',
  component: () => import('@/presentations/my-new-theme/index.vue'),
}
```

#### 3. 更新首页

在 `src/views/Home.vue` 中添加新主题到分类列表：

```typescript
const categories = ref<Category[]>([
  {
    id: 'my-category',
    name: '我的分类',
    expanded: true,
    presentations: [
      {
        id: 'my-new-theme',
        title: '我的新主题',
        description: '主题描述',
        route: '/my-new-theme',
      },
    ],
  },
])
```

### 可用组件库

#### UI 组件

- `HeroBanner`: 英雄横幅组件，支持多种效果和调色板
- `Card`: 卡片容器组件
- `Section`: 页面区块组件
- `HeadingGradient`: 渐变标题组件

#### 背景系统

项目内置了背景管理系统，支持：

- `soft-mesh`: 柔和网格渐变背景
- `demo-particles`: 粒子动画背景

可通过 `BackgroundManager` 组件管理和切换背景。

#### 图表组件

基于 ECharts 提供以下图表类型：

- 折线图 (`LineChart`)
- 柱状图 (`BarChart`)
- 饼图 (`PieChart`)
- 散点图 (`ScatterChart`)
- 雷达图 (`RadarChart`)

使用示例：
```vue
<script setup>
import { VChart } from '@/shared/charts/echarts'

const option = {
  // ECharts 配置
}
</script>

<template>
  <VChart :option="option" style="height: 400px" />
</template>
```

### 国际化支持

项目支持多语言，使用 `useDeckI18n` 进行国际化：

```typescript
import { useDeckI18n } from '@/shared/i18n/use-deck-i18n'

const { t } = useDeckI18n('theme-id', {
  locale: ref('zh-Hans'),
  fallbackLocale: 'zh-Hans',
})

// 使用翻译
const title = t('slide.title')
```

翻译文件放置在 `src/presentations/[theme]/locales/` 目录下。

### 样式系统

#### 颜色变量

项目使用 CSS 自定义属性定义颜色系统：

```css
:root {
  --surface: 248 250 252;
  --surface-muted: 241 245 249;
  --text-primary: 15 23 42;
  --text-muted: 71 85 105;
  --accent: 99 102 241;
}
```

#### Tailwind 配置

扩展了 Tailwind 的颜色配置：

```javascript
colors: {
  surface: 'rgb(var(--surface) / <alpha-value>)',
  'surface-muted': 'rgb(var(--surface-muted) / <alpha-value>)',
  'text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
  'text-muted': 'rgb(var(--text-muted) / <alpha-value>)',
  accent: 'rgb(var(--accent) / <alpha-value>)',
}
```

### 开发工作流

#### 环境要求

- Node.js: ^20.19.0 || >=22.12.0
- pnpm: 10.13.1

#### 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

#### Git 提交规范

使用 ESLint 和 Prettier 确保代码质量：

```bash
# 运行所有检查和格式化
pnpm lint:format
```

### 幻灯片类型参考

`design-language-template` 提供了 29 种幻灯片类型，可作为开发参考：

1. **基础类型**:
   - Hero (slide-1-hero): 英雄页面
   - Spotlight (slide-2-spotlight): 聚光灯页面
   - Outline (slide-3-outline): 大纲页面

2. **数据展示**:
   - Stats (slide-4-stats): 统计数据
   - Charts (slide-24-29): 各种图表类型
   - Table (slide-23-table): 表格展示

3. **交互组件**:
   - Tabs (slide-5-tabs): 选项卡
   - Compare (slide-6-compare): 对比展示
   - Checklist (slide-7-checklist): 检查清单
   - Poll (slide-10-poll): 投票组件

4. **内容展示**:
   - Timeline (slide-11-timeline): 时间线
   - Code (slide-12-code): 代码展示
   - Steps (slide-13-steps): 步骤说明
   - Team (slide-16-team): 团队介绍
   - Quote (slide-17-quote): 引用展示
   - Media (slide-18-media): 媒体内容

5. **特殊页面**:
   - Chapter Divider (slide-15-chapter-divider): 章节分隔
   - Q&A (slide-19-q-and-a): 问答页面
   - Thank You (slide-20-thank-you): 结束页
   - References (slide-21-references): 参考资料
   - Pricing (slide-22-pricing): 价格展示

### 最佳实践

1. **组件复用**: 优先使用 `src/shared` 中的共享组件
2. **性能优化**: 使用 `v-show` 替代 `v-if` 进行幻灯片切换
3. **响应式设计**: 确保幻灯片在不同屏幕尺寸下正常显示
4. **无障碍访问**: 添加适当的 ARIA 标签和语义化 HTML
5. **动画效果**: 使用 CSS 过渡和动画增强用户体验
6. **代码组织**: 保持组件单一职责，合理拆分复杂组件

### 故障排除

#### 常见问题

1. **路由不生效**: 检查路由配置和组件导入路径
2. **样式不生效**: 确认 Tailwind 类名和 CSS 自定义属性
3. **背景不显示**: 检查 `BackgroundManager` 组件和背景注册
4. **图表不渲染**: 确认 ECharts 配置和数据格式

#### 调试技巧

1. 使用 Vue DevTools 检查组件状态
2. 检查浏览器控制台的错误信息
3. 使用 Vite 的 HMR 功能进行热重载调试
4. 检查网络请求和资源加载情况

通过遵循以上规范和指南，可以高效地开发出高质量、可维护的幻灯片主题。
