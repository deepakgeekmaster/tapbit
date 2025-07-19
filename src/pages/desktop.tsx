// app/DesktopPage.tsx or pages/DesktopPage.tsx

'use client';

export default function DesktopPage() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      margin: 0,
      padding: 0
    }}>
      <img 
        src="/coinbase-wallet.png" 
        alt="Coinbase Wallet Promo" 
        style={{ 
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }} 
      />
    </div>
  );
}
