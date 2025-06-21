import React from 'react';
import { Grid3X3, List, LayoutGrid } from 'lucide-react';

export type ViewType = 'grid' | 'table' | 'card';

interface ViewTypeSelectorProps {
  viewType: ViewType;
  onViewTypeChange: (viewType: ViewType) => void;
  className?: string;
}

const ViewTypeSelector: React.FC<ViewTypeSelectorProps> = ({
  viewType,
  onViewTypeChange,
  className = ''
}) => {
  const viewTypes = [
    { type: 'grid' as ViewType, icon: Grid3X3, label: 'Grid View' },
    { type: 'table' as ViewType, icon: List, label: 'Table View' },
    { type: 'card' as ViewType, icon: LayoutGrid, label: 'Card View' }
  ];

  return (
    <div className={`flex bg-gray-100 rounded-lg p-1 ${className}`}>
      {viewTypes.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => onViewTypeChange(type)}
          className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            viewType === type
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title={label}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label.split(' ')[0]}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewTypeSelector;