import { useState } from "react";
import QRCode from "qrcode";
import api from "../services/api";
import { toast } from "react-toastify";

const GenerateQR = ({ eventId, onClose }) => {
  const [qrImage, setQrImage] = useState("");
  const [duration, setDuration] = useState(10);

  const generateQR = async () => {
    try {
      const res = await api.post("/attendance/generate", {
        eventId,
        duration
      });

      const img = await QRCode.toDataURL(res.data.qrUrl);
      setQrImage(img);
      toast.success("QR generated successfully");
    } catch {
      toast.error("Failed to generate QR");
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <div className="flex items-center gap-2 mb-3">
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border px-3 py-1 rounded w-24"
        />
        <span className="text-sm text-gray-600">minutes</span>

        <button
          onClick={generateQR}
          className="ml-auto px-4 py-1 bg-blue-600 text-white rounded"
        >
          Generate QR
        </button>

        <button
          onClick={onClose}
          className="px-3 py-1 bg-gray-400 text-white rounded"
        >
          ✕
        </button>
      </div>

      {qrImage && (
        <div className="flex justify-center mt-4">
          <img src={qrImage} alt="QR Code" className="w-48 h-48" />
        </div>
      )}
    </div>
  );
};

export default GenerateQR;
