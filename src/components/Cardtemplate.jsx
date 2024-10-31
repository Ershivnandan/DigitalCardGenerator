import { useEffect, useState } from "react";

const Cardtemplate = ({
  title,
  message,
  imageURL,
  color,
  gradient,
  backgroundImage,
  fontfamily,
  textColor,
  textSize,
  textStrokeSize,
  borderImage,
  textStrokeColor,
  cardRef,
}) => {
  const [base64ImageURL, setBase64ImageURL] = useState(null);
  const [base64BackgroundImage, setBase64BackgroundImage] = useState(null);
  const [base64BorderImage, setBase64BorderImage] = useState(null);

  const convertToBase64 = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting to Base64:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      if (imageURL) {
        const base64Image = await convertToBase64(imageURL);
        setBase64ImageURL(base64Image || imageURL); 
      }
      if (backgroundImage) {
        const base64Background = await convertToBase64(backgroundImage);
        setBase64BackgroundImage(base64Background || backgroundImage);
      }
      if (borderImage) {
        const base64Border = await convertToBase64(borderImage);
        setBase64BorderImage(base64Border || borderImage);
      }
    };
    loadImages();
  }, [imageURL, backgroundImage, borderImage]);

  const calculateFontSize = (size) => {
    const baseSize = size;
    const mobileFactor = 0.7;
    return window.innerWidth < 768 ? baseSize * mobileFactor : baseSize;
  };

  const appliedStyle = gradient ? { background: gradient } : { backgroundColor: color };
  const responsiveTextSize = calculateFontSize(textSize);

  return (
    <div
      ref={cardRef}
      className="relative border flex justify-center md:min-h-[95vh] sm:min-h-[80vh] min-h-[50vh] -mt-24 md:mt-0 items-center md:w-[80%] h-full w-full rounded-lg overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 w-full h-full" style={appliedStyle} />

      {/* Border Image */}
      {base64BorderImage && (
        <img
          src={base64BorderImage}
          loading="lazy"
          alt="Border"
          className="absolute inset-0 z-10 w-full h-full object-fill opacity-50"
        />
      )}

      {/* Card Content */}
      <div
        className={`relative w-full flex flex-col items-center justify-center z-20 bg-transparent font-${fontfamily} p-4`}
        style={{ aspectRatio: "4 / 3" }}
      >
        {base64ImageURL && (
          <div className="flex items-center my-2">
            <img
              src={base64ImageURL}
              loading="lazy"
              alt="Uploaded"
              className="md:w-36 md:h-36 w-24 h-24 object-cover rounded-full shadow-black shadow-2xl"
            />
          </div>
        )}

        {/* Title */}
        {title && (
          <h4
            className="md:text-3xl text-white font-bold text-center drop-shadow-2xl"
            style={{
              fontSize: `${responsiveTextSize}px`,
              color: textColor,
              WebkitTextStroke: `${textStrokeSize} ${textStrokeColor}`,
              WebkitTextFillColor: textColor,
            }}
          >
            {title}
          </h4>
        )}

        {/* Message */}
        <p
          className="text-center md:text-xl text-white font-semibold p-4 md:mt-5 mt-5 mb-5 drop-shadow-2xl"
          style={{
            fontSize: `${responsiveTextSize - 8}px`,
            color: textColor,
            maxWidth: "80%",
            WebkitTextStroke: `${textStrokeSize} ${textStrokeColor}`,
            WebkitTextFillColor: textColor,
          }}
        >
          {message}
        </p>
      </div>

      {/* Background Image */}
      {base64BackgroundImage && (
        <img
          className="absolute z-0 opacity-60 w-full h-full object-cover"
          src={base64BackgroundImage}
          alt="Background"
          loading="lazy"
        />
      )}
    </div>
  );
};

export default Cardtemplate;
