"use client";

import { useActionState } from "react";
import { loginAction, LoginState} from "../actions/auth";

const initialState: LoginState = {
  error: null
};

const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4 w-full max-w-md mx-auto p-4">

      <div>
        <label>Email</label>
        <input 
          type="email" 
          name="email"
          placeholder="Enter your email" 
          required 
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 outline-none"
        />
      </div>

      <div>
        <label>Password</label>
        <input 
          type="password" 
          name="password"
          placeholder="Enter your password" 
          required 
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 outline-none"
        />
      </div>

      {state?.error && (
        <p className="text-red-600 text-sm font-medium">
          {state.error}
        </p>
      )}

      <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:bg-blue-800 transition-all duration-200 cursor-pointer"
        >
          Login
      </button>

    </form>
  );
};

export default LoginForm;