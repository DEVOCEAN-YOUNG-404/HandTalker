interface ButtonProps {
  btnImage: string;
  text: string;
}

export const Button = ({ btnImage, text }: ButtonProps) => {
  return (
    <button className="w-[150px] h-[45px] pl-2 mb-1 flex flex-row items-center justify-start transition-colors duration-150 hover:bg-green-100">
      <img src={btnImage} alt="img" className="w-auto h-[30px]" />
      <p className="ml-3 text-black text-md font-main">{text}</p>
    </button>
  );
};
