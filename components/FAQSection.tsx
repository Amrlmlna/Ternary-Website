import React from "react";

const faqs = [
  {
    q: "Apakah Ternary Premium gratis?",
    a: "Tersedia paket gratis (Hobby) dengan limit bulanan. Untuk fitur premium, upgrade ke Pro atau Ultra.",
  },
  {
    q: "Bagaimana cara mendapatkan API Key?",
    a: "Cukup daftar dan login, lalu API Key bisa didapatkan di dashboard user.",
  },
  {
    q: "Apakah support 24/7?",
    a: "Untuk paket Pro dan Ultra, support prioritas tersedia hampir 24/7 via email atau chat.",
  },
];

export default function FAQSection() {
  return (
    <section className="w-full flex justify-center mb-14 px-2 md:px-6">
      <div className="max-w-screen-xl w-full neu-shadow neu-radius neu-bg p-8 text-center">
        <h2 className="text-2xl font-bold mb-8 font-sans">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 text-left">
          {faqs.map((f, i) => (
            <div key={i} className="neu-box" style={{ cursor: "pointer" }}>
              <div className="font-bold mb-2 font-sans">Q: {f.q}</div>
              <div className="text-sm opacity-80 font-sans">A: {f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
