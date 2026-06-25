import { defineConfig } from 'astro/config';

export default defineConfig({
  // 生产环境站点 URL，部署时改为你的域名
  site: 'https://example.com',
  // 输出静态文件到 dist 目录
  output: 'static',
});
