# 氷子 / HSUKO — 视觉系摄影图录

> **Visual Résumé · Issue 01 · 2026**
> Cosplay / Portrait / Field —— 十件作品的私人图录。

一个**单文件、零构建**的摄影作品集站点：`index.html` 一份文件装下全部页面、样式、脚本与交互，双击即可浏览，丢到任何静态托管即可上线。

---

## 关于这个版本

**本站是完全重新构筑的版本，与 hebiko.cn 及其风格没有任何关系。**

早期的骨架（暗色主题 + 毛玻璃 + 瀑布流 + 随机打乱顺序）已经被整体废弃，视觉语言、排版系统、页面结构与交互模型全部重写：

| | 旧版（已废弃） | 当前版本 |
| --- | --- | --- |
| 视觉语言 | 暗色 + 毛玻璃 + 柔光 | 纸白 / 墨黑 + 信号橙、电光青双强调色，halftone 网点、硬投影、颗粒 |
| 排版 | 居中 Hero + 常规字阶 | 瑞士栅格 + 编辑设计字阶，`clamp()` 流体排版，展签式四级信息层级 |
| 页面模型 | 多页 Astro 构建 | 单文件三页 SPA（作品索引 / 拍摄须知 / 价格参考），500ms 无位移交叉淡入 |
| 作品顺序 | 每次随机打乱 | 本地计数轮转，每次刷新整体左移一位，Hero 主图同步轮换 |
| 构建 | `npm install` + `npm run build` | 无需构建、无需依赖，字体走 Google Fonts CDN |

旧版 Astro 源码仍保留在 `src/` 目录下作为归档参考，当前站点已不再依赖它。当时的完整设计决策记录见 [`DESIGN-NOTES.md`](./DESIGN-NOTES.md)（585 行，逐条可回查）。

---

## 特性

- **单文件交付** — `index.html` 内联全部 CSS / JS / 数据，约 3000 行，无打包工具、无框架、无 npm 依赖
- **三页 SPA** — 作品索引、拍摄须知、价格参考，用 `#page-*` 哈希路由切换，前进后退可用
- **杂志式 Hero** — 两张主图轮换、竖排刊头、Issue 编号、跑马灯（marquee）循环带
- **作品索引** — 标签筛选（全部 / #场照 / #棚拍 / #外景 / #正片 / #半合成）+ CSS Grid 画廊 + 悬停展签
- **灯箱** — 每组多图展开为平面序列，键盘 ← → / Esc 操作，触屏 44px 侧边热区，焦点循环与焦点归还
- **轮转机制** — `localStorage` 记录访问计数（键 `hsuko.rotation.v1`），顺序轮转而非随机，同一访客每次刷新看到不同首屏
- **性能** — 图片 `loading="lazy"` + `IntersectionObserver` 懒加载、封面 `fetchpriority="high"`、`content-visibility` 与 `will-change` 收敛
- **可访问性** — 跳过链接、`aria-current` / `aria-pressed` / `aria-modal`、44px 最小触控目标、`prefers-reduced-motion` 降级、纯键盘可完成全部操作
- **纯前端管理台** — `admin.html` 提供作品与价格的可视化编辑、批量操作、导入导出 JSON、重置草稿

---

## 目录结构

```
zuopji-astro/
├── index.html              # 主站：单文件站点（内联 CSS / JS / 作品数据）
├── admin.html              # 管理台：作品与价格的纯前端编辑器（导出 site-config.json）
├── DESIGN-NOTES.md         # 设计决策记录：理论依据、取舍、实测证据
├── public/
│   ├── favicon.ico
│   └── previews/           # 作品图片，按作品 id 分目录
│       ├── 01/01-1.jpg 01-2.jpg
│       ├── 02/02-1.jpg
│       ├── 03/03-1.jpg
│       └── ...
├── src/                    # 上一代 Astro 版本（归档，当前站点不依赖）
│   ├── data/site-config.json
│   ├── layouts/BaseLayout.astro
│   ├── pages/{index,schedule,pricing,admin}.astro
│   └── styles/global.css
├── astro.config.mjs        # 仅归档版使用
├── package.json            # 仅归档版使用
└── tsconfig.json           # 仅归档版使用
```

---

## 快速开始

### 直接打开

双击 `index.html` 即可。所有样式与脚本都内联，作品图走相对路径 `public/previews/…`，无需服务器。

想更接近真实环境（哈希路由、字体缓存行为一致），起一个本地静态服务器即可：

```bash
# 任选其一
npx serve .
python -m http.server 8080
```

### 需要联网的部分

- **字体**：Google Fonts（Bodoni Moda / Courier Prime / Space Grotesk / Noto Serif SC / Noto Sans SC）。离线时会回退到系统衬线/无衬线，排版不塌但气质会变。
- **图片**：全部本地，无外链。

---

## 维护内容

### 1. 增删作品

作品数据内联在 `index.html` 底部的 `const photos = [...]`（约第 2348 行）：

```js
{
  id: '11',                    // 作品编号，同时是图片目录名
  title: '下江小春',            // 角色名
  ip: '碧蓝档案',               // 作品出处
  model: '屁屁',                // 出镜模特
  tags: ['#外景'],              // 标签，自动汇总进筛选栏
  color: '#141416',            // 旧版占位色，已中性化，当前不参与渲染
  h: 1.3,                      // 高宽比系数（1.0–2.0），决定卡片占位高度
  images: ['11-1.jpg']         // 图片文件名，放在 public/previews/11/ 下
}
```

`id` 必须与图片目录同名，图片路径由 `public/previews/{id}/{文件名}` 拼出。

### 2. 用管理台改（推荐，免手写数组）

打开 `admin.html`：

- 修改保存在浏览器 `localStorage` 的 `aura_admin_config` 键中，**不会自动写回源码**
- 支持增删改作品、调整图片顺序、编辑标签、批量删除、编辑价格与加购项
- 「导出 JSON」下载完整的 `site-config.json`，覆盖到 `src/data/site-config.json`
- 「导入 JSON」可从备份恢复；「重置」回到内置默认值

> 注意：当前主站读的是 `index.html` 里的内联数组。管理台导出的是 `src/data/site-config.json`（归档 Astro 版的数据源）。把导出的内容同步进 `index.html` 的 `photos` 数组后刷新，改动才会出现在前台。

### 3. 图片规范

- 目录：`public/previews/{作品id}/{作品id}-{序号}.jpg`
- 格式：JPG，长边 1200–2000px，单张控制在 500KB 以内（首屏 Hero 优先）
- 文件名**全小写**，与 `photos[].images` 中写法严格一致 —— 站点常部署在区分大小写的 Linux 主机上，`03-1.JPG` 与 `03-1.jpg` 是两个不同文件

---

## 部署

纯静态，`index.html` 与 `public/` 放在同一目录即可：

- **GitHub Pages** — 把仓库设为 Pages 源（main 分支根目录），保持 `index.html` 与 `public/` 同级
- **Vercel / Netlify / Cloudflare Pages** — 无需构建命令，输出目录填仓库根目录（或 `/`）
- **任意静态服务器 / 对象存储** — 上传 `index.html`、`admin.html`、`public/` 三个对象即可

若要部署到子路径（如 `example.com/works/`），确认 `index.html` 中的 `public/previews/…` 相对路径与所在层级一致。

---

## 设计说明

[`DESIGN-NOTES.md`](./DESIGN-NOTES.md) 记录了每一处视觉选择的依据与无法同时满足时的取舍，包括：瑞士国际主义的栅格执行、编辑设计六变量的具体化、博物馆展签的四级信息制度、流体排版的 clamp 公式表、8px 基线、44px 热区、WCAG 对比度实测结论，以及 11 条任务书内部冲突的处理方式。

配色 token（`index.html` 的 `:root`）：

```css
--bg-paper:      #F4F3F0;  /* 纸白 */
--ink-black:     #090909;  /* 墨黑 */
--accent-orange: #FF3E00;  /* 信号橙 */
--accent-cyan:   #00F0FF;  /* 电光青 */
--hazard-yellow: #FFD600;  /* 警示黄 */
```

---

## 更新记录

- **2026-10** — 全站重写为单文件版本，彻底脱离 hebiko.cn 风格；新增杂志式 Hero、轮询式首屏轮转、三页 SPA 路由、纯前端管理台；修正 `03-1.JPG` 与引用大小写不一致的问题
- **更早** — Astro 版本的构建与迭代记录（见 `src/`，仅作归档）

---

## 联系

约拍 / 合作：QQ **2166783550** · 微信 **anzzbfly**
