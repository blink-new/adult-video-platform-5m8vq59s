import { useState } from 'react'
import { User, Settings, Upload, Heart, History, LogOut, Crown } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Badge } from './ui/badge'

interface UserMenuProps {
  user: {
    name: string
    email: string
    avatar?: string
    isPremium?: boolean
  } | null
  onLogin: () => void
  onLogout: () => void
}

export function UserMenu({ user, onLogin, onLogout }: UserMenuProps) {
  if (!user) {
    return (
      <Button onClick={onLogin} className="bg-primary hover:bg-primary/90">
        Sign In
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {user.isPremium && (
            <Crown className="absolute -top-1 -right-1 h-4 w-4 text-accent fill-accent" />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              {user.isPremium && (
                <Badge variant="secondary" className="text-xs bg-accent/20 text-accent">
                  Premium
                </Badge>
              )}
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Heart className="mr-2 h-4 w-4" />
          <span>Favorites</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <History className="mr-2 h-4 w-4" />
          <span>Watch History</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Upload className="mr-2 h-4 w-4" />
          <span>Upload Content</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        {!user.isPremium && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-accent">
              <Crown className="mr-2 h-4 w-4" />
              <span>Upgrade to Premium</span>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={onLogout} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}