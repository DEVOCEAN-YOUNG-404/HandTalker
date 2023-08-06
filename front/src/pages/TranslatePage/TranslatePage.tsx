import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Translate from "./Translate";

const TranslatePage = () => {
  return (
    <div className="min-w-[1366px] h-[100vh] flex flex-col">
      <Header />
      <div className="min-w-[1105px] mr-[400px] flex items-start justify-start ml-[118px] mt-[100px] flex-col pb-[-20px]">
        <p className="text-5xl font-bold text-black font-main">번역하기</p>
      </div>
      <Translate />
      <Footer />
    </div>
  );
};

export default TranslatePage;
