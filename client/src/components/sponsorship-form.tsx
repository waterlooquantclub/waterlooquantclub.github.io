import { useState } from "react";
import { Button } from "../components/button";

function SponsorshipForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage({ type: null, text: "" });

    try {
      const response = await fetch(`${API_URL}/sponsor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit sponsorship form");
      }

      // reset form
      setFormData({
        first_name: "",
        last_name: "",
        company: "",
        email: "",
      });

      setStatusMessage({
        type: "success",
        text: "✅ Thanks for sponsoring us! 🎉",
      });
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: "error",
        text: "❌ Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 sm:gap-7 w-full max-w-lg"
    >
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-7">
        <div className="flex flex-col w-full">
          <label
            htmlFor="first_name"
            className="text-sm text-white/80 mb-1 ml-3"
          >
            First Name
          </label>
          <input
            id="first_name"
            name="first_name"
            placeholder="Enter your first name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            className="border border-white/80 bg-white/20 rounded-full py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#B670D6]"
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label
            htmlFor="last_name"
            className="text-sm text-white/80 mb-1 ml-3"
          >
            Last Name
          </label>
          <input
            id="last_name"
            name="last_name"
            placeholder="Enter your last name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            className="border border-white/80 bg-white/20 rounded-full py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#B670D6]"
            required
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-7">
        <div className="flex flex-col w-full">
          <label
            htmlFor="company"
            className="text-sm text-white/80 mb-1 ml-3"
          >
            Company
          </label>
          <input
            id="company"
            name="company"
            placeholder="Enter your company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className="border border-white/80 bg-white/20 rounded-full py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#B670D6]"
          />
        </div>

        <div className="flex flex-col w-full">
          <label
            htmlFor="email"
            className="text-sm text-white/80 mb-1 ml-3"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-white/80 bg-white/20 rounded-full py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#B670D6]"
            required
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <Button
            type="submit"
            disabled={isLoading}
            className="rounded-full px-16 py-3 border border-white/80 bg-transparent text-white hover:bg-white hover:text-black transition"
        >
            {isLoading ? "Submitting..." : "Submit"}
        </Button>

        {statusMessage.type && (
            <p
            className={`mt-3 text-sm ${
                statusMessage.type === "success"
                ? "text-green-400"
                : "text-red-400"
            }`}
            >
            {statusMessage.text}
            </p>
        )}
        </div>

    </form>
  );
}

export default SponsorshipForm;
