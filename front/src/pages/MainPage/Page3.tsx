import school from "../../assets/school.png";
import hospital from "../../assets/hospital.png";
import work from "../../assets/work.png";

const Page3 = () => {
  return (
    <div className="w-[1062px] h-[100vh] mt-[40px] flex flex-col items-center justify-center">
      <p className="text-4xl font-bold text-black font-main">
        서비스 이용 대상
      </p>
      <p className="text-lg text-gray-600 font-main mt-[20px]">
        HandTalker는 많은 곳에서 사용할 수 있는 확장성 높은 서비스입니다.
      </p>
      <div className="flex flex-row items-center justify-center mt-[40px]">
        <div className="w-[340px] h-[340px] mr-[30px] border-b-2 border-b-icon border border-gray-100 shadow-lg flex flex-col items-center justify-start">
          <img
            src={school}
            alt="school"
            className="w-[100px] h-[100px] mt-[50px] mb-[20px]"
          />
          <p className="text-2xl font-bold text-black font-main mb-[10px]">
            학교에서
          </p>
          <p className="w-[250px] text-base text-center text-gray-400 font-main">
            한글을 모르는 농인과 교사간의 소통을 돕습니다. <br />
            또한 수어 학습을 위한 환경을 제공합니다.
          </p>
        </div>
        <div className="w-[340px] h-[340px] mr-[30px] border-b-2 border-b-icon border border-gray-100 shadow-lg flex flex-col items-center justify-start">
          <img
            src={hospital}
            alt="hospital"
            className="w-[100px] h-[100px] mt-[50px] mb-[20px]"
          />
          <p className="text-2xl font-bold text-black font-main mb-[10px]">
            병원에서
          </p>
          <p className="w-[250px] text-base text-center text-gray-400 font-main">
            농인 환자와 의료진간의 소통을 돕습니다.
          </p>
        </div>
        <div className="w-[340px] h-[340px] mr-[30px] border-b-2 border-b-icon border border-gray-100 shadow-lg flex flex-col items-center justify-start">
          <img
            src={work}
            alt="work"
            className="w-[100px] h-[100px] mt-[50px] mb-[20px]"
          />
          <p className="text-2xl font-bold text-black font-main mb-[10px]">
            회사에서
          </p>
          <p className="w-[250px] text-base text-center text-gray-400 font-main">
            수어로 소통이 필요한 직원 간의 소통을 돕습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page3;
