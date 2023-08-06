import { FaArrowRightLong } from "react-icons/fa6";
import Input from "./Input";
import { translateState } from "../../utils/atom";
import { useRecoilState } from "recoil";
import { BsFillPersonFill } from "react-icons/bs";

const Translate = () => {
  const [translate, setTranslate] = useRecoilState(translateState);
  const onClick = () => {
    setTranslate(true);
  };

  return (
    <div className="h-full flex mt-[-20px] flex-row items-center justify-start md:scale-75 xl:scale-[80%] 2xl:scale-90 3xl:scale-100">
      {translate ? (
        <Input />
      ) : (
        <div className="w-[500px] h-[600px] ml-[120px] mt-[30px] flex flex-col justify-center items-center bg-gray-200 border-none rounded-xl">
          <p className="text-[400px] text-gray-300">
            <BsFillPersonFill />
          </p>
        </div>
      )}
      <div className="ml-[40px] text-6xl text-gray-200">
        <FaArrowRightLong />
      </div>
      {translate ? (
        <div className="font-main text-4xl text-black p-9 ml-[40px] mt-[30px] w-[500px] h-[600px] bg-white rounded-xl border border-gray-200 shadow-md">
          안녕하세요
        </div>
      ) : (
        <div>
          <div className="font-main font-bold text-3xl text-black p-9 ml-[40px] mt-[30px] w-[500px] h-[600px] bg-white rounded-xl border border-gray-200 shadow-md">
            번역을 시작하려면 아래 버튼을 눌러주세요. <br />
            <button
              onClick={onClick}
              className="w-[140px] h-[55px] mt-[30px] rounded-xl font-bold font-main text-xl text-white bg-main-2"
            >
              시작하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Translate;
