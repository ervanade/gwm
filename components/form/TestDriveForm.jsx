"use client";

import { useState, useEffect, useRef } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Swal from "sweetalert2"; // Pastikan sudah diinstal
import axios from "axios"; // Pastikan sudah diinstal
import { FaCheckCircle } from "react-icons/fa";

// Data dummy (fallback) jika API gagal
const dummyModels = ["TANK 500", "HAVAL H6", "ORA O3 BEV"];
const dummyDealers = ["Jakarta", "Bandung", "Surabaya"];

export default function TestDriveForm({ locale }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    model: "",
    preferred_date: "",
    dealer: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [gwmModels, setGwmModels] = useState([]);
  const [dealerLocations, setDealerLocations] = useState([]);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/products`
        );
        const products = response.data.data;
        if (products.length > 0) {
          setGwmModels(products);
        } else {
          setGwmModels(
            dummyModels.map((name) => ({
              name,
              slug: name.toLowerCase().replace(" ", "-"),
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching models:", error);
        setGwmModels(
          dummyModels.map((name) => ({
            name,
            slug: name.toLowerCase().replace(" ", "-"),
          }))
        );
      }
    };

    const fetchDealers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/dealer`
        );
        const dealers = response.data.data;
        if (dealers.length > 0) {
          setDealerLocations(dealers);
        } else {
          setDealerLocations(dummyDealers.map((name) => ({ name })));
        }
      } catch (error) {
        console.error("Error fetching dealers:", error);
        setDealerLocations(dummyDealers.map((name) => ({ name })));
      }
    };

    fetchModels();
    fetchDealers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const preferredDate = new Date(formData.preferred_date);
    const phoneRegex = /^[0-9]{10,13}$/;

    if (!formData.fullName.trim()) {
      Swal.fire("Error", "Nama lengkap tidak boleh kosong.", "error");
      return false;
    }
    if (!formData.email.trim()) {
      Swal.fire("Error", "Email tidak boleh kosong.", "error");
      return false;
    }
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      Swal.fire(
        "Error",
        "Nomor WhatsApp tidak valid. Masukkan 10-13 digit angka.",
        "error"
      );
      return false;
    }
    if (!formData.model) {
      Swal.fire("Error", "Pilih model GWM yang Anda inginkan.", "error");
      return false;
    }
    if (!formData.dealer) {
      Swal.fire("Error", "Pilih lokasi dealer.", "error");
      return false;
    }
    if (!formData.preferred_date) {
      Swal.fire(
        "Error",
        "Pilih tanggal test drive yang Anda inginkan.",
        "error"
      );
      return false;
    }
    if (preferredDate < today) {
      Swal.fire(
        "Error",
        "Tanggal test drive tidak boleh di masa lalu.",
        "error"
      );
      return false;
    }
    if (!formData.agree) {
      Swal.fire("Error", "Anda harus menyetujui syarat & ketentuan.", "error");
      return false;
    }
    // if (!captchaToken) {
    //   Swal.fire("Error", "Lengkapi reCAPTCHA untuk melanjutkan.", "error");
    //   return false;
    // }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      Swal.fire("Error", "reCAPTCHA belum siap", "error");
      return;
    }

    if (!validateForm()) return;
    const token = await executeRecaptcha("test_drive_form");
    if (!token) {
      Swal.fire("Error", "Token reCAPTCHA tidak tersedia", "error");
      return;
    }
    setLoading(true);
    Swal.fire({
      title: "Mengirim Permintaan...",
      text: "Mohon tunggu sebentar...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const payload = {
        fullname: formData.fullName,
        email: formData.email,
        phone: `+62${formData.phone}`,
        model: formData.model,
        dealer_Location: formData.dealer,
        preferred_date: formData.preferred_date,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/testdrive`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_KEY}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          html: "Terima kasih, permintaan test drive Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.",
        });

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          model: "",
          preferred_date: "",
          dealer: "",
          agree: false,
        });
        setCaptchaToken(null);
      } else {
        throw new Error(response.data?.message || "Gagal mengirim permintaan.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "Gagal mengirim permintaan. Silakan coba lagi.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-white py-12 px-6 lg:px-12 max-w-3xl mx-auto text-dark"
      id="testdrive-form"
    >
      <h2 className="text-3xl lg:text-[40px] font-bold mb-3 text-center">
        {locale === "en" ? "Book a Test Drive" : "Daftar Test Drive"}
      </h2>
      <p className="text-base text-center font-regular text-dark/80 mb-6">
        {locale === "en"
          ? "Start your new journey with GWM. Please fill out the form below to book a test drive schedule."
          : "Mulai perjalanan baru anda bersama GWM. Silahkan isi form dibawah ini untuk menjadwalkan test drive GWM impian anda. "}
      </p>
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
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-400 rounded-l-lg py-2">
              +62
            </span>
            <input
              name="phone"
              type="tel"
              required
              placeholder="8XXXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg rounded-l-none px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
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
            <option value="" disabled>
              Select a model
            </option>
            {gwmModels.map((model) => (
              <option key={model.slug} value={model.slug}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dealer Location */}
        <div>
          <label className="block font-medium mb-1">Dealer Location</label>
          <select
            name="dealer"
            required
            value={formData.dealer}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="" disabled>
              Select a location
            </option>
            {dealerLocations.map((loc) => (
              <option key={loc.name} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium mb-1">Preferred Date</label>
          <input
            name="preferred_date"
            type="date"
            required
            value={formData.preferred_date}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            min={new Date().toISOString().split("T")[0]}
          />
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
            and/or associated companies in direct marketing. I agree to receive
            news and information from PT. Inchcape GWM Retail Indonesia by
            WhatsApp, Phone call, and/or Email.
          </label>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-primary text-white font-bold px-6 py-3 text-lg cursor-pointer rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
            disabled={!formData.agree || loading}
          >
            {loading ? "Mengirim..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
