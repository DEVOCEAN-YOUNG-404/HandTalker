import Header from "../../components/Header/Header";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import { SectionsContainer, Section } from "react-fullpage";

let options = {
  activeClass: "active", // the class that is appended to the sections links
  anchors: [
    "sectionOne",
    "sectionTwo",
    "sectionThree",
    "sectionFour",
    "sectionFive",
  ], // the anchors for each sections
  arrowNavigation: true, // use arrow keys
  className: "SectionContainer", // the class name for the section container
  delay: 1000, // the scroll animation speed
  navigation: true, // use dots navigatio
  scrollBar: false, // use the browser default scrollbar
  sectionClassName: "Section", // the section class name
  sectionPaddingTop: "0", // the section top padding
  sectionPaddingBottom: "0", // the section bottom padding
  verticalAlign: false, // align the content of each section vertical
};

const MainPage = () => {
  return (
    <div className="min-w-[1366px] flex items-center justify-center flex-col">
      <Header />
      <SectionsContainer {...options}>
        <Section>
          <Page1 />
        </Section>
        <Section>
          <Page2 />
        </Section>
        <Section>
          <Page3 />
        </Section>
        <Section>
          <Page4 />
        </Section>
        <Section>
          <Page5 />
        </Section>
      </SectionsContainer>

      {/* <Page2 />

      <Page3 />

      <Page4 /> */}
    </div>
  );
};

export default MainPage;
