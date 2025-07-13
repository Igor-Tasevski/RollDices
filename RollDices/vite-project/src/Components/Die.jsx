const Die = ({ value, isHeld, onClick }) => {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={onClick}
        className={`w-16 h-16 border-2 border-gray-400 rounded-lg flex justify-center items-center text-xl font-semibold shadow-md transition duration-200 
          ${isHeld ? 'bg-green-400 text-white' : 'bg-white text-black hover:bg-gray-200'} 
          ${isHeld ? 'hover:bg-green-400' : ''}`}
      >
        {value}
      </button>
    </div>
  );
};
export default Die;