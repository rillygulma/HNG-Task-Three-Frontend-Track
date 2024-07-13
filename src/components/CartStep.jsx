import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import { incProduct, decProduct, removeProductFromCart } from "../features/cartSlice";

const CartStep = ({ cartItems, totalPrice, onNext, onPrevious }) => {
  const dispatch = useDispatch();

  return (
    <>
      <h1 className="font-bold text-center text-3xl mb-5">Your Cart</h1>
      <div className="cart-items space-y-5 mb-10">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="cart-item border border-gray-300 rounded-lg p-5 flex flex-col sm:flex-row items-center gap-5" key={item.id}>
              <div className="w-10 h-10">
                <img src={item.image} alt={item.title} className="w-full h-full" />
              </div>
              <div className="flex flex-col sm:flex-row gap-5 items-center flex-grow">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <h5 className="font-black"><span>&#8358;</span>{item.price}</h5>
                    <span>({item.quantity})</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center ml-auto">
                <button
                  className="font-bold w-5 h-5 bg-pink-400 text-white flex items-center justify-center cursor-pointer hover:bg-red-950"
                  onClick={() => dispatch(incProduct(item.id))}
                >
                  <FaPlus />
                </button>
                <button
                  className="font-bold w-5 h-5 bg-pink-400 text-white flex items-center justify-center cursor-pointer hover:bg-red-950"
                  onClick={() => dispatch(decProduct(item.id))}
                >
                  <FaMinus />
                </button>
                <button
                  className="font-bold w-5 h-5 bg-pink-400 text-white flex items-center justify-center cursor-pointer hover:bg-red-950"
                  onClick={() => dispatch(removeProductFromCart(item.id))}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center">No Items In Cart</h2>
        )}
      </div>
      <div className="rounded-sm bg-customPink border-black p-5 inline-block w-full text-center">
        CHECKOUT (<span>&#8358;</span>{totalPrice.toFixed(2)})
      </div>
      <button onClick={onNext} disabled={cartItems.length === 0}>Proceed to Shipping</button>
      <button onClick={onPrevious}>Back to Products</button>
    </>
  );
};

CartStep.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalPrice: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

CartStep.defaultProps = {
  cartItems: [],
  totalPrice: 0,
};

export default CartStep;
