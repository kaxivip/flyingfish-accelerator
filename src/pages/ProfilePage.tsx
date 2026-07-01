import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronRight,
  Share2,
  Settings,
  HelpCircle,
  MessageCircle,
  User,
  LogIn,
} from "lucide-react"
import type { PageKey } from "@/components/BottomNav"

interface ProfilePageProps {
  isLoggedIn: boolean
  points: number
  memberMinutes: number
  onLogin: () => void
  onNavigate: (page: PageKey) => void
  onOpenSettings: () => void
  onOpenShare: () => void
  onOpenHelp: () => void
}

export function ProfilePage({ isLoggedIn, onLogin, onOpenSettings, onOpenShare, onOpenHelp }: ProfilePageProps) {
  const menuItems = [
    {
      icon: Share2,
      label: "分享好友",
      color: "text-primary",
      bg: "bg-primary/10",
      badge: "送会员",
      action: onOpenShare,
    },
    {
      icon: HelpCircle,
      label: "帮助中心",
      color: "text-status-warning",
      bg: "bg-status-warning/10",
      action: onOpenHelp,
    },
    {
      icon: MessageCircle,
      label: "意见反馈",
      color: "text-secondary-foreground",
      bg: "bg-secondary",
      action: () => {},
    },
    {
      icon: Settings,
      label: "设置",
      color: "text-muted-foreground",
      bg: "bg-muted",
      action: onOpenSettings,
    },
  ]

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />

      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-2">
        <h2 className="text-xl font-bold text-foreground">我的</h2>
      </div>

      {/* User card */}
      <div className="relative z-10 px-5 pt-5">
        <Card className="overflow-hidden border-0 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-ocean-mid to-accent/5" />
          <CardContent className="p-5 relative z-10">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden">
                    <img src="/images/logo_icon.png" alt="logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">186****8888</p>
                    <p className="text-xs text-primary/70 mt-0.5 font-mono">UID: 10086428</p>
                  </div>
                </div>

              </>
            ) : (
              <>
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={onLogin}
                >
                  <div className="w-14 h-14 rounded-2xl bg-muted/30 flex items-center justify-center">
                    <User className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-foreground">未登录</p>
                    <p className="text-sm text-muted-foreground mt-0.5">登录后享更多权益</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Menu list */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-5 pb-28">
        <Card className="glass-card border-0 overflow-hidden">
          <CardContent className="p-0">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={item.label}>
                  <button
                    onClick={item.action}
                    className="w-full flex items-center gap-3.5 px-4 py-4 hover:bg-muted/20 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="flex-1 text-left text-sm text-foreground">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-md">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  {index < menuItems.length - 1 && (
                    <div className="ml-[62px] mr-4 border-b border-white/8" />
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Login button - only show when not logged in */}
        {!isLoggedIn && (
          <button
            onClick={onLogin}
            className="mt-4 w-full h-[55px] rounded-xl bg-gradient-to-r from-ocean-surface to-accent text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            立即登录
          </button>
        )}

      </div>
    </div>
  )
}
