"use client"

import { useState } from 'react';

// Dummy data from database
const specifications = {
  osVersions: ['Android 10', 'Android 11', 'iOS 14'],
  ukuranLayar: [4.7, 5.8, 6.1, 6.5, 6.7, 6.9],
  screenResolutions: ['1334 x 750', '1792 x 828', '2340 x 1080', '2400 x 1080', '3088 x 1440'],
  detailProsesors: ['Snapdragon 865', 'Exynos 990', 'A13 Bionic', 'Snapdragon 730G', 'Snapdragon 765G'],
  ram: [3, 4, 6, 8, 12],
  memoriInternal: [64, 128, 256],
  resolusiKameraBelakang: [12, 48, 64, 108],
  resolusiKameraDepan: [7, 10, 12, 16, 20, 32],
  usb: ['USB Type-C', 'Lightning'],
  kapasitasBaterai: [1821, 2942, 3110, 3600, 4000, 4500, 5160, 7000],
};

export default function Home() {
  const [formValues, setFormValues] = useState({
    osVersion: '',
    ukuranLayar: '',
    screenResolution: '',
    detailProsesor: '',
    ram: '',
    memoriInternal: '',
    resolusiKameraBelakang: '',
    resolusiKameraDepan: '',
    usb: '',
    kapasitasBaterai: '',
    '5G': false,
    wifi6: false,
  });

  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.length === 0) {
        setRecommendations([]);
        setError('Maaf, spesifikasi yang Anda cari tidak tersedia.');
      } else {
        setRecommendations(data);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Sistem Pakar Pemilihan Smartphone</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <label className="flex flex-col">
          OS Version:
          <select name="osVersion" value={formValues.osVersion} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md">
            <option value="" disabled>Select OS Version</option>
            {specifications.osVersions.map((os) => (
              <option key={os} value={os}>{os}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          Ukuran Layar (inches):
          <select name="ukuranLayar" value={formValues.ukuranLayar} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md">
            <option value="" disabled>Select Ukuran Layar</option>
            {specifications.ukuranLayar.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          Screen Resolution:
          <select name="screenResolution" value={formValues.screenResolution} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md">
            <option value="" disabled>Select Screen Resolution</option>
            {specifications.screenResolutions.map((resolution) => (
              <option key={resolution} value={resolution}>{resolution}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          Detail Prosesor:
          <select name="detailProsesor" value={formValues.detailProsesor} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md">
            <option value="" disabled>Select Detail Prosesor</option>
            {specifications.detailProsesors.map((processor) => (
              <option key={processor} value={processor}>{processor}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          RAM (GB):
          <select name="ram" value={formValues.ram} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md">
            <option value="" disabled>Select RAM</option>
            {specifications.ram.map((ramSize) => (
              <option key={ramSize} value={ramSize}>{ramSize}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          Memori Internal (GB):
          <select name="memoriInternal" value={formValues.memoriInternal} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md">
            <option value="" disabled>Select Memori Internal</option>
            {specifications.memoriInternal.map((memory) => (
              <option key={memory} value={memory}>{memory}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          Resolusi Kamera Belakang (MP):
          <select name="resolusiKameraBelakang" value={formValues.resolusiKameraBelakang} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md">
            <option value="" disabled>Select Resolusi Kamera Belakang</option>
            {specifications.resolusiKameraBelakang.map((resolution) => (
              <option key={resolution} value={resolution}>{resolution}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          Resolusi Kamera Depan (MP):
          <select name="resolusiKameraDepan" value={formValues.resolusiKameraDepan} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md">
            <option value="" disabled>Select Resolusi Kamera Depan</option>
            {specifications.resolusiKameraDepan.map((resolution) => (
              <option key={resolution} value={resolution}>{resolution}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          USB:
          <select name="usb" value={formValues.usb} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md">
            <option value="" disabled>Select USB Type</option>
            {specifications.usb.map((usbType) => (
              <option key={usbType} value={usbType}>{usbType}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          Kapasitas Baterai (mAh):
          <select name="kapasitasBaterai" value={formValues.kapasitasBaterai} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md">
            <option value="" disabled>Select Kapasitas Baterai</option>
            {specifications.kapasitasBaterai.map((battery) => (
              <option key={battery} value={battery}>{battery}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="5G"
            checked={formValues['5G']}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <span>5G</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="wifi6"
            checked={formValues.wifi6}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <span>Wi-Fi 6</span>
        </label>
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md">Dapatkan Rekomendasi</button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <h2 className="text-xl font-semibold mt-8 mb-4">Rekomendasi Smartphone</h2>
      <ul className="list-disc list-inside">
        {recommendations.length > 0 ? (
          recommendations.map((smartphone, index) => (
            <li key={index} className="mb-2">
              {smartphone.merek} {smartphone.model} - {smartphone.harga} IDR
            </li>
          ))
        ) : (
          <li className="mb-2">Tidak ada rekomendasi.</li>
        )}
      </ul>
    </div>
  );
}
