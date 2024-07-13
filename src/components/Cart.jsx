import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa"; 
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Container from "./Container";
import ProgressIndicator from "./ProgressIndicator";
import { decProduct, incProduct, removeProductFromCart } from "../features/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.current_price[0]?.NGN[0]) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    return total + price * quantity;
  }, 0);
  
  const handleNextStep = () => {
    if (step === 2 && !validateShippingInfo()) return;
    if (step === 3 && !paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: "Please select a payment method." }));
      return;
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    alert("Your order has been received. Thank you for shopping with us!");
    navigate("/");
  };

  const validateShippingInfo = () => {
    const newErrors = {};
    if (!shippingInfo.firstName) newErrors.firstName = "First Name is required.";
    if (!shippingInfo.lastName) newErrors.lastName = "Last Name is required.";
    if (!shippingInfo.email) newErrors.email = "Email is required.";
    if (!shippingInfo.address) newErrors.address = "Address is required.";
    if (!shippingInfo.city) newErrors.city = "City is required.";
    if (!shippingInfo.state) newErrors.state = "State is required.";
    if (!shippingInfo.postalCode) newErrors.postalCode = "Postal code is required.";
    if (!shippingInfo.phoneNumber) newErrors.phoneNumber = "Phone number is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const getInputClass = (field) => {
    return errors[field] ? "border-red-500" : "border-green-500";
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const states = ["Kebbi", "Sokoto", "Kaduna", "Jos", "Kano"];

  return (
    <Container>
      <div className="cart p-5">
        <div className="flex items-center mb-5">
          <button onClick={() => navigate("/")} className="mr-2"> 
            <FaArrowLeft className="text-gray-600" />
          </button>
          <h3 className="text-xl font-semibold">Continue Shopping</h3>
        </div>

        <h1 className="font-bold text-center text-3xl mb-5">Account Creation</h1>
        <h3 className="text-lg text-center mb-4">Fill your shipping details</h3>
        <ProgressIndicator currentStep={step} />

        <div className="progress-bar flex flex-col items-center bg-customPink mb-5 w-full">
          <h1 className="font-bold text-2xl">Checkout</h1>
        </div>

        {step === 1 && (
          <>
            <h3 className="font-bold text-2xl mb-5">Shopping Cart</h3>
            <h4 className="font-bold text-1xl mb-5">You have {totalItems} items in your Cart</h4>
            <div className="cart-items space-y-5 mb-10">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div className="cart-item border border-gray-300 rounded-lg p-5 flex flex-col sm:flex-row items-center gap-5" key={item.id}>
                    <div className="w-10 h-10">
                      <img
                        src={`https://api.timbu.cloud/images/${item.photos?.[0]?.url || "placeholder.jpg"}`}
                        alt={item.title}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-5 items-center flex-grow">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <div className="flex items-center gap-2">
                          <h5 className="font-black"><span>&#8358;</span>{item.current_price[0]?.NGN[0]}</h5>
                          <span>({item.quantity})</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center ml-auto">
                      <button className="font-bold w-5 h-5 bg-pink-400 text-white flex items-center justify-center cursor-pointer hover:bg-red-950" onClick={() => dispatch(incProduct(item.id))}>
                        <FaPlus />
                      </button>
                      <button className="font-bold w-5 h-5 bg-pink-400 text-white flex items-center justify-center cursor-pointer hover:bg-red-950" onClick={() => dispatch(decProduct(item.id))}>
                        <FaMinus />
                      </button>
                      <button className="font-bold w-5 h-5 bg-pink-400 text-white flex items-center justify-center cursor-pointer hover:bg-red-950" onClick={() => dispatch(removeProductFromCart(item.id))}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-center">No Items In Cart</h2>
              )}
            </div>
            <button className="mt-5 bg-pink-400 text-3xl p-5 rounded-lg hover:bg-green-400 text-black w-full text-center" onClick={handleNextStep}>
              CHECKOUT (<span>&#8358;</span>{totalPrice.toFixed(2)})
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="font-bold text-center text-3xl mb-5">Shipping Information</h1>
            <div className="shipping-form space-y-5 mb-10">
              <div className="flex gap-5">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block">First Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter your first name"
                      value={shippingInfo.firstName}
                      onChange={handleInputChange}
                      className={`border p-2 w-full rounded-lg ${getInputClass('firstName')}`}
                    />
                    {shippingInfo.firstName && !errors.firstName && (
                      <span className="absolute right-2 top-2"><FaCheckCircle className="text-green-500" /></span>
                    )}
                  </div>
                  {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
                </div>
                <div className="flex-1">
                  <label htmlFor="lastName" className="block">Last Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter your last name"
                      value={shippingInfo.lastName}
                      onChange={handleInputChange}
                      className={`border p-2 w-full rounded-lg ${getInputClass('lastName')}`}
                    />
                    {shippingInfo.lastName && !errors.lastName && (
                      <span className="absolute right-2 top-2"><FaCheckCircle className="text-green-500" /></span>
                    )}
                  </div>
                  {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-1">
                  <label htmlFor="email" className="block">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      className={`border p-2 w-full rounded-lg ${getInputClass('email')}`}
                    />
                    {shippingInfo.email && !errors.email && (
                      <span className="absolute right-2 top-2"><FaCheckCircle className="text-green-500" /></span>
                    )}
                  </div>
                  {errors.email && <span className="text-red-500">{errors.email}</span>}
                </div>
                <div className="flex-1">
                  <label htmlFor="address" className="block">Address</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Enter your address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      className={`border p-2 w-full rounded-lg ${getInputClass('address')}`}
                    />
                    {shippingInfo.address && !errors.address && (
                      <span className="absolute right-2 top-2"><FaCheckCircle className="text-green-500" /></span>
                    )}
                  </div>
                  {errors.address && <span className="text-red-500">{errors.address}</span>}
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-1">
                  <label htmlFor="city" className="block">City</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Enter your city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className={`border p-2 w-full rounded-lg ${getInputClass('city')}`}
                    />
                    {shippingInfo.city && !errors.city && (
                      <span className="absolute right-2 top-2"><FaCheckCircle className="text-green-500" /></span>
                    )}
                  </div>
                  {errors.city && <span className="text-red-500">{errors.city}</span>}
                </div>
                <div className="flex-1">
                  <label htmlFor="state" className="block">State</label>
                  <select
                    name="state"
                    id="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    className={`border p-2 w-full rounded-lg ${getInputClass('state')}`}
                  >
                    <option value="">Select your state</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && <span className="text-red-500">{errors.state}</span>}
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-1">
                  <label htmlFor="postalCode" className="block">Postal Code</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      placeholder="Enter your postal code"
                      value={shippingInfo.postalCode}
                      onChange={handleInputChange}
                      className={`border p-2 w-full rounded-lg ${getInputClass('postalCode')}`}
                    />
                    {shippingInfo.postalCode && !errors.postalCode && (
                      <span className="absolute right-2 top-2"><FaCheckCircle className="text-green-500" /></span>
                    )}
                  </div>
                  {errors.postalCode && <span className="text-red-500">{errors.postalCode}</span>}
                </div>
                <div className="flex-1">
                  <label htmlFor="phoneNumber" className="block">Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Enter your phone number"
                      value={shippingInfo.phoneNumber}
                      onChange={handleInputChange}
                      className={`border p-2 w-full rounded-lg ${getInputClass('phoneNumber')}`}
                    />
                    {shippingInfo.phoneNumber && !errors.phoneNumber && (
                      <span className="absolute right-2 top-2"><FaCheckCircle className="text-green-500" /></span>
                    )}
                  </div>
                  {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="bg-gray-400 text-white px-5 py-2 rounded" onClick={handlePreviousStep}>Back</button>
              <button className="bg-pink-400 text-white px-5 py-2 rounded" onClick={handleNextStep}>Next</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="font-bold text-center text-3xl mb-5">Payment Information</h1>
            <div className="payment-methods mb-5">
              <h3 className="font-semibold">Select Payment Method:</h3>
              <div className="flex gap-5">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="creditCard"
                    checked={paymentMethod === "creditCard"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setErrors((prev) => ({ ...prev, paymentMethod: "" }));
                    }}
                  />
                  <span className="ml-2">Credit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setErrors((prev) => ({ ...prev, paymentMethod: "" }));
                    }}
                  />
                  <span className="ml-2">PayPal</span>
                </label>
              </div>
              {errors.paymentMethod && <span className="text-red-500">{errors.paymentMethod}</span>}
            </div>
            <div className="payment-form space-y-5 mb-10">
              <div className="flex gap-5">
                <div className="flex-1">
                  <label htmlFor="cardholderName" className="block">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardholderName"
                    id="cardholderName"
                    placeholder="Enter your cardholder name"
                    value={shippingInfo.cardholderName}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="cardNumber" className="block">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    placeholder="Enter your card number"
                    value={shippingInfo.cardNumber}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-lg"
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-1">
                  <label htmlFor="expirationDate" className="block">Expiration Date</label>
                  <input
                    type="text"
                    name="expirationDate"
                    id="expirationDate"
                    placeholder="MM/YY"
                    value={shippingInfo.expirationDate}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="cvv" className="block">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    id="cvv"
                    placeholder="Enter CVV"
                    value={shippingInfo.cvv}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="bg-gray-400 text-white px-5 py-2 rounded" onClick={handlePreviousStep}>Back</button>
              <button className="bg-pink-400 text-white px-5 py-2 rounded" onClick={handleSubmit}>Submit Order</button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default Checkout;
