import Header from "../../components/Header/Header";
import Translate from "./Translate";

const TranslatePage = () => {
  return (
    <div className="min-w-[1366px] flex flex-col">
      <Header />
      <div className="min-w-[1105px] mr-[400px] flex items-start justify-start ml-[118px] mt-[50px] flex-col pb-[15px]">
        <p className="text-5xl font-bold text-black font-main">번역하기</p>
      </div>
      <Translate />
    </div>
  );
};

export default TranslatePage;
