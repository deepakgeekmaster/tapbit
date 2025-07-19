'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsArrowLeft } from 'react-icons/bs';
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  XAxis,
} from 'recharts';
import { Clock, DollarSign } from 'lucide-react'; // Optional icons if using lucide

// Modal Component
// Modal Component

function BTCEntrustModal({
  isOpen,
  onClose,
  coin,
}: {
  isOpen: boolean;
  onClose: () => void;
  coin: any;
}) {
  const [direction, setDirection] = useState('Up');
  const [amount, setAmount] = useState('');

  if (!isOpen || !coin) return null;

  const market = coin.market_data;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-40">
      <div className="bg-white w-full rounded-t-2xl p-4 shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Modal Grab Handle */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{coin.name} Coin Delivery</h2>
          </div>
          <button onClick={onClose} className="text-xl font-bold text-gray-600">×</button>
        </div>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <img src={coin.image?.small} alt={coin.name} className="w-7 h-7" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{coin.name} Coin</span>
              <span className="text-xs text-gray-500">Buy {direction}</span>
            </div>
          </div>
           <div className="text-xs text-gray-500 mb-2 mt-2">
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-blue-600" />
            <span>60S</span>
          </div>
          <p className='mt-2'>0.00 USDT</p>
        </div>
        
        </div>

        {/* Top Row: Delivery Time and Cost */}
     
{/* Delivery Time & Up/Down Toggle in one row */}
<div className="flex items-end gap-4 mb-4">
  {/* Delivery Time */}
  <div className="flex-1">
    <label className="block text-sm font-medium mb-1 text-gray-600">Delivery time</label>
    <div className="relative">
<select className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>60S</option>
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        ▼
      </div>
    </div>
  </div>

  {/* Up / Down Toggle */}
  <div className="flex gap-2 flex-1">
    <button
      onClick={() => setDirection('Up')}
      className={`flex-1 py-2 rounded-lg text-sm font-medium ${
        direction === 'Up' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      Up
    </button>
    <button
      onClick={() => setDirection('Down')}
      className={`flex-1 py-2 rounded-lg text-sm font-medium ${
        direction === 'Down' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      Down
    </button>
  </div>
</div>


        {/* Price Range */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-gray-600">Price range</label>
<select className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>(*15%)</option>
          </select>
        </div>

        {/* Purchase Price */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1 text-gray-600">Purchase price</label>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-semibold border rounded-md px-3 border-gray-300 py-2 text-sm">USDT</span>
            <input
              type="number"
              className="flex-1 border rounded-md px-3 border-gray-300 py-2 text-sm"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              onClick={() => setAmount('100')}
              className="text-blue-600 text-sm font-medium"
            >
            </button>
          </div>
        </div>

        {/* Info below input */}
        <div className="text-sm text-gray-500 mb-1">
          Available Balance: <span className="text-black">0.0000</span>
        </div>
        <div className="text-xs  mb-4">At least: 100</div>

        {/* Entrust Now Button */}
        <button className="w-full bg-green-600 text-white py-3 rounded-lg text-base font-semibold">
          Entrust Now
        </button>
      </div>
    </div>
  );
}


export default function CoinDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [coin, setCoin] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedTime, setSelectedTime] = useState('1D');
  const [showModal, setShowModal] = useState(false);

  const timeFilters = ['1D', '1W', '1M', '3M', '1Y'];

  // Fetch Coin Detail
  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => {
        setCoin(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Fetch Chart Data
  useEffect(() => {
    if (!id) return;
    const daysMap: Record<string, number> = {
      '1D': 1,
      '1W': 7,
      '1M': 30,
      '3M': 90,
      '1Y': 365,
    };

    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: daysMap[selectedTime],
        },
      })
      .then((res) => {
        const prices = res.data.prices.map((item: any) => ({
          time: new Date(item[0]).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
          price: item[1],
        }));
        setChartData(prices);
      })
      .catch((err) => console.error(err));
  }, [id, selectedTime]);

  if (!coin) return <div className="p-4">Loading...</div>;

  const market = coin.market_data;

  return (
<div className="min-h-screen bg-white text-black font-sans pb-32">
  {/* Header */}
  <div className="flex justify-between items-center p-4">
    <BsArrowLeft
      className="text-2xl cursor-pointer"
      onClick={() => router.back()}
    />
    <button className="bg-white p-2 rounded-xl">
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

  {/* Coin Info */}
  <div className="flex justify-between items-center gap-2 px-4">
    <div className="flex items-center gap-2">
      <img src={coin.image.small} alt={coin.name} className="w-8 h-8" />
      <div>
        <div className="text-lg font-semibold">{coin.name}</div>
        <div className="text-xs text-gray-500">USDT</div>
      </div>
    </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-clipboard"
      >
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      </svg>
    </div>
  </div>

  {/* Price */}
  <div className="px-4 mt-2">
    <div className="text-2xl font-bold">
      US$ {market.current_price.usd.toLocaleString()}
    </div>
    <div
      className={`text-sm ${
        market.price_change_24h < 0 ? 'text-red-600' : 'text-green-600'
      }`}
    >
      {market.price_change_24h.toFixed(2)} USD (
      {market.price_change_percentage_24h.toFixed(2)}%)
    </div>
  </div>

  {/* Chart */}
  <div className="h-100 px-4 my-4 rounded-xl bg-gray-100">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0061FF" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#0061FF" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" hide />
        <Tooltip
          contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px' }}
          formatter={(value: any) => [`$${value.toFixed(2)}`, 'Price']}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#0061FF"
          strokeWidth={2}
          fill="url(#colorPrice)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>

  {/* Time Filters */}
  <div className="flex justify-between px-4 py-2">
    {timeFilters.map((t) => (
      <button
        key={t}
        onClick={() => setSelectedTime(t)}
        className={`text-sm ${
          selectedTime === t ? 'text-blue-600 font-semibold' : 'text-gray-600'
        }`}
      >
        {t}
      </button>
    ))}
  </div>

  {/* Bottom Section (Fixed) */}
  <div className="px-4 py-4 fixed bottom-0 left-0 right-0 bg-white border-t z-50">
    <div className="font-semibold text-lg mb-2">Functions</div>
    <div className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked readOnly className="accent-blue-600" />
      24h Volume
      <span className="ml-auto text-gray-500">
        ${market.total_volume.usd.toLocaleString()}
      </span>
    </div>

    <button
      className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
      onClick={() => setShowModal(true)}
    >
      Entrust Now
    </button>
  </div>

  {/* Modal */}
  <BTCEntrustModal isOpen={showModal} onClose={() => setShowModal(false)} coin={coin} />
</div>

  );
}
