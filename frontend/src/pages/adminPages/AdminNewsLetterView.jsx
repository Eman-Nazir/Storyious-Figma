
import { useEffect, useState } from "react";
import axios from "axios";

const AdminNewsletterView = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/newsletter");
        setSubscribers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-pink-600">Subscribers</h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pink-200 text-pink-900">
              <th className="p-3 border-b border-pink-300 text-left font-semibold">
                Email
              </th>
              <th className="p-3 border-b border-pink-300 text-left font-semibold">
                Subscribed On
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub, index) => (
              <tr
                key={sub._id}
                className={`${
                  index % 2 === 0 ? "bg-pink-50" : "bg-white"
                } hover:bg-pink-100 transition`}
              >
                <td className="p-3 border-b border-pink-200">{sub.email}</td>
                <td className="p-3 border-b border-pink-200">
                  {new Date(sub.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td
                  colSpan="2"
                  className="p-4 text-center text-gray-500 italic"
                >
                  No subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminNewsletterView;
