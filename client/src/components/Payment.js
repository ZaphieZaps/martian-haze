import React, { useEffect, useRef } from 'react';

const Payment = () => {
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        // Your logic to create a PayPal order
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '0.01',
            },
          }],
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);
        alert('Payment successful!');
      },
    }).render(paypalRef.current);
  }, []);

  return (
    <div>
      <h3>Pay with PayPal</h3>
      <div ref={paypalRef} />
    </div>
  );
};

export default Payment;