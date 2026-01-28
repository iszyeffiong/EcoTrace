import { Heart, Globe, Mail } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

export function Footer({ isDarkMode }: FooterProps) {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-12 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Heart className="size-4 text-emerald-600 dark:text-emerald-400" />
              About This Tool
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quick environmental impact assessment for construction and infrastructure projects.
              Make informed decisions for a sustainable future.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Globe className="size-4 text-emerald-600 dark:text-emerald-400" />
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Methodology
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Best Practices
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Sustainability Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Mail className="size-4 text-emerald-600 dark:text-emerald-400" />
              Get in Touch
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Have questions or suggestions?
            </p>
            <a
              href="mailto:info@envimpact.com"
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              info@envimpact.com
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2026 EcoTrace. Built with sustainability in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
