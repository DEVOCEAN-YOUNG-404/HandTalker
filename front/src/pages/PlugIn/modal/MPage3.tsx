import page3 from "../../../assets/images/plugin/page3.webp";

const MPage3 = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[18rem] h-[25rem] md:w-[730px] md:h-[520px]">
      <img src={page3} alt="page3" className="w-[400px] md:w-[600px] mb-2" />

      <p className="pt-5 text-lg leading-normal text-center md:text-xl md:leading-loose font-main">
        3. 성공적으로 봇이 추가되었는지 확인해주세요.
      </p>
    </div>
  );
};

export default MPage3;
