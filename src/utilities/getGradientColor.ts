export function getGradientColor(value: number) {
  const max = 15;
  let red = 0,
    green = 255,
    blue = 0; // 시작 색상: 녹색

  if (value < max / 2) {
    // 값이 50 미만이면 녹색에서 노란색으로 변화
    red = Math.floor(255 * (value / (max / 2)));
    green = 255;
  } else {
    // 값이 50 이상이면 노란색에서 빨간색으로 변화
    red = 255;
    green = Math.floor(255 * ((max - value) / (max / 2)));
  }

  return `rgb(${red}, ${green}, ${blue})`;
}

// 사용 예
/*
console.log(getGradientColor(25)); // 녹색에 가까운 노란색
console.log(getGradientColor(50)); // 노란색
console.log(getGradientColor(75)); // 노란색에 가까운 빨간색
*/
