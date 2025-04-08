import React from 'react';
import { Clock } from 'lucide-react';

interface RecentSearchesProps {
  searches: string[];
  onSelect: (city: string) => void;
}

export function RecentSearches({ searches, onSelect }: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className="w-full max-w-md mt-4">
      <div className="flex items-center gap-2 mb-2 text-gray-600">
        <Clock size={16} />
        <h3 className="text-sm font-medium">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}