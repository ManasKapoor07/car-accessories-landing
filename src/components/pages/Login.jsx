import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useLoginUserMutation } from "../../redux/api/auth.api";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData).unwrap();
      if(res){        
        localStorage.setItem("auth_user", res?.data.token);
      }
      toast.success("Welcome back to Car Vatika!");
      navigate("/");
    } catch (err) {
      setError(
        err?.data?.message || "Invalid email or password. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center p-6 selection:bg-blue-600/40">
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
          Car <span className="text-zinc-600 font-light">Vatika.</span>
        </h1>
        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mt-3">
          Premium Auto Accessories
        </p>
      </div>

      {/* LOGIN CARD */}
      <div className="w-full max-w-[400px] bg-[#111113] border border-white/5 p-6 sm:p-10 shadow-2xl rounded-sm">
        <h2 className="text-xl font-bold text-white mb-6">Sign-In</h2>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border-l-2 border-red-500 text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
            />
          </div>

          {/* Password with Eye Toggle */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                className="text-[10px] text-blue-500 hover:underline font-bold uppercase tracking-tight"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 cursor-pointer bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300 mt-4 disabled:opacity-50 flex justify-center items-center"
          >
            {isLoading ? (
              <div className="flex  items-center gap-2">
                <span className="w-2 h-2  bg-black rounded-full animate-bounce"></span>
                Signing In...
              </div>
            ) : (
              "Sign-In"
            )}
          </button>
        </form>

        <p className="text-[10px] text-zinc-500 mt-6 text-center leading-relaxed">
          Need help? Contact our{" "}
          <span className="text-blue-500 underline cursor-pointer">
            Support Team
          </span>
          .
        </p>

        <div className="relative my-8 border-t border-white/10">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111113] px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            New User?
          </span>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="w-full py-3 border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all"
        >
          Create your account
        </button>
      </div>

      {/* FOOTER LINKS */}
      <div className="mt-10 flex gap-6 text-[10px] font-bold text-zinc-700 uppercase tracking-widest">
        <span className="hover:text-zinc-400 cursor-pointer">Help</span>
        <span className="hover:text-zinc-400 cursor-pointer">Privacy</span>
        <span className="hover:text-zinc-400 cursor-pointer">Terms</span>
      </div>
    </div>
  );
};

export default Login;
