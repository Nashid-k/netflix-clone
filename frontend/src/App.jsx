import { Navigate, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { WatchPage } from "./pages/WatchPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/home/HomePage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { SearchPage } from "./pages/SearchPage";
// Scroll Restoration Component
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  console.log("Auth user is here:", user);

  // Check authentication status on mount
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  // Loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <>

      <ScrollToTop />
      

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to="/login" />}
        />
      </Routes>
      

      <Footer />
      <Toaster />
    </>
  );
}

export default App;
