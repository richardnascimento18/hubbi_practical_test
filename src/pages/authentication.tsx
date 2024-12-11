import AuthInput from "@/components/auth/AuthInput";
import { WarningIcon } from "@/components/icons";
import useAuth from "@/data/hook/useAuth";
import { useState } from "react";

export default function Authentication() {
  const { signup, login, loginGoogle} = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function renderError(msg: string, timeInSeconds = 5) {
    setError(msg);
    setTimeout(() => setError(null), timeInSeconds * 1000);
  }

  async function submit() {
    try {
      if(mode === "login") {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch(e) {
      renderError(JSON.parse(e?.message).error.message);
    }
  }


  return (
    <div className="flex h-screen items-center justify-center">
      <div className="hidden md:block md:w-1/2 lg:w-2/3">
        <img src="image.jpg" alt="Authentication Page Image" className="h-screen w-full object-cover" />
      </div>
      <div className="m-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className={`
          text-3xl font-bold mb-5   
        `}>
          {mode === "login" ? "Log in with your account!" : "Sign up in our platform!"}
        </h1>
        
        {error && (
          <div className={`flex items-center bg-orange-400 text-white py-3 px-5 my-2 border-2 border-orange-900 rounded-lg`}>
            {WarningIcon}
            <span className="ml-2">{error}</span>
          </div>
        )}

        <AuthInput label="Email" type="email" value={email} onChange={setEmail} required />
        <AuthInput label="Password" type="password" value={password} onChange={setPassword} required />

        <button onClick={submit} className={`w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6`}>
          {mode === "login" ? "Log in" : "Sign up"}
        </button>

        <hr className="my-6 border-gray-300 w-full" />

        <button onClick={loginGoogle} className={`w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3`}>
          Log in with Google
        </button>
        {mode === "login" ? (
          <p className="mt-8">
            New here?
            <a onClick={() => setMode("signup")}
              className={`
                ml-2 text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
            `}>Create an account now!</a>
          </p>
        ) : (
          <p className="mt-8">
            Do you already have an account?
            <a onClick={() => setMode("login")}
              className={`
                ml-2 text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
            `}>Log in here!</a>
          </p>
        )}
      </div>
    </div>
  );
}