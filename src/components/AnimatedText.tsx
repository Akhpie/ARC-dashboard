import React from "react";

const AnimatedText = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100px] font-sans px-4">
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-6 group relative">
        {/* Aspire */}
        <div className="inline-flex flex-col sm:flex-row items-center">
          <span className="inline-block transition-transform duration-300 hover:-translate-y-1 bg-gradient-to-r from-violet-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            A
          </span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-white/70 font-normal relative sm:top-3 ml-1">
            spire
          </span>
        </div>

        {/* Blue dot */}
        <span className="inline-block mx-2 sm:mx-4 text-blue-700 text-xl sm:text-2xl">
          •
        </span>

        {/* Reflect */}
        <div className="inline-flex flex-col sm:flex-row items-center">
          <span className="inline-block transition-transform duration-300 hover:-translate-y-1 bg-gradient-to-r from-violet-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            R
          </span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-white/70 font-normal relative sm:top-3 ml-1">
            eflect
          </span>
        </div>

        {/* Blue dot */}
        <span className="inline-block mx-2 sm:mx-4 text-blue-700 text-xl sm:text-2xl">
          •
        </span>

        {/* Create */}
        <div className="inline-flex flex-col sm:flex-row items-center">
          <span className="inline-block transition-transform duration-300 hover:-translate-y-1 bg-gradient-to-r from-violet-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            C
          </span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-white/70 font-normal relative sm:top-3 ml-1">
            reate
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedText;
