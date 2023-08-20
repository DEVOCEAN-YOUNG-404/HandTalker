import page3 from "../../../assets/images/plugin/page3.png";

const MPage3 = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[730px] h-[520px]">
      <img src={page3} alt="page3" className="w-[600px] mb-2" />

      <p className="pt-5 text-xl leading-loose text-center font-main">
        3. 성공적으로 봇이 추가되었는지 확인해주세요.
      </p>
    </div>
  );
};

export default MPage3;
