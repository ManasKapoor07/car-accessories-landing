import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/api/auth.api";
import toast from "react-hot-toast";
// Standard icons for the eye toggle
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when they start typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await registerUser(formData).unwrap();
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      setError(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center p-6">
      {/* BRAND LOGO */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
          Car <span className="text-zinc-600 font-light">Vatika.</span>
        </h1>
        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mt-3">
          Premium Auto Accessories
        </p>
      </div>

      {/* REGISTRATION CARD */}
      <div className="w-full max-w-[400px] bg-[#111113] border border-white/5 p-6 sm:p-10 shadow-2xl rounded-sm">
        <h2 className="text-xl font-bold text-white mb-6">Create Account</h2>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border-l-2 border-red-500 text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
              Your Name
            </label>
            <input
              type="text"
              name="userName"
              required
              placeholder="First and last name"
              value={formData.userName}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
            />
          </div>

          {/* Password with Eye Toggle */}
          <div className="space-y-2 relative">
            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="At least 6 characters"
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              required
              placeholder="Type password again"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300 mt-4 disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-[10px] text-zinc-500 mt-6 text-center leading-relaxed">
          By joining, you agree to our{" "}
          <span className="text-blue-500 underline cursor-pointer">
            Terms of Service
          </span>
          .
        </p>

        <div className="relative my-8 border-t border-white/10">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111113] px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            Already have an account?
          </span>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="w-full py-3 border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all"
        >
          Sign-In
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

export default Register;
