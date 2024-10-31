import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const FontModal = ({
  onSelectFont,
  onSettextColor,
  onSetTextStrokeColor,
  onSetTextSize,
  onSetStrokeSize,
}) => {
  const fonts = [
    { name: "lobster", style: "font-lobster" },
    { name: "pacifico", style: "font-pacifico" },
    { name: "dancing", style: "font-dancing" },
    { name: "playwright", style: "font-playwright" },
  ];

  const [textColor, setTextColor] = useState("#000000");
  const [strokeColor, setStrokeColor] = useState("#ffffff");
  const [sampleText, setSampleText] = useState("Sample Text");
  const [sampleFont, setSampleFont] = useState("");
  const [textSize, setTextSize] = useState("16");
  const [strokeSize, setStrokeSize] = useState("1px");

  const handleFontClick = (font) => {
    setSampleFont(font.name);
    onSelectFont(font.name);
  };

  const handleTextColorChange = (color) => {
    setTextColor(color);
    onSettextColor(color);
  };

  const handleStrokeColorChange = (color) => {
    setStrokeColor(color);
    onSetTextStrokeColor(color);
  };

  const handleTextSizeChange = (e) => {
    setTextSize(`${e.target.value}`);
    onSetTextSize(`${e.target.value}`);
  };

  const handleStrokeSizeChange = (e) => {
    setStrokeSize(`${e.target.value}px`);
    onSetStrokeSize(`${e.target.value}px`);
  };

  return (
    <div className="z-20 top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center">
      <div className="px-2 overflow-y-auto">
        <h2 className="text-md absolute top-0 z-10 left-0 bg-blue-950 text-white w-full py-3 mx-0 font-semibold mb-4 text-center">
          Choose a Font
        </h2>

        <div className="grid justify-center items-center grid-cols-1 gap-5 md:mt-[120%] sm:mt-[70%] w-full">
          {/* Text Color Picker */}
          <div className="mb-4 mt-80">
            <h4 className="text-center mb-2 font-bold text-white">Text Color</h4>
            <HexColorPicker color={textColor} onChange={handleTextColorChange} />
          </div>

          {/* Stroke Color Picker */}
          <div className="mb-4">
            <h4 className="text-center mb-2 font-bold text-white">Stroke Color</h4>
            <HexColorPicker color={strokeColor} onChange={handleStrokeColorChange} />
          </div>

          {/* Text Size Input */}
          <div className="mb-4">
            <h4 className="text-center mb-2 font-bold text-white">Text Size (px)</h4>
            <input
              type="number"
              value={textSize.replace("px", "")}
              onChange={handleTextSizeChange}
              className="w-full px-2 py-1 rounded"
              placeholder="Enter text size in px"
            />
          </div>

          {/* Stroke Size Input */}
          <div className="mb-4">
            <h4 className="text-center mb-2 font-bold text-white">Stroke Size (px)</h4>
            <input
              type="number"
              value={strokeSize.replace("px", "")}
              onChange={handleStrokeSizeChange}
              className="w-full px-2 py-1 rounded"
              placeholder="Enter stroke size in px"
            />
          </div>

          {/* Font Options */}
          <div className="grid grid-cols-2 gap-4 my-4">
            {fonts.map((font, index) => (
              <button
                key={index}
                className={`p-2 border rounded ${font.style} hover:bg-gray-200`}
                onClick={() => handleFontClick(font)}
                style={{ color: textColor }}
              >
                {font.name}
              </button>
            ))}
          </div>

          {/* Sample Text with Text Stroke */}
          <div className="text-center py-10">
            <h3
              className={`text-xl font-${sampleFont}`}
              style={{
                color: textColor,
                fontSize: textSize,
                WebkitTextStroke: `${strokeSize} ${strokeColor}`,
              }}
            >
              {sampleText}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontModal;
