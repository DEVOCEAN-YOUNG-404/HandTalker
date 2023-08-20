import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Translate from "./Translate";

const TranslatePage = () => {
  return (
    <div className="min-w-[1366px] w-full h-[100vh] flex flex-col">
      <Header />
      <p className="ml-[118px] mt-[100px] pb-[20px] text-5xl font-bold text-black font-main">
        번역하기
      </p>
      <Translate />
      <Footer />
    </div>
  );
};

export default TranslatePage;
