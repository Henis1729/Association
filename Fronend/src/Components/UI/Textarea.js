import React from "react";

const Textarea = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
