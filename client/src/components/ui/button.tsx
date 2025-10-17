// src/components/ui/button.tsx
import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
