import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { translateState } from "../../utils/recoil/atom";
import { HeaderButtonProps } from "../../types/HeaderButtonProps";

const HeaderButton = ({ isClicked, name, link }: HeaderButtonProps) => {
  const setTranslate = useSetRecoilState(translateState);
  const onClickListener = () => {
    setTranslate(false);
  };

  if (isClicked) {
    return (
      <div
        className={`w-20 border-b-2 border-icon font-bold 
       mb-[-3px] h-full font-main text-base text-icon flex flex-col justify-center items-center`}
        onClick={onClickListener}
      >
        <Link to={`${link}`}>
          <p>{name}</p>
        </Link>
      </div>
    );
  } else {
    return (
      <div
        className={`w-20 
       h-full font-main text-base text-black flex flex-col justify-center items-center`}
        onClick={onClickListener}
      >
        <Link to={`${link}`}>
          <p>{name}</p>
        </Link>
      </div>
    );
  }
};

export default HeaderButton;
