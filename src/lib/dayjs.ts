import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// 서버사이드 렌더링 중에는 실행하지 않음
if (typeof window !== "undefined") {
  dayjs.extend(utc);
  dayjs.extend(timezone);
}

export default dayjs;
