import { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();
  // Google Sign In
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const idToken = await user.getIdToken();

      localStorage.setItem("idToken", idToken);
      localStorage.setItem("refreshToken", user.refreshToken);

      toast.success("Login successful!");
      navigate('/')
    } catch (error) {
      const mainError = error.code.split('/')[1];
      toast.error(mainError);
    }
  };

  // Email-Password Sign In/Signup
  const handleEmailPasswordAuth = async () => {
    try {
      if (isSignup) {
        let res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        const idToken = await user.getIdToken();

        localStorage.setItem("idToken", idToken);
        localStorage.setItem("refreshToken", user.refreshToken);

        toast.success("Signup successful!");
        navigate("/");
      } else {
        let res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;

        const idToken = await user.getIdToken();

        localStorage.setItem("idToken", idToken);
        localStorage.setItem("refreshToken", user.refreshToken);

        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      const mainError = error.code.split('/')[1];
      toast.error(mainError);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59] bg-600 animate-homeBg shadow-[2px_3px_45px_rgba(0,0,0,0.74)]">
      <div className="border p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {/* Email & Password Form */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded-2xl bg-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded-2xl bg-transparent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center items-start">
          <button
            onClick={handleEmailPasswordAuth}
            className="bg-gradient-to-r  from-[#19a7f1] to-[#ff35fb] via-[#a4c6c4] hover:scale-110 duration-500 w-4/5 border text-white font-semibold py-2 rounded-2xl mb-4"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </div>

        {/* Google Sign In */}
        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="bg-red-500 hover:scale-110 duration-500 text-white w-4/5 py-2 rounded-2xl mb-4 flex justify-center items-center gap-2"
          >
            <span>
              <FaGoogle />
            </span>{" "}
            <span>Continue with Google</span>
          </button>
        </div>
        {/* Toggle between Login/Signup */}
        <p
          className="text-gray-100 cursor-pointer text-center font-medium"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Login" : "New here? Sign up"}
        </p>
      </div>

      
    </div>
  );
};

export default Login;
