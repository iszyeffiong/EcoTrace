import { useState } from 'react';
import { Calculator, MapPin, Building2, Package, Zap, Plus, X } from 'lucide-react';
import { ProjectData } from '../App';

interface InputFormProps {
  onSubmit: (data: ProjectData) => void;
  isDarkMode: boolean;
}

export function InputForm({ onSubmit, isDarkMode }: InputFormProps) {
  const [formData, setFormData] = useState<ProjectData>({
    projectType: 'residential',
    size: 'medium',
    location: '',
    materials: [],
    energySources: [],
    description: '',
  });

  const [customProjectType, setCustomProjectType] = useState('');
  const [showCustomProjectType, setShowCustomProjectType] = useState(false);

  const [customSize, setCustomSize] = useState('');
  const [showCustomSize, setShowCustomSize] = useState(false);

  const [customMaterial, setCustomMaterial] = useState('');
  const [customMaterials, setCustomMaterials] = useState<string[]>([]);

  const [customEnergy, setCustomEnergy] = useState('');
  const [customEnergySources, setCustomEnergySources] = useState<string[]>([]);

  const materialsByProject: Record<string, string[]> = {
    residential: ['wood', 'concrete', 'glass', 'brick', 'stone', 'recycled'],
    commercial: ['steel', 'concrete', 'glass', 'aluminum', 'composite', 'recycled'],
    industrial: ['steel', 'concrete', 'metal', 'composite', 'plastic', 'recycled'],
    infrastructure: ['concrete', 'steel', 'asphalt', 'composite', 'recycled'],
    agricultural: ['wood', 'metal', 'concrete', 'plastic', 'recycled'],
    educational: ['brick', 'concrete', 'glass', 'wood', 'steel', 'recycled'],
    healthcare: ['steel', 'concrete', 'glass', 'composite', 'recycled'],
    hospitality: ['concrete', 'steel', 'glass', 'wood', 'recycled'],
    retail: ['steel', 'glass', 'concrete', 'wood', 'recycled'],
    custom: ['concrete', 'steel', 'wood', 'glass', 'recycled', 'composite', 'brick', 'stone', 'metal', 'asphalt', 'plastic', 'aluminum'],
  };

  const availableMaterials = materialsByProject[formData.projectType] || materialsByProject['custom'];

  const energySourcesByProject: Record<string, string[]> = {
    residential: ['solar', 'natural-gas', 'grid', 'geothermal'],
    commercial: ['solar', 'wind', 'grid', 'natural-gas'],
    industrial: ['solar', 'wind', 'natural-gas', 'coal', 'grid', 'nuclear'],
    infrastructure: ['grid', 'solar', 'diesel'],
    agricultural: ['solar', 'wind', 'biomass', 'diesel', 'grid'],
    educational: ['solar', 'grid', 'geothermal', 'wind'],
    healthcare: ['grid', 'solar', 'diesel', 'natural-gas'],
    hospitality: ['grid', 'solar', 'natural-gas', 'wind'],
    retail: ['grid', 'solar', 'natural-gas'],
    custom: ['solar', 'wind', 'natural-gas', 'coal', 'hydro', 'nuclear', 'biomass', 'geothermal', 'diesel', 'grid'],
  };

  const availableEnergySources = energySourcesByProject[formData.projectType] || energySourcesByProject['custom'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleMaterialToggle = (material: string) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter(m => m !== material)
        : [...prev.materials, material],
    }));
  };

  const handleEnergyToggle = (energy: string) => {
    setFormData(prev => ({
      ...prev,
      energySources: prev.energySources.includes(energy)
        ? prev.energySources.filter(e => e !== energy)
        : [...prev.energySources, energy],
    }));
  };

  const handleAddCustomMaterial = () => {
    if (customMaterial.trim()) {
      const newMaterial = customMaterial.trim().toLowerCase();
      setCustomMaterials(prev => [...prev, newMaterial]);
      setFormData(prev => ({
        ...prev,
        materials: [...prev.materials, newMaterial],
      }));
      setCustomMaterial('');
    }
  };

  const handleRemoveCustomMaterial = (material: string) => {
    setCustomMaterials(prev => prev.filter(m => m !== material));
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter(m => m !== material),
    }));
  };

  const handleAddCustomEnergy = () => {
    if (customEnergy.trim()) {
      const newEnergy = customEnergy.trim().toLowerCase();
      setCustomEnergySources(prev => [...prev, newEnergy]);
      setFormData(prev => ({
        ...prev,
        energySources: [...prev.energySources, newEnergy],
      }));
      setCustomEnergy('');
    }
  };

  const handleRemoveCustomEnergy = (energy: string) => {
    setCustomEnergySources(prev => prev.filter(e => e !== energy));
    setFormData(prev => ({
      ...prev,
      energySources: prev.energySources.filter(e => e !== energy),
    }));
  };

  const handleUseCustomProjectType = () => {
    if (customProjectType.trim()) {
      setFormData({ ...formData, projectType: customProjectType.trim().toLowerCase() });
      setShowCustomProjectType(false);
    }
  };

  const handleUseCustomSize = () => {
    if (customSize.trim()) {
      setFormData({ ...formData, size: customSize.trim().toLowerCase() });
      setShowCustomSize(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
          <Calculator className="size-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Details</h2>
      </div>

      <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/40 rounded-lg border border-emerald-100 dark:border-emerald-700/50">
        <p className="text-sm text-emerald-800 dark:text-emerald-200">
          Fill out the details below. Our AI-powered engine will analyze your inputs to estimate the environmental impact.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Type */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <Building2 className="size-4" />
            Project Type
          </label>
          {!showCustomProjectType ? (
            <div className="space-y-2">
              <select
                value={formData.projectType}
                onChange={(e) => {
                  if (e.target.value === 'custom') {
                    setShowCustomProjectType(true);
                  } else {
                    setFormData({ ...formData, projectType: e.target.value });
                  }
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all outline-none"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="agricultural">Agricultural</option>
                <option value="educational">Educational</option>
                <option value="healthcare">Healthcare</option>
                <option value="hospitality">Hospitality</option>
                <option value="retail">Retail</option>
                <option value="custom">Other (Custom)</option>
              </select>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={customProjectType}
                onChange={(e) => setCustomProjectType(e.target.value)}
                placeholder="Enter custom project type"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all outline-none"
              />
              <button
                type="button"
                onClick={handleUseCustomProjectType}
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                <Plus className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCustomProjectType(false);
                  setCustomProjectType('');
                }}
                className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
          )}
        </div>

        {/* Project Size */}
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
            Project Size
          </label>
          {!showCustomSize ? (
            <div className="space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2">
                {['small', 'medium', 'large', 'extra-large'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFormData({ ...formData, size })}
                    className={`px-2 sm:px-4 py-2 sm:py-3 rounded-lg border-2 transition-all font-medium capitalize text-xs sm:text-base ${formData.size === size
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-300 dark:hover:border-emerald-600'
                      }`}
                  >
                    {size === 'extra-large' ? 'Extra Large' : size}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowCustomSize(true)}
                className="w-full px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:border-emerald-400 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all text-sm font-medium flex items-center justify-center gap-2"
              >
                <Plus className="size-4" />
                Custom Size
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                placeholder="Enter custom size (e.g., 5000 sq ft)"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all outline-none"
              />
              <button
                type="button"
                onClick={handleUseCustomSize}
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                <Plus className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCustomSize(false);
                  setCustomSize('');
                }}
                className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <MapPin className="size-4" />
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g., California, USA"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 text-[10px] font-bold">i</span>
            Project Description
          </label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your project specifically (e.g., 'We are producing 500 units of wooden chairs per month using locally sourced pine...')"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all outline-none min-h-[100px]"
          />
        </div>

        {/* Materials */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <Package className="size-4" />
            Materials (select all that apply)
          </label>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {availableMaterials.map((material) => (
                <button
                  key={material}
                  type="button"
                  onClick={() => handleMaterialToggle(material)}
                  className={`px-2 sm:px-4 py-2 sm:py-3 rounded-lg border-2 transition-all text-xs sm:text-sm font-medium capitalize flex items-center justify-center text-center h-full ${formData.materials.includes(material)
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-300 dark:hover:border-emerald-600'
                    }`}
                >
                  {material}
                </button>
              ))}
            </div>

            {/* Custom Materials */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customMaterial}
                  onChange={(e) => setCustomMaterial(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomMaterial())}
                  placeholder="Add custom material..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddCustomMaterial}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1 text-sm"
                >
                  <Plus className="size-4" />
                  Add
                </button>
              </div>

              {customMaterials.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {customMaterials.map((material) => (
                    <span
                      key={material}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm capitalize"
                    >
                      {material}
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomMaterial(material)}
                        className="hover:bg-emerald-200 dark:hover:bg-emerald-800/50 rounded-full p-0.5 transition-colors"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Energy Sources */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <Zap className="size-4" />
            Energy Sources (select all that apply)
          </label>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {availableEnergySources.map((energy) => (
                <button
                  key={energy}
                  type="button"
                  onClick={() => handleEnergyToggle(energy)}
                  className={`px-2 sm:px-4 py-2 sm:py-3 rounded-lg border-2 transition-all text-xs sm:text-sm font-medium capitalize flex items-center justify-center text-center h-full ${formData.energySources.includes(energy)
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-300 dark:hover:border-emerald-600'
                    }`}
                >
                  {energy.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </button>
              ))}
            </div>

            {/* Custom Energy Sources */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customEnergy}
                  onChange={(e) => setCustomEnergy(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomEnergy())}
                  placeholder="Add custom energy source..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddCustomEnergy}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1 text-sm"
                >
                  <Plus className="size-4" />
                  Add
                </button>
              </div>

              {customEnergySources.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {customEnergySources.map((energy) => (
                    <span
                      key={energy}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm capitalize"
                    >
                      {energy}
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomEnergy(energy)}
                        className="hover:bg-emerald-200 dark:hover:bg-emerald-800/50 rounded-full p-0.5 transition-colors"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Calculator className="size-5" />
          Calculate Impact
        </button>
      </form>
    </div>
  );
}