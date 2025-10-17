import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaIdBadge,
  FaCalendarAlt,
  FaCamera,
  FaArrowLeft,
} from "react-icons/fa";

const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const Details = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    navigate("/photo-result", { state: { image: imageSrc, employee: state } });
  };

  // Fallback if state is not passed correctly
  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <p className="text-red-500 text-lg">Employee data not found.</p>
        <button
          onClick={() => navigate("/list")}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          <FaArrowLeft />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="container max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Column: Employee Information */}
          <div className="p-8">
            <button
              onClick={() => navigate("/list")}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-6 transition"
            >
              <FaArrowLeft />
              Back to Directory
            </button>

            <div className="flex items-center gap-5 mb-6">
              <div className="flex-shrink-0 h-20 w-20 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold text-3xl">
                {getInitials(state.name)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  {state.name}
                </h1>
                <p className="text-slate-500 text-lg">{state.position}</p>
              </div>
            </div>

            <hr className="my-6 border-slate-200" />

            <h2 className="text-xl font-semibold text-slate-700 mb-4">
              Details
            </h2>
            <div className="space-y-4 text-slate-600">
              <div className="flex items-center">
                <FaIdBadge className="w-5 h-5 mr-4 text-slate-400" />
                <span>Employee ID: {state.empId}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="w-5 h-5 mr-4 text-slate-400" />
                <span>City: {state.city}</span>
              </div>
              <div className="flex items-center">
                <FaDollarSign className="w-5 h-5 mr-4 text-slate-400" />
                <span>Salary: {state.salary}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="w-5 h-5 mr-4 text-slate-400" />
                <span>Joining Date: {state.joiningDate}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Webcam Capture */}
          <div className="bg-slate-50 p-8 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">
              Update Profile Photo
            </h2>
            <div className="w-full max-w-xs rounded-xl overflow-hidden shadow-lg border-4 border-white">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={320}
                height={240}
                videoConstraints={{ facingMode: "user" }}
              />
            </div>
            <button
              onClick={capturePhoto}
              className="mt-6 flex items-center justify-center gap-3 w-full max-w-xs px-4 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
              <FaCamera />
              Capture Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
