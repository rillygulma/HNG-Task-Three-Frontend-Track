import PropTypes from 'prop-types';

const CartSummary = ({ cart }) => {
  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index} className="flex justify-between mb-2">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between font-bold mt-4">
        <span>Total</span>
        <span>${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</span>
      </div>
    </div>
  );
};

CartSummary.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CartSummary;
