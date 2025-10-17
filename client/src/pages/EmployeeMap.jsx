import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const getInitial = (name = "") => name[0]?.toUpperCase() || "?";

const EmployeeMap = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Fetch employee data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getdata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: "test", password: "123456" }),
        });
        const resData = await response.json();
        const tableData = resData.TABLE_DATA?.data || [];

        const employees = tableData.map((item, index) => ({
          id: index,
          name: item[0],
          position: item[1],
          city: item[2],
          empId: item[3],
          joiningDate: item[4],
          salary: item[5],
        }));

        const employeesWithCoords = await Promise.all(
          employees.map(async (emp) => {
            const coords = await getCoordinates(emp.city);
            return { ...emp, coords };
          })
        );

        setEmployeeData(employeesWithCoords.filter((emp) => emp.coords));
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Geocode city names
  const getCoordinates = async (city) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          city
        )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      if (data.results.length === 0) return null;
      return data.results[0].geometry.location;
    } catch (err) {
      console.error("Geocoding failed for city:", city, err);
      return null;
    }
  };

  const defaultCenter = { lat: 37.0902, lng: -95.7129 };

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  // Place markers after employee data is ready
  useEffect(() => {
    if (!mapRef.current || employeeData.length === 0) return;

    const bounds = new window.google.maps.LatLngBounds();

    employeeData.forEach((emp) => {
      const marker = new window.google.maps.Marker({
        position: emp.coords,
        map: mapRef.current,
        title: emp.name,
        label: {
          text: `📍${getInitial(emp.name)}`,
          fontSize: "20px",
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="font-size:14px; line-height:1.5;">
            <strong>${emp.name}</strong><br/>
            📍 ${emp.city}<br/>
            💼 ${emp.position}<br/>
            💰 ${emp.salary}
          </div>
        `,
      });

      marker.addListener("click", () =>
        infoWindow.open(mapRef.current, marker)
      );

      bounds.extend(emp.coords);
    });

    if (!bounds.isEmpty()) {
      mapRef.current.fitBounds(bounds);
    }
  }, [employeeData]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-gray-500 text-lg">Loading employee map...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="container mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
          🌍 Employee Locations Map
        </h1>

        <div className="relative h-[600px] w-full rounded-lg overflow-hidden">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={defaultCenter}
            zoom={4}
            onLoad={onMapLoad}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeMap;
