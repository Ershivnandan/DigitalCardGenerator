import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiOpenaiFill } from "react-icons/ri";

const TextEditModal = ({ onSave, initialTitle, initialMessage }) => {
  const [title, setTitle] = useState(initialTitle);
  const [message, setMessage] = useState(initialMessage);
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateText = async () => {
    const apiKey = import.meta.env.VITE_AZURE_OPENAI_KEY;
    const openAiEndpoint = import.meta.env.VITE_OPENAI_ENDPOINT;
    const endpoint =
      `${openAiEndpoint}/openai/deployments/gpt-35-turbo/chat/completions?api-version=2024-05-01-preview`;

    if (!theme) {
      alert("Please specify a theme for AI to generate a message!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        endpoint,
        {
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant who generates personalized short messages based on themes.",
            },
            {
              role: "user",
              content: `Generate a message based on the theme: ${theme}`,
            },
          ],
          max_tokens: 100,
          temperature: 0.7,
          top_p: 0.95,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey, 
          },
        }
      );

      const generatedText = response.data.choices[0].message.content.trim(); 
      setMessage(generatedText);
    } catch (error) {
      console.error("Error generating text:", error);
      alert("There was an error with the AI generation.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    onSave(title, message);
  };

  return (
    <div className="z-20 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-sky-700 p-6 rounded-lg h-full shadow-lg">
        <h2 className="text-md absolute top-0 z-10 left-0 bg-blue-950 text-white w-full py-3 mx-0 font-semibold mb-4 text-center">
          Edit Text
        </h2>

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title...."
          className="w-full mt-10 mb-2 p-2 border rounded"
        />

        {/* AI Theme Input */}
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter theme for AI message (e.g., Diwali)..."
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Message Input */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
          className="w-full mb-4 p-2 border rounded"
          rows="4"
        />

        {/* Save Button */}
        <button
          className="absolute left-0 bottom-1 mt-4 w-full p-2 bg-blue-950 text-white rounded-md font-medium"
          onClick={handleSave}
        >
          Save
        </button>

        {/* AI Generate Button */}
        <button
          className={`absolute left-0 bottom-16 w-full p-2 bg-green-600 text-white rounded-md font-medium flex justify-center items-center gap-2
    ${
      loading
        ? "cursor-not-allowed opacity-70"
        : "hover:bg-green-500 transition-all duration-200 ease-in-out"
    }`}
          onClick={handleGenerateText}
          disabled={loading}
        >
          {loading ? (
            <motion.span
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <AiOutlineLoading3Quarters className="animate-spin text-xl" />{" "}
              
            </motion.span>
          ) : (
            <>
              <RiOpenaiFill className="text-xl" />{" "}
              Generate with AI
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TextEditModal;
