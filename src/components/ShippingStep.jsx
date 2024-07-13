import { useState } from "react";
import PropTypes from "prop-types";

const ShippingStep = ({ onNext, onPrevious }) => {
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    state: '',
    city: '',
    postalCode: '',
    countryCode: '',
    phoneNo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h1 className="font-bold text-center text-3xl mb-5">Shipping Information</h1>
      <div className="shipping-form space-y-5 mb-10">
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" value={shippingInfo.firstName} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded" required />
        
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" value={shippingInfo.lastName} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded" required />
        
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={shippingInfo.email} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded" required />
        
        <label htmlFor="streetAddress">Street Address</label>
        <input type="text" name="streetAddress" id="streetAddress" value={shippingInfo.streetAddress} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded" required />
        
        <label htmlFor="state">State</label>
        <select name="state" id="state" value={shippingInfo.state} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded">
          <option value="">Select State</option>
          {/* Add state options here */}
        </select>
        
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" value={shippingInfo.city} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded" required />
        
        <label htmlFor="postalCode">Postal Code</label>
        <input type="text" name="postalCode" id="postalCode" value={shippingInfo.postalCode} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded" required />
        
        <label htmlFor="countryCode">Country Code</label>
        <select name="countryCode" id="countryCode" value={shippingInfo.countryCode} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded">
          <option value="">Select Country Code</option>
          {/* Add country code options here */}
        </select>
        
        <label htmlFor="phoneNo">Phone Number</label>
        <input type="tel" name="phoneNo" id="phoneNo" value={shippingInfo.phoneNo} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded" required />
      </div>
      <button onClick={onNext}>Proceed to Payment</button>
      <button onClick={onPrevious}>Back to Cart</button>
    </>
  );
};

ShippingStep.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default ShippingStep;
