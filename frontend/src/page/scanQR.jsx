import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../services/api";
import { toast } from "react-toastify";

export default function ScanQR() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 }
    );

    scanner.render(
      async (decodedText) => {
        try {
          const token = new URL(decodedText).searchParams.get("token");

          await api.post("/attendance/mark", { token });
          toast.success("Attendance marked successfully");

          scanner.clear();
        } catch (err) {
          toast.error(err.response?.data?.message || "Scan failed");
        }
      },
      () => {}
    );

    return () => scanner.clear().catch(() => {});
  }, []);

  return <div id="qr-reader" style={{ width: "300px" }} />;
}
