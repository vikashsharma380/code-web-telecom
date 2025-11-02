import React, { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const DistributorRegistration = () => {
  const [formData, setFormData] = useState({
    distributorName: "",
    email: "",
    mobileNo: "",
    alternateNumber: "",
    contactPerson: "",
    postalAddress: "",
    state: "",
    cityDistrict: "",
    pinCode: "",
    scheme: "",
    openingBalance: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({
      distributorName: "",
      email: "",
      mobileNo: "",
      alternateNumber: "",
      contactPerson: "",
      postalAddress: "",
      state: "",
      cityDistrict: "",
      pinCode: "",
      scheme: "",
      openingBalance: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.distributorName,
        email: formData.email,
        mobile: formData.mobileNo,
        state: formData.state,
        address: formData.cityDistrict,
        alternateNumber: formData.alternateNumber,
        postalAddress: formData.postalAddress,
        pinCode: formData.pinCode,
        contactPerson: formData.contactPerson,
        scheme: formData.scheme,
        openingBalance: formData.openingBalance,
      };

      const res = await axios.post(`${API_URL}/api/distributor/register`, payload);

      if (res.data.success) {
        alert(`✅ Distributor Registered Successfully!\nUSER ID: ${res.data.userId}`);
        handleCancel();
      } else {
        alert(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server Error! Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Distributor Registration</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Distributor Name</label>
          <input
            type="text"
            name="distributorName"
            value={formData.distributorName}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter distributor name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mobile Number</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter mobile number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Alternate Number</label>
          <input
            type="text"
            name="alternateNumber"
            value={formData.alternateNumber}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter alternate number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Person</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter contact person"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Postal Address</label>
          <input
            type="text"
            name="postalAddress"
            value={formData.postalAddress}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter postal address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter state"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">City/District</label>
          <input
            type="text"
            name="cityDistrict"
            value={formData.cityDistrict}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter city or district"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pin Code</label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter pin code"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Scheme</label>
          <input
            type="text"
            name="scheme"
            value={formData.scheme}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter scheme"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Opening Balance</label>
          <input
            type="number"
            name="openingBalance"
            value={formData.openingBalance}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter opening balance"
          />
        </div>
      </form>

      <div className="flex justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DistributorRegistration;
