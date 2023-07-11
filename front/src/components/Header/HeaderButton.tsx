type HeaderButtonProps = {
  isClicked: boolean;
  name: string;
};

const HeaderButton = ({ isClicked, name }: HeaderButtonProps) => {
  if (isClicked) {
    return (
      <div
        className={`w-[80px] border-b-2 border-icon font-bold 
       mb-[-3px] h-full font-main text-base text-icon flex flex-col justify-center items-center`}
      >
        <p>{name}</p>
      </div>
    );
  } else {
    return (
      <div
        className={`w-[80px] 
       h-full font-main text-base text-black flex flex-col justify-center items-center`}
      >
        <p>{name}</p>
      </div>
    );
  }
};

export default HeaderButton;
