import { PulseLoader } from "react-spinners";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export const Fallback = () => {
  return (
    <div className="w-full h-[100vh]">
      <Header />
      <div className="flex items-center justify-center h-[100vh]">
        <PulseLoader color="#22c55e" margin={9} size={20} />
      </div>
      <Footer />
    </div>
  );
};
