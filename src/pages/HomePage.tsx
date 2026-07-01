import { AccelerateButton } from "@/components/AccelerateButton"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Smartphone, ChevronRight, Share2, Signal, Zap, Pause } from "lucide-react"
import { cn } from "@/lib/utils"
import { type LineId, LINE_OPTIONS } from "@/pages/LineSelectPage"

type HomePageAction = "tasks" | "profile"

interface HomePageProps {
  isConnected: boolean
  isConnecting: boolean
  currentMode: "global" | "app"
  currentLine: LineId
  selectedApps: string[]
  connectedSeconds: number
  formatTimer: (secs: number) => string
  onToggleConnect: () => void
  onNavigate: (page: HomePageAction) => void
  onOpenModeSelect: () => void
  onOpenLineSelect: () => void
  onOpenShare: () => void
}

export function HomePage({
  isConnected,
  isConnecting,
  currentMode,
  currentLine,
  selectedApps,
  connectedSeconds,
  formatTimer,
  onToggleConnect,
  onOpenModeSelect,
  onOpenLineSelect,
  onOpenShare,
}: HomePageProps) {

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full bg-primary/5 blur-[80px]" />

      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-base font-bold text-gradient-cyan">飞鱼加速器</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Share button */}
          <button
            onClick={onOpenShare}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/15 to-accent/15 border border-primary/20 hover:border-primary/40 transition-all duration-200 active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">送会员</span>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-status-connected animate-pulse" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col px-5">
        {/* Status badge - top */}
        <div className="flex justify-center mt-4 mb-2">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            isConnected
              ? "bg-status-connected/10 border border-status-connected/20"
              : isConnecting
              ? "bg-primary/10 border border-primary/20"
              : "bg-primary/8 border border-primary/15"
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isConnected
                ? "bg-status-connected animate-pulse"
                : isConnecting
                ? "bg-primary animate-pulse"
                : "bg-primary"
            }`} />
            <span className={`text-sm font-medium ${
              isConnected
                ? "text-status-connected"
                : isConnecting
                ? "text-primary"
                : "text-primary"
            }`}>
              {isConnected
                ? `加速中 ${formatTimer(connectedSeconds)}`
                : isConnecting
                ? "连接中..."
                : "准备就绪"
              }
            </span>
          </div>
        </div>

        {/* Rocket animation - between status and button */}
        <div className="flex justify-center mt-2">
          <AccelerateButton
            isConnected={isConnected}
            isConnecting={isConnecting}
            onToggle={onToggleConnect}
            hideButton
          />
        </div>

        {/* Small spacer */}
        <div className="flex-1 max-h-[24px]" />

        {/* Accelerate button - close to cards */}
        <div className="flex justify-center mb-4">
          <button
            onClick={onToggleConnect}
            className={cn(
              "w-[85%] max-w-[360px] h-[55px] rounded-2xl flex items-center justify-center gap-2.5",
              "text-lg font-normal tracking-wide transition-all duration-300 active:scale-[0.96]",
              isConnected
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_4px_30px_hsl(150_80%_50%/0.3)]"
                : isConnecting
                ? "bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-[0_4px_30px_hsl(190_100%_50%/0.25)]"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-[0_4px_30px_hsl(200_80%_50%/0.3)]"
            )}
          >
            {isConnected ? <Pause className="w-5 h-5" fill="white" /> : <Zap className="w-5 h-5" fill="white" />}
            <span>
              {isConnected ? "停止加速" : isConnecting ? "连接中..." : "立即提速"}
            </span>
          </button>
        </div>
      </div>

      {/* Info cards */}
      <div className="relative z-10 px-5 space-y-4 pb-24 animate-fade-in">
        {/* Mode & Line row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Current mode card */}
          <Card className="glass-card border-0 cursor-pointer hover:bg-muted/30 transition-colors" onClick={onOpenModeSelect}>
            <CardContent className="p-3.5 flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                currentMode === "global" ? "bg-primary/10" : "bg-accent/10"
              }`}>
                {currentMode === "global" ? (
                  <Globe className="w-4 h-4 text-primary" />
                ) : (
                  <Smartphone className="w-4 h-4 text-accent" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-muted-foreground">模式</p>
                <p className="text-xs font-medium text-foreground truncate">
                  {currentMode === "global" ? "全局加速" : `应用加速(${selectedApps.length})`}
                </p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            </CardContent>
          </Card>

          {/* Current line card */}
          <Card className="glass-card border-0 cursor-pointer hover:bg-muted/30 transition-colors" onClick={onOpenLineSelect}>
            <CardContent className="p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Signal className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-muted-foreground">线路</p>
                <p className="text-xs font-medium text-foreground truncate">
                  {LINE_OPTIONS.find((l) => l.id === currentLine)?.name ?? "智能优选"}
                </p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>

        {/* Ad banner placeholder */}
        <Card className="glass-card border-0 overflow-hidden">
          <div className="p-4 flex items-center justify-center min-h-[80px] border border-dashed border-muted-foreground/20 rounded-xl mx-3 my-3">
            <span className="text-xs text-muted-foreground/50">广告位预留</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
