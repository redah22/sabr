"use client";
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard';

export default function Shop() {
    return (
        <main className="container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '3rem', textTransform: 'uppercase' }}>Shop All</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
}
