import React from "react";

const steps = [
  {
    title: "Sign Up",
    desc: "Daftar akun secara gratis dan dapatkan akses ke dashboard.",
  },
  {
    title: "Get API Key",
    desc: "Dapatkan API key unik untuk setiap aplikasi yang kamu buat.",
  },
  {
    title: "Integrate",
    desc: "Integrasikan API ke aplikasi kamu hanya dengan beberapa baris kode.",
  },
  {
    title: "Enjoy Features",
    desc: "Nikmati fitur-fitur premium dan monitoring real-time.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="w-full flex justify-center mb-14 px-2 md:px-6">
      <div className="max-w-screen-xl w-full neu-shadow neu-radius neu-bg p-8 text-center">
        <h2 className="text-2xl font-bold mb-8 font-sans">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="neu-box flex flex-col items-center mb-4 md:mb-0"
              style={{ cursor: "pointer" }}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent text-white font-bold mb-3 text-lg">
                {i + 1}
              </div>
              <h3 className="font-bold text-base mb-2 font-sans">{s.title}</h3>
              <p className="text-xs opacity-80 font-sans">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
