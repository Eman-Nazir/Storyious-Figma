import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminViewAd = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage, setAdsPerPage] = useState(3);
  const navigate = useNavigate();

  const fetchAds = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/stories/ads");
      setAds(res.data.data || []);
    } catch (err) {
      console.error("Error fetching ads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/stories/ads/${id}`);
      setAds((prev) => prev.filter((ad) => ad._id !== id));
    } catch (err) {
      console.error("Error deleting ad:", err);
    }
  };

  const totalPages = Math.ceil(ads.length / adsPerPage);
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);

  const handleIncrement = () => {
    setAdsPerPage((prev) => (prev < 10 ? prev + 1 : prev));
    setCurrentPage(1);
  };

  const handleDecrement = () => {
    setAdsPerPage((prev) => (prev > 1 ? prev - 1 : prev));
    setCurrentPage(1);
  };

  return (
    <div className="p-6 flex flex-col min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-pink-600">All Ads</h2>

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700 font-medium">Total Ads: {ads.length}</p>

        <div className="flex items-center space-x-2">
          <span className="text-gray-700 text-sm"> Ads per page:</span>
          
          <input
            type="number"
            min="1"
            max="10"
            value={adsPerPage}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 1 && val <= 10) {
                setAdsPerPage(val);
                setCurrentPage(1);
              }
            }}
            className="border border-pink-400 rounded w-16 text-center py-1"
          />
          
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : currentAds.length === 0 ? (
        <p className="text-center text-gray-500">No ads available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          {currentAds.map((ad) => (
            <div
              key={ad._id}
              className="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
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

              <div className="p-4 flex flex-col flex-grow">
                {ad.title && (
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {ad.title}
                  </h2>
                )}
                {ad.description && (
                  <p className="text-gray-600 text-sm flex-grow">
                    {ad.description}
                  </p>
                )}
                {ad.buttonText && (
                  <button className="mt-2 bg-pink-600 text-white px-4 py-2 text-sm rounded hover:bg-pink-700">
                    {ad.buttonText}
                  </button>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() =>
                      navigate("/admin/ad/create", { state: ad })
                    }
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

      <div className="flex justify-center items-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-pink-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminViewAd;
