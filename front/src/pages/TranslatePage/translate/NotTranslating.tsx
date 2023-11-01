import { BsPersonFill } from "react-icons/bs";

export const NotTranslating = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[20rem] h-[20rem] md:w-[25rem] xl:w-[37.5rem] md:h-[31.25rem] xl:h-[37.5rem] bg-gray-200 border-none rounded-xl">
      <p className="text-[250px] md:text-[400px] text-gray-300">
        <BsPersonFill />
      </p>
    </div>
  );
};
