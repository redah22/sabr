"use client";
import React, { useState } from 'react';
import { products } from '../../../data/products';
import { useCart } from '../../../context/CartContext';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProductPage({ params }) {
    // Unwrapping params for Next.js 15+ (if applicable, but safe here)
    // Actually in client components in recent Next.js versions we can use useParams or just props.
    // Note: params is a promise in latest Next.js canary, but usually standard object in 14. 
    // To be safe and standard with client components, let's use the prop.

    const { id } = React.use(params);
    const product = products.find(p => p.id === id);
    const { addToCart, setIsCartOpen } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0] : null);

    if (!product) {
        return notFound();
    }

    const handleAddToCart = () => {
        addToCart({ ...product, image: product.images[selectedImage], selectedColor: selectedColor?.name }); // Pass main image for cart
        setIsCartOpen(true);
    };

    return (
        <main className="container" style={{ paddingTop: '120px', paddingBottom: '4rem', minHeight: '100vh' }}>
            <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem', color: '#666' }}>
                ← Back to Shop
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                {/* Gallery Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#f5f5f5', overflow: 'hidden' }}>
                        <Image
                            src={product.images[selectedImage]}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </div>
                    {product.images.length > 1 && (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {product.images.map((img, index) => {
                                // Filter out images that belong to other colors
                                const isOtherColorImage = product.colors && product.colors.some(c => c.imageIndex === index && c.name !== selectedColor?.name);

                                if (isOtherColorImage) return null;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedImage(index);
                                            // Update selected color if this image belongs to a color
                                            const colorForImage = product.colors?.find(c => c.imageIndex === index);
                                            if (colorForImage) setSelectedColor(colorForImage);
                                        }}
                                        style={{
                                            width: '80px',
                                            aspectRatio: '3/4',
                                            position: 'relative',
                                            border: selectedImage === index ? '1px solid black' : '1px solid transparent',
                                            cursor: 'pointer',
                                            background: '#f5f5f5'
                                        }}
                                    >
                                        <Image src={img} alt={`${product.name} view ${index + 1}`} fill style={{ objectFit: 'cover' }} />
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', textTransform: 'uppercase', lineHeight: '1.1' }}>{product.name}</h1>
                        <p style={{ fontSize: '1.25rem', color: 'white', marginTop: '0.5rem' }}>${product.price}</p>

                        {product.colors && (
                            <div style={{ marginTop: '1rem' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Color: {selectedColor?.name}</p>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {product.colors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => {
                                                setSelectedColor(color);
                                                setSelectedImage(color.imageIndex);
                                            }}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                background: color.hex,
                                                border: selectedColor?.name === color.name ? '2px solid black' : '1px solid #ccc',
                                                cursor: 'pointer',
                                                padding: '2px', // Create space for the ring
                                                backgroundClip: 'content-box' // Ensure color is inside padding
                                            }}
                                            aria-label={`Select ${color.name} color`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ height: '1px', background: '#eee', width: '100%' }} />

                    <p style={{ lineHeight: '1.6', color: '#555' }}>
                        {product.description}
                    </p>

                    <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                        <button
                            onClick={handleAddToCart}
                            className='btn'
                            style={{
                                width: '100%',
                                background: 'white',
                                color: 'black',
                                padding: '1rem',
                                fontSize: '1rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                border: '1px solid black',
                                cursor: 'pointer'
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
