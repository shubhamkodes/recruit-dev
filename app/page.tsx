"use-client";

import CallToAction from "@components/Landing/CallToAction";
import Contact from "@components/Landing/Contact";
import Faq from "@components/Landing/Faq";
import Features from "@components/Landing/Features";
import Header from "@components/Landing/Header";
import Hero from "@components/Landing/Hero";
import { Metadata } from "next";
 

export const metadata: Metadata = {
  title: "Talent Connect",
  description: "Streamline Your Recruitment with TalentConnect",
};
export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <CallToAction />
      <Faq />
      <Contact />
    </main>
  );
}
