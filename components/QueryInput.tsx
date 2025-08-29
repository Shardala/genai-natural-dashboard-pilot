'use client';

import { askPlaceholder, askTxt, thinking } from '@/app/consts';
/* eslint-disable */

import { useState } from 'react';

export default function QueryInput() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [chart, setChart] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const data = await res.json();

    setChart(data);
    localStorage.setItem('chart', JSON.stringify(data));
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex py-5">
      <input
        type="text"
        className="flex-1 input-area flex items-center justify-start gap-6 space-y-3 p-6 bg-black/20 rounded-l-lg border border-deactive"
        placeholder={askPlaceholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="bg-slate-500 hover:bg-slate-600 cursor-pointer text-white px-8 py-2 rounded-r-lg">
        {loading ? thinking : askTxt}
      </button>
    </form>
  );
}
