export const LoadingShimmer = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin" />
    </div>
  );
};

export const LoadingSpinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-4 border-white/20 
                    border-t-white rounded-full animate-spin`}
      />
    </div>
  );
};