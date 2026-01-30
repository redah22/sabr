"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import styles from './Cart.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function CartDrawer() {
    const { isCartOpen, setIsCartOpen, cart, updateQuantity, updateItemSize, removeFromCart, cartTotal } = useCart();

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
                                    <div key={item.cartItemId} className={styles.item}>
                                        <div className={styles.itemImage}>
                                            <Image
                                                src={item.image || '/images/product-1.jpg'}
                                                alt={item.name}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <div>
                                                <h3 className={styles.itemName}>{item.name}</h3>
                                                <p className={styles.itemPrice}>${item.price}</p>

                                                {/* Size Selector for Clothing (Not Headwear) */}
                                                {item.category !== 'Headwear' && (
                                                    <div style={{ marginTop: '0.25rem' }}>
                                                        <select
                                                            value={item.selectedSize || ''}
                                                            onChange={(e) => updateItemSize(item.cartItemId, e.target.value)}
                                                            className={styles.sizeSelect}
                                                            style={{
                                                                padding: '4px 24px 4px 8px', // Space for arrow
                                                                fontSize: '0.8rem',
                                                                border: '1px solid #ddd',
                                                                borderRadius: '4px',
                                                                background: '#fff url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%201L5%205L9%201%22%20stroke%3D%22%23666%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E") no-repeat right 8px center',
                                                                appearance: 'none',
                                                                cursor: 'pointer',
                                                                color: item.selectedSize ? 'black' : '#666'
                                                            }}
                                                        >
                                                            <option value="" disabled>Size</option>
                                                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                                                <option key={size} value={size}>{size}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                )}

                                                {item.selectedColor && (
                                                    <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
                                                        Color: {item.selectedColor}
                                                    </p>
                                                )}
                                            </div>
                                            <div className={styles.controls}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <button className={styles.quantityBtn} onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button className={styles.quantityBtn} onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>+</button>
                                                </div>
                                                <button className={styles.removeBtn} onClick={() => removeFromCart(item.cartItemId)}>Remove</button>
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
