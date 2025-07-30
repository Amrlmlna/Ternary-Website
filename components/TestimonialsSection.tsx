import React from "react";

const testimonials = [
  {
    name: "Andi S.",
    role: "CTO Startup AI",
    text: "Integrasi super mudah, performa API-nya luar biasa! Sangat recommended untuk developer modern.",
  },
  {
    name: "Rina M.",
    role: "Freelance Developer",
    text: "Dashboard monitoring-nya sangat membantu. Support-nya juga responsif banget!",
  },
  {
    name: "Budi P.",
    role: "Product Manager",
    text: "Fitur premium-nya bikin workflow tim kami makin efisien dan aman.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full flex justify-center mb-14 px-2 md:px-6">
      <div className="max-w-screen-xl w-full neu-shadow neu-radius neu-bg p-8 text-center">
        <h2 className="text-2xl font-bold mb-8 font-sans">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="neu-bg neu-radius p-6 neu-shadow-inset flex flex-col items-center mb-4 md:mb-0 transition-all duration-150 hover:neu-shadow hover:scale-[1.03]"
              style={{ cursor: "pointer" }}
            >
              <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg mb-3">
                {t.name[0]}
              </div>
              <blockquote className="italic mb-2 font-sans">
                "{t.text}"
              </blockquote>
              <div className="text-xs opacity-70 font-sans">
                {t.name} <span className="opacity-50">- {t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
