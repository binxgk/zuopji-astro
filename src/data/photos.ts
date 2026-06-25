---
// data/photos.ts — 作品数据，仿 hebiko.cn 格式
// 替换为你的真实图片路径和作品信息即可

export interface Photo {
  id: string;
  title: string;      // 角色名
  ip: string;         // 作品来源（游戏/动漫）
  model: string;      // 出镜模特
  tags: string[];     // 摄影标签
  image: string;      // 图片路径（放在 public/previews/ 下）
}

// 仅演示用样例数据，请替换为你自己的作品
const photos: Photo[] = [
  {
    id: '01',
    title: '柴郡',
    ip: '碧蓝航线',
    model: '',
    tags: ['#场照'],
    image: '/previews/01.jpg',
  },
];

// 提取所有去重标签供筛选条使用
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  photos.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  // 按中文排序保证稳定
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, 'zh'));
}

export default photos;
