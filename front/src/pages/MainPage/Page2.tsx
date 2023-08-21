import main2 from "../../assets/images/main2.png";
import logo from "../../assets/icons/logo.png";

const Page2 = () => {
  return (
    <div
      id="section2"
      className="ml-[400px] w-full mr-[400px] h-[100vh] flex flex-row items-center justify-start"
    >
      <img src={main2} alt="main2" className="block w-[550px]" />
      <div className="w-[650px] flex flex-col items-start justify-start ml-[80px]">
        <div className="flex flex-row items-center justify-center">
          <img src={logo} alt="logo" className="block w-[250px] " />
          <p className="text-4xl font-bold text-black font-main ml-[15px]">
            소개
          </p>
        </div>
        <p className="text-base text-gray-400 font-main mt-[20px] leading-8">
          HandTalker는 인공지능 기반의 혁신적인 기술을 기반으로 수어를 신속하고
          정확하게 인식하여 한국어로 번역해주는 탁월한 서비스입니다.
        </p>
        <p className="text-base text-gray-400 font-main mt-[15px] leading-8">
          일상 생활, 회사 업무 뿐만 아니라 가족 구성원 내에 농인 자녀를 두고
          계신 가정에서 소통의 어려움을 해결하기 위해 개발되었으며, 그 뿐만
          아니라 후천적으로 농인이 된 분들을 위한 실습 교육 자료로도 활용되고
          있습니다. 이를 통해 수어를 이해하고 구사하는데 어려움을 겪는
          사람들에게 보다 개방적이고 포용적인 환경을 제공할 수 있습니다.
        </p>
        <p className="text-base text-gray-400 font-main mt-[15px] leading-8">
          수어 번역 서비스인 HandTalker는 소통의 장벽을 허물 뿐만 아니라 수어를
          보다 쉽게 이해하고 습득할 수 있는 실습 환경을 제공해 농인 교육의
          효율성과 품질을 향상시키는데에 기여합니다.
        </p>
        <p className="text-base text-gray-400 font-main mt-[15px] leading-8">
          HandTalker는 혁신적인 기술과 열정적인 개발팀의 노력으로 만들어진
          서비스입니다. 수어에 대한 이해를 증진시키고 소통의 경험을 향상시키는
          HandTalker와 함께라면 사회적으로 포용되고 참여할 수 있는 환경을 만들
          수 있을 것입니다.
        </p>
      </div>
    </div>
  );
};

export default Page2;
