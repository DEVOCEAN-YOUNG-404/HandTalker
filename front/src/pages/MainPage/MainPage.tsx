import Header from "../../components/Header/Header";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";

const MainPage = () => {
  return (
    <div className="min-w-[1366px] flex items-center justify-center flex-col">
      <Header />
      <Page1 />

      <Page2 />

      <Page3 />

      <Page4 />
    </div>
  );
};

export default MainPage;
