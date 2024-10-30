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
}) => {
  const appliedStyle = gradient
    ? { background: gradient }
    : { backgroundColor: color };

  return (
    <div className="relative border flex justify-center md:min-h-[95vh] sm:min-h-[80vh] min-h-[50vh] -mt-24 md:mt-0 items-center md:w-[80%] h-full w-full rounded-lg overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 w-full h-full"
        style={appliedStyle}
      />

      {/* Border Image */}
      {borderImage && (
        <img
          src={borderImage}
          loading="lazy"
          alt="Border"
          className="absolute inset-0 z-10 w-full h-full  object-fill opacity-50"
        />
      )}

      {/* Card Content */}
      <div
        className={`relative w-full flex flex-col items-center justify-center z-20 bg-transparent font-${fontfamily} p-4`}
        style={{ aspectRatio: "4 / 3" }}
      >
        {imageURL && (
          <div className="flex items-center my-2">
            <img
              src={imageURL}
              loading="lazy"
              alt="Uploaded"
              className="md:w-36 md:h-36 w-24 h-24 object-cover rounded-full shadow-black shadow-2xl"
            />
          </div>
        )}

        {/* Title */}
        {title && (
          <h4
            className={`md:text-3xl  text-white font-bold text-center drop-shadow-2xl`}
            style={{
              fontSize: `${10+textSize}px`,
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
          className={`text-center md:text-xl text-[${textSize}] text-white font-semibold p-4 md:mt-5 mt-5 mb-5 drop-shadow-2xl`}
          style={{
            fontSize: `${textSize-8}px`,
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
      {backgroundImage && (
        <img
          className="absolute z-0 opacity-60 w-full h-full object-cover"
          src={backgroundImage}
          alt="Background"
          loading="lazy"
        />
      )}
    </div>
  );
};

export default Cardtemplate;
