export default function Footer() {
  return (
    <footer className="border-t border-dark-600/30 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              Made with ❤️ by{" "}
              <span className="text-violet-400 font-medium">Mir Mubashir</span>
            </p>
            <p className="text-gray-500 text-xs mt-0.5">
              Follow me on{" "}
              <a
                href="https://instagram.com/your_instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Instagram
              </a>
            </p>
          </div>
          <a
            href="https://www.binance.com/en/pay"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 hover:text-amber-200 transition-all duration-200 text-sm font-medium group"
          >
            <span className="text-lg">☕</span>
            Gift a cup of tea
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
