import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";


const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid) {
      navigate("/signup?email=" + email);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Background */}
      <div className="relative min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg")`,
          }}
        />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

        {/* Content */}
        <div className="relative">
          {/* Navbar */}
          <header className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6">
            <img 
              src="/netflix-logo.png" 
              alt="Netflix" 
              className="w-32 md:w-52 transition-transform hover:scale-105" 
            />
            <Link
              to="/login"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 
                       transition-all duration-300 text-sm md:text-base font-medium"
            >
              Sign In
            </Link>
          </header>

          {/* Hero Content */}
          <div className="flex flex-col items-center justify-center text-center 
                        py-20 md:py-32 px-4 text-white max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight space-y-2">
              <span className="block mb-2">Unlimited films, TV</span>
              <span className="block mb-2">programmes and</span>
              <span className="block mb-6">more</span>
            </h1>
            
            <div className="space-y-4 mb-8">
              <h4 className="text-xl md:text-2xl">
                Starts at ₹149. Cancel at any time
              </h4>
              <p className="text-lg md:text-xl">
                Ready to watch? Enter your email to create or restart your membership.
              </p>
            </div>

            <form 
              onSubmit={handleFormSubmit} 
              className="flex flex-col md:flex-row gap-4 w-full max-w-3xl px-4"
            >
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full p-4 text-base md:text-lg rounded-md
                           bg-black/80 border transition-all duration-300
                           ${email ? (isEmailValid ? 'border-green-500' : 'border-red-500') 
                                  : 'border-gray-600'}
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-red-500`}
                />
                {email && !isEmailValid && (
                  <p className="text-red-500 text-sm mt-1 text-left">
                    Please enter a valid email address
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={!isEmailValid && email.length > 0}
                className="bg-red-600 text-xl px-8 py-4 rounded-md flex items-center 
                         justify-center gap-2 hover:bg-red-700 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Get Started
                <ChevronRight className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Feature Sections */}
      <div className="border-t-8 border-[#232323]" />

      {/* TV Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl text-gray-200">
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
          <div className="flex-1 relative">
            <img 
              src="/tv.png" 
              alt="TV" 
              className="relative z-20 transform transition-all duration-700 hover:scale-105" 
            />
            <video
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-[54%] z-10"
              autoPlay
              playsInline
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
      {/* Separator */}
      <div className="border-t-8 border-[#232323]" />

      {/* Download Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl text-gray-200">
              Save your favorites easily and always have something to watch.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="Stranger Things"
                className="w-full transform transition-all duration-700 hover:scale-105"
              />
              <div className="flex items-center gap-4 absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-8 
                          bg-black border-2 border-gray-600 rounded-xl p-2 w-[80%] md:w-[60%]">
                <img
                  src="/stranger-things-sm.png"
                  alt="Stranger Things"
                  className="h-16 md:h-20"
                />
                <div className="flex-1">
                  <p className="text-white font-medium">Stranger Things</p>
                  <p className="text-blue-500 text-sm">Downloading...</p>
                </div>
                <img 
                  src="/download-icon.gif" 
                  alt="Downloading" 
                  className="h-12 w-12"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="border-t-8 border-[#232323]" />

      {/* Watch Everywhere Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl text-gray-200">
              Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
            </p>
          </div>
          <div className="flex-1 relative">
            <img
              src="/device-pile.png"
              alt="Devices"
              className="relative z-20 transform transition-all duration-700 hover:scale-105"
            />
            <video
              className="absolute top-[9%] left-1/2 -translate-x-1/2 h-[47%] z-10 max-w-[63%]"
              autoPlay
              playsInline
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="border-t-8 border-[#232323]" />

      <section className="py-16 md:py-24 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Create profiles for kids
            </h2>
            <p className="text-lg md:text-xl text-gray-200">
              Send kids on adventures with their favorite characters in a space made just for them—free with your membership.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="/kids.png"
              alt="Kids Profile"
              className="w-full transform transition-all duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="border-t-8 border-[#232323]" />

      
    </div>
  );
};

export default AuthScreen;