import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Crown, Sparkles, Copy, Check } from "lucide-react"

interface SharePageProps {
  onBack: () => void
}

export function SharePage({ onBack }: SharePageProps) {
  const [copied, setCopied] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)

  const shareUrl = "https://ffish.cc/i/8k2m9x"
  const inviteCode = "12345678"
  const shareText = `我在用飞鱼加速器，永久免费！一键畅游全球，现在注册还有新人礼包🎁 ${shareUrl}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode).catch(() => {})
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2000)
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
        <h2 className="text-lg font-bold text-foreground">分享好友</h2>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-6 pb-8">

        {/* Hero - vertical centered */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-status-warning/20 to-primary/20 flex items-center justify-center">
              <Crown className="w-7 h-7 text-status-warning" />
            </div>
            <div className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-status-connected flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-primary-foreground" />
            </div>
          </div>
          <h3 className="text-base font-bold text-foreground mt-3">邀请好友，双方各得奖励</h3>
          <p className="text-xs text-muted-foreground mt-0.5">好友注册即送积分，赚的你也得</p>
        </div>

        {/* Invite code card */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10">
            <div className="flex items-center gap-3">
              <span className="text-xs text-foreground/50">我的邀请码</span>
              <span className="text-base font-bold tracking-wider text-status-warning">{inviteCode}</span>
            </div>
            <button
              onClick={handleCopyCode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 active:scale-95 ${
                codeCopied
                  ? "bg-status-connected/15 text-status-connected"
                  : "bg-status-warning/10 text-status-warning hover:bg-status-warning/20"
              }`}
            >
              {codeCopied ? (
                <><Check className="w-3.5 h-3.5" />已复制</>
              ) : (
                <><Copy className="w-3.5 h-3.5" />复制</>
              )}
            </button>
          </div>
        </div>

        {/* Share button */}
        <div className="mb-8">
          <button
            onClick={handleCopy}
            className={`w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-200 active:scale-[0.98] ${
              copied
                ? "bg-status-connected/15 text-status-connected border border-status-connected/20"
                : "bg-gradient-to-r from-status-warning via-primary to-accent text-primary-foreground hover:opacity-90"
            }`}
          >
            {copied ? "已复制到剪贴板" : "复制邀请文案，分享给好友"}
          </button>
        </div>

        {/* Rule highlight */}
        <Card className="overflow-hidden border-0 relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-status-warning/8 via-primary/5 to-accent/8" />
          <CardContent className="p-5 relative z-10">
            {/* Rule 1 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-status-warning/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-status-warning">+100</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">邀请注册送多100 积分</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  好友注册登录，进入「免费会员→领取邀请奖励→输入邀请码」，立即再获赠 <span className="text-primary font-medium">100 积分</span>
                </p>
              </div>
            </div>

            <div className="h-px bg-border/20 my-4" />

            {/* Rule 2 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">1:1</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">好友赚积分，等额返你</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  <span className="text-primary font-medium">30 天内</span>好友获取的所有积分，等额同步赠送给你，上不封顶
                </p>
              </div>
            </div>

            {/* Note */}
            <div className="mt-4 pt-3 border-t border-border/20">
              <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
                * 普通用户自行注册仅送 50 积分，通过邀请注册可再多拿 100 积分
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Steps - with more breathing room */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-muted-foreground/70 mb-4">参与方式</p>
          <div className="space-y-5">
            {[
              { step: 1, title: "分享链接", desc: "复制邀请链接，发给好友", color: "bg-primary/10 text-primary" },
              { step: 2, title: "好友注册登录兑换", desc: "下载飞鱼并登录兑换，再得100积分", color: "bg-accent/10 text-accent" },
              { step: 3, title: "好友赚积分", desc: "30天内好友赚的，1:1返你", color: "bg-status-warning/10 text-status-warning" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <span className="text-sm font-bold">{item.step}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
