const Input = ({ label, type = "text", className = "", placeholder, ...props }) => {
  return (
    <div className="w-full flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
