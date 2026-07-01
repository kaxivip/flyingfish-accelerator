import { useState, useCallback, useEffect, useRef } from "react"
import { PhoneFrame } from "@/components/PhoneFrame"
import { BottomNav, type PageKey } from "@/components/BottomNav"
import { SplashPage } from "@/pages/SplashPage"
import { LoginPage } from "@/pages/LoginPage"
import { HomePage } from "@/pages/HomePage"
import { ModeSelectPage } from "@/pages/ModeSelectPage"
import { LineSelectPage, type LineId } from "@/pages/LineSelectPage"
import { AppSelectPage } from "@/pages/AppSelectPage"
import { TaskCenterPage } from "@/pages/TaskCenterPage"
import { ProfilePage } from "@/pages/ProfilePage"
import { AgreementPage } from "@/pages/AgreementPage"
import { SettingsPage } from "@/pages/SettingsPage"
import { AccountDeletePage } from "@/pages/AccountDeletePage"
import { SharePage } from "@/pages/SharePage"
import { OtherBenefitsPage } from "@/pages/OtherBenefitsPage"
import { TaskSubmitPage } from "@/pages/TaskSubmitPage"
import { PointsExchangePage } from "@/pages/PointsExchangePage"
import { PointsHistoryPage, type PointsRecord } from "@/pages/PointsHistoryPage"
import { OtherPlatformsPage } from "@/pages/OtherPlatformsPage"
import { AboutPage } from "@/pages/AboutPage"
import { HelpCenterPage } from "@/pages/HelpCenterPage"
import { AddToHomeScreenPrompt } from "@/components/AddToHomeScreenPrompt"

type AppStage = "splash" | "privacy" | "main" | "login" | "app-select" | "agreement" | "settings" | "account-delete" | "mode-select" | "line-select" | "share" | "other-benefits" | "task-submit" | "points-exchange" | "points-history" | "other-platforms" | "about" | "help-center"

export default function App() {
  const hasAgreed = false // DEV: always show privacy modal
  const [stage, setStage] = useState<AppStage>("splash")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState<PageKey>("home")
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [currentMode, setCurrentMode] = useState<"global" | "app">("global")
  const [currentLine, setCurrentLine] = useState<LineId>("smart")
  const [selectedApps, setSelectedApps] = useState<string[]>(["youtube", "telegram", "chatgpt"])
  const [memberMinutes, setMemberMinutes] = useState(45)
  const [points, setPoints] = useState(120)
  const [agreementType, setAgreementType] = useState<"privacy" | "service">("privacy")
  const [agreementReturnTo, setAgreementReturnTo] = useState<AppStage>("main")
  const [submitTaskId, setSubmitTaskId] = useState(0)
  const [connectedSeconds, setConnectedSeconds] = useState(0)
  const [hasClaimedInviteReward, setHasClaimedInviteReward] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 积分流水记录（mock 50条）
  const [pointsHistory, setPointsHistory] = useState<PointsRecord[]>(() => {
    const types: { title: string; amount: number; type: "earn" | "spend" }[] = [
      { title: "每日签到", amount: 10, type: "earn" },
      { title: "观看激励广告", amount: 30, type: "earn" },
      { title: "邀请好友奖励", amount: 60, type: "earn" },
      { title: "完成任务奖励", amount: 50, type: "earn" },
      { title: "兑换1小时会员", amount: 100, type: "spend" },
      { title: "兑换30分钟会员", amount: 50, type: "spend" },
      { title: "每日签到", amount: 10, type: "earn" },
      { title: "观看激励广告", amount: 30, type: "earn" },
      { title: "分享好友奖励", amount: 60, type: "earn" },
      { title: "兑换2小时会员", amount: 200, type: "spend" },
    ]
    const now = Date.now()
    return Array.from({ length: 50 }, (_, i) => {
      const t = types[i % types.length]
      const d = new Date(now - i * 3600000 * (3 + Math.random() * 5))
      const mm = String(d.getMonth() + 1).padStart(2, "0")
      const dd = String(d.getDate()).padStart(2, "0")
      const hh = String(d.getHours()).padStart(2, "0")
      const mi = String(d.getMinutes()).padStart(2, "0")
      return {
        id: 50 - i,
        type: t.type,
        title: t.title,
        amount: t.amount,
        time: `${mm}/${dd} ${hh}:${mi}`,
      }
    })
  })

  const addPointsRecord = useCallback((title: string, amount: number, type: "earn" | "spend") => {
    const now = new Date()
    const mm = String(now.getMonth() + 1).padStart(2, "0")
    const dd = String(now.getDate()).padStart(2, "0")
    const hh = String(now.getHours()).padStart(2, "0")
    const mi = String(now.getMinutes()).padStart(2, "0")
    setPointsHistory((prev) => [{
      id: Date.now(),
      type,
      title,
      amount,
      time: `${mm}/${dd} ${hh}:${mi}`,
    }, ...prev])
  }, [])

  // Timer for connected duration
  useEffect(() => {
    if (isConnected) {
      setConnectedSeconds(0)
      timerRef.current = setInterval(() => {
        setConnectedSeconds((s) => s + 1)
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      setConnectedSeconds(0)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isConnected])

  const formatTimer = (secs: number) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0")
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0")
    const s = String(secs % 60).padStart(2, "0")
    return `${h}:${m}:${s}`
  }

  const handleLogin = useCallback((inviteCode?: string) => {
    setIsLoggedIn(true)
    if (inviteCode && inviteCode.trim().length >= 4 && !hasClaimedInviteReward) {
      setHasClaimedInviteReward(true)
      setPoints((prev) => prev + 100)
      addPointsRecord("邀请码奖励", 100, "earn")
    }
    setStage("main")
  }, [hasClaimedInviteReward, addPointsRecord])

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false)
    setIsConnected(false)
    setIsConnecting(false)
    setStage("main")
  }, [])

  const handleToggleConnect = useCallback(() => {
    if (isConnecting) return
    if (isConnected) {
      setIsConnected(false)
    } else {
      setIsConnecting(true)
      setTimeout(() => {
        setIsConnecting(false)
        setIsConnected(true)
      }, 2000)
    }
  }, [isConnected, isConnecting])

  const handleToggleApp = useCallback((appId: string) => {
    setSelectedApps((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
    )
  }, [])

  const handleEarnPoints = useCallback((pts: number, title?: string) => {
    setPoints((prev) => prev + pts)
    addPointsRecord(title ?? "积分获取", pts, "earn")
  }, [addPointsRecord])

  const handleExchangeMember = useCallback((costPoints: number, minutes: number) => {
    setPoints((prev) => prev - costPoints)
    setMemberMinutes((prev) => prev + minutes)
    addPointsRecord(`兑换${minutes >= 60 ? `${Math.floor(minutes / 60)}小时` : `${minutes}分钟`}会员`, costPoints, "spend")
  }, [addPointsRecord])

  const handleShowAgreement = useCallback((type: "privacy" | "service", returnTo: AppStage = "main") => {
    setAgreementType(type)
    setAgreementReturnTo(returnTo)
    setStage("agreement")
  }, [])

  const handleOpenSettings = useCallback(() => {
    setStage("settings")
  }, [])

  const handleOpenShare = useCallback(() => {
    setStage("share")
  }, [])

  const handleOpenModeSelect = useCallback(() => {
    setStage("mode-select")
  }, [])

  const handleOpenLineSelect = useCallback(() => {
    setStage("line-select")
  }, [])

  const handleOpenOtherBenefits = useCallback(() => {
    setStage("other-benefits")
  }, [])

  const handleSubmitTask = useCallback((taskId: number) => {
    setSubmitTaskId(taskId)
    setStage("task-submit")
  }, [])

  const handleOpenPointsExchange = useCallback(() => {
    setStage("points-exchange")
  }, [])

  const handleOpenPointsHistory = useCallback(() => {
    setStage("points-history")
  }, [])

  const handleAccountDelete = useCallback(() => {
    setIsLoggedIn(false)
    setIsConnected(false)
    setIsConnecting(false)
    setStage("main")
  }, [])

  const renderContent = () => {
    switch (stage) {
      case "splash":
        return (
          <SplashPage
            onFinish={() => {
              if (hasAgreed) {
                setStage("main")
              } else {
                setStage("privacy")
              }
            }}
          />
        )

      case "privacy":
        return (
          <div className="w-full h-full bg-ocean-gradient flex flex-col items-center justify-center relative overflow-hidden">
            {/* bg blur */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 mx-5 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[hsl(210_30%_12%)] border border-white/10" />
              <div className="relative z-10 p-6">
                {/* logo + title */}
                <div className="flex flex-col items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden">
                    <img src="/images/logo_icon.png" alt="logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-base font-bold text-foreground">隐私政策与用户协议</h2>
                    <p className="text-xs text-muted-foreground mt-1">首次使用请阅读并同意以下内容</p>
                  </div>
                </div>
                {/* content */}
                <div className="bg-foreground/5 rounded-xl p-4 max-h-48 overflow-auto mb-5 text-xs text-muted-foreground leading-relaxed space-y-2.5">
                  <p>飞鱼加速器遵守相关法律法规，致力保护用户隐私。我们仅收集提供服务所必需的最少信息。</p>
                  <p><span className="text-foreground font-medium">信息收集：</span>注册登录时收集手机号用于身份验证；加速连接时收集设备型号用于点播最优节点；不收集您的浏览内容和通讯数据。</p>
                  <p><span className="text-foreground font-medium">第三方共享：</span>我们不会向第三方出售您的个人信息。仅在法律要求或经您授权时共享必要信息。</p>
                  <p><span className="text-foreground font-medium">广告服务：</span>App 内展示的激励广告不会追踪您的个人属性，仅用于奖励发放。</p>
                  <p>继续使用即表示您同意 <span className="text-primary cursor-pointer" onClick={() => { setStage("agreement"); setAgreementType("privacy"); setAgreementReturnTo("privacy"); }}>《隐私政策》</span> 和 <span className="text-primary cursor-pointer" onClick={() => { setStage("agreement"); setAgreementType("service"); setAgreementReturnTo("privacy"); }}>《用户协议》</span>。</p>
                </div>
                {/* buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      // refuse - can't use app
                      setStage("splash")
                    }}
                    className="flex-1 h-11 rounded-xl border border-border/40 text-sm text-muted-foreground hover:bg-foreground/5 transition-colors"
                  >
                    不同意
                  </button>
                  <button
                    onClick={() => {
                      localStorage.setItem("privacy_agreed", "1")
                      setStage("main")
                    }}
                    className="flex-1 h-11 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold shadow-[0_2px_16px_hsl(190_100%_50%/0.3)] transition-opacity hover:opacity-90"
                  >
                    同意并继续
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case "login":
        return <LoginPage onLogin={handleLogin} onBack={() => setStage("main")} />

      case "app-select":
        return (
          <AppSelectPage
            selectedApps={selectedApps}
            onToggleApp={handleToggleApp}
            onBack={() => setStage("mode-select")}
          />
        )

      case "agreement":
        return (
          <AgreementPage
            type={agreementType}
            onBack={() => setStage(agreementReturnTo)}
          />
        )

      case "settings":
        return (
          <SettingsPage
            isLoggedIn={isLoggedIn}
            onBack={() => setStage("main")}
            onShowAgreement={(type) => handleShowAgreement(type, "settings")}
            onAccountDelete={() => setStage("account-delete")}
            onLogout={handleLogout}
            onOpenOtherPlatforms={() => setStage("other-platforms")}
            onOpenAbout={() => setStage("about")}
          />
        )

      case "mode-select":
        return (
          <ModeSelectPage
            currentMode={currentMode}
            selectedApps={selectedApps}
            onSelectMode={setCurrentMode}
            onOpenAppSelect={() => setStage("app-select")}
            onBack={() => setStage("main")}
          />
        )

      case "line-select":
        return (
          <LineSelectPage
            currentLine={currentLine}
            onSelectLine={setCurrentLine}
            onBack={() => setStage("main")}
          />
        )

      case "share":
        return (
          <SharePage
            onBack={() => setStage("main")}
          />
        )

      case "other-benefits":
        return (
          <OtherBenefitsPage
            onBack={() => setStage("main")}
            onSubmitTask={handleSubmitTask}
            onClaimReward={(_taskId: number, reward: number) => handleEarnPoints(reward, "福利任务奖励")}
          />
        )

      case "task-submit":
        return (
          <TaskSubmitPage
            taskId={submitTaskId}
            onBack={() => setStage("other-benefits")}
            onSubmitSuccess={() => setStage("other-benefits")}
          />
        )

      case "points-exchange":
        return (
          <PointsExchangePage
            points={points}
            memberMinutes={memberMinutes}
            onBack={() => setStage("main")}
            onExchange={handleExchangeMember}
          />
        )

      case "points-history":
        return (
          <PointsHistoryPage
            records={pointsHistory}
            currentPoints={points}
            onBack={() => setStage("main")}
          />
        )

      case "account-delete":
        return (
          <AccountDeletePage
            onBack={() => setStage("settings")}
            onConfirmDelete={handleAccountDelete}
          />
        )

      case "other-platforms":
        return (
          <OtherPlatformsPage
            onBack={() => setStage("settings")}
          />
        )

      case "about":
        return (
          <AboutPage
            onBack={() => setStage("settings")}
          />
        )

      case "help-center":
        return (
          <HelpCenterPage
            onBack={() => setStage("settings")}
          />
        )

      case "main":
        return (
          <div className="w-full h-full relative">
            <div className="w-full h-full">
              {currentPage === "home" && (
                <HomePage
                  isConnected={isConnected}
                  isConnecting={isConnecting}
                  currentMode={currentMode}
                  currentLine={currentLine}
                  selectedApps={selectedApps}
                  connectedSeconds={connectedSeconds}
                  formatTimer={formatTimer}
                  onToggleConnect={handleToggleConnect}
                  onNavigate={setCurrentPage}
                  onOpenModeSelect={handleOpenModeSelect}
                  onOpenLineSelect={handleOpenLineSelect}
                  onOpenShare={handleOpenShare}
                />
              )}
              {currentPage === "tasks" && (
                <TaskCenterPage
                  points={points}
                  memberMinutes={memberMinutes}
                  onEarnPoints={handleEarnPoints}
                  onOpenShare={handleOpenShare}
                  onOpenOtherBenefits={handleOpenOtherBenefits}
                  onOpenPointsExchange={handleOpenPointsExchange}
                  onOpenPointsHistory={handleOpenPointsHistory}
                />
              )}
              {currentPage === "profile" && (
                <ProfilePage
                  isLoggedIn={isLoggedIn}
                  points={points}
                  memberMinutes={memberMinutes}
                  onLogin={() => setStage("login")}
                  onNavigate={setCurrentPage}
                  onOpenSettings={handleOpenSettings}
                  onOpenShare={handleOpenShare}
                  onOpenHelp={() => setStage("help-center")}
                />
              )}
            </div>

            <BottomNav current={currentPage} onNavigate={setCurrentPage} />
          </div>
        )
    }
  }

  const animateClass = stage === "main" ? "" : "animate-slide-in-right"

  return (
    <PhoneFrame>
      <div key={stage} className={`w-full h-full ${animateClass}`}>
        {renderContent()}
      </div>
      <AddToHomeScreenPrompt />
    </PhoneFrame>
  )
}
