'use client'

import Image from 'next/image'
import Link from 'next/link'

export const Footer = () => {
  // Versione dell'app - in futuro potrebbe venire da env o package.json
  const APP_VERSION = '1.0.0'

  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-screen-2xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* EU Funding Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Image
              src="/images/EN-Co-Funded-by-the-EU_POS.png"
              alt="Co-funded by the European Union"
              width={150}
              height={75}
              className="object-contain"
            />
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
              Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them. Project number: 2024-1-IT02-KA220-ADU-000247623
            </p>
          </div>

          {/* Privacy Policy Link */}
          <div className="flex flex-col items-start lg:items-end gap-2">
            <Link 
              href="https://meetyourcolleague.eu/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link 
              href="https://19.coop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 dark:text-slate-500 hover:underline"
            >
              By 19.coop | Handbook {APP_VERSION}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}