export default function Loader(){

  return(
    <div className="
      fixed inset-0
      bg-[#0f0f14]
      flex flex-col
      items-center
      justify-center
      z-50
    ">

      {/* Logo / Title */}
      <h1 className="
        text-5xl font-extrabold
        bg-gradient-to-r
        from-[#ff6b35]
        via-[#ffb703]
        to-[#ff6b35]
        bg-clip-text text-transparent
        animate-pulse
        mb-6
      ">
        Dishcovery 🍽️
      </h1>

      {/* Spinner */}
      <div className="relative w-16 h-16">

        <div className="
          absolute inset-0
          border-4 border-orange-500/20
          rounded-full
        "/>

        <div className="
          absolute inset-0
          border-4 border-t-[#ff6b35]
          rounded-full
          animate-spin
        "/>

      </div>

      {/* Loading Text */}
      <p className="
        text-gray-400
        mt-6 tracking-widest
        animate-pulse
      ">
        COOKING UP MAGIC...
      </p>

      {/* Shimmer Bar */}
      <div className="
        w-48 h-1
        bg-gray-800
        rounded-full
        mt-6 overflow-hidden
      ">
        <div className="
          h-full w-1/2
          bg-gradient-to-r
          from-transparent
          via-[#ff6b35]
          to-transparent
          animate-[shimmer_1.5s_infinite]
        "/>
      </div>

      {/* Custom Animation */}
      <style>{`
        @keyframes shimmer{
          0%{transform:translateX(-100%)}
          100%{transform:translateX(200%)}
        }
      `}</style>

    </div>
  );
}
