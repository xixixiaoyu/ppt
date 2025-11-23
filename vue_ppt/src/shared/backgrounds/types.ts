import type { Component } from 'vue'

export interface BackgroundModuleMeta {
  id: string
  name: string
  description: string
  component: Component
  tags?: string[]
}
