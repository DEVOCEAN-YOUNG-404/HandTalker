import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import UsrOnline from "./UsrOnline";
import { useRecoilValue } from "recoil";
import { authState } from "../../utils/recoil/atom";
import UsrOffline from "./UsrOffline";

const Plugin = () => {
  const isLogin = useRecoilValue(authState);

  return (
    <div className="w-full h-[100vh] flex flex-col min-h-full">
      <Header />
      {isLogin ? <UsrOnline /> : <UsrOffline />}
      <Footer />
    </div>
  );
};

export default Plugin;
