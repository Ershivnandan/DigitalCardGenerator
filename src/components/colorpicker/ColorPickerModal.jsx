import { useState } from 'react';
import { SketchPicker } from 'react-color';

const ColorPickerModal = ({ onSelectColor, onSelectGradient }) => {
  const [selectedColor, setSelectedColor] = useState("#ffffff");


  const gradients = [
    "linear-gradient(to right, #6a11cb, #2575fc)",
    "linear-gradient(to right, #74ebd5, #acb6e5)",
    "linear-gradient(to right, #f9d423, #ff4e50)",
    "linear-gradient(to right, #00c6ff, #0072ff)",
  ];

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const handleGradientClick = (gradient) => {
    onSelectGradient(gradient);

  };

  const applyColor = () => {
    onSelectColor(selectedColor);

  };

  return (
    <div className="z-20 top-0 left-0 w-full h-full  bg-opacity-50 flex justify-center items-center">
      <div className="p-6 rounded-lg w-96 h-full shadow-lg mt-20">
        <h2 className="text-md absolute left-0 top-0 z-10 bg-blue-950 text-white w-full py-3 mx-0 font-semibold mb-4 text-center">Pick a Color or Gradient</h2>
        <SketchPicker color={selectedColor} onChange={handleColorChange} />

        <button
          className="mt-4 w-full p-2 bg-blue-500 text-white rounded-md font-medium"
          onClick={applyColor}
        >
          Apply Color
        </button>

        <div className="my-4 text-center text-sm font-medium text-gray-100">Or pick a gradient</div>

        <div className="flex justify-around">
          {gradients.map((gradient, index) => (
            <button
              key={index}
              className="p-2 rounded-full w-10 h-10 hover:scale-110 duration-200"
              style={{ background: gradient }}
              onClick={() => handleGradientClick(gradient)}
            ></button>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default ColorPickerModal;
