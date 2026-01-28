import { Moon, Sun, Leaf } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function Header({ isDarkMode, onToggleTheme }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800 shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 w-full">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm shrink-0">
              <Leaf className="size-6 md:size-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-3xl font-bold text-white leading-tight break-words">
                EcoTrace
              </h1>
              <p className="text-emerald-50 text-xs md:text-sm mt-1 truncate">
                Assess your project's environmental footprint
              </p>
            </div>
          </div>

          <button
            onClick={onToggleTheme}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-200 group"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="size-6 text-yellow-200 group-hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="size-6 text-white group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
