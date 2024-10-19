import React from "react";

function ErrorDisplay({ error }) {
  return <div className="w-full h-screen flex justify-center items-center text-2xl font-bold text-rose-800">{error}...!</div>;
}

export default ErrorDisplay;