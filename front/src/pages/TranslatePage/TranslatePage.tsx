import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Translate from "./Translate";

const TranslatePage = () => {
  return (
    <div className="min-w-[1366px] w-full h-[100vh] flex flex-col">
      <Header />
      <Translate />
      <Footer />
    </div>
  );
};

export default TranslatePage;
