import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import MessageBanner from "../../components/MessageBanner";

function FileComplaint() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setBanner({ type: "error", message: "Please log in first." });
      return;
    }

    const formData = new FormData();
    formData.append("category", category);
    formData.append("description", description);
    formData.append("location", location);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/complaints",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBanner({ type: "success", message: "Complaint submitted successfully!" });
      setCategory("");
      setDescription("");
      setLocation("");
      setImage(null);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("❌ Error submitting complaint:", err);
      setBanner({ type: "error", message: "Failed to submit complaint. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* ✅ Global Message Banner */}
      <MessageBanner
        type={banner.type}
        message={banner.message}
        onClose={() => setBanner({ type: "", message: "" })}
      />

      <div className="min-h-screen flex items-center justify-center bg-[#FEF3E2] px-4 py-10">
        <div className="w-full max-w-2xl bg-white border border-[#FAB12F] rounded-2xl shadow-lg overflow-hidden">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#FA812F] py-6 border-b-2 border-[#FAB12F]">
            File a Complaint
          </h1>

          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 flex flex-col gap-6"
          >
            {/* Category */}
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/3 text-lg font-semibold text-[#FA812F] mb-2 md:mb-0">
                Category
              </label>
              <div className="md:w-2/3 relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full border border-[#FAB12F] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FAB12F] bg-[#FEF3E2]"
                >
                  <option value="">Select Category</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Noise">Noise</option>
                  <option value="Road Damage">Road Damage</option>
                  <option value="Water Leakage">Water Leakage</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col md:flex-row md:items-start">
              <label className="md:w-1/3 text-lg font-semibold text-[#FA812F] mb-2 md:mb-0 pt-1">
                Description
              </label>
              <div className="md:w-2/3">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows="4"
                  placeholder="Describe the issue..."
                  className="w-full border border-[#FAB12F] rounded-md px-4 py-2 bg-[#FEF3E2] focus:outline-none focus:ring-2 focus:ring-[#FAB12F] resize-none"
                />
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/3 text-lg font-semibold text-[#FA812F] mb-2 md:mb-0">
                Location
              </label>
              <div className="md:w-2/3">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  placeholder="Enter location"
                  className="w-full border border-[#FAB12F] rounded-md px-4 py-2 bg-[#FEF3E2] focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/3 text-lg font-semibold text-[#FA812F] mb-2 md:mb-0">
                Upload Image
              </label>
              <div className="md:w-2/3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full text-sm text-gray-700 bg-[#FEF3E2] border border-[#FAB12F] rounded-md px-3 py-2 cursor-pointer file:mr-3 file:bg-[#FA812F] file:text-white file:rounded-md file:px-3 file:py-1 hover:file:bg-[#FAB12F] transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-1/2 py-2 px-4 font-semibold rounded-md text-white transition duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#FA812F] hover:bg-[#FAB12F]"
                }`}
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default FileComplaint;
