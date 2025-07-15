import React from 'react'

interface PornLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const PornLogo: React.FC<PornLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-auto',
    md: 'h-8 w-auto',
    lg: 'h-12 w-auto'
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Icon/Symbol */}
      <div className="relative">
        <svg
          className={`${sizeClasses[size]} text-primary`}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle */}
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Play button triangle */}
          <path
            d="M16 12L28 20L16 28V12Z"
            fill="currentColor"
          />
          
          {/* Accent dots */}
          <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="32" cy="8" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="8" cy="32" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.6" />
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className={`font-bold text-primary leading-none ${
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
        }`}>
          RedTube
        </span>
        <span className={`text-accent font-medium leading-none ${
          size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
        }`}>
          Premium
        </span>
      </div>
    </div>
  )
}