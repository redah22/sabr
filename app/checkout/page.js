"use client";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '../../context/CartContext';
import { useState, useEffect } from 'react';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx');

function CheckoutForm() {
    const { cartTotal } = useCart();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Placeholder for actual payment logic
        alert('Payment integration requires a backend to create PaymentIntent. This is a UI demo.');
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                <input type="email" placeholder="you@example.com" style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }} required />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Card Details</label>
                <div style={{ padding: '10px', border: '1px solid #ddd', background: '#f9f9f9' }}>
                    {/* Placeholder for Stripe Element */}
                    <p style={{ color: '#888' }}>Stripe Card Element will load here</p>
                </div>
            </div>

            <button type="submit" className="btn" style={{ width: '100%', background: 'black', color: 'white' }}>
                Pay ${cartTotal.toFixed(2)}
            </button>
        </form>
    );
}

export default function Checkout() {
    const { cart } = useCart();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        // fetch("/api/create-payment-intent", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ items: cart }),
        // })
        //   .then((res) => res.json())
        //   .then((data) => setClientSecret(data.clientSecret));
    }, [cart]);

    return (
        <main className="container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', textTransform: 'uppercase', textAlign: 'center' }}>Checkout</h1>

            {cart.length > 0 ? (
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            ) : (
                <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
            )}
        </main>
    );
}
