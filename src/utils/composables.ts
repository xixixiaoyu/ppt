import type {
  Difficulty,
  Presentation,
  SortOption,
} from '@/config/presentations'
import { categoriesConfig } from '@/config/presentations'
import type { Theme } from '@/config/themes'
import {
  applyTheme,
  getSavedTheme,
  getThemeById,
  themes,
} from '@/config/themes'
import type { Ref } from 'vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

// 搜索和筛选功能
export function useSearchAndFilter() {
  const searchQuery = ref('')
  const selectedTags = ref<string[]>([])
  const selectedDifficulty = ref<Difficulty | 'all'>('all')
  const selectedCategory = ref<string>('all')
  const sortBy = ref<SortOption>('title')

  const filteredCategories = computed(() => {
    let result = [...categoriesConfig]

    // 按分类筛选
    if (selectedCategory.value !== 'all') {
      result = result.filter(category => category.id === selectedCategory.value)
    }

    // 对每个分类中的演示文稿进行筛选和排序
    result = result
      .map(category => ({
        ...category,
        presentations: filterAndSortPresentations(category.presentations),
      }))
      .filter(category => category.presentations.length > 0)

    return result
  })

  function filterAndSortPresentations(presentations: Presentation[]) {
    let filtered = [...presentations]

    // 搜索筛选
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        presentation =>
          presentation.title.toLowerCase().includes(query) ||
          presentation.description.toLowerCase().includes(query) ||
          presentation.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // 标签筛选
    if (selectedTags.value.length > 0) {
      filtered = filtered.filter(presentation =>
        selectedTags.value.every(tag => presentation.tags?.includes(tag))
      )
    }

    // 难度筛选
    if (selectedDifficulty.value !== 'all') {
      filtered = filtered.filter(
        presentation => presentation.difficulty === selectedDifficulty.value
      )
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy.value) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'difficulty': {
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 }
          return (
            (difficultyOrder[a.difficulty || 'intermediate'] || 2) -
            (difficultyOrder[b.difficulty || 'intermediate'] || 2)
          )
        }
        case 'duration':
          return (a.duration || '').localeCompare(b.duration || '')
        case 'lastUpdated':
          return (b.lastUpdated || '').localeCompare(a.lastUpdated || '')
        default:
          return 0
      }
    })

    return filtered
  }

  function clearFilters() {
    searchQuery.value = ''
    selectedTags.value = []
    selectedDifficulty.value = 'all'
    selectedCategory.value = 'all'
    sortBy.value = 'title'
  }

  return {
    searchQuery,
    selectedTags,
    selectedDifficulty,
    selectedCategory,
    sortBy,
    filteredCategories,
    clearFilters,
  }
}

// 主题管理
export function useTheme() {
  const currentTheme = ref<Theme>(themes[0])

  onMounted(() => {
    const savedThemeId = getSavedTheme()
    if (savedThemeId) {
      const theme = getThemeById(savedThemeId)
      if (theme) {
        currentTheme.value = theme
        applyTheme(theme)
      }
    } else {
      // 检查系统主题偏好
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      const defaultTheme = prefersDark
        ? themes.find(t => t.id === 'dark')
        : themes.find(t => t.id === 'light')
      if (defaultTheme) {
        currentTheme.value = defaultTheme
        applyTheme(defaultTheme)
      }
    }
  })

  function setTheme(theme: Theme) {
    currentTheme.value = theme
    applyTheme(theme)
  }

  function toggleTheme() {
    const currentIndex = themes.findIndex(t => t.id === currentTheme.value.id)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  return {
    currentTheme,
    themes,
    setTheme,
    toggleTheme,
  }
}

// 键盘导航
export function useKeyboardNavigation(callbacks: Record<string, () => void>) {
  onMounted(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 忽略在输入框中的按键
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      const key = event.key.toLowerCase()
      if (callbacks[key]) {
        event.preventDefault()
        callbacks[key]()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeyDown)
    })
  })
}

// 分类展开/折叠管理
export function useCategoryExpansion() {
  const expandedCategories = ref<Set<string>>(new Set())

  function toggleCategory(categoryId: string) {
    if (expandedCategories.value.has(categoryId)) {
      expandedCategories.value.delete(categoryId)
    } else {
      expandedCategories.value.add(categoryId)
    }
  }

  function expandAll() {
    categoriesConfig.forEach(category => {
      expandedCategories.value.add(category.id)
    })
  }

  function collapseAll() {
    expandedCategories.value.clear()
  }

  function isCategoryExpanded(categoryId: string) {
    return expandedCategories.value.has(categoryId)
  }

  return {
    expandedCategories,
    toggleCategory,
    expandAll,
    collapseAll,
    isCategoryExpanded,
  }
}

// 响应式设计辅助
export function useResponsive() {
  const windowWidth = ref(window.innerWidth)
  const windowHeight = ref(window.innerHeight)

  const isMobile = computed(() => windowWidth.value < 768)
  const isTablet = computed(
    () => windowWidth.value >= 768 && windowWidth.value < 1024
  )
  const isDesktop = computed(() => windowWidth.value >= 1024)

  const updateDimensions = () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', updateDimensions)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateDimensions)
  })

  return {
    windowWidth,
    windowHeight,
    isMobile,
    isTablet,
    isDesktop,
  }
}

// 本地存储管理
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [Ref<T>, (value: T) => void] {
  const storedValue = ref<T>(defaultValue)

  onMounted(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        storedValue.value = JSON.parse(item)
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
    }
  })

  const setValue = (value: T) => {
    try {
      storedValue.value = value
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue as Ref<T>, setValue]
}
