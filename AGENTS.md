# AGENTS.md - 苍穹工会活动页

## 项目概览

暗黑破坏神：不朽 - 苍穹杯工会争霸赛活动展示页面。单页面应用，包含活动名称、报名要求、活动规则、报名时间、报名项目（战队信息表）、赛程安排、奖励机制等模块。

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + 自定义 CSS 动画
- **UI**: 自定义哥特式暗黑风格组件

## 目录结构

```
src/app/
├── globals.css        # 全局样式、暗黑主题变量、动画定义
├── layout.tsx         # 根布局
├── page.tsx           # 主页面（含所有区块组件）
└── robots.ts          # 爬虫规则
public/
└── hero-bg.jpeg       # Hero 区域背景图
DESIGN.md              # 设计规范文档
```

## 开发命令

- 安装依赖：`pnpm install`
- 开发：`pnpm dev`
- 构建：`pnpm build`
- 启动：`pnpm start`
- 类型检查：`pnpm ts-check`
- Lint：`pnpm lint`

## 设计要点

- 暗黑色系：深渊黑 `#0a0a0f` + 暗金 `#c9a84c` + 血焰红 `#8b1a1a`
- 哥特式风格：锐利边角、符文装饰、火焰粒子效果
- 字体：Cinzel（标题）+ Noto Serif SC（中文标题）+ Noto Sans SC（正文）
- 动画：滚动渐入、符文呼吸发光、火焰粒子浮动、视差滚动

## 注意事项

- 页面为纯前端展示，无后端 API
- 所有交互效果通过 CSS 动画 + IntersectionObserver 实现
- 背景图片存储在 `public/hero-bg.jpeg`
