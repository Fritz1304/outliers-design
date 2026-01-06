export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-white tracking-tighter">OUTLIERS</span>
            <p className="text-sm mt-1">Design that breaks the norm.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Outliers Design. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
