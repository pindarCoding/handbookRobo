'use client'

export const Footer = () => {
  // Versione dell'app - in futuro potrebbe venire da env o package.json
  const APP_VERSION = '1.0.0'
  const CURRENT_YEAR = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-screen-2xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-600 dark:text-slate-400">
          {/* Copyright */}
          <div className="text-center sm:text-left">
            © {CURRENT_YEAR} MyCo Handbook. Powered by 19Coop - EU Project XXX . | v{APP_VERSION}
          </div>
                    
        </div>
      </div>
    </footer>
  )
}