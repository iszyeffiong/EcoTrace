interface GaugeChartProps {
  value: number;
  maxValue: number;
  isDarkMode: boolean;
}

export function GaugeChart({ value, maxValue, isDarkMode }: GaugeChartProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const angle = (percentage / 100) * 180;
  
  // Determine color based on percentage
  let color = '#10b981'; // green
  if (percentage > 66) color = '#ef4444'; // red
  else if (percentage > 33) color = '#f59e0b'; // yellow/orange

  const needleRotation = `rotate(${angle - 90}deg)`;

  return (
    <div className="relative w-full max-w-xs mx-auto">
      {/* Gauge Background */}
      <svg viewBox="0 0 200 120" className="w-full">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={isDarkMode ? '#374151' : '#e5e7eb'}
          strokeWidth="20"
          strokeLinecap="round"
        />
        
        {/* Low range (green) */}
        <path
          d="M 20 100 A 80 80 0 0 1 80 28"
          fill="none"
          stroke="#10b981"
          strokeWidth="20"
          strokeLinecap="round"
          opacity="0.6"
        />
        
        {/* Medium range (yellow) */}
        <path
          d="M 80 28 A 80 80 0 0 1 120 28"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="20"
          strokeLinecap="round"
          opacity="0.6"
        />
        
        {/* High range (red) */}
        <path
          d="M 120 28 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#ef4444"
          strokeWidth="20"
          strokeLinecap="round"
          opacity="0.6"
        />
        
        {/* Center dot */}
        <circle cx="100" cy="100" r="8" fill={isDarkMode ? '#1f2937' : '#ffffff'} />
        <circle cx="100" cy="100" r="6" fill={color} />
        
        {/* Needle */}
        <g transform={`rotate(${angle - 90} 100 100)`}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="35"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </svg>
      
      {/* Value display */}
      <div className="text-center mt-2">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">tons CO₂/year</p>
      </div>
      
      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2 px-2">
        <span>0</span>
        <span>{maxValue / 2}</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
}
