"use client";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha"; // pastikan sudah install
import { FaCheckCircle } from "react-icons/fa";

const gwmModels = ["H6", "JOLION", "TANK 500"];
const dealerLocations = ["Jakarta", "Bandung", "Surabaya"];

export default function TestDriveForm({ locale }) {
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    model: "",
    date: "",
    location: "",
    agree: false,
  });

  const [captchaToken, setCaptchaToken] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree || !captchaToken) return;
    // submit form logic here
    setSubmitted(true);
  };

  return (
    <section
      className="bg-white py-12 px-6 lg:px-12 max-w-3xl mx-auto text-dark"
      id="testdrive-form"
    >
      <h2 className="text-3xl lg:text-[40px] font-bold mb-3 text-center">
        {locale == "en" ? "Book a Test Drive" : "Daftar Test Drive"}
      </h2>
      <p className="text-base text-center font-regular text-dark/80 mb-6">
        {locale == "en"
          ? "Start your new journey with GWM. Please fill out the form below to book a test drive schedule."
          : "Mulai perjalanan baru anda bersama GWM. Silahkan isi form dibawah ini untuk menjadwalkan test drive GWM impian anda. "}
      </p>
      {submitted ? (
        <div className="flex items-center gap-2 text-primary font-semibold">
          <FaCheckCircle className="text-2xl" />
          Terima kasih! Kami akan segera menghubungi Anda.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block font-medium mb-1">WhatsApp Number</label>
            <input
              name="whatsapp"
              type="tel"
              required
              placeholder="08..."
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* GWM Model */}
          <div>
            <label className="block font-medium mb-1">GWM Model</label>
            <select
              name="model"
              required
              value={formData.model}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Select a model</option>
              {gwmModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium mb-1">Preferred Date</label>
            <input
              name="date"
              type="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Dealer Location */}
          <div>
            <label className="block font-medium mb-1">Dealer Location</label>
            <select
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Select a location</option>
              {dealerLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Agreement */}
          <div className="flex items-start gap-2">
            <input
              name="agree"
              type="checkbox"
              checked={formData.agree}
              onChange={handleChange}
              required
              className="mt-1"
              id="agree"
            />
            <label htmlFor="agree" className="text-sm text-gray-700">
              I agree to the use of my personal data by your company and/or
              provision of my personal data to your affiliates, subsidiaries,
              and/or associated companies in direct marketing. I agree to
              receive news and information from PT. Inchcape Indomobil Energi
              Baru Distribusi by WhatsApp, Phone call, and/or Email.
            </label>
          </div>

          {/* reCAPTCHA */}
          <div>
            <ReCAPTCHA
              sitekey="YOUR_RECAPTCHA_SITE_KEY"
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-primary text-white font-bold px-6 py-3 text-lg cursor-pointer rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
              disabled={!formData.agree || !captchaToken}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
