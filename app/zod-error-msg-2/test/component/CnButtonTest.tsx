import { cn } from "../../util/utils";

/**
 * 아래처럼 사용한다. tailwindcss도 동적으로 class를 변경할 수 있다. tailwind-merge를 사용하면 된다.
 *       <CnButtonTest disabled={false} />
*/
const CnButtonTest: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
    return (
        <button
        disabled={disabled}
        className={cn(disabled ? "bg-gray-300" : "bg-rose-400")}
        >
      Button
    </button>
  );
};

export default CnButtonTest;
