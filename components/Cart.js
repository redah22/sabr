"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import styles from './Cart.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function CartDrawer() {
    const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotal } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <div className={styles.overlay} onClick={() => setIsCartOpen(false)}>
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className={styles.drawer}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.header}>
                            <h2 className={styles.title}>Your Cart</h2>
                            <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <div className={styles.items}>
                            {cart.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className={styles.item}>
                                        <div className={styles.itemImage}>
                                            {/* Placeholder */}
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <div>
                                                <h3 className={styles.itemName}>{item.name}</h3>
                                                <p className={styles.itemPrice}>${item.price}</p>
                                            </div>
                                            <div className={styles.controls}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <button className={styles.quantityBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button className={styles.quantityBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                </div>
                                                <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className={styles.footer}>
                            <div className={styles.total}>
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <Link href="/checkout" className={styles.checkoutBtn} onClick={() => setIsCartOpen(false)}>
                                Proceed to Checkout
                            </Link>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
