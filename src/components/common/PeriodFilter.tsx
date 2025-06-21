import React from 'react';
import { Calendar } from 'lucide-react';

export type PeriodType = '1D' | '7D' | '30D' | '90D' | '1Y' | 'ALL';

interface PeriodFilterProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  className?: string;
}

const PeriodFilter: React.FC<PeriodFilterProps> = ({
  selectedPeriod,
  onPeriodChange,
  className = ''
}) => {
  const periods = [
    { value: '1D' as PeriodType, label: '1 Hari' },
    { value: '7D' as PeriodType, label: '7 Hari' },
    { value: '30D' as PeriodType, label: '30 Hari' },
    { value: '90D' as PeriodType, label: '90 Hari' },
    { value: '1Y' as PeriodType, label: '1 Tahun' },
    { value: 'ALL' as PeriodType, label: 'Semua' }
  ];

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Calendar className="w-4 h-4 text-gray-400" />
      <span className="text-sm font-medium text-gray-700">Periode:</span>
      <div className="flex bg-gray-100 rounded-lg p-1">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => onPeriodChange(period.value)}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              selectedPeriod === period.value
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PeriodFilter;