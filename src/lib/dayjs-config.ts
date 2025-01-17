// ~/lib/dayjs-config.ts
import dayjs from "dayjs";

let dayjsInstance = dayjs;

// 기본적인 날짜 포맷팅 함수들
export const formatDate = (
  date: string | undefined,
  format = "YYYY년 MM월 DD일"
) => {
  if (!date) return "----";
  try {
    return dayjs(date).format(format);
  } catch {
    return "----";
  }
};

export const localDate = (timestamp: string) => {
  try {
    return dayjs(timestamp).format("YYYY.MM.DD HH:mm");
  } catch {
    return "----";
  }
};

export const getDaysPassed = (date: string): number => {
  try {
    const dateGiven = dayjs(date);
    const currentDate = dayjs();
    return currentDate.diff(dateGiven, "day");
  } catch {
    return 0;
  }
};

export const formatDateTime = (date: string): string => {
  try {
    return new Date(date).toLocaleString();
  } catch {
    return "----";
  }
};

// 클라이언트 사이드에서만 플러그인 초기화
if (typeof window !== "undefined") {
  Promise.all([import("dayjs/plugin/utc"), import("dayjs/plugin/timezone")])
    .then(([utc, timezone]) => {
      dayjsInstance.extend(utc.default);
      dayjsInstance.extend(timezone.default);
    })
    .catch((error) => {
      console.error("Failed to load dayjs plugins:", error);
    });
}

export default dayjs;
