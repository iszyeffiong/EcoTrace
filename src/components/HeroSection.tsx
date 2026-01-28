import { Leaf, Zap, BarChart3, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
    isDarkMode: boolean;
}

export function HeroSection({ isDarkMode }: HeroSectionProps) {
    const scrollToForm = () => {
        const formElement = document.getElementById('analysis-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative overflow-hidden py-16 md:py-24">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-950/30 dark:to-gray-900 -z-10" />

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300/20 dark:bg-teal-500/10 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <Leaf className="size-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                            AI-Powered Environmental Analysis
                        </span>
                    </div>

                    {/* Main headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                        Understand Your Project's
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                            Environmental Impact
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        EcoTrace uses advanced AI to instantly analyze your project's carbon footprint,
                        energy consumption, and sustainability risks — helping you make greener decisions
                        before you start.
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-md">
                                <BarChart3 className="size-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">CO₂ Estimation</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/40 rounded-md">
                                <Zap className="size-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Energy Analysis</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                            <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-md">
                                <Leaf className="size-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Recommendations</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-6">
                        <button
                            onClick={scrollToForm}
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Start Your Analysis
                            <ArrowDown className="size-5 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>

                    {/* Trust indicators */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 pt-4">
                        ✓ Free to use &nbsp;&nbsp; ✓ No signup required &nbsp;&nbsp; ✓ Instant results
                    </p>
                </div>
            </div>
        </section>
    );
}
