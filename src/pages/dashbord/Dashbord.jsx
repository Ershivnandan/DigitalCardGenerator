import { useEffect, useRef, useState } from "react";
import Cardtemplate from "../../components/Cardtemplate";
import Navbar2 from "../../components/Navbar/Navbar2";
import { toast } from "react-toastify";
import { auth, storage, db } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import ColorPickerModal from "../../components/colorpicker/ColorPickerModal";
import ImageSelectionModal from "../../components/bgImage/ImageSelectionModal";
import TextEditModal from "../../components/editText/TextEditModal";
import FontModal from "../../components/fonts/FontModal";
import { ref as dbRef, get, set } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import html2canvas from "html2canvas";
import { AiOutlineDownload } from "react-icons/ai";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const Dashbord = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedGradient, setSelectedGradient] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isTextEditModalOpen, setIsTextEditModalOpen] = useState(false);
  const [title, setTitle] = useState("Sample Title");
  const [message, setMessage] = useState("This is a sample message.");
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState("");
  const [textColor, setTextColor] = useState("black");
  const [textSize, setTextSize] = useState("12px");
  const [textStrokeColor, setTextStrokeColor] = useState("white");
  const [textStrokeSize, setTextStrokeSize] = useState("white");
  const [borderImage, setBorderImage] = useState("");
  const [isBorderImageModalOpen, setIsBorderImageModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState("colorPicker");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [localImage, setLocalImage] = useState(false);
  const [isDownloadListOpen, setIsDownloadListOpen] = useState(false);

  const [cardData, setCardData] = useState({
    title: title,
    message: message,
    selectedColor: selectedColor,
    selectedGradient: selectedGradient,
    backgroundImage: backgroundImage,
    selectedFont: selectedFont,
    textColor: textColor,
    textSize: textSize,
    textStrokeSize: textStrokeSize,
    textStrokeColor: textStrokeColor,
    borderImage: borderImage,
  });

  const images = [
    "https://i.ibb.co/Tcb8BwJ/rb-43365.png",
    "https://i.ibb.co/sjV6t8j/Pngtree-luxury-golden-circle-frame-with-7948391.png",
    "https://i.ibb.co/VHzVPfj/rb-118171.png",
    "https://i.ibb.co/HVfFsFp/rb-2148847272.png",
  ];

  const borderImages = [
    "https://i.ibb.co/YLVS9hG/pngwing-com-1.png",
    "https://i.ibb.co/yBFWm2x/Pngtree-green-gold-leaves-background-wedding-8329390.png",
    "https://i.ibb.co/wWMT8Fn/Pngtree-square-golden-border-frame-with-8507700.png",
    "https://i.ibb.co/gdkN9d7/Pngtree-golden-line-floral-flower-wedding-6240255.png",
    "https://i.ibb.co/kMcp0bH/Pngtree-beautiful-floral-golden-square-for-6864694.png",
    "https://i.ibb.co/j9NPkhd/pngegg-5-1.png",
    "https://i.ibb.co/LpLmwYj/pngegg-4.png",
    "https://i.ibb.co/tK5MLp2/pngegg-3.png",
    "https://i.ibb.co/C27QHrN/pngegg-2.png",
    "https://i.ibb.co/H2YG412/pngegg-1.png",
    "https://i.ibb.co/4RM9HGy/Pngtree-black-and-white-paper-page-6373704.png",
  ];

  const handleMenuItemClick = (item) => {
    switch (item) {
      case "Add image":
        handleImageUpload();
        break;
      case "Background Color":
        setIsModalOpen(true);
        setActiveModal("colorPicker");
        break;
      case "Background image":
        setIsImageModalOpen(true);
        setActiveModal("imageSelector");
        break;
      case "Text":
        setIsTextEditModalOpen(true);
        setActiveModal("textEditor");
        break;
      case "Font family":
        setIsFontModalOpen(true);
        setActiveModal("fontSelector");
        break;
      case "borders":
        setIsBorderImageModalOpen(true);
        setActiveModal("borderImageSelector");
        break;
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleDrawerClick = (item) => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleTextSize = (size) => {
    setTextSize(parseInt(size));
  };

  const handleStrokeSize = (size) => {
    setTextStrokeSize(size);
  };

  const handletextStrokeColor = (color) => {
    setTextStrokeColor(color);
  };

  const handleBorderImageSelect = (image) => {
    setBorderImage(image);
    setIsBorderImageModalOpen(false);
  };

  const handleFontSelect = (font) => {
    setSelectedFont(font);
    setIsFontModalOpen(false);
  };

  const handleTextColor = (color) => {
    setTextColor(color);
  };

  const handleTextSave = (newTitle, newMessage) => {
    setTitle(newTitle);
    setMessage(newMessage);
  };

  const handleImageSelect = (image) => {
    setBackgroundImage(image);
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setImageFile(file);
        const localImageURL = URL.createObjectURL(file);
        setImageURL(localImageURL);
        setLocalImage(false);
        // console.log("Image selected for preview:", localImageURL);
      }
    };
    input.click();
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedGradient("");
  };

  const handleGradientSelect = (gradient) => {
    setSelectedGradient(gradient);
    setSelectedColor("");
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        toast.success("Logged out!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const updateCard = async () => {
    const userId = currentUser.uid;
    const cardDbRef = dbRef(db, `cards/${userId}`);
    let downloadURL;

    if (!imageFile && !localImage) {
      toast.error("Please upload an image first!");
      return;
    }

    try {
      const snapshot = await get(cardDbRef);
      let oldImageURL = "";
      if (snapshot.exists()) {
        oldImageURL = snapshot.val().imageURL;
      }

      if (imageFile) {
        if (oldImageURL) {
          const oldImageRef = storageRef(storage, oldImageURL);
          await deleteObject(oldImageRef);
        }

        const newStorageRef = storageRef(
          storage,
          `images/${userId}/${imageFile.name}`
        );
        await uploadBytes(newStorageRef, imageFile);
        downloadURL = await getDownloadURL(newStorageRef);
      } else {
        downloadURL = oldImageURL;
      }

      const newCardData = {
        title,
        message,
        selectedColor,
        selectedGradient,
        backgroundImage,
        selectedFont,
        textColor,
        textSize,
        textStrokeSize,
        textStrokeColor,
        borderImage,
        imageURL: downloadURL,
        userId,
      };

      await set(cardDbRef, newCardData);

      toast.success("Card saved successfully!");
    } catch (error) {
      console.error("Error saving card to Firebase:", error);
      toast.error("Error saving card, please try again.");
    }
  };

  useEffect(() => {
    const fetchUserCardData = async () => {
      try {
        if (currentUser) {
          const cardRef = dbRef(db, `cards/${currentUser.uid}`);

          const snapshot = await get(cardRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            setCardData(data);
            setTitle(data.title || "Sample Title");
            setMessage(data.message || "This is a sample message.");
            setSelectedColor(data.selectedColor || "white");
            setSelectedGradient(data.selectedGradient || "");
            setBackgroundImage(data.backgroundImage || "");
            setSelectedFont(data.selectedFont || "");
            setTextColor(data.textColor || "black");
            setTextSize(data.textSize || "12px");
            setTextStrokeColor(data.textStrokeColor || "white");
            setTextStrokeSize(data.textStrokeSize || "2px");
            setBorderImage(data.borderImage || "");
            setImageURL(data.imageURL || "");
            setLocalImage(true);
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.log("Fetching issue", error.message);
      }
    };

    fetchUserCardData();
  }, [currentUser]);

  useEffect(() => {
    const handleScroll = () => {
      if (isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        console.log("chal gaya ");

        setIsDrawerOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDrawerOpen]);

  const cardRef = useRef();

  const handleDownloadCard = async (format) => {
    if (format === "whatsapp") {
      try {
        console.log("whatsapp sharing asked")
      } catch (error) {
        console.log(error.message)
      }
    } else {
      try {
        const element = cardRef.current;

        const canvas = await html2canvas(element);
        const imageData = canvas.toDataURL(`image/${format}`);
        const link = document.createElement("a");
        link.href = imageData;
        link.download = `card.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsDownloadListOpen(false);
        toast.success("downloadStarted");
      } catch (error) {
        console.log(error.message);
        toast.error("Cant download");
      }
    }
  };

  return (
    <div className="flex bg-gradient-to-r overflow-x-hidden from-[#6a11cb] via-[#2575fc] to-[#f9d423] bg-600 animate-homeBg shadow-[2px_3px_45px_rgba(0,0,0,0.74)] min-h-screen">
      <Navbar2
        onMenuItemClick={handleMenuItemClick}
        onMobileMenuItemClick={handleDrawerClick}
        setDrawerOpen={setIsDrawerOpen}
      />
      <div className="my-auto md:w-1/2 w-[90%] h-full flex justify-center  mx-auto ">
        <Cardtemplate
          title={title}
          message={message}
          imageURL={imageURL}
          color={selectedColor}
          gradient={selectedGradient}
          backgroundImage={backgroundImage}
          fontfamily={selectedFont}
          textColor={textColor}
          textSize={textSize}
          textStrokeSize={textStrokeSize}
          textStrokeColor={textStrokeColor}
          borderImage={borderImage}
          cardRef={cardRef}
        />
      </div>

      {/* Right Sidebar for editing */}
      <div
        className={`fixed top-0 right-0 z-40 overflow-y-scroll h-screen  transition-transform bg-violet-600 w-72  ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:relative`}
      >
        {/* Drawer content */}
        {activeModal === "colorPicker" && (
          <ColorPickerModal
            onClose={() => setActiveModal(null)}
            onSelectColor={handleColorSelect}
            onSelectGradient={handleGradientSelect}
          />
        )}

        {activeModal === "imageSelector" && (
          <ImageSelectionModal
            images={images}
            onSelectImage={handleImageSelect}
          />
        )}

        {activeModal === "textEditor" && (
          <TextEditModal
            onSave={handleTextSave}
            initialTitle={title}
            initialMessage={message}
          />
        )}

        {activeModal === "fontSelector" && (
          <FontModal
            onSelectFont={handleFontSelect}
            onSettextColor={handleTextColor}
            onSetTextStrokeColor={handletextStrokeColor}
            onSetTextSize={handleTextSize}
            onSetStrokeSize={handleStrokeSize}
          />
        )}

        {activeModal === "borderImageSelector" && (
          <ImageSelectionModal
            images={borderImages}
            onSelectImage={handleBorderImageSelect}
          />
        )}
      </div>

      <button
        onClick={updateCard}
        className="absolute md:bottom-10 bottom-28 sm:right-72 sm:left-auto left-5 border rounded-full p-2 bg-orange-500 text-white font-medium hover:scale-125 duration-150"
      >
        Save
      </button>

      <div className="absolute md:bottom-10 bottom-28 sm:left-72 sm:right-auto right-5 border rounded-full p-2 bg-orange-500 text-white font-medium flex items-center ">
        <button
          className="flex gap-1 items-center text-sm"
          onClick={() => setIsDownloadListOpen(!isDownloadListOpen)}
        >
          <AiOutlineDownload className="text-lg" />
          Download
        </button>

        {/* Animated options list */}
        {isDownloadListOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute z-30 bg-white rounded-lg shadow-lg  p-2 right-0 bottom-10"
          >
            <button
              onClick={() => handleDownloadCard("png")}
              className="block w-full text-left border border-b px-4 py-2 text-sm text-gray-700 hover:scale-110 duration-200"
            >
              PNG
            </button>
            <button
              onClick={() => handleDownloadCard("jpeg")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:scale-110 duration-200"
            >
              JPEG
            </button>
            <button
              onClick={() => handleDownloadCard("whatsapp")}
              className=" w-full flex items-center gap-1 text-left px-4 py-2 text-sm text-gray-700 hover:scale-110 duration-200"
            >
              <FaWhatsapp className="text-lg" /> Share
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashbord;
