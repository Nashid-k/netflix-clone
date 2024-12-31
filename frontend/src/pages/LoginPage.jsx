import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";


export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Validation states
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const { login } = useAuthStore();

  // Email validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  // Password validation
  useEffect(() => {
    setIsPasswordValid(password.length >= 6);
  }, [password]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      login({ email, password });
    }
  };

  const getInputClassName = (isValid, value) => `
    w-full px-4 py-3 rounded-lg bg-gray-700/30 
    text-white placeholder-gray-400 
    transition-all duration-300
    focus:outline-none focus:ring-2
    ${value ? (isValid ? 
      'border-green-500 focus:ring-green-500' : 
      'border-red-500 focus:ring-red-500') : 
      'border-gray-600 focus:ring-red-500'}
    border
  `;

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/a449fabb-05e4-4c8a-b062-b0bec7d03085/IN-en-20240115-trifectadaily-perspective_alpha_website_large.jpg")`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex-1">
        {/* Header */}
        <header className="px-4 py-6 md:px-8">
          <Link to="/" className="inline-block">
            <img 
              src="/netflix-logo.png" 
              alt="Netflix" 
              className="w-32 md:w-52 transition-transform hover:scale-105" 
            />
          </Link>
        </header>

        {/* Login Form */}
        <div className="flex justify-center items-center px-4 py-8">
          <div className="w-full max-w-md bg-black/80 rounded-2xl p-8 md:p-12
                        backdrop-blur-sm shadow-2xl">
            <div className="space-y-8">
              {/* Form Header */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white text-center">
                  Welcome back
                </h1>
                <p className="text-gray-400 text-center text-sm">
                  Sign in to continue watching
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={getInputClassName(isEmailValid, email)}
                    placeholder="name@example.com"
                    required
                  />
                  {email && !isEmailValid && (
                    <p className="text-red-500 text-xs mt-1">
                      Please enter a valid email address
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={getInputClassName(isPasswordValid, password)}
                    placeholder="••••••••"
                    required
                  />
                  {password && !isPasswordValid && (
                    <p className="text-red-500 text-xs mt-1">
                      Password must be at least 6 characters long
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isEmailValid || !isPasswordValid}
                  className="w-full py-3 px-4 bg-red-600 text-white text-lg font-semibold
                           rounded-lg transition-all duration-300 transform hover:scale-[1.02]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           hover:bg-red-700 focus:outline-none focus:ring-2
                           focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Sign in
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center space-y-2">
                <p className="text-gray-400">
                  New to Netflix?{" "}
                  <Link 
                    to="/signup" 
                    className="text-red-500 hover:text-red-400 font-semibold
                             transition-colors duration-300"
                  >
                    Sign up now
                  </Link>
                </p>
                <p className="text-xs text-gray-500">
                  This page is protected by Google reCAPTCHA to ensure you're not a bot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};