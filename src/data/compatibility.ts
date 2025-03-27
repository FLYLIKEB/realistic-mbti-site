interface Compatibility {
  good: [string, string];  // 정확히 2개의 요소를 가진 배열
  bad: [string, string];   // 정확히 2개의 요소를 가진 배열
}

interface CompatibilityMap {
  [key: string]: Compatibility;
}

export const compatibilityMap: CompatibilityMap = {
  PFUN: { good: ["RFHA", "RSUA"], bad: ["PFUN", "PSUN"] },
  PFUA: { good: ["RFHA", "RSHN"], bad: ["PFUA", "PSHN"] },
  PFHN: { good: ["RSHA", "RFUA"], bad: ["PFHN", "PSHN"] },
  PFHA: { good: ["RSUA", "RFHA"], bad: ["PFUN", "RFUN"] },
  PSUN: { good: ["RFHA", "PSHA"], bad: ["PFUN", "PSUN"] },
  PSUA: { good: ["RSHA", "RFUA"], bad: ["PFUA", "PFUN"] },
  PSHN: { good: ["RSUA", "PSHA"], bad: ["PFHN", "PFUA"] },
  PSHA: { good: ["RSHA", "RFHA"], bad: ["PFHA", "PFUN"] },
  RFUN: { good: ["PSHA", "RSHA"], bad: ["PFUN", "RFUN"] },
  RFUA: { good: ["PSUA", "RSUA"], bad: ["PFUA", "PFHN"] },
  RFHN: { good: ["PSHA", "RFHA"], bad: ["PFHN", "RSUN"] },
  RFHA: { good: ["PSHA", "RSHA"], bad: ["PFHA", "PFUA"] },
  RSUN: { good: ["RSHA", "RFUA"], bad: ["PFHN", "RSUN"] },
  RSUA: { good: ["RFHA", "PSUA"], bad: ["PFUA", "PFUN"] },
  RSHN: { good: ["RSUA", "RFHA"], bad: ["PFHN", "PSHN"] },
  RSHA: { good: ["RFHA", "PSHA"], bad: ["PFUN", "PFHN"] }
} as const; 