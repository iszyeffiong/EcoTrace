import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InputForm } from './components/InputForm';
import { ResultsVisualization } from './components/ResultsVisualization';
import { Footer } from './components/Footer';

export interface ProjectData {
  projectType: string;
  size: string;
  location: string;
  materials: string[];
  energySources: string[];
  description?: string;
}

export interface ImpactResults {
  co2Footprint: number;
  energyUse: number;
  sustainabilityRisk: 'low' | 'medium' | 'high';
  materialImpact: { name: string; value: number }[];
  energyBreakdown: { name: string; value: number }[];
  recommendations?: string[];
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [results, setResults] = useState<ImpactResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleFormSubmit = async (data: ProjectData) => {
    setProjectData(data);
    setIsLoading(true);
    setResults(null);

    try {
      const apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;

      if (apiKey) {
        const aiResults = await analyzeImpactWithAI(data, apiKey);
        setResults(aiResults);
      } else {
        // Fallback to local calculation if no API key
        console.warn('No API Key found, using local calculation');
        setTimeout(() => {
          const calculatedResults = calculateImpact(data);
          setResults(calculatedResults);
          setIsLoading(false);
        }, 1000); // Simulate delay
        return;
      }
    } catch (error) {
      console.error('AI Analysis failed:', error);
      // Fallback on error
      const calculatedResults = calculateImpact(data);
      setResults(calculatedResults);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeImpactWithAI = async (data: ProjectData, apiKey: string): Promise<ImpactResults> => {
    const prompt = `
      Analyze the environmental impact of the following project details and provide a realistic estimate in JSON format.
      
      Project Details:
      - Type: ${data.projectType}
      - Size: ${data.size}
      - Location: ${data.location || 'Unknown'}
      - Materials: ${data.materials.join(', ')}
      - Energy Sources: ${data.energySources.join(', ')}
      - Description: ${data.description || 'N/A'}

      Return ONLY a valid JSON object with the exact following structure (no markdown, no extra text):
      {
        "co2Footprint": number (estimated annual CO2 footprint in tons),
        "energyUse": number (estimated annual energy use in MWh),
        "sustainabilityRisk": "low" | "medium" | "high",
        "materialImpact": [{"name": "string", "value": number (impact score 0-100)}],
        "energyBreakdown": [{"name": "string", "value": number (impact score 0-100)}],
        "recommendations": ["string"] (3-5 specific, actionable recommendations to reduce environmental impact based on the project details)
      }
    `;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          { role: 'system', content: 'You are an environmental impact analysis expert. Provide realistic, data-backed estimates in strict JSON format.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const json = await response.json();
    const content = json.choices[0].message.content;

    // Clean up potential markdown code blocks
    const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();

    return JSON.parse(cleanContent);
  };

  const calculateImpact = (data: ProjectData): ImpactResults => {
    // Mock calculation logic
    const baseImpact = {
      residential: 50,
      commercial: 120,
      industrial: 200,
      infrastructure: 150,
      agricultural: 80,
      educational: 90,
      healthcare: 140,
      hospitality: 130,
      retail: 110,
    };

    const sizeMultiplier = {
      small: 0.5,
      medium: 1,
      large: 1.8,
      'extra-large': 2.5,
    };

    const materialImpacts = {
      concrete: 45,
      steel: 35,
      wood: 10,
      glass: 20,
      recycled: 5,
      composite: 25,
      brick: 25,
      stone: 20,
      metal: 40,
      aluminum: 50,
      asphalt: 35,
      plastic: 30,
    };

    const energyImpacts = {
      solar: 10,
      wind: 12,
      'natural-gas': 60,
      coal: 90,
      hydro: 8,
      nuclear: 15,
      biomass: 18,
      geothermal: 8,
      diesel: 75,
      grid: 45,
    };

    const projectTypeKey = data.projectType as keyof typeof baseImpact;
    const sizeKey = data.size as keyof typeof sizeMultiplier;

    const baseCO2 = (baseImpact[projectTypeKey] || 100) * (sizeMultiplier[sizeKey] || 1);

    const materialTotal = data.materials.reduce((sum, mat) => {
      return sum + (materialImpacts[mat as keyof typeof materialImpacts] || 20);
    }, 0);

    const energyTotal = data.energySources.reduce((sum, energy) => {
      return sum + (energyImpacts[energy as keyof typeof energyImpacts] || 30);
    }, 0);

    const co2Footprint = Math.round(baseCO2 + materialTotal + (energyTotal / 2));
    const energyUse = Math.round((energyTotal * 1.5) + (materialTotal * 0.3));

    let sustainabilityRisk: 'low' | 'medium' | 'high' = 'low';
    if (co2Footprint > 200) sustainabilityRisk = 'high';
    else if (co2Footprint > 100) sustainabilityRisk = 'medium';

    const materialImpact = data.materials.map(mat => ({
      name: mat.charAt(0).toUpperCase() + mat.slice(1),
      value: materialImpacts[mat as keyof typeof materialImpacts] || 20,
    }));

    const energyBreakdown = data.energySources.map(energy => ({
      name: energy.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      value: energyImpacts[energy as keyof typeof energyImpacts] || 30,
    }));

    // Generate fallback recommendations based on data
    const fallbackRecommendations: string[] = [];
    if (data.energySources.includes('coal') || data.energySources.includes('diesel')) {
      fallbackRecommendations.push('Consider transitioning to renewable energy sources like solar or wind to significantly reduce CO₂ emissions.');
    }
    if (data.materials.includes('concrete') || data.materials.includes('steel')) {
      fallbackRecommendations.push('Explore using recycled or low-carbon alternatives for high-impact materials like concrete and steel.');
    }
    if (!data.materials.includes('recycled')) {
      fallbackRecommendations.push('Incorporate recycled materials where possible to reduce virgin resource consumption.');
    }
    if (sustainabilityRisk === 'high') {
      fallbackRecommendations.push('Consider reducing project size or phasing construction to minimize peak environmental impact.');
    }
    fallbackRecommendations.push('Implement energy monitoring systems to track and optimize consumption over the project lifecycle.');

    return {
      co2Footprint,
      energyUse,
      sustainabilityRisk,
      materialImpact,
      energyBreakdown,
      recommendations: fallbackRecommendations.slice(0, 5),
    };
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

        <HeroSection isDarkMode={isDarkMode} />

        <main id="analysis-form" className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="order-1 lg:order-1">
              <InputForm onSubmit={handleFormSubmit} isDarkMode={isDarkMode} />
            </div>

            <div className="order-2 lg:order-2">
              <ResultsVisualization
                results={results}
                isDarkMode={isDarkMode}
                isLoading={isLoading}
                projectData={projectData}
              />
            </div>
          </div>
        </main>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
