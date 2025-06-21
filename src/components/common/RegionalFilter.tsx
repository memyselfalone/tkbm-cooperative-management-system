import React from 'react';
import { MapPin } from 'lucide-react';

export type RegionalType = 'ALL' | 'DKI_JAKARTA' | 'JAWA_TIMUR' | 'SUMATERA_UTARA' | 'JAWA_TENGAH' | 'KALIMANTAN_TIMUR' | 'KALIMANTAN_BARAT' | 'SULAWESI_SELATAN' | 'KEPULAUAN_RIAU';

interface RegionalFilterProps {
  selectedRegional: RegionalType;
  onRegionalChange: (regional: RegionalType) => void;
  className?: string;
}

const RegionalFilter: React.FC<RegionalFilterProps> = ({
  selectedRegional,
  onRegionalChange,
  className = ''
}) => {
  const regions = [
    { value: 'ALL' as RegionalType, label: 'Semua Regional' },
    { value: 'DKI_JAKARTA' as RegionalType, label: 'DKI Jakarta' },
    { value: 'JAWA_TIMUR' as RegionalType, label: 'Jawa Timur' },
    { value: 'SUMATERA_UTARA' as RegionalType, label: 'Sumatera Utara' },
    { value: 'JAWA_TENGAH' as RegionalType, label: 'Jawa Tengah' },
    { value: 'KALIMANTAN_TIMUR' as RegionalType, label: 'Kalimantan Timur' },
    { value: 'KALIMANTAN_BARAT' as RegionalType, label: 'Kalimantan Barat' },
    { value: 'SULAWESI_SELATAN' as RegionalType, label: 'Sulawesi Selatan' },
    { value: 'KEPULAUAN_RIAU' as RegionalType, label: 'Kepulauan Riau' }
  ];

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <MapPin className="w-4 h-4 text-gray-400" />
      <select
        value={selectedRegional}
        onChange={(e) => onRegionalChange(e.target.value as RegionalType)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {regions.map((region) => (
          <option key={region.value} value={region.value}>
            {region.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionalFilter;