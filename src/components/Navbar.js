"use client"
import { useState } from 'react'
import { Menu, X, Search, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-xl bg-white/30 border-b border-white/30 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md hover:bg-white/50 transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Center: Logo */}
        <div className="flex-1 text-center pointer-events-none select-none">
          <h1 className="text-2xl font-extrabold text-[#385179] drop-shadow-lg font-sans tracking-tight">
            Arlox
          </h1>
        </div>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full hover:bg-white/50 transition"
            aria-label="Search"
          >
            <Search size={20} className="text-[#385179]" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-white/50 transition"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={20} className="text-[#385179]" />
          </button>
          <Button
            variant="outline"
            className="text-[#385179] border-[#385179] hover:bg-[#385179] hover:text-white transition px-4 py-2 rounded-lg font-semibold hidden sm:block"
          >
            Start Scaling
          </Button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="sm:hidden bg-white/70 backdrop-blur-md border-t border-white/30 shadow-inner">
          <div className="flex flex-col space-y-1 py-4">
            <a href="#" className="block px-6 py-2 text-[#385179] font-medium hover:bg-[#385179] hover:text-white rounded-lg transition">
              Solutions
            </a>
            <a href="#" className="block px-6 py-2 text-[#385179] font-medium hover:bg-[#385179] hover:text-white rounded-lg transition">
              Programs
            </a>
            <a href="#" className="block px-6 py-2 text-[#385179] font-medium hover:bg-[#385179] hover:text-white rounded-lg transition">
              Playbook
            </a>
            <Button className="mx-6 mt-3 px-6 py-3 text-base font-semibold rounded-lg text-white bg-[#385179] hover:bg-[#2a3c58] transition">
              Start Scaling
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
