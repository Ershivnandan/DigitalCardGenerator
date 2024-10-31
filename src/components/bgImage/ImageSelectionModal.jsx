
const ImageSelectionModal = ({ images, onSelectImage, }) => {
  return (
    <div className="z-20 w-full flex justify-center items-center ">
      <div className="bg-white rounded-lg shadow-lg relative w-full">
        <h2 className="text-md absolute top-0 z-10 bg-blue-950 text-white w-full py-3 mx-0 font-semibold mb-4 text-center">Select a Background Image</h2>
        <div className="grid grid-cols-1 gap-5 border mt-10  p-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Background ${index}`}
              loading="lazy"
              className="cursor-pointer z-0 w-full h-auto rounded border border-black shadow-md shadow-black hover:scale-105 duration-100"
              onClick={() => {
                onSelectImage(image);
                
              }}
            />
          ))}
        </div>
      </div>
        
    </div>
  );
};

export default ImageSelectionModal;
