import Navbar from "../components/Navbar";
import {motion} from "framer-motion";

export default function MainLayout({children}){

  return(
    <div
      className="
        min-h-screen
        bg-[#0f0f14]
        text-white
        overflow-x-hidden
      "
    >

      {/* NAVBAR */}
      <Navbar/>

      {/* PAGE TRANSITION WRAPPER */}
      <motion.main
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.4}}
        className="pt-20 px-4 md:px-10"
      >
        {children}
      </motion.main>

      {/* FOOTER */}
      <footer
        className="
          mt-20 py-10
          text-center
          text-gray-400
          text-sm
          border-t
          border-white/10
        "
      >
        © {new Date().getFullYear()} Dishcovery  
        <br/>
        <span className="text-[#ff6b35]">
          AI-Powered Recipe Platform
        </span>
      </footer>

    </div>
  );
}
