export interface Question {
  category: "금전" | "지성" | "외모" | "성격";
  options: [string, string]; // 항상 2개의 옵션이 있음을 명시
} 