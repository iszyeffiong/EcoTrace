import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { TrendingUp, Zap, AlertTriangle, Activity, Loader2 } from 'lucide-react';
import { ImpactResults } from '../App';
import { GaugeChart } from './GaugeChart';

interface ResultsVisualizationProps {
  results: ImpactResults | null;
  isDarkMode: boolean;
  isLoading?: boolean;
}

export function ResultsVisualization({ results, isDarkMode, isLoading = false }: ResultsVisualizationProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 transition-colors duration-300 flex flex-col items-center justify-center min-h-[600px] space-y-4">
        <Loader2 className="size-16 text-emerald-600 dark:text-emerald-400 animate-spin" />
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
          Analyzing Environmental Impact...
        </h3>
        <p className="text-gray-500 dark:text-gray-500 text-center max-w-md">
          Consulting AI models to calculate CO2 footprint, energy estimates, and sustainability risks based on your inputs.
        </p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 transition-colors duration-300 flex flex-col items-center justify-center min-h-[600px]">
        <div className="text-center">
          <Activity className="size-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No Results Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            Enter your project details and click "Calculate Impact" to see environmental insights
          </p>
        </div>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'high': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];
  const chartTextColor = isDarkMode ? '#d1d5db' : '#374151';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 transition-colors duration-300 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
          <TrendingUp className="size-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Impact Analysis</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CO2 Footprint */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="size-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 text-sm">CO₂ Footprint</h3>
          </div>
          <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">{results.co2Footprint}</p>
          <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">tons CO₂/year</p>
        </div>

        {/* Energy Use */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="size-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-semibold text-purple-900 dark:text-purple-300 text-sm">Energy Use</h3>
          </div>
          <p className="text-3xl font-bold text-purple-700 dark:text-purple-400">{results.energyUse}</p>
          <p className="text-xs text-purple-600 dark:text-purple-500 mt-1">MWh/year</p>
        </div>

        {/* Sustainability Risk */}
        <div className={`rounded-lg p-4 border ${getRiskColor(results.sustainabilityRisk)} border-current`}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="size-5" />
            <h3 className="font-semibold text-sm">Sustainability Risk</h3>
          </div>
          <p className="text-3xl font-bold capitalize">{results.sustainabilityRisk}</p>
          <p className="text-xs mt-1 opacity-80">Impact Level</p>
        </div>
      </div>

      {/* Gauge Chart for CO2 */}
      <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-center">
          CO₂ Emissions Level
        </h3>
        <GaugeChart value={results.co2Footprint} maxValue={300} isDarkMode={isDarkMode} />
      </div>

      {/* Material Impact - Pie Chart */}
      {results.materialImpact.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4 md:p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Material Impact Distribution</h3>
          <div className="h-[200px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={results.materialImpact}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {results.materialImpact.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    color: chartTextColor,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Energy Breakdown - Bar Chart */}
      {results.energyBreakdown.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4 md:p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Energy Source Impact</h3>
          <div className="h-[200px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results.energyBreakdown}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: chartTextColor, fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: chartTextColor, fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    color: chartTextColor,
                  }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Color Legend */}
      <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Impact Indicators</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Low Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Medium Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">High Impact</span>
          </div>
        </div>
      </div>
    </div>
  );
}
