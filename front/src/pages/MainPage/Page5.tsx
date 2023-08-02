import logo from "../../assets/logo.png";
const Page5 = () => {
  return (
    <div
      id="section5"
      className="ml-[440px] mr-[440px] w-full h-[600px] mt-[-50px] flex flex-col items-start justify-center"
    >
      <div className="flex flex-row items-center justify-center">
        <img src={logo} alt="logo" className="w-[250px]" />
        <p className="ml-[10px] text-4xl font-bold text-black font-main">
          를 만든 사람들
        </p>
      </div>
      <div className="flex flex-col items-center justify-center mt-[20px]">
        <p className="text-3xl font-bold text-black font-main">
          DEVOCEAN YOUNG 2기 404
        </p>
      </div>
    </div>
  );
};

export default Page5;
