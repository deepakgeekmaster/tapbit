'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { Sparklines, SparklinesLine } from 'react-sparklines';

import {
  Wallet,
  User2,
  RefreshCcw,
  Gift,
  BookOpenCheck,
  MessageCircleMore,
} from 'lucide-react';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export default function WalletPage() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=true&price_change_percentage=24h'
      )
      .then((res) => setCoins(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <Image
          src="/tapbit.png"
          alt="Tapbit Logo"
          width={80}
          height={80}
          className="rounded-lg"
        />
        <div className="flex gap-5 text-gray-400 text-sm">
          <Link href="#"><Wallet size={18} /> Wallet</Link>
          <Link href="#"><User2 size={18} /> Profile</Link>
          <Link href="#"><RefreshCcw size={18} /> Refresh</Link>
          <Link href="#"><Gift size={18} /> Rewards</Link>
          <Link href="#"><BookOpenCheck size={18} /> Guide</Link>
          <Link href="#"><MessageCircleMore size={18} /> Support</Link>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Trending Coins</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coins.map((coin) => (
          <div key={coin.id} className="bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-4 mb-2">
              <Image
                src={coin.image}
                alt={coin.name}
                width={36}
                height={36}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{coin.name}</p>
                <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
              </div>
            </div>
            <div className="text-sm mb-2">
              <span className="text-green-400">
                ${coin.current_price.toFixed(2)}
              </span>
              {' '}
              <span
                className={`ml-2 ${
                  coin.price_change_percentage_24h >= 0
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
            <Sparklines data={coin.sparkline_in_7d.price} limit={20}>
              <SparklinesLine
                color={
                  coin.price_change_percentage_24h >= 0 ? '#10B981' : '#EF4444'
                }
              />
            </Sparklines>
          </div>
        ))}
      </div>
    </div>
  );
}
