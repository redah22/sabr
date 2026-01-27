"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            {/* Background - In a real app, replace with a video or high-res image */}
            <div className={styles.bgImage}>
                {/* Placeholder gradient/image */}
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1a1a1a, #4a4a4a)' }} />
            </div>

            <div className={styles.overlay} />

            <div className={styles.content}>
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.title}
                >
                    Patience is Power
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className={styles.subtitle}
                >
                    Premium Streetwear • Est. 2026
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className={styles.buttons}
                >
                    <Link href="/shop" className={styles.cta}>
                        Shop Now
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
