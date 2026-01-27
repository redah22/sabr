"use client";
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className={styles.card}>
            <Link href={`/shop/${product.id}`} className={styles.imageContainer}>
                {/* Using a placeholder because real images don't exist yet */}
                <div style={{ width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                    IMAGE
                </div>
                {/* 
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className={styles.image} 
          />
          */}
            </Link>

            <div>
                <div className={styles.details}>
                    <div className={styles.info}>
                        <h3 className={styles.name}>{product.name}</h3>
                        <span className={styles.category}>{product.category}</span>
                    </div>
                    <span className={styles.price}>${product.price}</span>
                </div>
                <button className={styles.addToCart} onClick={() => addToCart(product)}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
