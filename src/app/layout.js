import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Arlox Vault - Ecommerce Playbook',
  description: 'US vs India Homepage Strategy',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-slate-50 text-[#385179]">
        
        <main className="">{children}</main>
      </body>
    </html>
  )
}