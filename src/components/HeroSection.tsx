import { Leaf, Zap, BarChart3, Brain } from 'lucide-react';

interface HeroSectionProps {
    isDarkMode: boolean;
}

export function HeroSection({ isDarkMode }: HeroSectionProps) {
    const scrollToForm = () => {
        document.getElementById('project-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative overflow-hidden py-16 md:py-24">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-gray-900 dark:to-gray-900 -z-10" />

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400/20 dark:bg-teal-500/10 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center max-w-3xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mb-6">
                        <Brain className="size-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                            Powered by AI
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Understand Your Project's{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                            Environmental Impact
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        Get instant AI-powered analysis of your project's carbon footprint, energy consumption,
                        and sustainability risk. Make informed decisions for a greener future.
                    </p>

                    {/* CTA Button */}
                    {/* <button
                        onClick={scrollToForm}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        <Leaf className="size-5" />
                        Start Your Analysis
                    </button> */}
                </div>

                {/* Feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    <div className="text-center p-6 bg-white/80 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="inline-flex p-4 bg-blue-100 dark:bg-blue-900/40 rounded-xl mb-4">
                            <BarChart3 className="size-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">CO₂ Footprint</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Estimate annual carbon emissions based on your project specifications
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white/80 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="inline-flex p-4 bg-purple-100 dark:bg-purple-900/40 rounded-xl mb-4">
                            <Zap className="size-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Energy Analysis</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Understand your energy consumption and source distribution
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white/80 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="inline-flex p-4 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl mb-4">
                            <Brain className="size-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">AI-Powered</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Intelligent analysis that understands context and provides realistic estimates
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
