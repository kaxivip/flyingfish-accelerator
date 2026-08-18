import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface SplashAdPageProps {
  onFinish: () => void
}

export function SplashAdPage({ onFinish }: SplashAdPageProps) {
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      {/* Top 5/6 - Ad content area */}
      <div className="relative flex-[5] w-full bg-gradient-to-b from-red-500 via-orange-400 to-yellow-300 flex flex-col items-center justify-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-8 left-4 w-20 h-20 rounded-full bg-white/10 blur-xl" />
        <div className="absolute bottom-12 right-6 w-32 h-32 rounded-full bg-yellow-200/20 blur-2xl" />
        <div className="absolute top-1/3 right-8 w-12 h-12 rounded-full bg-white/15 blur-lg" />

        {/* Ad mock content */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-2 border border-white/30">
            <span className="text-white text-sm font-medium tracking-wide">限时推广</span>
          </div>
          <h1 className="text-4xl font-black text-white drop-shadow-lg tracking-wider text-center leading-tight">
            惊喜来袭
          </h1>
          <p className="text-white/90 text-base text-center leading-relaxed max-w-[240px]">
            新用户专享超值福利<br />立即下载体验极速网络
          </p>
          <div className="mt-4 bg-white rounded-full px-8 py-3 shadow-lg shadow-orange-500/30">
            <span className="text-orange-500 font-bold text-sm">查看详情</span>
          </div>
        </div>

        {/* Skip button - top right */}
        <button
          onClick={onFinish}
          className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white text-xs hover:bg-black/50 transition-colors"
        >
          <X className="w-3 h-3" />
          跳过 {countdown > 0 ? `${countdown}s` : ""}
        </button>

        {/* Ad label */}
        <div className="absolute bottom-3 left-3 z-10 px-2 py-0.5 rounded bg-black/30 backdrop-blur-sm">
          <span className="text-[9px] text-white/80">广告</span>
        </div>
      </div>

      {/* Bottom 1/6 - Brand info (Scheme I: 深底 + 蓝白渐变) */}
      <div
        className="flex-[1] w-full flex flex-col items-center justify-center gap-1.5 border-t border-white/5"
        style={{ background: 'linear-gradient(180deg, #0a1628, #0d1f3c)' }}
      >
        <span
          className="text-2xl font-black tracking-[0.3em]"
          style={{ background: 'linear-gradient(135deg, #60a5fa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          真免费 真加速
        </span>
        <span className="text-[9px] text-white/20">沪ICP备10215341号-35A</span>
      </div>
    </div>
  )
}
