import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Clock, Coins, CheckCircle2 } from "lucide-react"

interface PointsExchangePageProps {
  points: number
  memberMinutes: number
  onBack: () => void
  onExchange: (costPoints: number, minutes: number) => void
}

interface MembershipProduct {
  id: string
  duration: number
  durationLabel: string
  costPoints: number
  popular?: boolean
}

const PRODUCTS: MembershipProduct[] = [
  { id: "30min", duration: 30, durationLabel: "30分钟", costPoints: 30 },
  { id: "1h", duration: 60, durationLabel: "1小时", costPoints: 60, popular: true },
  { id: "24h", duration: 1440, durationLabel: "24小时", costPoints: 1200 },
  { id: "7d", duration: 10080, durationLabel: "7天", costPoints: 7200 },
]

export function PointsExchangePage({ points, memberMinutes: _memberMinutes, onBack, onExchange }: PointsExchangePageProps) {
  const [exchanging, setExchanging] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleExchange = (product: MembershipProduct) => {
    if (points < product.costPoints) return
    setExchanging(product.id)
    setTimeout(() => {
      onExchange(product.costPoints, product.duration)
      setExchanging(null)
      setSuccess(product.id)
      setTimeout(() => setSuccess(null), 2000)
    }, 600)
  }

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-status-warning/5 blur-[80px]" />

      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-2 flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-foreground">积分兑换</h2>
      </div>

      {/* Points card */}
      <div className="relative z-10 px-5 pt-5">
        <Card className="overflow-hidden border-0 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-status-warning/10 via-ocean-mid to-primary/5" />
          <CardContent className="p-5 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-status-warning" />
                  <span className="text-sm text-muted-foreground">我的积分</span>
                </div>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {points}
                  <span className="text-sm font-normal text-muted-foreground ml-1.5">积分</span>
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-status-warning/10 flex items-center justify-center">
                <Coins className="w-7 h-7 text-status-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product list */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-5 pb-8 space-y-4">
        <p className="text-xs text-muted-foreground/70 font-medium px-1">选择兑换时长</p>

        {PRODUCTS.map((product) => {
          const canAfford = points >= product.costPoints
          const isExchanging = exchanging === product.id
          const isSuccess = success === product.id
          const isDisabled = !canAfford || isExchanging

          return (
            <Card
              key={product.id}
              className={`glass-card border-0 relative overflow-hidden transition-all duration-200 ${
                canAfford ? "hover:bg-muted/30 cursor-pointer" : "opacity-60"
              } ${isSuccess ? "border-status-connected/30" : ""}`}
              onClick={() => !isDisabled && handleExchange(product)}
            >
              {product.popular && (
                <div className="absolute top-0 right-0 bg-status-warning/90 text-primary-foreground text-[9px] font-bold px-2.5 py-0.5 rounded-bl-lg">
                  热门
                </div>
              )}
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      canAfford ? "bg-primary/10" : "bg-muted/50"
                    }`}>
                      <Clock className={`w-5 h-5 ${canAfford ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{product.durationLabel}会员</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Coins className="w-3 h-3 text-status-warning" />
                        <span className="text-xs font-medium text-status-warning">{product.costPoints} 积分</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {isSuccess ? (
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-status-connected/10 text-status-connected text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        兑换成功
                      </div>
                    ) : isExchanging ? (
                      <div className="px-3.5 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium animate-pulse">
                        兑换中...
                      </div>
                    ) : canAfford ? (
                      <div className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-ocean-surface to-accent text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">
                        兑换
                      </div>
                    ) : (
                      <div className="px-3.5 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs">
                        积分不足
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* Tips */}
        <div className="mt-6 px-1">
          <p className="text-[10px] text-muted-foreground/50 leading-relaxed text-center">
            积分永不过期 &middot; 兑换后会员时长立即生效 &middot; 会员时长从兑换时刻开始计算
          </p>
        </div>
      </div>
    </div>
  )
}
