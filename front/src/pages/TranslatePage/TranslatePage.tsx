import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Translate from "./translate/Translate";

const TranslatePage = () => {
  return (
    <div className="flex flex-col h-[100vh] w-full">
      <Header />
      <Translate />
      <Footer />
    </div>
  );
};

export default TranslatePage;
