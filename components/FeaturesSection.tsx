import React from "react";

const features = [
  {
    title: "Fast & Secure",
    desc: "API response cepat, data terenkripsi, dan selalu aman.",
  },
  {
    title: "Easy Integration",
    desc: "Integrasi mudah ke berbagai platform dan bahasa pemrograman.",
  },
  {
    title: "Scalable",
    desc: "Dukungan skala besar, cocok untuk startup hingga enterprise.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full flex justify-center mb-14 px-2 md:px-6">
      <div className="max-w-screen-xl w-full neu-shadow neu-radius neu-bg p-8 text-center">
        <h2
          className="text-2xl font-bold mb-8"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {features.map((f) => (
            <div
              key={f.title}
              className="neu-box mb-4 md:mb-0"
              style={{ cursor: "pointer" }}
            >
              <h3
                className="font-bold text-lg mb-2"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm opacity-80"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
