import { useCycle } from "framer-motion";
import { motion } from "framer-motion";
import { MenuToggle } from "../../components/MenuToggle";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const sidebar = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      type: "spring",
      stiffness: 20,
      damping: 10,
    },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};


const MenuItem = ({ item }) => (
  <li className="flex items-center p-2 hover:bg-gray-200 transition-all duration-200">
    <div className="w-6 h-6 bg-gray-400 rounded-full mr-2" />
    <span>{item}</span>
  </li>
);

const Navbar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
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

  const menuItems = [
    "Add Personal Image",
    "Change Background Gradient",
    "My Cards",
    "Logout",
  ];

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="left-5 relative top-5 w-fit"
    >
      <MenuToggle toggle={() => toggleOpen()} />

      <motion.div
        className="bg-white shadow-lg rounded overflow-hidden mt-2 absolute w-52"
        variants={sidebar}
      >
        <ul className="divide-y">
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
