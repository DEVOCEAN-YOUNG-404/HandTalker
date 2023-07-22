import main2 from "../../assets/main2.png";
import logo from "../../assets/logo.png";

const Page2 = () => {
  return (
    <div
      id="section2"
      className="ml-[450px] mr-[450px] h-[100vh] mt-[-50px] flex flex-row items-center justify-start"
    >
      <img src={main2} alt="main2" className="block w-[550px]" />
      <div className="flex flex-col items-start justify-start ml-[80px]">
        <div className="flex flex-row items-center justify-center">
          <img src={logo} alt="logo" className="block w-[250px] " />
          <p className="text-4xl font-bold text-black font-main ml-[15px]">
            소개
          </p>
        </div>
        <p className="text-base text-gray-400 font-main mt-[20px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
          unde? Mollitia, repellendus quidem quaerat dicta voluptatum pariatur
          alias deleniti incidunt accusantium eius inventore unde iusto natus
          non doloremque blanditiis corrupti.
        </p>
        <p className="text-base text-gray-400 font-main mt-[20px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
          unde? Mollitia, repellendus quidem quaerat dicta voluptatum pariatur
          alias deleniti incidunt accusantium eius inventore unde iusto natus
          non doloremque blanditiis corrupti.
        </p>
        <p className="text-base text-gray-400 font-main mt-[20px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
          unde? Mollitia, repellendus quidem quaerat dicta voluptatum pariatur
          alias deleniti incidunt accusantium eius inventore unde iusto natus
          non doloremque blanditiis corrupti.
        </p>
      </div>
    </div>
  );
};

export default Page2;
