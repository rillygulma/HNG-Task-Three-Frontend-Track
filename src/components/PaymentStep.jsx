import { useState } from "react";
import PropTypes from "prop-types";

const PaymentStep = ({ onNext, onPrevious }) => {
  const [billingInfo, setBillingInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    // Handle payment logic here
    onNext();
  };

  return (
    <>
      <h1 className="font-bold text-center text-3xl mb-5">Payment Information</h1>
      <div className="payment-form space-y-5 mb-10">
        <label htmlFor="cardName">Card Name</label>
        <input type="text" name="cardName" id="cardName" value={billingInfo.cardName} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded" required />

        <label htmlFor="cardNumber">Card Number</label>
        <input type="text" name="cardNumber" id="cardNumber" value={billingInfo.cardNumber} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded" required />

        <label htmlFor="expiryDate">Expiry Date</label>
        <input type="text" name="expiryDate" id="expiryDate" value={billingInfo.expiryDate} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded" required />

        <label htmlFor="cvv">CVV</label>
        <input type="text" name="cvv" id="cvv" value={billingInfo.cvv} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded" required />

        <div className="flex items-center">
          <input type="checkbox" checked={termsAgreed} onChange={() => setTermsAgreed(!termsAgreed)} />
          <label className="ml-2">I agree to the terms and conditions</label>
        </div>
      </div>
      <button onClick={handlePayment} disabled={!termsAgreed}>Confirm Payment</button>
      <button onClick={onPrevious}>Back to Shipping</button>
    </>
  );
};

PaymentStep.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default PaymentStep;
