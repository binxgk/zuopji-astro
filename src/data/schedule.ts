---
// data/schedule.ts — 日程数据
// 用于 FullCalendar 事件源

export interface ScheduleEvent {
  title: string;
  date: string;       // YYYY-MM-DD
  extendedProps?: {
    time?: string;    // 如 "12时"
  };
}

const schedule: ScheduleEvent[] = [
  { title: '12时 ci studio白棚包天', date: '2026-06-07' },
  { title: '20时 绯雪', date: '2026-06-13' },
  { title: '16时 萌萌香jk', date: '2026-06-20' },
  { title: '19时 达妮娅', date: '2026-06-27' },
  { title: '12时 千夏、怨仇、花火', date: '2026-07-04' },
  { title: '12时 菲比', date: '2026-07-11' },
  { title: '14时 穹妹jk', date: '2026-07-12' },
];

export default schedule;
