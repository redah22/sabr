import Hero from '../components/Hero';

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="container" style={{ padding: '4rem 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textTransform: 'uppercase' }}>New Arrivals</h2>
        <p>Coming Soon...</p>
      </div>
    </main>
  );
}
