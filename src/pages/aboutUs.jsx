import React, { useEffect, useState } from "react";
import Story from "../components/aboutUs/story";
import Hero from "../components/home/hero";
import DesignServices from "../components/aboutUs/designService";
import AutomaticTextSlider from "../components/aboutUs/automaticTextSlider";
import Carousel from "../components/aboutUs/carousel"
import FollowUs from "../components/home/followUs"
import AboutUsOurTeamSection from "../components/aboutUs/aboutUsOurTeamSection"
import StickyFooter from "../components/stickyFooter"

const AboutUs = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);
  return (
    <div>
      <section className="p-content-padding-story">
        <Story />
      </section>
      <section className="p-content-padding sm:p-content-padding-small">
        <DesignServices />
      </section>
      <section className="">
        <Carousel />
      </section>
      <section className="pt-[20px] pb-[0px] px-[20px] custom-aboutUsOurTeamSection-md:p-content-padding-aboutUsOurTeamSection">
        <AboutUsOurTeamSection />
      </section>
      <section>
        <AutomaticTextSlider />
      </section>
      <section>
        <FollowUs />
      </section>
      <section>
        <StickyFooter />
      </section>
    </div>
  );
};

export default AboutUs;