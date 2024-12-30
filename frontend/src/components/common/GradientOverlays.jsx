export const GradientOverlays = () => {
  return (
    <>
      {/* Left side gradient - lighter */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
      
      {/* Bottom gradient - lighter */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
      
      {/* Very subtle top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-10" />
    </>
  );
};