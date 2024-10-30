// TemplateCard.jsx
const TemplateCard = ({ template, onEdit, onShare }) => {
  return (
    <div className={`border h-48 rounded shadow-lg p-4 m-2 bg-${template.color}-200`}>
      <h3 className="text-lg font-bold mt-2">{template.title}</h3>
      <p className="text-center mt-2">{template.message}</p>
      <button onClick={() => onEdit(template)} className="bg-blue-500 text-white p-2 rounded mt-2">Edit</button>
      <button onClick={() => onShare(template)} className="bg-green-500 text-white p-2 rounded mt-2">Share</button>
    </div>
  );
};

export default TemplateCard;
