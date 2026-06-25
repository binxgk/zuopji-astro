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
    title: 'toki',
    ip: '蔚蓝档案',
    model: '小甄',
    tags: ['#低调', '#实景棚', '#人造光'],
    image: '/previews/01.jpg',
  },
  {
    id: '02',
    title: '爱弥斯',
    ip: '鸣潮',
    model: '小甄',
    tags: ['#高调', '#白棚', '#人造光', '#动态'],
    image: '/previews/02.jpg',
  },
  {
    id: '03',
    title: '伊德海莉',
    ip: 'zzz',
    model: '松子',
    tags: ['#中间调', '#场照', '#人造光'],
    image: '/previews/03.jpg',
  },
  {
    id: '04',
    title: '大凤',
    ip: '碧蓝航线',
    model: '现在',
    tags: ['#高调', '#实景棚', '#人造光'],
    image: '/previews/04.jpg',
  },
  {
    id: '05',
    title: '甘雨',
    ip: '原神',
    model: '小甄',
    tags: ['#高调', '#外景', '#合成', '#自然光'],
    image: '/previews/05.jpg',
  },
  {
    id: '06',
    title: '蕾姆',
    ip: 're0',
    model: '希洛',
    tags: ['#高调', '#白棚', '#人造光'],
    image: '/previews/06.jpg',
  },
  {
    id: '07',
    title: '蓝蒂',
    ip: '明日方舟',
    model: '号号',
    tags: ['#中间调', '#场照', '#合成', '#人造光'],
    image: '/previews/07.jpg',
  },
  {
    id: '08',
    title: '高雄',
    ip: '碧蓝航线',
    model: '叶不耶',
    tags: ['#中间调', '#白棚', '#人造光'],
    image: '/previews/08.jpg',
  },
  {
    id: '09',
    title: '弗洛洛',
    ip: '鸣潮',
    model: '小甄',
    tags: ['#高调', '#外景', '#自然光', '#故事感'],
    image: '/previews/09.jpg',
  },
  {
    id: '10',
    title: '纱耶香',
    ip: '魔圆',
    model: '三鱼',
    tags: ['#中间调', '#场照', '#外景', '#人造光', '#动态'],
    image: '/previews/10.jpg',
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
