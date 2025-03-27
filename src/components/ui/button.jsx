export const Button = ({ children, className = "", ...props }) => (
    <button
      className={`px-4 py-2 rounded-md border bg-white hover:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
  