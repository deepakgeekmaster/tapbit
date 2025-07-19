'use client';

import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CoinDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const coinId = searchParams.get('coin');

  if (!coinId) {
    return <div className="p-4">Invalid Coin</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 px-5 pt-5 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <ArrowLeft
          className="w-8 h-8 text-white cursor-pointer bg-blue-600 rounded-xl p-2"
          onClick={() => router.back()}
        />
        <Copy className="w-5 h-5 text-gray-600" />
      </div>

      {/* Coin Info */}
      <h1 className="text-center font-semibold text-lg mb-1">
        {coinId.toUpperCase()} Wallet
      </h1>

      <p className="text-center text-gray-500 text-sm mb-5">US$ 0.0000</p>
      <p className="text-center text-gray-400 text-xs">
        Available: 0.00000000 {coinId.toUpperCase()}
        <br />
        Frozen: 0.00000000 {coinId.toUpperCase()}
      </p>

      {/* Tabs */}
      <div className="flex justify-between bg-gray-100 rounded-lg p-1 mt-6 mb-6">
        <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md">
          Receive
        </button>
        <button className="text-gray-500 font-semibold px-4 py-2 rounded-md">
          Send
        </button>
        <button className="text-gray-500 font-semibold px-4 py-2 rounded-md">
          Convert
        </button>
      </div>

      {/* QR Box */}
      <div className="bg-white shadow p-4 rounded-2xl border">
        <p className="font-semibold text-sm mb-2">Deposit funds</p>
        <span className="text-xs text-blue-600 border border-blue-600 rounded-full px-2 py-0.5 inline-block mb-3">
          ERC20
        </span>
        <img src="/qr.png" alt="QR Code" className="w-48 h-48 mx-auto" />
        <p className="text-xs text-gray-500 mt-3 text-center">
         TRwnQ3SnetNmzGR6mn8Eb1miEnUg5jg4rb
        </p>
        <p className="text-blue-600 text-sm text-center mt-1 cursor-pointer">
          Copy address
        </p>
      </div>
    </div>
  );
}
