# 项目规则文档

## 项目概述

本项目是一个基于 Vue 3 和 Vite 的现代化幻灯片（Presentation）生成工具，旨在通过组件化的方式，快速创建、定制和部署高质量的在线演示文稿。项目采用 TypeScript 开发，使用 Tailwind CSS 进行样式设计，并集成了 ECharts 图表库和 Three.js 3D 渲染引擎。

### 核心特性

- 🎨 **组件化设计**: 基于 Vue 3 Composition API 的模块化幻灯片组件
- 🌍 **国际化支持**: 完整的多语言解决方案
- 🎭 **背景系统**: 可切换的动态背景效果
- 📊 **图表集成**: 基于 ECharts 的丰富图表类型
- 🎯 **响应式设计**: 适配各种屏幕尺寸
- ⚡ **高性能**: Vite 驱动的快速开发和构建
- 🎪 **主题系统**: 灵活的主题定制和切换

### 技术栈

#### 核心框架

- **前端框架**: Vue 3.5.18+ (Composition API)
- **类型系统**: TypeScript 5.8.0+
- **构建工具**: Vite 7.0.6+
- **包管理器**: pnpm 10.13.1

#### 样式与 UI

- **样式框架**: Tailwind CSS 3.4.14+
- **图标库**: @heroicons/vue 2.2.0+
- **CSS 预处理器**: PostCSS + Autoprefixer

#### 功能库

- **路由**: Vue Router 4.5.1+
- **图表库**: ECharts 6.0.0+ + vue-echarts 8.0.1+
- **3D 渲染**: Three.js 0.180.0+
- **类型定义**: @types/three 0.180.0+

#### 开发工具

- **代码检查**: ESLint 9.39.1+ + eslint-plugin-vue 10.6.2+
- **代码格式化**: Prettier 3.7.2+
- **Git 钩子**: Husky 9.1.7+ + lint-staged 16.2.7+
- **类型检查**: vue-tsc 3.0.4+

### 项目结构

```
src/
├── presentations/           # 幻灯片主题目录
│   ├── llm/                # LLM 主题示例
│   │   ├── index.vue       # 主题入口文件
│   │   ├── slide-*.vue     # 幻灯片组件
│   │   └── locales/        # 主题翻译文件
│   └── template/           # 设计语言模板（29种幻灯片类型）
│       ├── index.vue       # 模板入口文件
│       ├── slide-*.vue     # 幻灯片组件
│       └── slide-*.vue     # 通用组件
├── shared/                 # 共享组件和工具
│   ├── backgrounds/         # 背景组件系统
│   │   ├── background-manager.vue
│   │   ├── background-settings-overlay.vue
│   │   ├── registry.ts     # 背景注册表
│   │   ├── types.ts        # 背景类型定义
│   │   └── modules/        # 背景模块
│   │       ├── demo-particles/
│   │       └── soft-mesh/
│   ├── charts/             # 图表组件
│   │   ├── echarts.ts      # ECharts 配置
│   │   └── TrainingCurveChart.vue
│   ├── i18n/               # 国际化支持
│   │   ├── types.ts        # 国际化类型定义
│   │   └── use-deck-i18n.ts # 国际化 Hook
│   ├── presentation/       # 演示文稿核心组件
│   │   ├── ppt-container.vue # 幻灯片容器
│   │   └── presentation-context.ts # 演示上下文
│   └── ui/                 # UI 组件库
│       ├── Card.vue
│       ├── HeadingGradient.vue
│       ├── HeroBanner.vue
│       ├── Section.vue
│       └── WaveGlow.vue
├── views/                  # 页面视图
│   └── Home.vue           # 首页
├── router/                 # 路由配置
│   └── index.ts
├── utils/                  # 工具函数
│   └── highlight.ts       # 代码高亮
├── style.css              # 全局样式
└── main.ts                # 应用入口
```

## 开发规范

### 环境要求

- **Node.js**: ^20.19.0 || >=22.12.0
- **pnpm**: 10.13.1
- **操作系统**: Windows 10+, macOS 10.15+, Ubuntu 18.04+

### 代码风格

#### 基本规范

- 使用 ESLint + Prettier 进行代码格式化
- Vue 组件使用单引号、无分号、两空格缩进
- 组件命名采用 PascalCase
- 文件命名采用 kebab-case
- 中文与英文/数字间加空格
- 使用 TypeScript 严格模式

#### Vue 组件规范

```vue
<script setup lang="ts">
// 1. 导入依赖
import { ref, computed, onMounted } from 'vue'
import type { Component } from 'vue'

// 2. 定义 Props 和 Emits
interface Props {
  isActive?: boolean
  isPreview?: boolean
  title?: string
}

interface Emits {
  (e: 'update', value: string): void
  (e: 'submit'): void
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  isPreview: false,
})

const emit = defineEmits<Emits>()

// 3. 响应式数据
const count = ref(0)
const doubled = computed(() => count.value * 2)

// 4. 方法定义
const increment = () => {
  count.value++
}

// 5. 生命周期
onMounted(() => {
  console.log('Component mounted')
})
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 py-12">
    <!-- 幻灯片内容 -->
    <h1>{{ props.title || '默认标题' }}</h1>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">Increment</button>
  </section>
</template>

<style scoped>
/* 组件特定样式 */
.container {
  /* 使用 Tailwind 类名优先，必要时使用自定义 CSS */
}
</style>
```

#### TypeScript 规范

- 优先使用 `interface` 而不是 `type`（除非需要联合类型）
- 使用 `const` 断言而非枚举
- 避免使用 `any`，使用 `unknown` 或具体类型
- 使用函数类型声明而非接口方法声明

```typescript
// ✅ 推荐
interface User {
  id: number
  name: string
}

type Status = 'pending' | 'success' | 'error'

const updateUser = (user: User): void => {
  // 实现
}

// ❌ 不推荐
interface User {
  id: number
  name: string
  updateUser(): void
}

const updateUser = function (user: User): void {
  // 实现
}
```

### 组件开发规范

#### 幻灯片组件结构

每个幻灯片组件应遵循以下结构：

```vue
<script setup lang="ts">
// 1. 导入依赖
import { computed, ref } from 'vue'

// 2. 定义 Props
defineProps<{
  isActive?: boolean
  isPreview?: boolean
}>()

// 3. 组件逻辑
const title = ref('幻灯片标题')
const description = ref('幻灯片描述')

// 4. 计算属性
const shouldAnimate = computed(() => !props.isPreview)
</script>

<template>
  <section class="slide-content">
    <div class="slide-header">
      <h2>{{ title }}</h2>
    </div>
    <div class="slide-body">
      <p>{{ description }}</p>
    </div>
  </section>
</template>

<style scoped>
.slide-content {
  @apply h-full w-full flex flex-col items-center justify-center p-8;
}

.slide-header h2 {
  @apply text-4xl font-bold mb-8 text-center;
}

.slide-body p {
  @apply text-lg text-center max-w-2xl;
}
</style>
```

#### 组件 Props 规范

- `isActive`: 当前幻灯片是否处于活动状态（用于动画和交互）
- `isPreview`: 是否在缩略图预览模式下（用于简化渲染）

#### 组件命名规范

- 幻灯片组件：`slide-{编号}-{功能}.vue`（如：`slide-01-hero.vue`）
- 共享组件：PascalCase（如：`HeroBanner.vue`）
- 工具函数：camelCase（如：`formatDate.ts`）
- 类型定义：kebab-case.types.ts（如：`user-types.ts`）

### 主题开发指南

#### 1. 创建新主题

**步骤 1: 创建主题目录**

```bash
mkdir src/presentations/my-new-theme
```

**步骤 2: 创建入口文件** (`index.vue`)

```vue
<script setup lang="ts">
import { providePresentationContext } from '@/shared/presentation/presentation-context'
import BackgroundManager from '@/shared/backgrounds/background-manager.vue'
import PptContainer from '@/shared/presentation/ppt-container.vue'
import { backgroundRegistry } from '@/shared/backgrounds/registry'

// 导入幻灯片组件
import Slide1Hero from './slide-1-hero.vue'
import Slide2Content from './slide-2-content.vue'
// ... 其他幻灯片

const localeOptions = [
  {
    code: 'zh-Hans',
    label: 'Chinese',
    nativeLabel: '简体中文',
    direction: 'ltr',
  },
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    direction: 'ltr',
  },
] as const

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
  Slide2Content,
  // ... 其他幻灯片
]
</script>

<template>
  <div
    class="relative flex h-screen w-screen overflow-hidden bg-surface text-text-primary"
    style="
      --surface: 248 250 252;
      --surface-muted: 241 245 249;
      --text-primary: 15 23 42;
      --text-muted: 71 85 105;
    "
  >
    <BackgroundManager />
    <main
      class="relative z-10 flex h-full w-full items-center justify-center px-6 py-6 sm:px-10"
    >
      <div class="deck-shell h-full w-full">
        <PptContainer :slides="slides" title="我的新主题" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.deck-shell :deep(.ppt-container) {
  @apply bg-transparent;
}

.deck-shell :deep(.controls) {
  @apply fixed bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-text-primary shadow-xl shadow-black/40 backdrop-blur-xl;
}

.deck-shell :deep(.control-btn) {
  @apply flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900 text-sm font-semibold shadow-md shadow-black/30 ring-1 ring-black/5 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 disabled:cursor-not-allowed disabled:opacity-40;
}
</style>
```

#### 2. 注册路由

在 `src/router/index.ts` 中添加新路由：

```typescript
{
  path: '/my-new-theme',
  component: () => import('@/presentations/my-new-theme/index.vue'),
  meta: {
    title: '我的新主题',
    description: '主题描述',
  },
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

#### 4. 添加国际化支持

创建翻译文件 `src/presentations/my-new-theme/locales/zh-Hans.json`：

```json
{
  "slide": {
    "title": "幻灯片标题",
    "description": "幻灯片描述"
  }
}
```

在组件中使用：

```vue
<script setup lang="ts">
import { useDeckI18n } from '@/shared/i18n/use-deck-i18n'

const { t } = useDeckI18n('my-new-theme', {
  locale: ref('zh-Hans'),
  fallbackLocale: 'zh-Hans',
})

const title = computed(() => t('slide.title'))
</script>
```

### 可用组件库

#### UI 组件

##### HeroBanner

英雄横幅组件，支持多种效果和调色板

```vue
<HeroBanner
  effect="circles" // 'aurora' | 'circles'
  title="标题"
  subtitle="副标题"
  titleSize="7xl" // '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  palette="indigo-fuchsia-emerald" // 'accent' | 'indigo-fuchsia-emerald'
  rounded="3xl" // '2xl' | '3xl' | '[2rem]'
>
  <template #actions>
    <button>操作按钮</button>
  </template>
</HeroBanner>
```

##### Card

卡片容器组件

```vue
<Card rounded="3xl" padding="xl" class="custom-class">
  <h3>卡片标题</h3>
  <p>卡片内容</p>
</Card>
```

##### Section

页面区块组件

```vue
<Section max="6xl" p="xl">
  <h2>区块标题</h2>
  <p>区块内容</p>
</Section>
```

##### HeadingGradient

渐变标题组件

```vue
<HeadingGradient level="2" size="6xl" palette="accent">
  渐变标题
</HeadingGradient>
```

#### 背景系统

项目内置了背景管理系统，支持：

- `soft-mesh`: 柔和网格渐变背景
- `demo-particles`: 粒子动画背景

可通过 `BackgroundManager` 组件管理和切换背景。

##### 自定义背景模块

创建新的背景模块：

```typescript
// src/shared/backgrounds/modules/my-background/index.ts
import type { BackgroundModuleMeta } from '../../types'
import BackgroundComponent from './background.vue'

export const myBackground: BackgroundModuleMeta = {
  id: 'my-background',
  name: '我的背景',
  description: '自定义背景效果',
  component: BackgroundComponent,
  tags: ['custom', 'animated'],
}
```

```vue
<!-- src/shared/backgrounds/modules/my-background/background.vue -->
<script setup lang="ts">
// 背景组件逻辑
</script>

<template>
  <div class="my-background">
    <!-- 背景内容 -->
  </div>
</template>

<style scoped>
.my-background {
  @apply absolute inset-0 w-full h-full;
  /* 背景样式 */
}
</style>
```

#### 图表组件

基于 ECharts 提供以下图表类型：

- 折线图 (`LineChart`)
- 柱状图 (`BarChart`)
- 饼图 (`PieChart`)
- 散点图 (`ScatterChart`)
- 雷达图 (`RadarChart`)

使用示例：

```vue
<script setup lang="ts">
import { VChart } from '@/shared/charts/echarts'
import type { EChartsOption } from '@/shared/charts/echarts'

const option: EChartsOption = {
  title: {
    text: '示例图表',
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    },
  ],
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

const { t, currentLocale, hasLocale } = useDeckI18n('theme-id', {
  locale: ref('zh-Hans'),
  fallbackLocale: 'zh-Hans',
})

// 使用翻译
const title = computed(() => t('slide.title'))
const description = computed(() => t('slide.description', { count: 5 }))
```

#### 翻译文件结构

翻译文件放置在 `src/presentations/[theme]/locales/` 目录下：

```
locales/
├── zh-Hans.json
├── en.json
└── ja.json
```

翻译文件格式：

```json
{
  "slide": {
    "title": "幻灯片标题",
    "description": "幻灯片描述",
    "items": {
      "item1": "项目1",
      "item2": "项目2"
    }
  },
  "common": {
    "next": "下一页",
    "previous": "上一页"
  }
}
```

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
  --border: 226 232 240;
  --highlight: 254 240 138;
}
```

#### Tailwind 配置

扩展了 Tailwind 的颜色配置：

```javascript
// tailwind.config.cjs
module.exports = {
  theme: {
    extend: {
      colors: {
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-muted': 'rgb(var(--surface-muted) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'text-muted': 'rgb(var(--text-muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        highlight: 'rgb(var(--highlight) / <alpha-value>)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(var(--accent) / 0.35)',
      },
    },
  },
}
```

#### 自定义主题

可以通过修改 CSS 变量来自定义主题：

```vue
<template>
  <div
    class="theme-container"
    style="
      --surface: 30 41 59;
      --surface-muted: 51 65 85;
      --text-primary: 248 250 252;
      --text-muted: 148 163 184;
      --accent: 59 130 246;
    "
  >
    <!-- 内容 -->
  </div>
</template>
```

### 开发工作流

#### 环境配置

1. **安装依赖**

   ```bash
   pnpm install
   ```

2. **启动开发服务器**

   ```bash
   pnpm dev
   ```

3. **类型检查**

   ```bash
   pnpm type-check
   ```

4. **代码检查**

   ```bash
   pnpm lint
   ```

5. **代码格式化**

   ```bash
   pnpm format
   ```

6. **构建生产版本**

   ```bash
   pnpm build
   ```

7. **预览生产构建**
   ```bash
   pnpm preview
   ```

#### Git 工作流

1. **分支策略**
   - `main`: 主分支，用于生产环境
   - `develop`: 开发分支，用于集成功能
   - `feature/*`: 功能分支，用于开发新功能
   - `hotfix/*`: 热修复分支，用于紧急修复

2. **提交规范**
   使用 Conventional Commits 规范：

   ```
   <type>[optional scope]: <description>

   [optional body]

   [optional footer(s)]
   ```

   类型说明：
   - `feat`: 新功能
   - `fix`: 修复 bug
   - `docs`: 文档更新
   - `style`: 代码格式化（不影响功能）
   - `refactor`: 重构代码
   - `test`: 添加或修改测试
   - `chore`: 构建过程或辅助工具的变动

   示例：

   ```
   feat(presentation): add slide transition animation

   - Implement fade transition effect
   - Add transition configuration options
   - Update slide container component

   Closes #123
   ```

3. **代码审查**
   - 所有代码必须通过 PR 审查
   - 至少需要一个审查者批准
   - 必须通过所有自动化检查
   - 遵循代码规范和最佳实践

#### 开发命令

```bash
# 开发相关
pnpm dev              # 启动开发服务器
pnpm build            # 构建生产版本
pnpm preview          # 预览生产构建

# 代码质量
pnpm lint             # 运行 ESLint
pnpm lint:fix         # 自动修复 ESLint 问题
pnpm format           # 运行 Prettier 格式化
pnpm type-check       # 运行 TypeScript 类型检查
pnpm lint:format      # 运行所有检查和格式化

# Git 相关
pnpm prepare          # 初始化 Git 钩子
```

### 性能优化

#### 代码分割

1. **路由级别分割**

   ```typescript
   // 自动分割
   {
     path: '/my-theme',
     component: () => import('@/presentations/my-theme/index.vue'),
   }
   ```

2. **组件级别分割**
   ```vue
   <script setup lang="ts">
   const HeavyComponent = defineAsyncComponent(
     () => import('./HeavyComponent.vue')
   )
   </script>
   ```

#### 幻灯片优化

1. **使用 v-show 替代 v-if**

   ```vue
   <!-- ✅ 推荐 -->
   <div v-show="isActive">内容</div>

   <!-- ❌ 不推荐 -->
   <div v-if="isActive">内容</div>
   ```

2. **预览模式优化**

   ```vue
   <script setup lang="ts">
   const props = defineProps<{
     isActive?: boolean
     isPreview?: boolean
   }>()

   // 在预览模式下禁用动画
   const shouldAnimate = computed(() => props.isActive && !props.isPreview)
   </script>
   ```

3. **图片优化**
   ```vue
   <!-- 使用现代图片格式 -->
   <picture>
     <source srcset="image.webp" type="image/webp">
     <img src="image.jpg" alt="描述" loading="lazy">
   </picture>
   ```

#### 构建优化

1. **依赖分析**

   ```bash
   pnpm build --analyze
   ```

2. **预加载关键资源**

   ```html
   <link rel="modulepreload" href="/path/to/important.js" />
   ```

3. **Tree Shaking**
   ```typescript
   // 只导入需要的函数
   import { debounce } from 'lodash-es/debounce'
   // 而不是
   // import _ from 'lodash-es'
   ```

### 最佳实践

#### 组件设计

1. **单一职责原则**
   - 每个组件只负责一个功能
   - 保持组件的简洁和可维护性

2. **组合优于继承**

   ```vue
   <!-- ✅ 推荐：使用组合 -->
   <script setup lang="ts">
   import { useCounter } from '@/composables/useCounter'

   const { count, increment } = useCounter()
   </script>

   <!-- ❌ 不推荐：使用继承 -->
   ```

3. **Props 设计**

   ```typescript
   // ✅ 推荐：明确的类型定义
   interface Props {
     title: string
     count: number
     isActive?: boolean
   }

   // ❌ 不推荐：模糊的类型定义
   interface Props {
     data: any
     config: object
   }
   ```

#### 状态管理

1. **使用 Composition API**

   ```vue
   <script setup lang="ts">
   // 本地状态
   const localState = ref('')

   // 共享状态
   const sharedState = inject('sharedState')

   // 持久化状态
   const persistentState = useLocalStorage('key', defaultValue)
   </script>
   ```

2. **避免过度使用全局状态**
   - 优先使用组件本地状态
   - 只在必要时使用全局状态
   - 使用 provide/inject 进行跨组件通信

#### 错误处理

1. **错误边界**

   ```vue
   <script setup lang="ts">
   import { onErrorCaptured } from 'vue'

   onErrorCaptured((error, instance, info) => {
     console.error('Error captured:', error)
     // 发送错误报告
     return false // 阻止错误继续传播
   })
   </script>
   ```

2. **异步错误处理**

   ```typescript
   // ✅ 推荐：使用 try-catch
   try {
     const result = await fetchData()
   } catch (error) {
     handleError(error)
   }

   // ✅ 推荐：使用 .catch()
   fetchData().catch(handleError)
   ```

#### 可访问性

1. **语义化 HTML**

   ```html
   <!-- ✅ 推荐：语义化标签 -->
   <main>
     <section>
       <h2>标题</h2>
       <p>内容</p>
     </section>
   </main>

   <!-- ❌ 不推荐：过度使用 div -->
   <div>
     <div>
       <div>标题</div>
       <div>内容</div>
     </div>
   </div>
   ```

2. **ARIA 标签**

   ```html
   <button aria-label="关闭对话框" @click="close">
     <span aria-hidden="true">×</span>
   </button>
   ```

3. **键盘导航**

   ```vue
   <script setup lang="ts">
   const handleKeydown = (event: KeyboardEvent) => {
     if (event.key === 'Enter' || event.key === ' ') {
       activate()
     }
   }
   </script>

   <div role="button" tabindex="0" @keydown="handleKeydown" @click="activate">
     可聚焦元素
   </div>
   ```

### 故障排除

#### 常见问题

1. **路由不生效**
   - 检查路由配置和组件导入路径
   - 确认路由名称唯一性
   - 检查路由守卫逻辑

2. **样式不生效**
   - 确认 Tailwind 类名正确性
   - 检查 CSS 自定义属性定义
   - 确认样式优先级

3. **背景不显示**
   - 检查 `BackgroundManager` 组件是否正确导入
   - 确认背景注册表配置
   - 检查背景模块导出

4. **图表不渲染**
   - 确认 ECharts 配置正确性
   - 检查数据格式
   - 确认容器尺寸设置

5. **国际化不工作**
   - 检查翻译文件路径和格式
   - 确认语言代码正确性
   - 检查 useDeckI18n 配置

#### 调试技巧

1. **Vue DevTools**
   - 检查组件状态和 props
   - 查看组件树结构
   - 监控事件触发

2. **浏览器控制台**
   - 查看错误信息和警告
   - 使用 console.log 调试
   - 利用断点调试

3. **Vite HMR**
   - 利用热重载快速迭代
   - 检查模块更新状态
   - 使用状态保持功能

4. **网络请求**
   - 检查资源加载情况
   - 监控 API 请求
   - 分析加载性能

### 项目部署

#### 构建配置

1. **环境变量**

   ```bash
   # .env.production
   VITE_BASE=/your-app/
   VITE_API_URL=https://api.example.com
   ```

2. **构建优化**

   ```bash
   # 分析构建结果
   pnpm build --analyze

   # 构建生产版本
   pnpm build
   ```

#### 部署选项

1. **静态部署**

   ```bash
   # 构建后部署 dist 目录
   pnpm build

   # 部署到静态服务器
   rsync -av dist/ user@server:/path/to/public/
   ```

2. **Vercel 部署**

   ```json
   // vercel.json
   {
     "buildCommand": "pnpm build",
     "outputDirectory": "dist",
     "installCommand": "pnpm install"
   }
   ```

3. **Netlify 部署**

   ```toml
   # netlify.toml
   [build]
   command = "pnpm build"
   publish = "dist"

   [build.environment]
   NODE_VERSION = "20"
   ```

#### 性能监控

1. **Core Web Vitals**
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)
   - CLS (Cumulative Layout Shift)

2. **监控工具**
   - Google PageSpeed Insights
   - Lighthouse
   - Web Vitals Extension

### 版本管理

#### 语义化版本

使用语义化版本控制 (SemVer)：

- `MAJOR.MINOR.PATCH`
- `1.0.0`: 主要版本（不兼容的 API 修改）
- `1.1.0`: 次要版本（向下兼容的功能性新增）
- `1.1.1`: 修订版本（向下兼容的问题修正）

#### 发布流程

1. **更新版本号**

   ```bash
   # 更新 package.json 版本
   pnpm version patch  # 1.1.1
   pnpm version minor  # 1.2.0
   pnpm version major  # 2.0.0
   ```

2. **生成变更日志**

   ```bash
   # 使用 conventional-changelog
   pnpm run changelog
   ```

3. **创建发布标签**
   ```bash
   git tag v1.2.0
   git push origin v1.2.0
   ```

### 贡献指南

#### 开发环境设置

1. **Fork 项目**

   ```bash
   # Fork 项目到个人账户
   # 克隆 fork 的仓库
   git clone https://github.com/username/vue_ppt.git
   cd vue_ppt
   ```

2. **设置上游仓库**

   ```bash
   git remote add upstream https://github.com/original/vue_ppt.git
   ```

3. **创建功能分支**
   ```bash
   git checkout -b feature/new-feature
   ```

#### 提交规范

1. **代码质量检查**

   ```bash
   # 运行所有检查
   pnpm lint:format
   pnpm type-check
   pnpm build
   ```

2. **提交代码**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

3. **创建 Pull Request**
   - 填写详细的 PR 描述
   - 关联相关 Issue
   - 请求代码审查

#### 代码审查标准

1. **功能正确性**
   - 功能是否按预期工作
   - 是否有足够的测试覆盖
   - 边界情况是否处理

2. **代码质量**
   - 是否遵循项目规范
   - 代码是否清晰易读
   - 是否有重复代码

3. **性能考虑**
   - 是否有性能问题
   - 是否有内存泄漏
   - 是否有优化空间

通过遵循以上规范和指南，可以高效地开发出高质量、可维护的幻灯片主题。
