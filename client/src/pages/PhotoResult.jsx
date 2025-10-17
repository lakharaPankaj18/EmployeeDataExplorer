import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PhotoResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const isPhotoCaptured = state?.image;

  const handleRetake = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Card for the photo result */}
      <div className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-2xl shadow-2xl transition-all duration-300 transform hover:shadow-3xl border border-gray-100">
        {/* Header Section */}
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
            Photo Result
          </h2>
          <p className="mt-2 text-gray-500 text-lg">
            {isPhotoCaptured
              ? "Your captured image is displayed below."
              : "Something went wrong. Please try again."}
          </p>
        </header>

        {/* Content Section (Photo or Placeholder) */}
        <div className="flex justify-center">
          {isPhotoCaptured ? (
            // Photo Display
            <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-xl ring-4 ring-indigo-50 ring-offset-2 transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={state.image}
                alt="Captured Result"
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            // No Photo Placeholder
            <div className="flex flex-col items-center justify-center p-12 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-full max-w-sm h-64 text-center">
              <p className="text-xl font-medium text-gray-500">
                Oops! No photo available.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Click the button below to retry the capture.
              </p>
            </div>
          )}
        </div>

        {/* Footer/Action Section */}
        <footer className="mt-10 text-center">
          <button
            onClick={handleRetake} // Calls function to go back to the camera page
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition duration-150 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            {/* Conditional button text for clarity */}
            {isPhotoCaptured ? "Retake Photo" : "Try Capture Again"}
          </button>

          {isPhotoCaptured && (
            <p className="mt-4 text-sm text-gray-400">
              Image captured successfully.
            </p>
          )}
        </footer>
      </div>
    </div>
  );
};

export default PhotoResult;
