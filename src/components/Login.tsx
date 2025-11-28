import { motion } from "framer-motion";
import logo from "../assets/Spotify.png";
import waguri from '../assets/Kaoruko Waguri.jpg'
import { Info } from "lucide-react";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:3000/auth/login";
  };

  return (
    <div className="min-h-screen flex flex-col w-full items-center justify-center bg-linear-to-br from-black  to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full text-center"
      >
        {/* Logo / Title */}
        <div className="  h-[60vh]  mb-13 w-full  flex-col flex items-center justify-center  ">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-black text-white tracking-tight mb-2 "
            style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Cooked !
          </motion.h1>

          <p className="text-lg text-gray-200 font-semibold mb-5">
            Get your playlists roasted by AI
          </p>
          
        <div className="h-50   w-full flex gap-1 mb-8 items-center justify-center">
          <img src={waguri} alt="Kaoruko Waguri" className="h-40 w-40 rounded-full" />
          <div className="text-gray-400 text-sm mt-2 px-4 ">
            <p>
              Music is the spice of life, and with Cooked, your playlists get a dash of AI flavor! Let your tunes simmer in the digital kitchen and emerge with a fresh, personalized twist. Bon appétit for your ears!
            </p>
        </div>
        </div>
        <motion.button
          whileHover={{ scale: 0.99, boxShadow: "0 0 30px rgba(29, 185, 84, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}     
          // style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, sans-serif' }}
          onClick={handleLogin}
          className="w-full  bg-linear-to-r from-[#8ca796]  to-[#1ed760] text-black font-bold h-15 rounded-full text-lg shadow-xl hover:cursor-pointer uppercase tracking-wide  transition-all duration-300 hover:shadow-2xl"
        >
          <div className="flex items-center justify-center mr-2 space-x-4 gap-4">
          <img src={logo} alt="logo" className="inline-block  h-10 w-10" />
          {/* <h1 className="font-nbold text-lg"> */}

          Login with Spotify
          {/* </h1> */}
              </div>

            </motion.button>
            </div>

      </motion.div>
  <footer
  className="
    absolute bottom-0 left-0 right-0
    px-4 py-3
    flex flex-col md:flex-row
    items-center md:items-center
    justify-center md:justify-between
    gap-3
    text-gray-500 text-xs tracking-wide
  "
>
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4 }}
    className="flex items-center gap-1 text-center md:text-left text-xs md:text-sm"
  >
    <Info className="h-3 w-3.5 hidden sm:inline-block" />
    We only read your playlists and make fun. No data stored.
  </motion.p>

    <div className="md:w-100 ">

  <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
    Powered by Spotify × Gemini
  </p>
    </div>

  <a
    href="https://github.com/kapilsingh09"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1 hover:text-green-400 transition-colors text-xs md:text-sm text-gray-400"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="inline-block"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.582 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.372.823 1.104.823 2.227 0 1.607-.015 2.903-.015 3.293 0 .322.218.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
    <span>GitHub</span>
  </a>
</footer>

    </div>
  );
};

export default Login;