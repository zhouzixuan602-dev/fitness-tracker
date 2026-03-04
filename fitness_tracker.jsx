import { useState, useEffect } from "react";

// ============================================================
// DATA: Full 16-day plan (Mar 5 – Mar 21)
// Schedule constraints extracted from screenshots
// ============================================================

const SCHEDULE = {
  "2025-03-05": [{ time: "16:00-18:00", course: "BPS3061 Workshop" }],
  "2025-03-06": [{ time: "09:00-11:00", course: "BPS3041 Workshop" }, { time: "13:00-15:00", course: "BPS3062 Workshop" }],
  "2025-03-09": [{ time: "14:00-15:00", course: "BPS3022 Applied" }, { time: "15:00-17:00", course: "BPS3022 Workshop" }, { time: "17:00-21:00", course: "BPS3061 Laboratory" }],
  "2025-03-10": [{ time: "09:00-11:00", course: "BPS3011 Workshop" }, { time: "14:00-16:00", course: "class" }],
  "2025-03-11": [{ time: "16:00-18:00", course: "BPS3041 Applied" }],
  "2025-03-12": [{ time: "16:00-18:00", course: "BPS3061 Workshop" }],
  "2025-03-13": [{ time: "09:00-11:00", course: "BPS3041 Workshop" }, { time: "13:00-15:00", course: "BPS3062 Workshop" }],
  "2025-03-16": [{ time: "09:00-13:00", course: "BPS3041 Laboratory" }],
  "2025-03-17": [{ time: "09:00-11:00", course: "BPS3011 Workshop" }, { time: "11:00-12:00", course: "BPS3022 Applied" }, { time: "14:00-16:00", course: "BPS3061 Workshop" }],
  "2025-03-18": [{ time: "09:00-11:00", course: "BPS3022 Workshop" }, { time: "13:30-15:30", course: "BPS3022 Laboratory" }, { time: "16:00-18:00", course: "BPS3041 Applied" }],
  "2025-03-19": [{ time: "16:00-18:00", course: "BPS3061 Workshop" }],
  "2025-03-20": [{ time: "09:00-11:00", course: "BPS3041 Workshop" }, { time: "13:00-15:00", course: "BPS3062 Workshop" }],
};

const PLAN = {
  "2025-03-05": {
    type: "有氧+核心",
    label: "燃脂启动",
    emoji: "🔥",
    workout_time: "06:30-07:30",
    note: "今天下午4点有课，早上训练最优",
    exercises: [
      { name: "慢跑热身", sets: "1", reps: "10分钟", equipment: "跑步机", alt: "户外快走" },
      { name: "HIIT跳绳", sets: "5组", reps: "1分钟开/30秒休", equipment: "跳绳", alt: "高抬腿原地跑" },
      { name: "平板支撑", sets: "3组", reps: "45秒", equipment: "无", alt: "无" },
      { name: "卷腹", sets: "3组", reps: "20次", equipment: "垫子", alt: "地板" },
      { name: "俄罗斯转体", sets: "3组", reps: "20次(每侧)", equipment: "哑铃/壶铃", alt: "徒手" },
      { name: "登山者", sets: "3组", reps: "30秒", equipment: "无", alt: "无" },
    ],
    diet: {
      breakfast: "燕麦片(80g)+鸡蛋2个+牛奶200ml",
      lunch: "鸡胸肉150g+杂蔬炒+糙米饭100g",
      dinner: "水煮鱼/豆腐+绿叶蔬菜+少量主食",
      snack: "运动后30min: 蛋白粉/希腊酸奶",
      water: "≥2.5L",
    },
    sleep: "23:00前入睡，07:00起床",
  },
  "2025-03-06": {
    type: "上肢力量",
    label: "胸肩臂",
    emoji: "💪",
    workout_time: "11:30-12:30",
    note: "两节课间隙午练",
    exercises: [
      { name: "平板哑铃卧推", sets: "4组", reps: "12次", equipment: "哑铃+长凳", alt: "俯卧撑" },
      { name: "哑铃飞鸟", sets: "3组", reps: "12次", equipment: "哑铃+长凳", alt: "宽距俯卧撑" },
      { name: "坐姿哑铃推举", sets: "3组", reps: "12次", equipment: "哑铃", alt: "手扶椅臂撑" },
      { name: "哑铃侧平举", sets: "3组", reps: "15次", equipment: "哑铃", alt: "弹力带" },
      { name: "绳索下拉/高位下拉", sets: "3组", reps: "12次", equipment: "高位下拉机", alt: "弹力带下拉" },
      { name: "哑铃弯举", sets: "3组", reps: "12次", equipment: "哑铃", alt: "弹力带" },
    ],
    diet: {
      breakfast: "全麦面包2片+鸡蛋2个+无糖豆浆",
      lunch: "牛肉/鸡胸150g+蔬菜+米饭",
      dinner: "清蒸鱼+豆腐+蔬菜",
      snack: "运动后: 香蕉1根+蛋白粉",
      water: "≥2.5L",
    },
    sleep: "23:00前入睡",
  },
  "2025-03-07": {
    type: "主动恢复",
    label: "休息日",
    emoji: "🧘",
    workout_time: "任意15-20分钟",
    note: "周五，轻度拉伸放松",
    exercises: [
      { name: "全身拉伸", sets: "1轮", reps: "15分钟", equipment: "垫子", alt: "地板" },
      { name: "泡沫轴放松", sets: "1轮", reps: "10分钟", equipment: "泡沫轴", alt: "徒手按摩" },
      { name: "腹式呼吸", sets: "3组", reps: "10次深呼吸", equipment: "无", alt: "无" },
    ],
    diet: {
      breakfast: "鸡蛋饼+牛奶",
      lunch: "均衡正餐，可稍放松",
      dinner: "轻食: 沙拉+蛋白质",
      snack: "水果+坚果少量",
      water: "≥2L",
    },
    sleep: "23:30前入睡",
  },
  "2025-03-08": {
    type: "下肢力量",
    label: "腿臀核心",
    emoji: "🦵",
    workout_time: "10:00-11:30",
    note: "周六，作业截止后自由安排",
    exercises: [
      { name: "深蹲(杠铃/哑铃)", sets: "4组", reps: "12次", equipment: "史密斯机/杠铃架", alt: "徒手深蹲" },
      { name: "罗马尼亚硬拉", sets: "3组", reps: "12次", equipment: "哑铃/杠铃", alt: "单腿臀桥" },
      { name: "腿举机", sets: "3组", reps: "15次", equipment: "腿举机", alt: "保加利亚分腿蹲" },
      { name: "腿弯举机", sets: "3组", reps: "12次", equipment: "腿弯举机", alt: "俯卧腿弯举弹力带" },
      { name: "站姿提踵", sets: "4组", reps: "20次", equipment: "台阶", alt: "地面提踵" },
      { name: "臀桥", sets: "3组", reps: "20次", equipment: "垫子", alt: "地板" },
    ],
    diet: {
      breakfast: "燕麦+鸡蛋3个+牛奶",
      lunch: "大量蛋白质(鸡/鱼/肉)+蔬菜+适量碳水",
      dinner: "清淡蛋白质+蔬菜",
      snack: "运动后: 碳水+蛋白质组合",
      water: "≥3L(训练量大)",
    },
    sleep: "22:30前入睡(明天周日)",
  },
  "2025-03-09": {
    type: "有氧",
    label: "燃脂有氧",
    emoji: "🏃",
    workout_time: "06:30-07:30",
    note: "今天课程极多(14:00-21:00)，只能早上训练",
    exercises: [
      { name: "快走/慢跑", sets: "1", reps: "30分钟", equipment: "跑步机", alt: "户外" },
      { name: "椭圆机", sets: "1", reps: "15分钟", equipment: "椭圆机", alt: "爬楼梯" },
      { name: "卷腹", sets: "3组", reps: "20次", equipment: "垫子", alt: "地板" },
      { name: "平板支撑", sets: "3组", reps: "45秒", equipment: "无", alt: "无" },
    ],
    diet: {
      breakfast: "运动前: 半根香蕉 | 运动后: 燕麦+鸡蛋",
      lunch: "便携: 鸡胸肉饭盒+蔬菜",
      dinner: "学校附近清淡餐: 选汤面/轻食",
      snack: "坚果/蛋白棒",
      water: "≥3L",
    },
    sleep: "23:00前，明天有早课",
  },
  "2025-03-10": {
    type: "上肢力量",
    label: "背部+二头",
    emoji: "💪",
    workout_time: "12:00-13:00",
    note: "早课11点结束，午间训练",
    exercises: [
      { name: "高位下拉", sets: "4组", reps: "12次", equipment: "高位下拉机", alt: "引体向上/弹力带" },
      { name: "坐姿划船", sets: "4组", reps: "12次", equipment: "绳索划船机", alt: "俯身哑铃划船" },
      { name: "俯身杠铃/哑铃划船", sets: "3组", reps: "12次", equipment: "哑铃", alt: "弹力带划船" },
      { name: "面拉", sets: "3组", reps: "15次", equipment: "绳索机", alt: "弹力带" },
      { name: "哑铃弯举", sets: "3组", reps: "12次", equipment: "哑铃", alt: "弹力带" },
      { name: "锤式弯举", sets: "3组", reps: "12次", equipment: "哑铃", alt: "弹力带" },
    ],
    diet: {
      breakfast: "鸡蛋2个+全麦面包+牛奶",
      lunch: "高蛋白便当",
      dinner: "清蒸/水煮蛋白质+蔬菜",
      snack: "蛋白粉/酸奶",
      water: "≥2.5L",
    },
    sleep: "23:00前",
  },
  "2025-03-11": {
    type: "核心+有氧",
    label: "腹部燃脂",
    emoji: "🔥",
    workout_time: "07:00-08:00",
    note: "下午4点有课，早上完成",
    exercises: [
      { name: "HIIT循环(4轮)", sets: "4轮", reps: "每动作40s/休息20s", equipment: "无", alt: "无" },
      { name: "⤷ 波比跳", sets: "-", reps: "40秒", equipment: "无", alt: "无" },
      { name: "⤷ 登山者", sets: "-", reps: "40秒", equipment: "无", alt: "无" },
      { name: "⤷ 侧向高抬腿", sets: "-", reps: "40秒", equipment: "无", alt: "无" },
      { name: "⤷ 跳绳/原地跑", sets: "-", reps: "40秒", equipment: "跳绳", alt: "原地跑" },
      { name: "悬挂举腿", sets: "3组", reps: "15次", equipment: "单杠", alt: "仰卧举腿" },
      { name: "平板支撑变体", sets: "3组", reps: "45秒", equipment: "无", alt: "无" },
    ],
    diet: {
      breakfast: "运动前空腹/少量 | 运动后: 蛋白质+碳水",
      lunch: "均衡餐",
      dinner: "轻食，17:00前",
      snack: "无糖希腊酸奶",
      water: "≥2.5L",
    },
    sleep: "23:00前",
  },
  "2025-03-12": {
    type: "下肢力量",
    label: "腿臀加强",
    emoji: "🦵",
    workout_time: "07:00-08:30",
    note: "下午4点课，早起完成",
    exercises: [
      { name: "杠铃深蹲", sets: "4组", reps: "10次", equipment: "深蹲架", alt: "哑铃/徒手深蹲" },
      { name: "腿举", sets: "3组", reps: "15次", equipment: "腿举机", alt: "分腿蹲" },
      { name: "哑铃箭步蹲", sets: "3组", reps: "12次(每腿)", equipment: "哑铃", alt: "徒手箭步蹲" },
      { name: "腿弯举", sets: "3组", reps: "12次", equipment: "腿弯举机", alt: "北欧腿弯举" },
      { name: "提踵", sets: "4组", reps: "20次", equipment: "台阶/腿举机", alt: "地面提踵" },
      { name: "臀推(杠铃)", sets: "3组", reps: "12次", equipment: "长凳+杠铃", alt: "徒手臀桥" },
    ],
    diet: {
      breakfast: "大份: 燕麦+3个鸡蛋+牛奶",
      lunch: "高蛋白高碳水(训练恢复日)",
      dinner: "轻食",
      snack: "碳水+蛋白质组合",
      water: "≥3L",
    },
    sleep: "22:30前",
  },
  "2025-03-13": {
    type: "有氧+全身",
    label: "全身燃脂",
    emoji: "🔥",
    workout_time: "11:30-12:30",
    note: "两节课间隙训练",
    exercises: [
      { name: "划船机热身", sets: "1", reps: "10分钟", equipment: "划船机", alt: "跳绳" },
      { name: "全身循环训练(3轮)", sets: "3轮", reps: "每动作12-15次", equipment: "综合器械", alt: "无" },
      { name: "⤷ 哑铃深蹲推举", sets: "-", reps: "12次", equipment: "哑铃", alt: "徒手" },
      { name: "⤷ 俯身划船", sets: "-", reps: "12次", equipment: "哑铃", alt: "弹力带" },
      { name: "⤷ 俯卧撑", sets: "-", reps: "15次", equipment: "无", alt: "无" },
      { name: "⤷ 箭步蹲", sets: "-", reps: "12次/腿", equipment: "无", alt: "无" },
      { name: "核心收尾: 卷腹+俄转", sets: "3组", reps: "各20次", equipment: "垫子", alt: "地板" },
    ],
    diet: {
      breakfast: "正常",
      lunch: "饭盒: 鸡胸+蔬菜+米饭",
      dinner: "轻食",
      snack: "坚果",
      water: "≥2.5L",
    },
    sleep: "23:00前(周末前)",
  },
  "2025-03-14": {
    type: "主动恢复",
    label: "休息拉伸",
    emoji: "🧘",
    workout_time: "随时20分钟",
    note: "周六，放松身体",
    exercises: [
      { name: "全身拉伸瑜伽", sets: "1轮", reps: "20分钟", equipment: "垫子", alt: "地板" },
      { name: "散步", sets: "1", reps: "30分钟", equipment: "无", alt: "无" },
    ],
    diet: {
      breakfast: "正常均衡",
      lunch: "可适度放松",
      dinner: "7分饱，避免暴食",
      snack: "水果",
      water: "≥2L",
    },
    sleep: "23:00前",
  },
  "2025-03-15": {
    type: "有氧冲刺",
    label: "周日燃脂",
    emoji: "🏃",
    workout_time: "09:00-10:30",
    note: "全自由日，中强度有氧",
    exercises: [
      { name: "慢跑", sets: "1", reps: "30分钟", equipment: "跑步机", alt: "户外" },
      { name: "单车/椭圆机", sets: "1", reps: "20分钟", equipment: "单车机", alt: "爬楼梯" },
      { name: "核心训练", sets: "3组", reps: "各20次", equipment: "垫子", alt: "地板" },
    ],
    diet: {
      breakfast: "燕麦+鸡蛋+水果",
      lunch: "均衡",
      dinner: "清淡",
      snack: "坚果+蛋白棒",
      water: "≥2.5L",
    },
    sleep: "22:30前(明天有早课)",
  },
  "2025-03-16": {
    type: "上肢力量",
    label: "胸肩推",
    emoji: "💪",
    workout_time: "13:30-14:30",
    note: "早课9-13点，下午空闲",
    exercises: [
      { name: "杠铃卧推", sets: "4组", reps: "10次", equipment: "卧推架", alt: "俯卧撑" },
      { name: "上斜哑铃卧推", sets: "3组", reps: "12次", equipment: "哑铃+斜板", alt: "上斜俯卧撑" },
      { name: "哑铃推举", sets: "3组", reps: "12次", equipment: "哑铃", alt: "弹力带" },
      { name: "绳索夹胸", sets: "3组", reps: "15次", equipment: "绳索机", alt: "弹力带夹胸" },
      { name: "三头绳索下压", sets: "3组", reps: "15次", equipment: "绳索机", alt: "窄距俯卧撑" },
    ],
    diet: {
      breakfast: "正常均衡",
      lunch: "高蛋白: 实验室结束后补充",
      dinner: "清淡",
      snack: "蛋白粉+香蕉",
      water: "≥2.5L",
    },
    sleep: "23:00前",
  },
  "2025-03-17": {
    type: "核心+有氧",
    label: "腹部冲刺",
    emoji: "🔥",
    workout_time: "12:30-13:30",
    note: "中午空档训练，下午2-4有课",
    exercises: [
      { name: "跳绳HIIT", sets: "5组", reps: "1分钟跳/30秒休", equipment: "跳绳", alt: "高抬腿" },
      { name: "悬挂举腿", sets: "3组", reps: "15次", equipment: "单杠", alt: "仰卧举腿" },
      { name: "卷腹", sets: "3组", reps: "25次", equipment: "垫子", alt: "地板" },
      { name: "侧平板支撑", sets: "3组", reps: "30秒/侧", equipment: "无", alt: "无" },
      { name: "俄罗斯转体", sets: "3组", reps: "25次/侧", equipment: "哑铃", alt: "徒手" },
    ],
    diet: {
      breakfast: "轻量: 水煮蛋+全麦",
      lunch: "训练后: 鸡胸+蔬菜",
      dinner: "轻食: 鱼/豆腐+蔬菜",
      snack: "无糖酸奶",
      water: "≥2.5L",
    },
    sleep: "23:00前",
  },
  "2025-03-18": {
    type: "下肢+有氧",
    label: "腿部收尾",
    emoji: "🦵",
    workout_time: "07:00-08:00",
    note: "今天课程9点到18点极满，只能早起",
    exercises: [
      { name: "深蹲", sets: "3组", reps: "15次", equipment: "史密斯机", alt: "徒手深蹲" },
      { name: "弓步蹲行走", sets: "3组", reps: "10步/腿", equipment: "无", alt: "无" },
      { name: "单腿臀桥", sets: "3组", reps: "15次/腿", equipment: "垫子", alt: "地板" },
      { name: "跳绳", sets: "4组", reps: "1分钟", equipment: "跳绳", alt: "开合跳" },
    ],
    diet: {
      breakfast: "运动后: 燕麦+蛋",
      lunch: "学校便当或食堂: 高蛋白选择",
      dinner: "轻食(课后)",
      snack: "坚果/蛋白棒",
      water: "≥3L",
    },
    sleep: "22:30前",
  },
  "2025-03-19": {
    type: "上肢+核心",
    label: "综合冲刺",
    emoji: "💪",
    workout_time: "07:00-08:30",
    note: "下午4点课，早起训练",
    exercises: [
      { name: "引体向上/高位下拉", sets: "4组", reps: "10次", equipment: "单杠/高位下拉机", alt: "弹力带辅助引体" },
      { name: "俯卧撑(多变体)", sets: "4组", reps: "15次", equipment: "无", alt: "无" },
      { name: "哑铃划船", sets: "3组", reps: "12次", equipment: "哑铃", alt: "弹力带" },
      { name: "卷腹(加重)", sets: "4组", reps: "20次", equipment: "哑铃+垫子", alt: "地板" },
      { name: "平板支撑", sets: "3组", reps: "60秒", equipment: "无", alt: "无" },
      { name: "HIIT收尾", sets: "3组", reps: "各30秒", equipment: "无", alt: "无" },
    ],
    diet: {
      breakfast: "大份均衡",
      lunch: "高蛋白碳水",
      dinner: "轻食",
      snack: "蛋白粉",
      water: "≥2.5L",
    },
    sleep: "23:00前",
  },
  "2025-03-20": {
    type: "有氧冲刺",
    label: "最终燃脂",
    emoji: "🔥",
    workout_time: "11:30-12:30",
    note: "最后全力有氧日，明天见成效",
    exercises: [
      { name: "慢跑热身", sets: "1", reps: "10分钟", equipment: "跑步机", alt: "户外" },
      { name: "HIIT循环(5轮全力)", sets: "5轮", reps: "每动作45s/休15s", equipment: "无", alt: "无" },
      { name: "⤷ 波比跳", sets: "-", reps: "45秒", equipment: "无", alt: "无" },
      { name: "⤷ 登山者", sets: "-", reps: "45秒", equipment: "无", alt: "无" },
      { name: "⤷ 高抬腿", sets: "-", reps: "45秒", equipment: "无", alt: "无" },
      { name: "⤷ 跳绳", sets: "-", reps: "45秒", equipment: "跳绳", alt: "开合跳" },
      { name: "核心最终: 卷腹+悬挂举腿", sets: "4组", reps: "各20次", equipment: "垫子+单杠", alt: "地板" },
    ],
    diet: {
      breakfast: "清淡: 2蛋+燕麦",
      lunch: "鸡胸+蔬菜，少碳水",
      dinner: "极轻: 蔬菜+蛋白质，18:00前",
      snack: "无糖饮料/清水",
      water: "≥3L(排水消肿)",
    },
    sleep: "22:00前睡(明天早起量体重)",
  },
  "2025-03-21": {
    type: "成果日",
    label: "验收！",
    emoji: "🏆",
    workout_time: "晨起拍照量腰围",
    note: "空腹晨起，量腰围，称体重，对比Day1",
    exercises: [
      { name: "轻度拉伸", sets: "1", reps: "15分钟", equipment: "垫子", alt: "地板" },
      { name: "散步", sets: "1", reps: "20分钟", equipment: "无", alt: "无" },
    ],
    diet: {
      breakfast: "空腹称重后正常早餐",
      lunch: "正常均衡",
      dinner: "庆祝一餐(适度)",
      snack: "任意",
      water: "正常",
    },
    sleep: "正常",
  },
};

// ============================================================
// HELPERS
// ============================================================
function getDateKey(date) {
  return date.toISOString().split("T")[0];
}

function getTodayKey() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000);
  return local.toISOString().split("T")[0];
}

function getDaysBetween(start, end) {
  const days = [];
  const cur = new Date(start);
  while (cur <= end) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return days;
}

const START = new Date("2025-03-05");
const END = new Date("2025-03-21");
const ALL_DAYS = getDaysBetween(START, END);

const WEEKDAY_CN = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

// ============================================================
// STORAGE
// ============================================================
function loadStorage() {
  try {
    const raw = window.localStorage?.getItem?.("fitplan_v2");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { checkins: {}, bodyData: {}, notes: {} };
}
function saveStorage(data) {
  try {
    window.localStorage?.setItem?.("fitplan_v2", JSON.stringify(data));
  } catch {}
}

// ============================================================
// COMPONENTS
// ============================================================
const typeColor = {
  "有氧+核心": "#FF6B35",
  "上肢力量": "#4ECDC4",
  "主动恢复": "#95D5B2",
  "下肢力量": "#FFB347",
  "有氧": "#FF8FAB",
  "核心+有氧": "#FF6B35",
  "下肢+有氧": "#FFB347",
  "上肢+核心": "#4ECDC4",
  "有氧冲刺": "#FF6B35",
  "成果日": "#FFD700",
};

export default function FitnessTracker() {
  const [store, setStore] = useState(loadStorage);
  const [activeDay, setActiveDay] = useState(null);
  const [view, setView] = useState("calendar"); // calendar | detail | stats
  const [tab, setTab] = useState("workout"); // workout | diet | checkin
  const [inputWeight, setInputWeight] = useState("");
  const [inputWaist, setInputWaist] = useState("");
  const [noteText, setNoteText] = useState("");

  const todayKey = getTodayKey();

  useEffect(() => {
    saveStorage(store);
  }, [store]);

  function toggleCheckin(dateKey, type) {
    setStore(prev => {
      const cur = prev.checkins[dateKey] || {};
      return {
        ...prev,
        checkins: {
          ...prev.checkins,
          [dateKey]: { ...cur, [type]: !cur[type] },
        },
      };
    });
  }

  function saveBodyData(dateKey) {
    if (!inputWeight && !inputWaist) return;
    setStore(prev => ({
      ...prev,
      bodyData: {
        ...prev.bodyData,
        [dateKey]: {
          weight: inputWeight || prev.bodyData[dateKey]?.weight,
          waist: inputWaist || prev.bodyData[dateKey]?.waist,
          time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
        },
      },
    }));
    setInputWeight("");
    setInputWaist("");
  }

  function saveNote(dateKey) {
    if (!noteText.trim()) return;
    setStore(prev => ({
      ...prev,
      notes: { ...prev.notes, [dateKey]: noteText },
    }));
    setNoteText("");
  }

  const completedDays = Object.keys(store.checkins).filter(
    k => store.checkins[k]?.workout && store.checkins[k]?.diet
  ).length;

  const totalDays = ALL_DAYS.length;
  const progressPct = Math.round((completedDays / totalDays) * 100);

  // Weight trend
  const weightEntries = ALL_DAYS
    .map(d => ({ date: getDateKey(d), data: store.bodyData[getDateKey(d)] }))
    .filter(e => e.data?.weight);
  const latestWeight = weightEntries.length > 0 ? weightEntries[weightEntries.length - 1].data.weight : "73.5";
  const startWeight = 73.5;
  const weightDiff = weightEntries.length > 0 ? (parseFloat(latestWeight) - startWeight).toFixed(1) : 0;

  // ---- CALENDAR VIEW ----
  if (view === "calendar") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        color: "#fff",
        padding: "0 0 80px 0",
      }}>
        {/* Header */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          padding: "20px 20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          position: "sticky", top: 0, zIndex: 100,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>
                💪 减脂计划
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
                3月5日 → 3月21日 · 16天冲刺
              </div>
            </div>
            <button
              onClick={() => setView("stats")}
              style={{
                background: "rgba(255,107,53,0.2)",
                border: "1px solid rgba(255,107,53,0.4)",
                borderRadius: 12,
                padding: "8px 14px",
                color: "#FF6B35",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              📊 数据
            </button>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>总进度</span>
              <span style={{ fontSize: 11, color: "#FF6B35", fontWeight: 700 }}>{completedDays}/{totalDays} 天完成</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 10 }}>
              <div style={{
                height: "100%",
                width: `${progressPct}%`,
                background: "linear-gradient(90deg, #FF6B35, #FFB347)",
                borderRadius: 10,
                transition: "width 0.5s ease",
              }} />
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {[
              { label: "当前体重", value: `${latestWeight}kg`, color: "#4ECDC4" },
              { label: "体重变化", value: `${weightDiff > 0 ? "+" : ""}${weightDiff}kg`, color: weightDiff <= 0 ? "#95D5B2" : "#FF8FAB" },
              { label: "完成率", value: `${progressPct}%`, color: "#FFB347" },
            ].map(s => (
              <div key={s.label} style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                borderRadius: 10,
                padding: "8px 10px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Day list */}
        <div style={{ padding: "16px 16px 0" }}>
          {ALL_DAYS.map((date) => {
            const key = getDateKey(date);
            const plan = PLAN[key];
            const checkin = store.checkins[key] || {};
            const isToday = key === todayKey;
            const isPast = date < new Date(todayKey);
            const body = store.bodyData[key];
            const color = plan ? (typeColor[plan.type] || "#888") : "#555";
            const fullyDone = checkin.workout && checkin.diet;

            return (
              <div
                key={key}
                onClick={() => { setActiveDay(key); setView("detail"); setTab("workout"); setNoteText(store.notes[key] || ""); }}
                style={{
                  background: isToday
                    ? "rgba(255,107,53,0.12)"
                    : "rgba(255,255,255,0.04)",
                  border: isToday
                    ? "1.5px solid rgba(255,107,53,0.5)"
                    : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16,
                  padding: "14px 16px",
                  marginBottom: 10,
                  cursor: "pointer",
                  opacity: isPast && !plan ? 0.4 : 1,
                  transition: "all 0.2s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {isToday && (
                  <div style={{
                    position: "absolute", top: 8, right: 12,
                    background: "#FF6B35", color: "#fff",
                    fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 20,
                    letterSpacing: 0.5,
                  }}>TODAY</div>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {/* Date */}
                  <div style={{ textAlign: "center", minWidth: 36 }}>
                    <div style={{ fontSize: 20, fontWeight: 900, lineHeight: 1 }}>
                      {date.getDate()}
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                      {WEEKDAY_CN[date.getDay()]}
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ width: 3, height: 44, borderRadius: 4, background: color, flexShrink: 0 }} />

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    {plan ? (
                      <>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 14 }}>{plan.emoji}</span>
                          <span style={{ fontSize: 14, fontWeight: 700 }}>{plan.label}</span>
                          <span style={{
                            fontSize: 10, background: `${color}22`,
                            border: `1px solid ${color}44`,
                            color, padding: "1px 7px", borderRadius: 10,
                          }}>{plan.type}</span>
                        </div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>
                          ⏰ {plan.workout_time}
                        </div>
                      </>
                    ) : (
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>—</div>
                    )}
                  </div>

                  {/* Checkin badges */}
                  <div style={{ display: "flex", gap: 4 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: checkin.workout ? "#4ECDC4" : "rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, border: checkin.workout ? "none" : "1px solid rgba(255,255,255,0.15)",
                    }}>
                      {checkin.workout ? "✓" : "🏋️"}
                    </div>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: checkin.diet ? "#FFB347" : "rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, border: checkin.diet ? "none" : "1px solid rgba(255,255,255,0.15)",
                    }}>
                      {checkin.diet ? "✓" : "🥗"}
                    </div>
                    {body && (
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: "rgba(255,215,0,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700, color: "#FFD700",
                      }}>
                        ⚖
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ---- STATS VIEW ----
  if (view === "stats") {
    const entries = ALL_DAYS
      .map(d => {
        const k = getDateKey(d);
        return { key: k, date: d, ...store.bodyData[k] };
      })
      .filter(e => e.weight || e.waist);

    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        color: "#fff",
        padding: "0 0 80px 0",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          padding: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <button
            onClick={() => setView("calendar")}
            style={{ background: "none", border: "none", color: "#FF6B35", fontSize: 20, cursor: "pointer", padding: 0 }}
          >←</button>
          <div style={{ fontSize: 18, fontWeight: 800 }}>📊 身体数据趋势</div>
        </div>

        <div style={{ padding: 16 }}>
          {/* Weight chart */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: 16, padding: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "#4ECDC4" }}>体重变化 (kg)</div>
            {entries.filter(e => e.weight).length === 0 ? (
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
                暂无数据，去打卡页面录入体重
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 100 }}>
                {entries.filter(e => e.weight).map((e, i) => {
                  const w = parseFloat(e.weight);
                  const min = Math.min(...entries.filter(x=>x.weight).map(x=>parseFloat(x.weight)));
                  const max = Math.max(...entries.filter(x=>x.weight).map(x=>parseFloat(x.weight)));
                  const range = max - min || 1;
                  const h = 20 + ((w - min) / range) * 60;
                  return (
                    <div key={e.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ fontSize: 9, color: "#4ECDC4", fontWeight: 700 }}>{w}</div>
                      <div style={{
                        width: "100%", height: h,
                        background: i === entries.filter(x=>x.weight).length - 1 ? "#4ECDC4" : "rgba(78,205,196,0.4)",
                        borderRadius: "4px 4px 0 0",
                      }} />
                      <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)" }}>
                        {e.date.getDate()}/{e.date.getMonth() + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[
              { label: "开始体重", value: `73.5 kg`, color: "#888" },
              { label: "当前体重", value: `${latestWeight} kg`, color: "#4ECDC4" },
              { label: "变化量", value: `${weightDiff > 0 ? "+" : ""}${weightDiff} kg`, color: weightDiff <= 0 ? "#95D5B2" : "#FF8FAB" },
              { label: "目标", value: "减腹效果可见", color: "#FFD700" },
            ].map(s => (
              <div key={s.label} style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: 14,
                padding: "14px 16px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Log list */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: 16, padding: 16,
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>打卡记录</div>
            {ALL_DAYS.map(d => {
              const k = getDateKey(d);
              const c = store.checkins[k] || {};
              const b = store.bodyData[k];
              const note = store.notes[k];
              if (!c.workout && !c.diet && !b) return null;
              return (
                <div key={k} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", minWidth: 50 }}>
                    {d.getMonth()+1}/{d.getDate()}
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {c.workout && <span style={{ fontSize: 10, background: "rgba(78,205,196,0.2)", color: "#4ECDC4", padding: "2px 7px", borderRadius: 8 }}>运动✓</span>}
                    {c.diet && <span style={{ fontSize: 10, background: "rgba(255,179,71,0.2)", color: "#FFB347", padding: "2px 7px", borderRadius: 8 }}>饮食✓</span>}
                    {b?.weight && <span style={{ fontSize: 10, background: "rgba(255,255,255,0.1)", color: "#ddd", padding: "2px 7px", borderRadius: 8 }}>{b.weight}kg</span>}
                    {b?.waist && <span style={{ fontSize: 10, background: "rgba(255,215,0,0.15)", color: "#FFD700", padding: "2px 7px", borderRadius: 8 }}>腰{b.waist}cm</span>}
                  </div>
                  {note && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>📝 {note}</div>}
                </div>
              );
            }).filter(Boolean)}
            {ALL_DAYS.every(d => { const k = getDateKey(d); const c = store.checkins[k] || {}; return !c.workout && !c.diet && !store.bodyData[k]; }) && (
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
                还没有打卡记录
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---- DETAIL VIEW ----
  const plan = PLAN[activeDay];
  const checkin = store.checkins[activeDay] || {};
  const dateObj = new Date(activeDay);
  const body = store.bodyData[activeDay] || {};
  const schedule = SCHEDULE[activeDay] || [];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#fff",
      paddingBottom: 100,
    }}>
      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        padding: "16px 16px 0",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <button
            onClick={() => setView("calendar")}
            style={{ background: "none", border: "none", color: "#FF6B35", fontSize: 22, cursor: "pointer", padding: 0 }}
          >←</button>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>
              {plan?.emoji} {dateObj.getMonth()+1}月{dateObj.getDate()}日 {WEEKDAY_CN[dateObj.getDay()]}
            </div>
            {plan && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{plan.label} · {plan.type}</div>}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0 }}>
          {[
            { key: "workout", label: "训练" },
            { key: "diet", label: "饮食" },
            { key: "checkin", label: "打卡" },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                borderBottom: tab === t.key ? "2px solid #FF6B35" : "2px solid transparent",
                color: tab === t.key ? "#FF6B35" : "rgba(255,255,255,0.4)",
                fontWeight: tab === t.key ? 700 : 400,
                fontSize: 14,
                padding: "10px 0",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Course conflicts */}
        {schedule.length > 0 && (
          <div style={{
            background: "rgba(255,100,100,0.08)",
            border: "1px solid rgba(255,100,100,0.2)",
            borderRadius: 12, padding: "10px 14px", marginBottom: 14,
          }}>
            <div style={{ fontSize: 11, color: "#FF8FAB", fontWeight: 700, marginBottom: 4 }}>📚 今日课程</div>
            {schedule.map((s, i) => (
              <div key={i} style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>⏰ {s.time} · {s.course}</div>
            ))}
          </div>
        )}

        {/* WORKOUT TAB */}
        {tab === "workout" && plan && (
          <div>
            <div style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 14, padding: "12px 14px", marginBottom: 12,
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <div style={{ fontSize: 12, color: "#4ECDC4", fontWeight: 700 }}>⏰ 建议训练时间</div>
              <div style={{ fontSize: 16, fontWeight: 800, marginTop: 4 }}>{plan.workout_time}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{plan.note}</div>
            </div>

            {plan.exercises.map((ex, i) => (
              <div key={i} style={{
                background: ex.name.startsWith("⤷")
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(255,255,255,0.05)",
                borderRadius: 12, padding: "12px 14px",
                marginBottom: 8,
                border: "1px solid rgba(255,255,255,0.07)",
                marginLeft: ex.name.startsWith("⤷") ? 16 : 0,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{ex.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>
                      {ex.sets !== "-" && `${ex.sets} · `}{ex.reps}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, color: "#FFB347" }}>🏋️ {ex.equipment}</div>
                    {ex.alt && ex.alt !== "无" && (
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>备选: {ex.alt}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DIET TAB */}
        {tab === "diet" && plan && (
          <div>
            {[
              { label: "早餐 🍳", value: plan.diet.breakfast, color: "#FFB347" },
              { label: "午餐 🍱", value: plan.diet.lunch, color: "#4ECDC4" },
              { label: "晚餐 🥗", value: plan.diet.dinner, color: "#95D5B2" },
              { label: "加餐/补剂 💊", value: plan.diet.snack, color: "#FF8FAB" },
              { label: "饮水目标 💧", value: plan.diet.water, color: "#74B9FF" },
              { label: "作息 😴", value: plan.sleep, color: "#a29bfe" },
            ].map(item => (
              <div key={item.label} style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: 14, padding: "12px 16px",
                marginBottom: 10,
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <div style={{ fontSize: 12, color: item.color, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 14 }}>{item.value}</div>
              </div>
            ))}

            {/* Calorie tip */}
            <div style={{
              background: "rgba(255,107,53,0.08)",
              border: "1px solid rgba(255,107,53,0.2)",
              borderRadius: 14, padding: "12px 16px",
            }}>
              <div style={{ fontSize: 12, color: "#FF6B35", fontWeight: 700, marginBottom: 4 }}>📌 减脂饮食原则</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                · 热量缺口约300-500 kcal/天<br/>
                · 蛋白质 ≥ 1.6g/kg 体重 = 约118g<br/>
                · 减少精制碳水、含糖饮料<br/>
                · 晚餐尽量18:30前完成<br/>
                · 不要不吃，吃少吃对
              </div>
            </div>
          </div>
        )}

        {/* CHECKIN TAB */}
        {tab === "checkin" && (
          <div>
            {/* Checkin buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                { key: "workout", label: "运动完成", icon: "🏋️", color: "#4ECDC4" },
                { key: "diet", label: "饮食达标", icon: "🥗", color: "#FFB347" },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => toggleCheckin(activeDay, item.key)}
                  style={{
                    background: checkin[item.key]
                      ? `${item.color}22`
                      : "rgba(255,255,255,0.05)",
                    border: checkin[item.key]
                      ? `2px solid ${item.color}`
                      : "2px solid rgba(255,255,255,0.1)",
                    borderRadius: 16,
                    padding: "20px 16px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{checkin[item.key] ? "✅" : item.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: checkin[item.key] ? item.color : "rgba(255,255,255,0.5)" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>
                    {checkin[item.key] ? "已打卡 ✓" : "点击打卡"}
                  </div>
                </button>
              ))}
            </div>

            {/* Body data input */}
            <div style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 16, padding: 16,
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: 12,
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>⚖️ 录入身体数据</div>
              <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 4 }}>
                    体重 (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder={body.weight || "73.5"}
                    value={inputWeight}
                    onChange={e => setInputWeight(e.target.value)}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 10,
                      padding: "10px 12px",
                      color: "#fff",
                      fontSize: 16,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 4 }}>
                    腰围 (cm)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder={body.waist || "—"}
                    value={inputWaist}
                    onChange={e => setInputWaist(e.target.value)}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 10,
                      padding: "10px 12px",
                      color: "#fff",
                      fontSize: 16,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {(body.weight || body.waist) && (
                <div style={{
                  display: "flex", gap: 8, marginBottom: 10,
                  fontSize: 12, color: "rgba(255,255,255,0.5)",
                }}>
                  {body.weight && <span>已录: 体重 {body.weight}kg</span>}
                  {body.waist && <span>腰围 {body.waist}cm</span>}
                  {body.time && <span>· {body.time}</span>}
                </div>
              )}

              <button
                onClick={() => saveBodyData(activeDay)}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #FF6B35, #FFB347)",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                保存数据
              </button>
            </div>

            {/* Note */}
            <div style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 16, padding: 16,
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>📝 今日备注</div>
              <textarea
                placeholder="记录今天的感受、完成情况..."
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 10,
                  padding: "10px 12px",
                  color: "#fff",
                  fontSize: 13,
                  outline: "none",
                  resize: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={() => saveNote(activeDay)}
                style={{
                  marginTop: 8,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 10,
                  padding: "8px 16px",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                保存备注
              </button>
              {store.notes[activeDay] && (
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>
                  已保存: {store.notes[activeDay]}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
