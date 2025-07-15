import { Play, Heart } from 'lucide-react'

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg">
          <Play className="h-4 w-4 text-white fill-white ml-0.5" />
        </div>
        <Heart className="absolute -top-1 -right-1 h-3 w-3 text-accent fill-accent" />
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PassionHub
          </span>
          <span className="text-xs text-muted-foreground -mt-1">
            Premium Content
          </span>
        </div>
      )}
    </div>
  )
}