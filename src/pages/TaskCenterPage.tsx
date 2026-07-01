import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  PlayCircle,
  UserPlus,
  // MoreHorizontal,
  Coins,
  Gift,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Zap,
  // CalendarCheck,
  History,
  Play,
  Trophy,
} from "lucide-react"

interface TaskCenterPageProps {
  points: number
  memberMinutes: number
  onEarnPoints: (pts: number, title?: string) => void
  onOpenShare: () => void
  onOpenOtherBenefits: () => void
  onOpenPointsExchange: () => void
  onOpenPointsHistory: () => void
}

interface TaskItem {
  id: string
  title: string
  description: string
  reward: number
  icon: React.ElementType
  iconColor: string
  iconBg: string
  completed: boolean
  action: string
  isLink?: boolean
}

export function TaskCenterPage({ points, memberMinutes, onEarnPoints, onOpenShare, onOpenOtherBenefits, onOpenPointsExchange, onOpenPointsHistory }: TaskCenterPageProps) {
  const [adWatchedCount, setAdWatchedCount] = useState(0)
  const [isWatchingAd, setIsWatchingAd] = useState(false)

  const AD_MAX = 8
  const AD_REWARD = 50
  const adDone = adWatchedCount >= AD_MAX
  const adTodayEarned = adWatchedCount * AD_REWARD

  const handleWatchAd = () => {
    if (adDone || isWatchingAd) return
    setIsWatchingAd(true)
    setTimeout(() => {
      const newCount = adWatchedCount + 1
      setAdWatchedCount(newCount)
      onEarnPoints(AD_REWARD, `激励广告 第${newCount}次`)
      setIsWatchingAd(false)
    }, 1500)
  }

  // 计算会员到期时间
  const expireDate = new Date(Date.now() + memberMinutes * 60 * 1000)
  const expireTime = `${String(expireDate.getHours()).padStart(2, "0")}:${String(expireDate.getMinutes()).padStart(2, "0")}`
  const expireDateStr = `${String(expireDate.getMonth() + 1).padStart(2, "0")}/${String(expireDate.getDate()).padStart(2, "0")}`

  // const [isCheckedIn, setIsCheckedIn] = useState(false)
  // const [consecutiveDays, setConsecutiveDays] = useState(3)
  // const CHECKIN_REWARD = 10

  // const handleCheckIn = () => {
  //   if (isCheckedIn) return
  //   setIsCheckedIn(true)
  //   setConsecutiveDays((d) => d + 1)
  //   onEarnPoints(CHECKIN_REWARD, "每日签到")
  // }

  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: "invite",
      title: "分享好友得积分",
      description: "邀好友1:1得积分",
      reward: 60,
      icon: UserPlus,
      iconColor: "text-accent",
      iconBg: "bg-accent/10",
      completed: false,
      action: "邀请",
      isLink: true,
    },
    // {
    //   id: "other",
    //   title: "其他福利",
    //   description: "高价值福利，完成即送积分",
    //   reward: 1440,
    //   icon: MoreHorizontal,
    //   iconColor: "text-status-warning",
    //   iconBg: "bg-status-warning/10",
    //   completed: false,
    //   action: "去看看",
    // },
  ])

  const handleTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task || task.completed) return

    if (task.isLink) {
      onOpenShare()
      return
    }

    if (task.id === "other") {
      onOpenOtherBenefits()
      return
    }

    onEarnPoints(task.reward, task.title)
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
    )
  }

  // const totalEarnable = tasks.reduce((sum, t) => sum + t.reward, 0)
  // const earned = tasks.filter((t) => t.completed).reduce((sum, t) => sum + t.reward, 0)

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />

      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-2">
        <h2 className="text-xl font-bold text-foreground">免费会员</h2>
        <p className="text-sm text-muted-foreground mt-1">每天免费用至少8小时</p>
      </div>

      {/* Points card - equal level */}
      <div className="relative z-10 px-5 pt-5">
        <Card className="overflow-hidden border-0 relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-status-warning/8 via-ocean-mid to-primary/5" />
          <CardContent className="p-4 relative z-10">
            <div className="grid grid-cols-2 gap-0">
              {/* Left: Points (clickable) */}
              <div className="cursor-pointer group pr-4 border-r border-border/70 flex flex-col justify-between min-h-[88px]" onClick={onOpenPointsHistory}>
                <div className="flex items-center gap-1.5 h-6">
                  <div className="w-6 h-6 rounded-md bg-status-warning/10 flex items-center justify-center">
                    <Coins className="w-3.5 h-3.5 text-status-warning" />
                  </div>
                  <span className="text-xs text-muted-foreground">我的积分</span>
                </div>
                <div className="flex items-end h-8">
                  <span className="text-2xl font-bold text-foreground leading-none">{points}</span>
                </div>
                <span className="flex items-center gap-1 text-[10px] text-primary hover:text-primary/80 transition-colors h-4"><History className="w-3 h-3" />明细 <ArrowRight className="w-2.5 h-2.5" /></span>
              </div>

              {/* Right: Member */}
              <div className="pl-4 flex flex-col justify-between min-h-[88px]">
                <div className="flex items-center gap-1.5 h-6">
                  <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">加速会员</span>
                </div>
                <div className="flex items-end h-8">
                  <span className="text-2xl font-bold text-foreground leading-none">{expireTime}<sub className="ml-0.5 text-[9px] font-normal text-muted-foreground">{expireDateStr}</sub></span>
                </div>
                <button
                  onClick={onOpenPointsExchange}
                  className="self-start flex items-center gap-1 text-[10px] text-primary hover:text-primary/80 transition-colors h-4"
                >
                  <Gift className="w-3 h-3" />
                  兑换
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily check-in card - 隐藏 */}
      {/*
      <div className="relative z-10 px-5 pt-4">
        <Card className="glass-card border-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                isCheckedIn ? "bg-status-connected/15" : "bg-primary/10"
              }`}>
                <CalendarCheck className={`w-5 h-5 ${isCheckedIn ? "text-status-connected" : "text-primary"}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">每日签到</p>
                  <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">+{CHECKIN_REWARD}积分/天</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  已连续签到 <span className="text-primary font-semibold">{consecutiveDays}</span> 天
                </p>
              </div>

              <button
                onClick={handleCheckIn}
                disabled={isCheckedIn}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 active:scale-95 ${
                  isCheckedIn
                    ? "bg-status-connected/15 text-status-connected"
                    : "bg-gradient-to-r from-ocean-surface to-accent text-primary-foreground shadow-[0_2px_12px_hsl(190_100%_50%/0.2)]"
                }`}
              >
                {isCheckedIn ? "已签到" : "签到"}
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-border/30">
              <div className="flex items-center justify-between">
                {Array.from({ length: 7 }).map((_, i) => {
                  const isPast = i < (consecutiveDays % 7)
                  const isToday = i === (consecutiveDays % 7)
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                        isPast
                          ? "bg-primary text-primary-foreground"
                          : isToday && isCheckedIn
                          ? "bg-status-connected text-primary-foreground animate-pulse"
                          : isToday
                          ? "border-2 border-primary text-primary"
                          : "bg-muted/40 text-muted-foreground/40"
                      }`}>
                        {isPast || (isToday && isCheckedIn) ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          i + 1
                        )}
                      </div>
                      <span className="text-[9px] text-muted-foreground/50">
                        {i === 6 ? "满7天" : `第${i + 1}天`}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      */}

      {/* Ad watching card - featured */}
      <div className="relative z-10 px-5 pt-4">
        <Card className="relative border-0 overflow-hidden shadow-[0_0_40px_hsl(45_100%_55%/0.14),0_0_20px_hsl(38_100%_50%/0.10)]">
          <div className="absolute inset-0 bg-gradient-to-br from-status-warning/18 via-[hsl(210_40%_10%)] to-status-warning/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(45_100%_55%/0.16),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(38_100%_50%/0.10),transparent_55%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-status-warning/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-status-warning/20 to-transparent" />
          <CardContent className="p-4 relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                adDone ? "bg-status-connected/20" : "bg-gradient-to-br from-status-warning/25 to-status-warning/15"
              }`}>
                {adDone ? (
                  <Trophy className="w-5 h-5 text-status-connected" />
                ) : (
                  <PlayCircle className="w-5.5 h-5.5 text-status-warning" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-foreground">看广告赚积分</p>
                  <span className="text-[10px] font-semibold text-white bg-gradient-to-r from-status-warning to-[hsl(38_100%_55%)] px-2 py-0.5 rounded-full">
                    +{AD_REWARD}积分/次
                  </span>
                </div>
                <p className="text-[11px] text-foreground/60 mt-0.5">
                  今天已看 {adWatchedCount}/{AD_MAX}次
                  {adTodayEarned > 0 && <> · 已赚 {adTodayEarned}</>}
                  {!adDone && <> · 还可赚 <span className="text-status-warning font-bold">{(AD_MAX - adWatchedCount) * AD_REWARD}</span></>}
                </p>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-1 mb-3 px-1">
              {Array.from({ length: AD_MAX }).map((_, i) => (
                <div key={i} className="flex-1 flex items-center">
                  <div className={`w-full aspect-square max-w-[32px] rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                    i < adWatchedCount
                      ? "bg-gradient-to-br from-status-warning to-[hsl(38_100%_55%)] text-white shadow-[0_0_10px_hsl(45_100%_55%/0.5)]"
                      : i === adWatchedCount && !adDone
                      ? "border-2 border-status-warning/70 text-status-warning bg-status-warning/8"
                      : "bg-foreground/5 text-foreground/25"
                  }`}>
                    {i < adWatchedCount ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i === 3 && (
                    <div className="w-px h-4 bg-border/40 mx-0.5 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {/* Motivation text + button */}
            <div className="flex items-center gap-3">
              <p className="text-xs text-foreground/70 flex-1">
                {adDone
                  ? "今日任务完成！明天继续来赚积分"
                  : adWatchedCount === 0
                  ? "每天可看8次，轻松赚积分兑加速"
                  : adWatchedCount < 4
                  ? `再看${4 - adWatchedCount}次完成上半场，积分到手`
                  : adWatchedCount < 7
                  ? `加油！再看${AD_MAX - adWatchedCount}次拿满今日奖励`
                  : "最后1次！马上拿满今日400积分"}
              </p>
              <button
                onClick={handleWatchAd}
                disabled={adDone || isWatchingAd}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold flex-shrink-0 transition-all duration-200 active:scale-95 ${
                  adDone
                    ? "bg-status-connected/15 text-status-connected"
                    : isWatchingAd
                    ? "bg-primary/20 text-primary animate-pulse"
                    : "bg-gradient-to-r from-status-warning to-[hsl(38_100%_55%)] text-white shadow-[0_2px_18px_hsl(45_100%_55%/0.40)]"
                }`}
              >
                {adDone ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    已完成
                  </>
                ) : isWatchingAd ? (
                  <>
                    <Play className="w-3.5 h-3.5 animate-pulse" />
                    播放中...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    观看
                  </>
                )}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task list */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-5 pb-28 space-y-4">
        {tasks.map((task) => {
          const Icon = task.icon
          return (
            <Card
              key={task.id}
              className={`glass-card border-0 transition-all duration-200 ${
                task.completed ? "opacity-60" : "hover:bg-muted/30 cursor-pointer"
              }`}
              onClick={() => !task.completed && handleTask(task.id)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl ${task.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${task.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{task.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{task.description}</p>
                </div>
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <span className="text-xs font-semibold text-status-warning ml-1">+{task.reward}积分</span>
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-status-connected" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}

      </div>
    </div>
  )
}
