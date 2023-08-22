interface CardProps {
  img: string;
  description: string;
  borderColor: string;
  textColor: string;
  bgColor: string;
  onClick: () => void;
}

export const Card = ({
  img,
  description,
  borderColor,
  textColor,
  bgColor,
  onClick,
}: CardProps) => {
  return (
    <div
      className={`w-[301px] h-[320px] ml-[50px] mt-[50px] border border-[${borderColor}] flex flex-col items-center justify-center rounded-xl`}
    >
      <img src={img} alt="로고" className="w-auto h-[67px] mt-[10px]" />
      <p
        className={`font-main text-lg text-[${textColor}] mt-[40px] text-center whitespace-pre-wrap`}
      >
        {description}
      </p>
      <button
        onClick={onClick}
        className={`w-[230px] h-[50px] mt-[20px] text-[${textColor}] font-main text-xl border border-[${borderColor}] rounded-xl hover:bg-[${bgColor}] hover:text-white hover:drop-shadow-xl transition-colors duration-200`}
      >
        연결하기
      </button>
    </div>
  );
};
