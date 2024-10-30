
const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-4 text-lg">Page Not Found</p>
        <a href="/" className="mt-6 inline-block text-blue-500 hover:underline">
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default NotFound;
