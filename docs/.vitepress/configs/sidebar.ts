import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/fe/JavaScript/': [
    {
      text: 'JavaScript 基础知识',
      items: [
        { text: '数据类型', link: '/fe/JavaScript/type' },
        { text: '引用类型的拷贝', link: '/fe/JavaScript/clone' },
        { text: '类型转换', link: '/fe/JavaScript/conversions' },
        { text: '原型和原型链', link: '/fe/JavaScript/prototype' },
        { text: '继承', link: '/fe/JavaScript/inherit' }
      ]
    },
    {
      text: 'ES6常用知识点',
      items: [
        { text: '数据类型', link: 'https://www.baidu.com' },
        { text: '引用类型的拷贝', link: 'https://www.baidu.com' },
        { text: '类型转换', link: 'https://www.baidu.com' },
        { text: '原型和原型链', link: 'https://www.baidu.com' },
        { text: '继承', link: 'https://www.baidu.com' }
      ]
    },
    {
      text: 'TypeScript',
      items: [
        { text: '基础知识', link: 'https://www.baidu.com' },
        { text: '编译配置', link: 'https://www.baidu.com' },
        { text: '类型体操', link: 'https://www.baidu.com' }
      ]
    },
    {
      text: 'HTML/CSS',
      items: [
        { text: 'HTML理论知识点', link: 'https://www.baidu.com' },
        { text: 'CSS理论知识点', link: 'https://www.baidu.com' }
      ]
    }
  ]
}
