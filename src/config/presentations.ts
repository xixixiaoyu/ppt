export interface Presentation {
  id: string
  title: string
  description: string
  route: string
  tags?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  duration?: string
  lastUpdated?: string
  thumbnail?: string
}

export interface Category {
  id: string
  name: string
  description?: string
  icon?: string
  expanded?: boolean
  presentations: Presentation[]
  color?: string
}

export const categoriesConfig: Category[] = [
  {
    id: 'llm',
    name: '大模型',
    description: '大型语言模型相关演示文稿',
    icon: 'brain',
    expanded: true,
    color: 'teal',
    presentations: [
      {
        id: 'llm-tutorial',
        title: '大模型教程',
        description: '全面介绍大模型的原理、训练、应用和最佳实践',
        route: '/llm',
        tags: ['大模型', 'AI', '深度学习'],
        difficulty: 'intermediate',
        duration: '45分钟',
        lastUpdated: '2024-01-15',
      },
    ],
  },
  {
    id: 'templates',
    name: '设计模板',
    description: '各种演示文稿设计模板和布局',
    icon: 'palette',
    expanded: false,
    color: 'purple',
    presentations: [
      {
        id: 'design-language-template',
        title: '设计语言模板',
        description: '包含多种幻灯片模板的设计系统',
        route: '/template',
        tags: ['设计', '模板', 'UI'],
        difficulty: 'beginner',
        duration: '30分钟',
        lastUpdated: '2024-01-10',
      },
    ],
  },
  {
    id: 'data-visualization',
    name: '数据可视化',
    description: '数据展示和图表相关的演示文稿',
    icon: 'chart-bar',
    expanded: false,
    color: 'blue',
    presentations: [
      {
        id: 'echarts-demos',
        title: 'ECharts 图表演示',
        description: '使用 ECharts 创建各种交互式图表',
        route: '/charts',
        tags: ['图表', '数据可视化', 'ECharts'],
        difficulty: 'intermediate',
        duration: '25分钟',
        lastUpdated: '2024-01-08',
      },
    ],
  },
  {
    id: 'web-development',
    name: 'Web 开发',
    description: '前端和 Web 开发相关的技术演示',
    icon: 'code',
    expanded: false,
    color: 'green',
    presentations: [
      {
        id: 'vue3-advanced',
        title: 'Vue 3 高级特性',
        description: '深入探讨 Vue 3 的高级特性和最佳实践',
        route: '/vue3-advanced',
        tags: ['Vue', '前端', 'JavaScript'],
        difficulty: 'advanced',
        duration: '40分钟',
        lastUpdated: '2024-01-12',
      },
      {
        id: 'typescript-patterns',
        title: 'TypeScript 设计模式',
        description: '在 TypeScript 中实现常见的设计模式',
        route: '/typescript-patterns',
        tags: ['TypeScript', '设计模式', '编程'],
        difficulty: 'advanced',
        duration: '35分钟',
        lastUpdated: '2024-01-05',
      },
    ],
  },
]

export const tagsList = [
  '大模型',
  'AI',
  '深度学习',
  '设计',
  '模板',
  'UI',
  '图表',
  '数据可视化',
  'ECharts',
  'Vue',
  '前端',
  'JavaScript',
  'TypeScript',
  '设计模式',
  '编程',
]

export const difficulties = ['beginner', 'intermediate', 'advanced'] as const
export type Difficulty = (typeof difficulties)[number]

export const sortOptions = [
  { value: 'title', label: '按标题排序' },
  { value: 'difficulty', label: '按难度排序' },
  { value: 'duration', label: '按时长排序' },
  { value: 'lastUpdated', label: '按更新时间排序' },
] as const

export type SortOption = (typeof sortOptions)[number]['value']
