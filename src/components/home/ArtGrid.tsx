const ArtGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[1,2,3,4,5,6].map((item) => (
        <div
          key={item}
          className="h-60 bg-black/5 border border-black/10 rounded-xl hover:scale-[1.02] transition duration-300"
        />
      ))}
    </div>
  );
};

export default ArtGrid;