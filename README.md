# hebiko-astro — 摄影作品集站点

基于 [hebiko.cn](https://hebiko.cn) 风格，用 Astro 构建的二次元/Cosplay 摄影作品集站点。

## 技术栈

- **框架**: Astro 5.x（静态生成 SSG）
- **语言**: TypeScript
- **样式**: 纯 CSS（暗色主题 + 毛玻璃 + 瀑布流）
- **日历**: FullCalendar 5.11.3（CDN 引入）
- **部署**: 静态 HTML，可部署到任何静态托管服务

## 项目结构

```
hebiko-astro/
├── public/
│   ├── favicon.svg            # 站点图标
│   └── previews/              # 图片目录（放你的作品图片）
├── src/
│   ├── data/
│   │   ├── photos.ts          # 作品数据（替换为你的作品）
│   │   └── schedule.ts        # 日程数据（替换为你的安排）
│   ├── layouts/
│   │   └── BaseLayout.astro   # 全站布局（导航栏+灯箱+弹窗）
│   ├── pages/
│   │   ├── index.astro        # 首页：作品集瀑布流
│   │   └── schedule.astro     # 日程页：月历视图
│   ├── styles/
│   │   └── global.css         # 全局样式
│   └── env.d.ts               # 类型声明
├── astro.config.mjs           # Astro 配置
├── package.json
├── tsconfig.json
└── README.md
```

## 逐步搭建指南

### 第一步：环境准备

确保电脑已安装 Node.js 18+（推荐 20+）：

```bash
node -v   # 应显示 v18.x 或更高
npm -v    # 应显示 9.x 或更高
```

如未安装，前往 [nodejs.org](https://nodejs.org/) 下载安装。

### 第二步：安装依赖

在项目根目录下运行：

```bash
npm install
```

这会安装 Astro、TypeScript 等依赖。

### 第三步：准备图片

将你的摄影作品图片放入 `public/previews/` 目录下。建议使用 jpg 格式，宽度 800-1200px 即可。

### 第四步：修改数据

**作品数据** — 编辑 `src/data/photos.ts`：

```ts
{
  id: '01',
  title: '角色名',      // 显示在卡片上
  ip: '作品来源',       // 如"原神""鸣潮"
  model: '模特名',      // 出镜模特
  tags: ['#高调', '#外景'],  // 摄影标签，用于筛选
  image: '/previews/你的文件名.jpg',
}
```

**日程数据** — 编辑 `src/data/schedule.ts`：

```ts
{ title: '14时 角色名 地点', date: '2026-07-15' },
```

### 第五步：修改站点信息

**站点名称** — 编辑 `src/layouts/BaseLayout.astro` 第 8 行，修改 `title` 和 `description` 默认值。

**联系信息** — 编辑 `src/pages/index.astro`，修改 `.contact-line` 段落中的联系方式。

**模特选图密码** — 编辑 `src/layouts/BaseLayout.astro` 第 161 行，修改 `validCodes` 数组。

**随机背景图** — 编辑 `src/layouts/BaseLayout.astro` 第 23 行，修改 `backgrounds` 数组。

### 第六步：本地预览

```bash
npm run dev
```

浏览器访问 `http://localhost:4321` 即可预览。

### 第七步：构建部署

```bash
npm run build
```

构建产物在 `dist/` 目录下，可直接部署到：

- **GitHub Pages**: 将 `dist/` 推送到 `gh-pages` 分支
- **Vercel / Netlify**: 连接仓库，构建命令 `npm run build`，输出目录 `dist`
- **Cloudflare Pages**: 同上配置
- **任意静态服务器**: 将 `dist/` 内容上传即可

### 第八步：自定义样式

编辑 `src/styles/global.css`，所有颜色变量在 `:root` 中定义：

```css
--bg-deep: #0a0c10;       /* 最深背景色 */
--bg-card: #111317;        /* 卡片背景色 */
--accent: #3a6ea5;         /* 主题强调色 */
--text-primary: #eef2f5;   /* 主文字色 */
```

## 功能说明

- **瀑布流作品集**：CSS column-count 实现，自动适配两列/单列
- **标签筛选**：点击筛选栏标签，按摄影风格过滤作品
- **灯箱大图**：点击作品卡片弹出大图，支持键盘左右切换
- **模特选图入口**：密码保护弹窗，可配置合法特征码
- **约拍日程**：FullCalendar 月视图，展示已安排的拍摄日期
- **毛玻璃背景**：随机选取背景图，模糊后作为页面底纹

## 常见问题

**Q: 图片不显示？**  
A: 检查图片是否放在 `public/previews/` 下，且 `photos.ts` 中的 `image` 路径以 `/previews/` 开头。

**Q: 日历不显示？**  
A: FullCalendar 通过 CDN 加载，确保网络可访问 `cdn.jsdelivr.net`。

**Q: 如何修改主题色？**  
A: 修改 `global.css` 中 `:root` 的 `--accent` 变量值即可。