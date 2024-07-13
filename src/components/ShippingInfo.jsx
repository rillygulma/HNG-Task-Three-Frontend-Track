import { useState } from 'react';
import PropTypes from 'prop-types';

const ShippingInfo = ({ shippingInfo, setShippingInfo }) => {
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = '';
    if (!value) {
      error = `${name} is required.`;
    } else if (name === 'postalCode' && !/^\d+$/.test(value)) {
      error = 'Postal Code must be numeric.';
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validate(name, value);
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white mt-4">
      <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={shippingInfo.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.fullName && <span className="text-red-500">{errors.fullName}</span>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.address && <span className="text-red-500">{errors.address}</span>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">City</label>
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.city && <span className="text-red-500">{errors.city}</span>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.postalCode && <span className="text-red-500">{errors.postalCode}</span>}
        </div>
      </form>
    </div>
  );
};

ShippingInfo.propTypes = {
  shippingInfo: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
  }).isRequired,
  setShippingInfo: PropTypes.func.isRequired,
};

export default ShippingInfo;
