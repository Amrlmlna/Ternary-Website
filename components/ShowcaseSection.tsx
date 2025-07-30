import React from "react";

export default function ShowcaseSection() {
  return (
    <section className="w-full flex justify-center mt-28 mb-14 px-2 md:px-6">
      <div
        className="max-w-screen-xl w-full rounded-2xl shadow-xl p-0 md:p-0 overflow-hidden neu-shadow"
        style={{
          background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-stretch">
          {/* Stats */}
          <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12 text-white">
            <div className="mb-8 w-full flex flex-col md:flex-row md:gap-10 gap-6 items-center md:items-end justify-center">
              <div className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  12,345+
                </div>
                <div
                  className="text-sm opacity-80"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Total Downloads
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  #1
                </div>
                <div
                  className="text-sm opacity-80"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Product Hunt Ranking
                </div>
              </div>
            </div>
            <div
              className="text-base md:text-lg opacity-80 mt-2 text-center"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Trusted by thousands of developers worldwide.
            </div>
          </div>
          {/* Video */}
          <div className="flex-1 flex items-center justify-center bg-black/40 p-6 md:p-8">
            {/* Placeholder video, bisa diganti embed YouTube */}
            <div className="w-full aspect-video max-w-md rounded-xl overflow-hidden border-2 border-white/10 shadow-lg bg-black flex items-center justify-center">
              {/* Ganti src dengan link video YouTube jika ada */}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Showcase Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
