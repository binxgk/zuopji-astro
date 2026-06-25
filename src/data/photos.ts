// data/photos.ts — 作品数据
// 替换为你的真实图片路径和作品信息即可

export interface Photo {
  id: string;
  title: string;      // 角色名
  ip: string;         // 作品来源（游戏/动漫）
  model: string;      // 出镜模特
  tags: string[];     // 摄影标签
  color: string;      // 占位背景色
  h: number;          // 高宽比系数（1.0~2.0）
  images: string[];   // 图片文件名（放在 public/previews/ 下）
}

const photos: Photo[] = [
  { id:'01',title:'柴郡',ip:'碧蓝航线',model:'',tags:['#场照'],color:'#AADDD4',h:1.4, images:['01-1.jpg','01-2.jpg'] },
  { id:'02',title:'镜花水月',ip:'明日方舟',model:'绯雪',tags:['#棚拍','#正片'],color:'#C5D9D5',h:1.5, images:['02-1.jpg'] },
  { id:'03',title:'夏日余晖',ip:'原神',model:'萌萌香',tags:['#场照','#外景'],color:'#E6DFDF',h:1.2, images:['03-1.jpg','03-2.jpg'] },
  { id:'04',title:'星穹之下',ip:'崩坏：星穹铁道',model:'',tags:['#棚拍'],color:'#7FEFD0',h:1.6, images:['04-1.jpg'] },
  { id:'05',title:'夜兰',ip:'原神',model:'绯雪',tags:['#场照','#正片'],color:'#B5D8CF',h:1.3, images:['05-1.jpg','05-2.jpg','05-3.jpg'] },
  { id:'06',title:'花火祭',ip:'崩坏：星穹铁道',model:'萌萌香',tags:['#场照','#外景'],color:'#D9CFCF',h:1.1, images:['06-1.jpg'] },
  { id:'07',title:'银狼',ip:'崩坏：星穹铁道',model:'',tags:['#正片'],color:'#C2D4D9',h:1.5, images:['07-1.jpg','07-2.jpg'] },
  { id:'08',title:'霜星',ip:'明日方舟',model:'绯雪',tags:['#棚拍','#正片'],color:'#D4D0DE',h:1.4, images:['08-1.jpg'] },
];

// 提取所有去重标签供筛选条使用
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  photos.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, 'zh'));
}

export default photos;