import { cn } from "@/lib/utils"
import { Zap, Crown, User } from "lucide-react"

export type PageKey = "home" | "tasks" | "profile"

interface BottomNavProps {
  current: PageKey
  onNavigate: (page: PageKey) => void
}

const navItems: { key: PageKey; label: string; icon: React.ElementType }[] = [
  { key: "home", label: "加速", icon: Zap },
  { key: "tasks", label: "免费会员", icon: Crown },
  { key: "profile", label: "我的", icon: User },
]

export function BottomNav({ current, onNavigate }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40">
      <div className="glass-card border-t border-border/50 px-2 pb-6 pt-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = current === item.key
            const Icon = item.icon
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-all duration-200",
                    isActive && "drop-shadow-[0_0_6px_hsl(190_100%_50%/0.5)]"
                  )}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <span className={cn(
                  "text-[10px] font-medium",
                  isActive && "text-primary"
                )}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
