const CardEditor = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-pink-500">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-4">
            Customize Your Greeting Card
          </h1>
          <textarea
            placeholder="Write your message here..."
            className="w-full p-2 border border-gray-300 rounded mb-4"
          ></textarea>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Card
          </button>
        </div>
      </div>
    </>
  );
};

export default CardEditor;
