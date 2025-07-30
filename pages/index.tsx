import type { NextPage } from "next";
import PricingSection from "../components/PricingSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";
import Navbar from "../components/Navbar";
import HomeSection from "../components/HomeSection";
import ShowcaseSection from "../components/ShowcaseSection";
import SEO from "../src/components/SEO";
import SkipLink from "../components/SkipLink";

const Home: NextPage = () => {
  return (
    <>
      <SEO />
      <SkipLink />
      <main
        id="main-content"
        className="min-h-screen flex flex-col items-center justify-center neu-bg"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <Navbar />
        <HomeSection />
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="how-it-works">
          <HowItWorksSection />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        <section id="faq">
          <FAQSection />
        </section>
        <section id="pricing">
          <PricingSection />
        </section>
        <footer
          className="mt-10 text-sm opacity-60"
          style={{ color: "var(--neu-text)" }}
        >
          &copy; {new Date().getFullYear()} Ternary Premium. All rights
          reserved.
        </footer>
      </main>
    </>
  );
};

export default Home;
