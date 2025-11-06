"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, loading, ...props }) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`w-full py-2 rounded-md text-white font-medium transition-colors
        ${loading || props.disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
        }`}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;
