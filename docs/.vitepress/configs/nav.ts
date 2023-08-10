import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航', link: '/nav/' },
  {
    text: '前端',
    items: [
      { text: 'JavaScript 基础知识', link: 'https://www.baidu.com' },
      { text: 'CSS 理论知识点', link: 'https://www.baidu.com' },
      { text: 'ES6 常用知识', link: 'https://www.baidu.com' }
    ]
  },
  {
    text: '源码阅读',
    link: 'https://www.baidu.com'
  },

  { text: 'workflow', link: 'https://www.baidu.com' },
  {
    text: '笔记',
    link: 'https://www.baidu.com'
  },
  {
    text: '工具',
    link: 'https://www.baidu.com'
  },
  {
    text: '保护头发',
    link: 'https://github.com/YAMANAIAME1'
  }
]
