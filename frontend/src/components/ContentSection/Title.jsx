export const Title = ({ children }) => (
    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-balance animate-fade-in">
      <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
        {children}
      </span>
    </h1>
  );