import { useState, useRef } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { ToastContext } from "../../context/toastContext";

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timeRef = useRef(null);

  function show(message, type = "success") {
    clearTimeout(timeRef.current);
    setToast({ message, type });
    timeRef.current = setTimeout(() => setToast(null), 2500);
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 px-4 py-3 rounded-lg shadow-cardHover text-sm font-medium text-white ${toast.type === "success" ? "bg-success" : "bg-danger"}`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={16} />
          ) : (
            <XCircle size={16} />
          )}
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
