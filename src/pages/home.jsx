import React from "react";
import Hero from "../components/home/hero"
import Description from "../components/home/description";
import ImageSlider from "../components/home/imageSlider";
import Details from "../components/home/details";
import WhyChooseUsText from "../components/home/whyChooseUsText";
import Feedback from "../components/home/feedback";
import FollowUs from "../components/home/followUs"
import Awards from "../components/home/awards"
import StickyFooter from "../components/stickyFooter";

const Home = () => {
  return (
    <div>
      <section className="flex items-center justify-center h-screen bg-gray-100">
        <Hero />
      </section>
      <section className="p-content-padding-small lg:p-content-padding">
        <Description />
      </section>
      <section className="p-content-padding-small sm:p-[20px]">
        <ImageSlider />
      </section>
      <section className="p-[10px] lg:p-content-padding">
        <Details />
      </section>
      <section className="">
        <WhyChooseUsText />
      </section>
      <section className="pt-28">
        <Feedback />
      </section>
      <section className="p-content-padding-small lg:p-content-padding">
        <Awards />
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

export default Home;