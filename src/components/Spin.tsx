import { JSXElement } from "solid-js";
import "./Spin.css";

/**
 * 로딩 상태를 표시하는 스피너 컴포넌트
 *
 * @example
 * // 기본 사용법
 * <Spin isOpen={isLoading} />
 *
 * // 조건부 렌더링과 함께 사용
 * {isLoading && <Spin isOpen={true} />}
 *
 * @param props.isOpen - 스피너 표시 여부를 제어하는 boolean 값
 */

interface Props {
  isOpen: boolean;
}

const Spin = (props: Props) => {
  if (!props.isOpen) return null;
  return (
    <div class="overlay">
      <div onClick={(e) => e.stopPropagation()}>
        <div class="relative w-full flex justify-center items-center">
          <div class="spinner" />
        </div>
      </div>
    </div>
  );
};

export default Spin;
