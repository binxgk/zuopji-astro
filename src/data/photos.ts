// data/photos.ts — 作品数据（从 site-config.json 读取，与管理面板联动）

import siteConfig from './site-config.json';

export interface Photo {
  id: string;
  title: string;      // 角色名
  ip: string;         // 作品来源（游戏/动漫）
  model: string;      // 出镜模特
  tags: string[];     // 摄影标签
  color: string;      // 占位背景色
  h: number;          // 高宽比系数（1.0~2.0）
  images: string[];   // 图片文件名（放在 public/previews/ 对应id文件夹下）
}

// 从 site-config.json 同步，管理面板导出后重建即可生效
const photos: Photo[] = siteConfig.photos as Photo[];

// 提取所有去重标签供筛选条使用
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  photos.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, 'zh'));
}

export default photos;