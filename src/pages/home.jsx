import React, { useEffect, useState } from "react";
import Navbar from "../components/home/navbar"
import Hero from "../components/home/hero"
import Description from "../components/home/description";
import ImageSlider from "../components/home/imageSlider";
import Details from "../components/home/details";
import ImageParallax1 from "../components/home/imageParallax1";
import WhyChooseUsText from "../components/home/whyChooseUsText";
import SocialMediaComponents from "../components/home/socialMediaComponents";
import Feedback from "../components/home/feedback";
import ProjectHover from "../components/home/projectHover";
import Details2 from "../components/home/details2";
import FollowUs from "../components/home/followUs"
import Awards from "../components/home/awards"
import ThreeImages from "../components/home/threeImages";
import NavbarPage from "../components/home/navbar";
import StickyFooter from "../components/stickyFooter";

const Home = () => {
  // const [isLoading, setIsLoading] = useState(true)

  // useEffect( () => {
  //   (
  //     async () => {
  //         const LocomotiveScroll = (await import('locomotive-scroll')).default
  //         const locomotiveScroll = new LocomotiveScroll();

  //         setTimeout( () => {
  //           setIsLoading(false);
  //           document.body.style.cursor = 'default'
  //           window.scrollTo(0,0);
  //         }, 2000)
  //     }
  //   )()
  // }, [])
  return (
    <>
    <div>
      {/* <Navbar /> */}
      <section className="flex items-center justify-center h-screen bg-gray-100">
        <Hero />
      </section>
      <section className="p-content-padding-small lg:p-content-padding">
        <Description />
      </section>
      {/* <section>
        <ImageParallax1 />
      </section> */}
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
      {/* <section className="p-content-padding-small lg:p-content-padding">
        <Details2 />
      </section> */}
       <section className="p-content-padding-small lg:p-content-padding">
        <Awards />
      </section>
      {/* <section className="py-28">
        <ProjectHover />
      </section> */}
      <section>
        <FollowUs />
      </section>
      {/* <section className="mt-[10rem]">
        <ThreeImages />
      </section> */}
      <section>
        <StickyFooter />
      </section>
    </div>
    </>
  );
};

export default Home;