"use client"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image' // 1. Import Next.js Image component
import { Menu, X, Search, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-xl bg-white/30 border-b border-white/30 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Center: Logo Image */}
        {/* Used 'flex justify-center' to align the image perfectly */}
        <div className="flex-1 flex justify-center select-none">
          <Link href="https://www.arlox.io/">
          <Image
            src="/arlox_logo_black.png"     // Replace with your actual file path in /public
            alt="Arlox Logo"
            width={120}           // Adjust width based on your logo's aspect ratio
            height={40}           // Adjust height based on your logo's aspect ratio
            className="h-8 w-auto object-contain" // Keeps it constrained to navbar height
            priority              // Loads image immediately (good for LCP)
          />
          </Link>
        </div>
      </div>
    </nav>
  )
}