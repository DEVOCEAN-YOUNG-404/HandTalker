import school from "../../assets/icons/school.webp";
import hospital from "../../assets/icons/hospital.webp";
import work from "../../assets/icons/work.webp";

const Page3 = () => {
  return (
    <div
      id="section3"
      className="h-[100vh] flex flex-col items-center justify-center"
    >
      <p className="text-4xl font-bold text-black font-main">
        서비스 이용 대상
      </p>
      <p className="text-lg text-gray-600 font-main mt-[20px] px-10 text-center">
        HandTalker는 많은 곳에서 사용할 수 있는 확장성 높은 서비스입니다.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center mt-[40px] space-y-6 md:space-y-0">
        <div className="w-[21.25rem] h-auto md:mr-[30px] border-b-2 border-b-icon border border-gray-100 shadow-lg flex flex-col items-center justify-start">
          <div className="flex flex-row items-center justify-center py-[0.7rem] md:pt-[3.125rem] md:flex-col">
            <img
              src={school}
              alt="school"
              className="w-auto h-[3rem] md:h-24 md:mb-[20px] mr-[0.5rem] md:m-0"
            />
            <p className="text-2xl font-bold text-black font-main md:mb-[10px]">
              학교에서
            </p>
          </div>
          <p className="hidden md:block w-64 text-base text-center text-gray-400 font-main mb-[35px]">
            농인 학생들과 교사 및 학생들 간의 소통을 돕습니다. 이를 통해 농인
            학생들의 학습 능력을 향상시키고 평등한 교육 기회를 제공할 수
            있습니다.
          </p>
        </div>
        <div className="w-[21.25rem] h-auto md:mr-[30px] border-b-2 border-b-icon border border-gray-100 shadow-lg flex flex-col items-center justify-start">
          <div className="flex flex-row items-center justify-center py-[0.7rem] md:pt-[3.125rem] md:flex-col">
            <img
              src={hospital}
              alt="hospital"
              className="w-auto h-[3rem] md:h-24 md:mb-[20px] mr-2 md:m-0"
            />
            <p className="text-2xl font-bold text-black font-main md:mb-[10px]">
              병원에서
            </p>
            <p className="hidden md:block w-64 text-base text-center text-gray-400 font-main mb-[35px]">
              농인 환자들이 의사와의 상담이나 의료 절차에 참여할 때 HandTalker를
              활용하여 의사 결정에 적극적으로 참여할 수 있도록 지원합니다.
            </p>
          </div>
        </div>
        <div className="w-[21.25rem] h-auto md:mr-[30px] border-b-2 border-b-icon border border-gray-100 shadow-lg flex flex-col items-center justify-start">
          <div className="flex flex-row items-center justify-center py-[0.7rem] md:pt-[3.125rem] md:flex-col">
            <img
              src={work}
              alt="work"
              className="w-auto h-[3rem] md:h-24 md:mb-[20px] mr-2 md:m-0"
            />
            <p className="text-2xl font-bold text-black font-main md:mb-[10px]">
              회사에서
            </p>
            <p className="hidden md:block w-64 text-base text-center text-gray-400 font-main mb-[35px]">
              다른 직원들과의 의사소통을 원할하게 하도록 돕습니다. 이를 통해
              농인 직원들은 조직 내에서 더욱 적극적으로 참여하고 업무 기회를
              놓치지 않을 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3;
