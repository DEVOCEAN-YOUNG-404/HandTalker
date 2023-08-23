import { useEffect } from "react";

interface ConfigSuccessProps {
  onModalAlert: () => void;
}

export const ConfigSuccess = ({ onModalAlert }: ConfigSuccessProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onModalAlert();
    }, 1500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="mb-8 text-7xl">🥳</p>
      <p className="text-3xl font-bold text-black font-main">
        설정에 성공했습니다!
      </p>
    </div>
  );
};
