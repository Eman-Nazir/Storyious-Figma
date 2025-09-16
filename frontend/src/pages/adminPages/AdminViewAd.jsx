import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminViewAd = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  const fetchAds = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/stories/ads");
      setAds(res.data.data);
    } catch (err) {
      console.error("Error fetching ads:", err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/stories/ads/${id}`);
      setAds((prev) => prev.filter((ad) => ad._id !== id));
    } catch (err) {
      console.error("Error deleting ad:", err);
    }
  };

  return (
    <div className="p-6">
      {ads.length === 0 ? (
        <p className="text-gray-500 text-center">No ads available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div
              key={ad._id}
              className="relative bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
                Ad
              </div>

              {ad.imageUrl && (
                <img
                  src={ad.imageUrl}
                  alt={ad.title || "Ad"}
                  className="w-full h-60 object-cover"
                />
              )}

              <div className="p-4 space-y-2">
                {ad.title && (
                  <h2 className="text-lg font-semibold text-gray-800">
                    {ad.title}
                  </h2>
                )}
                {ad.description && (
                  <p className="text-gray-600 text-sm">{ad.description}</p>
                )}
                {ad.buttonText && (
                  <button className="mt-2 bg-pink-600 text-white px-4 py-2 text-sm rounded hover:bg-pink-700">
                    {ad.buttonText}
                  </button>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => navigate("/admin/ad/create", { state: ad })}
                    className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminViewAd;
