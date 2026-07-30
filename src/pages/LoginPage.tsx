import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Shield, Smartphone } from "lucide-react"

interface LoginPageProps {
  onLogin: (inviteCode?: string) => void
  onBack: () => void
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [loginType, setLoginType] = useState<"quick" | "sms">("quick")
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [showAgreement, setShowAgreement] = useState<"privacy" | "service" | null>(null)
  const [inviteCode, setInviteCode] = useState("")
  const [showInviteInput, setShowInviteInput] = useState(false)

  const handleSendCode = () => {
    if (countdown > 0 || phone.length < 11) return
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const canLogin = agreed && (
    loginType === "quick" || (loginType === "sms" && phone.length === 11 && code.length === 6)
  )

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-primary/5 blur-[100px]" />

      {/* Header */}
      <div className="relative z-10 pt-14 px-6">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-6 pt-6 flex flex-col animate-fade-in">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden glow-primary mb-4">
            <img src="./images/fy-logo001.png" alt="飞鱼加速器" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-bold text-foreground">欢迎登录</h2>
          <p className="text-sm text-muted-foreground mt-1">登录后即可享受免费加速服务</p>
        </div>

        {/* Login type tabs */}
        <div className="flex gap-1 p-1 bg-muted/50 rounded-xl mb-6">
          <button
            onClick={() => setLoginType("quick")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              loginType === "quick"
                ? "bg-ocean-surface text-primary-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            一键登录
          </button>
          <button
            onClick={() => setLoginType("sms")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              loginType === "sms"
                ? "bg-ocean-surface text-primary-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            短信登录
          </button>
        </div>

        {/* Quick login */}
        {loginType === "quick" && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="glass-card rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground font-medium">本机号码一键登录</p>
                <p className="text-xs text-muted-foreground mt-0.5">186****8888</p>
              </div>
              <Shield className="w-4 h-4 text-status-connected" />
            </div>
          </div>
        )}

        {/* SMS login */}
        {loginType === "sms" && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="glass-card rounded-xl px-4 py-3.5 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">+86</span>
              <div className="w-px h-5 bg-border" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                placeholder="请输入手机号"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
                maxLength={11}
              />
            </div>
            <div className="glass-card rounded-xl px-4 py-3.5 flex items-center gap-3">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="请输入验证码"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
                maxLength={6}
              />
              <button
                onClick={handleSendCode}
                disabled={countdown > 0 || phone.length < 11}
                className="text-sm text-primary whitespace-nowrap disabled:text-muted-foreground disabled:opacity-50"
              >
                {countdown > 0 ? `${countdown}s` : "获取验证码"}
              </button>
            </div>
          </div>
        )}

        {/* Invitation code */}
        <div className="mt-5 animate-fade-in">
          {!showInviteInput ? (
            <button
              onClick={() => setShowInviteInput(true)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground/70 hover:text-primary transition-colors"
            >
              <span className="text-status-warning">🎁</span>
              <span>有邀请码？首次注册送100积分</span>
              <ChevronLeft className="w-3 h-3 rotate-[-90deg]" />
            </button>
          ) : (
            <div className="space-y-2">
              <div className="glass-card rounded-xl px-4 py-3.5 flex items-center gap-3">
                <span className="text-status-warning text-sm">🎁</span>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.trim())}
                  placeholder="请输入邀请码（首次注册送100积分）"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
                  maxLength={20}
                />
                {inviteCode && (
                  <button
                    onClick={() => setInviteCode("")}
                    className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground/50 px-1">
                首次登录注册，输入邀请码即送100积分
              </p>
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Agreement */}
        <div className="flex items-start gap-2 mb-4">
          <button
            onClick={() => setAgreed(!agreed)}
            className={`w-4 h-4 mt-0.5 rounded-[4px] border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
              agreed
                ? "bg-primary border-primary"
                : "border-muted-foreground/40"
            }`}
          >
            {agreed && (
              <svg className="w-2.5 h-2.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <p className="text-xs text-muted-foreground leading-relaxed">
            我已阅读并同意
            <button onClick={() => setShowAgreement("privacy")} className="text-primary hover:underline">《隐私协议》</button>
            和
            <button onClick={() => setShowAgreement("service")} className="text-primary hover:underline">《服务协议》</button>
          </p>
        </div>

        {/* Login button */}
        <Button
          onClick={() => onLogin(inviteCode.trim() || undefined)}
          disabled={!canLogin}
          variant="ocean"
          size="lg"
          className="w-full rounded-xl mb-5"
        >
          {loginType === "quick" ? "本机号码一键登录" : "登录"}
        </Button>

        {/* Third-party login */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border/30" />
            <span className="text-xs text-muted-foreground/50">其他方式登录</span>
            <div className="flex-1 h-px bg-border/30" />
          </div>
          <div className="flex justify-center gap-6">
            {/* WeChat */}
            <button
              onClick={() => onLogin()}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#07c160]/10 border border-[#07c160]/20 group-hover:bg-[#07c160]/20 group-active:scale-95 transition-all">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#07c160">
                  <path d="M8.5 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 2C6.48 2 2 6.03 2 11c0 2.7 1.28 5.12 3.3 6.79L4.5 21l3.58-1.79A10.6 10.6 0 0 0 12 20c5.52 0 10-4.03 10-9s-4.48-9-10-9zm5.5 13.5c-.28.77-1.47 1.41-2.38 1.6-.63.12-1.44.22-4.2-.9-2.97-1.2-4.87-4.15-5.01-4.34-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.08 1-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .54.01.18 0 .41-.07.65.49.24.57.8 1.97.87 2.11.07.14.12.31.02.5-.09.18-.14.3-.28.46-.14.16-.3.36-.42.48-.14.14-.29.29-.12.57.16.28.73 1.2 1.57 1.94 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.6-.07.17-.19.7-.81.89-1.09.18-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.2.53.32.07.13.07.74-.21 1.52z"/>
                </svg>
              </div>
              <span className="text-[10px] text-muted-foreground">微信</span>
            </button>

            {/* QQ */}
            <button
              onClick={() => onLogin()}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#12b7f5]/10 border border-[#12b7f5]/20 group-hover:bg-[#12b7f5]/20 group-active:scale-95 transition-all">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#12b7f5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.93 13.67c-.17.49-.94 1.72-1.2 2.07-.12.16-.33.19-.48.07a5.76 5.76 0 0 0-.75-.46c-.79.58-1.65.89-2.5.89s-1.71-.31-2.5-.89c-.24.14-.5.3-.75.46-.15.12-.36.09-.48-.07-.26-.35-1.03-1.58-1.2-2.07-.11-.3.09-.56.38-.47.18.06.55.18.95.26C8.06 15.41 8 15.23 8 15c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .23-.06.41-.4.93.4-.08.77-.2.95-.26.29-.09.49.17.38.47zM12 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                </svg>
              </div>
              <span className="text-[10px] text-muted-foreground">QQ</span>
            </button>

            {/* Douyin */}
            <button
              onClick={() => onLogin()}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center bg-white/8 border border-white/15 group-hover:bg-white/12 group-active:scale-95 transition-all">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.75a4.85 4.85 0 0 1-1.02-.06z"/>
                </svg>
              </div>
              <span className="text-[10px] text-muted-foreground">抖音</span>
            </button>

            {/* Weibo */}
            <button
              onClick={() => onLogin()}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#e6162d]/10 border border-[#e6162d]/20 group-hover:bg-[#e6162d]/20 group-active:scale-95 transition-all">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#e6162d">
                  <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zm6.537-9.99c-.405-.107-.68-.18-.469-.648.458-1.094.505-2.038.009-2.71-.918-1.245-3.431-1.178-6.312-.01 0 0-.903.395-.672-.32.441-1.422.374-2.614-.312-3.305-1.556-1.558-5.7.059-9.259 3.609C1.665 9.566 0 12.3 0 14.734c0 4.588 5.894 7.381 11.67 7.381 7.568 0 12.604-4.4 12.604-7.89 0-2.109-1.781-3.308-3.527-3.826l-.112-.066zM21.802 8.03c-.748-.837-1.85-1.156-2.868-.919-.429.103-.695.533-.592.962.104.429.534.695.963.592.477-.114.996.041 1.35.45.353.41.448.956.281 1.442-.149.434.082.904.517 1.052.434.149.904-.082 1.052-.517.38-1.102.127-2.325-.703-3.062zm-2.522-2.638c-1.486-1.664-3.677-2.296-5.703-1.823-.441.104-.712.548-.608.988.104.441.548.712.988.608 1.45-.341 3.013.12 4.078 1.303 1.066 1.184 1.361 2.798.818 4.209-.162.437.062.92.499 1.081.437.162.92-.062 1.081-.499.745-2.007.329-4.303-1.153-5.867z"/>
                </svg>
              </div>
              <span className="text-[10px] text-muted-foreground">微博</span>
            </button>
          </div>
        </div>

      </div>

      {/* Agreement modal */}
      {showAgreement && (
        <div className="absolute inset-0 z-50 bg-background/95 flex flex-col animate-fade-in">
          <div className="pt-14 px-6">
            <button onClick={() => setShowAgreement(null)} className="text-muted-foreground hover:text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="px-6 pt-4 flex-1 overflow-auto">
            <h3 className="text-lg font-bold mb-4">
              {showAgreement === "privacy" ? "隐私协议" : "服务协议"}
            </h3>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                更新日期：2026年1月1日
              </p>
              <p>
                飞鱼加速器（以下简称"本应用"）非常重视用户隐私保护。本协议适用于本应用提供的所有服务。
              </p>
              <p className="font-medium text-foreground">一、信息收集</p>
              <p>
                1. 我们会收集您的手机号码用于账号注册和登录验证。</p>
              <p>
                2. 应用模式下，我们需要获取您手机内安装应用列表的权限，以便您选择需要加速的应用。该信息仅在本地使用，不会上传至服务器。</p>
              <p>
                3. 全局加速模式下，所有网络流量将通过加密通道中转，我们不会记录或存储您的浏览内容。</p>
              <p className="font-medium text-foreground">二、信息使用</p>
              <p>
                收集的信息仅用于：提供加速服务、改善用户体验、发送服务通知。我们不会将您的个人信息出售或分享给第三方。</p>
              <p className="font-medium text-foreground">三、信息安全</p>
              <p>
                我们采用行业标准的加密技术保护您的数据安全。所有传输数据均经过AES-256加密。</p>
              <p className="font-medium text-foreground">四、用户权利</p>
              <p>
                您有权随时查看、修改或删除您的个人信息。如需注销账号，请联系客服处理。</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
