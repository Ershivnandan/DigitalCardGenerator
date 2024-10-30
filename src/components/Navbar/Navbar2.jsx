/* eslint-disable react/jsx-key */
import { CiText } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { GrDocumentUpload } from "react-icons/gr";
import { ImFont } from "react-icons/im";
import { IoImage } from "react-icons/io5";
import { MdBorderColor } from "react-icons/md";
import { TbBackground } from "react-icons/tb";

const menuItems = [
  "Add image",
  "Background Color",
  "Background image",
  "Text",
  "Font family",
  "borders",
  "Logout",
];

const menuIcons = [
  <GrDocumentUpload />,
  <TbBackground />,
  <IoImage />,
  <CiText />,
  <ImFont />,
  <MdBorderColor />,
  <FiLogOut />,
];

const Navbar2 = ({ onMenuItemClick, onMobileMenuItemClick }) => {
  const handleClick = (item) => {
    onMenuItemClick(item);
  };
  const handleMobileClick = (item) => {
    onMenuItemClick(item);
    onMobileMenuItemClick(item);
  };

  return (
    <>
      {/* Sidebar for larger screens */}
      <nav className="w-[20%] p-4 h-screen border bg-fuchsia-800 rounded-e-lg md:block hidden">
        <ul>
          {menuItems.map((item, index) => (
            <li
              className="cursor-pointer flex items-center gap-2 border rounded-3xl hover:scale-110 duration-200 p-2 mb-2 text-white font-semibold text-base"
              key={index}
              onClick={() => handleClick(item)}
            >
              {menuIcons[index]}
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile view: top icon navigation */}
      <div className="absolute w-full top-2  md:hidden flex justify-between px-4">
        <div
          onClick={() => handleClick("Add image")}
          className="text-3xl text-white font-bold"
        >
          <GrDocumentUpload />
        </div>
        <div
          onClick={() => handleClick("Logout")}
          className="text-3xl text-white font-bold"
        >
          <FiLogOut />
        </div>
      </div>

      {/* Mobile view: bottom nav */}
      <div className="border w-full z-50 absolute bottom-0 md:hidden flex justify-around items-center bg-black p-3">
        <ul className="flex justify-between w-full">
          {menuItems.slice(1, -1).map((item, index) => (
            <li
              className="cursor-pointer flex flex-col justify-center items-center w-full text-white hover:scale-110 duration-200"
              key={index}
              onClick={() => handleMobileClick(item)}
            >
              <div className="text-3xl">{menuIcons[index + 1]}</div>
              <span className="text-[10px] mt-1">{item.split(" ")[0]}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar2;
