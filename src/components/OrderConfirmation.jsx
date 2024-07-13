import PropTypes from 'prop-types';

const OrderConfirmation = ({ orderDetails }) => {
  const { cart, shippingInfo, paymentInfo } = orderDetails;

  return (
    <div className="p-4 border rounded-md shadow-md bg-white mt-4">
      <h2 className="text-lg font-semibold mb-4">Order Confirmation</h2>
      <div>
        <h3 className="font-semibold">Shipping Information:</h3>
        <p>{shippingInfo.fullName}</p>
        <p>{shippingInfo.address}</p>
        <p>{shippingInfo.city}</p>
        <p>{shippingInfo.postalCode}</p>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Payment Information:</h3>
        <p>Card Number: **** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
        <p>Expiry Date: {paymentInfo.expiryDate}</p>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Order Summary:</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between mb-2">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold mt-4">
          <span>Total</span>
          <span>${cart.reduce((acc, item) => acc + item.price, 0)}</span>
        </div>
      </div>
    </div>
  );
};

OrderConfirmation.propTypes = {
  orderDetails: PropTypes.shape({
    cart: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
    shippingInfo: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      postalCode: PropTypes.string.isRequired,
    }).isRequired,
    paymentInfo: PropTypes.shape({
      cardNumber: PropTypes.string.isRequired,
      expiryDate: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default OrderConfirmation;
