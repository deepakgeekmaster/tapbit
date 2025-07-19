'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import {
  Wallet,
  User2,
  RefreshCcw,
  Gift,
  BookOpenCheck,
  MessageCircleMore,
} from 'lucide-react';

export default function WalletPage() {
  const router = useRouter();
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 200,
          page: 1,
          sparkline: false,
        },
      })
      .then((res) => setCoins(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 px-5 pt-5 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <ArrowLeft
          className="w-8 h-8 text-white cursor-pointer bg-blue-600 rounded-xl px-2"
          onClick={() => router.back()}
        />
        <div
          className="grid grid-cols-2 gap-1 w-6 h-6"
          onClick={() => setShowMenu(true)}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 bg-gray-400 rounded" />
          ))}
        </div>
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold mb-1">Send Crypto Now</h1>
      <p className="text-sm text-gray-500 mb-5">
        Choose a wallet to send crypto from
      </p>

      {/* Search */}
      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md mb-5">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-2 bg-transparent outline-none w-full text-sm placeholder-gray-400"
        />
      </div>

      {/* Wallet List */}
      <div className="space-y-4">
        {coins
          .filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((coin) => (
            <Link
              key={coin.id}
              href={`/deposit?coin=${coin.id}`}
              className="flex items-center justify-between p-4 mb-3 rounded-lg shadow-sm bg-white hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="font-medium">{coin.name} wallet</div>
                  <div className="text-xs text-gray-500">
                    {coin.symbol.toUpperCase()} Coin
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="font-semibold">US$ 0.0000</div>
                <div className="text-xs text-gray-500">
                  0.0000 {coin.symbol.toUpperCase()}
                </div>
              </div>
            </Link>
          ))}
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 ${
          showMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-40"
          onClick={() => setShowMenu(false)}
        ></div>

        {/* Drawer */}
        <div className="absolute top-0 left-0 w-64 bg-white h-full shadow-lg p-4 py-6 text-sm text-gray-800">
          <div className="mb-6 relative">
            <h1 className="text-blue-600 font-semibold text-lg">Tapbit</h1>
            <p className="text-xs text-gray-500">UID: 25112</p>
            <span className="absolute top-0 right-0 text-xs text-blue-600 bg-blue-100 rounded-full px-2 py-1">
              Credit: 600
            </span>

            <Link href="/wallet">
              <button className="mt-3 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium w-full justify-center">
                <Wallet className="w-4 h-4" />
                Wallet
              </button>
            </Link>
          </div>

          <h2 className="text-md font-semibold mb-4">Functions</h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 py-2 text-black-600 cursor-pointer">
              <User2 className="w-5 h-5 text-blue-600" />
              Account
            </li>
            <li className="flex items-center gap-3 py-2 text-black-600 cursor-pointer">
              <RefreshCcw className="w-5 h-5 text-blue-600" />
              Arbitrage
            </li>
            <li className="flex items-center gap-3 py-2 text-black-600 cursor-pointer">
              <Gift className="w-5 h-5 text-blue-600" />
              Platform Activities
            </li>
            <li className="flex items-center gap-3 py-2 text-black-600 cursor-pointer">
              <BookOpenCheck className="w-5 h-5 text-blue-600" />
              Knowledge Base Module
            </li>
            <li className="flex items-center gap-3 py-2 text-black-600 cursor-pointer">
              <MessageCircleMore className="w-5 h-5 text-blue-600" />
              Chat
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
