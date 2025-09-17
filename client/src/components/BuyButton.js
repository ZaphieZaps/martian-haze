// BuyButton.js
import axios from "axios";

function BuyButton({ songId, songTitle, price, userId }) {
  const handleBuy = async () => {
    const res = await axios.post("http://localhost:5000/api/payments/create-checkout-session", {
      songId,
      songTitle,
      price,
      userId,
    });
    window.location.href = res.data.url; // Redirect to Stripe checkout
  };

  return (
    <button
      onClick={handleBuy}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Buy for ${price}
    </button>
  );
}

export default BuyButton;
