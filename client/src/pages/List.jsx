import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaChartLine,
  FaSearch,
} from "react-icons/fa";

// A simple utility to get initials from a name
const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const List = () => {
  // State for the original, unfiltered data fetched from the API
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/getdata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "test", password: "123456" }),
    })
      .then((res) => res.json())
      .then((resData) => {
        const tableData = resData.TABLE_DATA?.data || [];
        const formatted = tableData.map((item, index) => ({
          id: index,
          name: item[0],
          position: item[1],
          city: item[2],
          empId: item[3],
          joiningDate: item[4],
          salary: item[5],
        }));
        setData(formatted);
      })
      .catch((err) => console.error("Failed to fetch data:", err))
      .finally(() => setLoading(false));
  }, []);

  // --- Search Functionality Logic ---
  const filteredData = useMemo(() => {
    // If the search term is empty, return the full dataset
    if (!searchTerm) {
      return data;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();

    // Filter the data array
    return data.filter((item) => {
      // Check for match in name, position, city, or ID.
      return (
        item.name.toLowerCase().includes(lowerCaseSearch) ||
        item.position.toLowerCase().includes(lowerCaseSearch) ||
        item.city.toLowerCase().includes(lowerCaseSearch) ||
        item.empId.toString().includes(lowerCaseSearch)
      );
    });
  }, [data, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Employee Directory
              </h1>
              <p className="text-slate-500 mt-1">
                Browse and manage your team members.
              </p>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() =>
                  navigate("/chart", { state: { employeeData: data } })
                }
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
              >
                <FaChartLine />
                <span>Salary Chart</span>
              </button>
              <button
                onClick={() =>
                  navigate("/map", { state: { employeeData: data } })
                }
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition"
              >
                <FaMapMarkerAlt />
                <span>Employee Map</span>
              </button>
            </div>
          </div>
        </header>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          </div>
        )}

        {/* Employee Cards Grid - Renders filteredData */}
        {!loading && filteredData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Map over the FILTERED data */}
            {filteredData.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/details/${item.id}`, { state: item })}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold text-xl">
                    {getInitials(item.name)}
                  </div>
                  {/* Name and Position */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 truncate group-hover:text-indigo-600">
                      {item.name}
                    </h3>
                    <p className="text-slate-500 text-sm truncate">
                      {item.position}
                    </p>
                  </div>
                </div>
                {/* Details Section */}
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center text-slate-600">
                    <FaMapMarkerAlt className="mr-3 text-slate-400" />
                    <span>{item.city}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <FaDollarSign className="mr-3 text-slate-400" />
                    <span>{item.salary}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results/No Data Message */}
        {!loading && filteredData.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-slate-600">
              {/* Conditional message for better UX */}
              {searchTerm
                ? `No results found for "${searchTerm}"`
                : "No Employees Found"}
            </h2>
            <p className="text-slate-400 mt-2">
              {searchTerm
                ? "Try a different search term."
                : "The employee directory is currently empty."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
