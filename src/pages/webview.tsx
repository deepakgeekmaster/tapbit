'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './globals.css';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Link from 'next/link';
import {
  Wallet,
  User2,
  RefreshCcw,
  Gift,
  BookOpenCheck,
  MessageCircleMore,
  Settings,
} from 'lucide-react';
interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export default function WebViewPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'top'>('all');

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 200,
          page: 1,
          sparkline: true,
        },
      })
      .then((res) => setCoins(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredCoins = activeTab === 'top'
    ? coins.filter((coin) => coin.price_change_percentage_24h > 0)
    : coins;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Header */}
      <div className="bg-[#0061FF] px-6 pt-8 pb-2 text-white rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl">🔔</span>

          <button onClick={() => setShowMenu(true)} className="bg-white p-2 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#0061FF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <h1 className="text-3xl font-bold leading-tight">Tapbit</h1>

        <div className="flex justify-between items-center">
          <p className="text-lg opacity-90 mt-1">Start making money plan.</p>
          <img src="/tapbit.png" alt="Tapbit Logo" className="h-20 rounded-lg" />
        </div>
      </div>

      {/* Market Section */}
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-4">Market</h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1 rounded-full ${activeTab === 'all'
              ? 'bg-[#0061FF] text-white'
              : 'border border-gray-400 text-gray-800'
              }`}
          >
            All markets
          </button>
          <button
            onClick={() => setActiveTab('top')}
            className={`px-4 py-1 rounded-full ${activeTab === 'top'
              ? 'bg-[#0061FF] text-white'
              : 'border border-gray-400 text-gray-800'
              }`}
          >
            Top
          </button>
        </div>

        {/* Coin List */}
        <div className="space-y-6">
          {filteredCoins.map((coin) => (
            <Link href={`/${coin.id}`} key={coin.id} className="block">
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                {/* Left: Coin Info */}
                <div className="flex items-center gap-3 w-[35%]">
                  <img src={coin.image} alt={coin.name} className="w-9 h-9" />
                  <div>
                    <div className="font-semibold text-gray-900">{coin.name}</div>
                    <div className="text-xs text-gray-500">USDT</div>
                  </div>
                </div>

                {/* Center: Sparkline */}
                <div className="w-[30%] flex justify-center items-center">
                  {coin.sparkline_in_7d?.price?.length > 0 && (
                    <Sparklines data={coin.sparkline_in_7d.price} width={50} height={10}>
                      <SparklinesLine
                        color={coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}
                        style={{ strokeWidth: 1, fill: 'none' }}
                      />
                    </Sparklines>
                  )}
                </div>

                {/* Right: Price Info */}
                <div className="flex flex-col items-end w-[35%]">
                  <div className="font-semibold text-gray-800">
                    US$ {coin.current_price.toLocaleString()}
                  </div>
                  <div
                    className={`text-sm ${coin.price_change_percentage_24h < 0
                      ? 'text-red-600'
                      : 'text-green-600'
                      }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(3)}% 24 Hrs
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Side Drawer */}
     {/* Left Side Drawer */}
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
    {/* Header + UID */}
    <div className="mb-6 relative">
      <h1 className="text-blue-600 font-semibold text-lg">Tapbit</h1>
      <p className="text-xs text-gray-500">UID: 25112</p>

      {/* Credit Label */}
      <span className="absolute top-0 right-0 text-xs text-blue-600 bg-blue-100 rounded-full px-2 py-1">
        Credit: 600
      </span>

      {/* Wallet Button */}
     <Link href="/wallet">
  <button className="mt-3 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium w-full justify-center">
    <Wallet className="w-4 h-4" />
    Wallet
  </button>
</Link>
    </div>

    {/* Functions Section */}
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
