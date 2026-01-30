"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('sabr_cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('sabr_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            // Create a unique ID for the cart item based on product ID and variants (like size)
            // Or simpler: check if an item with same ID AND same selectedSize exists
            const existingIndex = prev.findIndex(item =>
                item.id === product.id && item.selectedSize === product.selectedSize
            );

            if (existingIndex > -1) {
                // Item exists with same size, increment quantity
                const newCart = [...prev];
                newCart[existingIndex].quantity += 1;
                return newCart;
            }

            // New item (or different size), add to cart with a unique internal ID for easier management if needed, 
            // but for now relying on index or just adding it is fine. 
            // Better: Add a 'cartItemId' to every item to easily remove specific lines.
            return [...prev, { ...product, cartItemId: Date.now() + Math.random(), quantity: 1 }];
        });

        if (cart.length === 0) {
            setIsCartOpen(true);
        }
    };

    const removeFromCart = (cartItemId) => {
        setCart((prev) => prev.filter(item => item.cartItemId !== cartItemId));
    };

    const updateQuantity = (cartItemId, quantity) => {
        if (quantity < 1) return;
        setCart((prev) => prev.map(item =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
        ));
    };

    const updateItemSize = (cartItemId, newSize) => {
        setCart((prev) => prev.map(item =>
            item.cartItemId === cartItemId ? { ...item, selectedSize: newSize } : item
        ));
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            updateItemSize,
            isCartOpen,
            setIsCartOpen,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
