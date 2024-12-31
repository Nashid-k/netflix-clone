export const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black z-40">
      <div className="w-12 h-12 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin" />
    </div>
  );
};