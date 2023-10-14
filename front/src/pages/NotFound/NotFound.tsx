import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import notfound from "../../assets/images/404.webp";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col w-full h-[100vh]">
      <Header />
      <div className="flex flex-col items-center justify-center h-full">
        <img src={notfound} alt="not found" className="w-auto h-[300px]" />
        <p className="z-10 text-4xl font-bold text-black font-main mt-[-40px]">
          페이지를 찾을 수 없습니다!
        </p>
        <Link to="/">
          <button className="w-[300px] h-[56px] font-main bg-main-2 text-white font-bold text-xl rounded-xl mt-[40px]">
            메인 페이지로 돌아가기
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
