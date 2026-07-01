import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronLeft,
  Clock,
  CheckCircle2,
  Upload,
  Gift,
  Star,
  HandCoins,
} from "lucide-react"

type TaskStatus = "pending" | "submitted" | "approved" | "rejected" | "claimed"

interface BenefitTask {
  id: number
  name: string
  description: string
  requirements: string[]
  quantity: number
  completed: number
  expiry: string
  reward: number
  status: TaskStatus
  rewardLabel: string
  rejectReason?: string
  submittedAt?: string
  reviewedAt?: string
  claimedAt?: string
}

interface OtherBenefitsPageProps {
  onBack: () => void
  onSubmitTask: (taskId: number) => void
  onClaimReward: (taskId: number, reward: number) => void
}

export function OtherBenefitsPage({ onBack, onSubmitTask, onClaimReward }: OtherBenefitsPageProps) {
  const [activeTab, setActiveTab] = useState<"todo" | "done">("todo")

  const [tasks, setTasks] = useState<BenefitTask[]>([
    {
      id: 1,
      name: "vivo应用商店好评",
      description: "在vivo应用商店搜索「飞鱼加速器」，给予5星好评并撰写文字评价",
      requirements: [
        "好评过程录屏（从打开应用商店到提交评价）",
        "「我的」页面截图（需包含UID或手机号）",
      ],
      quantity: 1,
      completed: 0,
      expiry: "7月31日 23:59",
      reward: 1440,
      status: "pending",
      rewardLabel: "1440积分",
    },
    {
      id: 2,
      name: "OPPO应用商店好评",
      description: "在OPPO应用商店搜索「飞鱼加速器」，给予5星好评并撰写文字评价",
      requirements: [
        "好评过程录屏（从打开应用商店到提交评价）",
        "「我的」页面截图（需包含UID或手机号）",
      ],
      quantity: 1,
      completed: 0,
      expiry: "7月31日 23:59",
      reward: 1440,
      status: "pending",
      rewardLabel: "1440积分",
    },
    {
      id: 3,
      name: "华为应用市场好评",
      description: "在华为应用市场搜索「飞鱼加速器」，给予5星好评并撰写文字评价",
      requirements: [
        "好评过程录屏（从打开应用商店到提交评价）",
        "「我的」页面截图（需包含UID或手机号）",
      ],
      quantity: 1,
      completed: 0,
      expiry: "7月31日 23:59",
      reward: 1440,
      status: "pending",
      rewardLabel: "1440积分",
    },
    {
      id: 4,
      name: "小米应用商店好评",
      description: "在小米应用商店搜索「飞鱼加速器」，给予5星好评并撰写文字评价",
      requirements: [
        "好评过程录屏（从打开应用商店到提交评价）",
        "「我的」页面截图（需包含UID或手机号）",
      ],
      quantity: 1,
      completed: 0,
      expiry: "7月31日 23:59",
      reward: 1440,
      status: "pending",
      rewardLabel: "1440积分",
    },
    // --- 已完成列表示例数据 ---
    {
      id: 5,
      name: "vivo应用商店好评",
      description: "",
      requirements: [],
      quantity: 1,
      completed: 1,
      expiry: "6月30日 23:59",
      reward: 1440,
      status: "claimed",
      rewardLabel: "1440积分",
      submittedAt: "06/28 14:22",
      reviewedAt: "06/29 10:05",
      claimedAt: "06/29 18:30",
    },
    {
      id: 6,
      name: "OPPO应用商店好评",
      description: "",
      requirements: [],
      quantity: 1,
      completed: 1,
      expiry: "7月15日 23:59",
      reward: 1440,
      status: "approved",
      rewardLabel: "1440积分",
      submittedAt: "07/03 09:15",
      reviewedAt: "07/04 16:40",
    },
    {
      id: 7,
      name: "华为应用市场好评",
      description: "",
      requirements: [],
      quantity: 1,
      completed: 0,
      expiry: "6月28日 23:59",
      reward: 1440,
      status: "rejected",
      rewardLabel: "1440积分",
      submittedAt: "06/26 20:10",
      reviewedAt: "06/27 11:30",
      rejectReason: "录屏内容不清晰，无法确认好评操作。请重新录制后提交。",
    },
  ])

  const todoTasks = tasks.filter((t) => t.status === "pending" || t.status === "submitted")
  const doneTasks = tasks.filter((t) => t.status === "approved" || t.status === "claimed" || t.status === "rejected")

  /* const statusConfig: Record<TaskStatus, { label: string; color: string; icon: React.ElementType }> = {
    pending: { label: "待提交", color: "text-muted-foreground", icon: Clock },
    submitted: { label: "审核中", color: "text-primary", icon: AlertCircle },
    approved: { label: "待领取", color: "text-status-warning", icon: HandCoins },
    rejected: { label: "未通过", color: "text-destructive", icon: AlertCircle },
    claimed: { label: "已领取", color: "text-status-connected", icon: CheckCircle2 },
  } */

  const handleClaim = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return
    onClaimReward(taskId, task.reward)
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "claimed" as TaskStatus, completed: t.quantity } : t))
    )
  }

  const isDone = activeTab === "done"

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
        <h2 className="text-lg font-bold text-foreground">其他福利</h2>
      </div>

      {/* Tabs - centered */}
      <div className="relative z-10 pt-4 flex justify-center gap-2">
        <button
          onClick={() => setActiveTab("todo")}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "todo"
              ? "bg-primary/15 text-primary border border-primary/20"
              : "bg-muted/30 text-muted-foreground border border-transparent"
          }`}
        >
          进行中
          {todoTasks.length > 0 && (
            <span className="ml-0.5 w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">
              {todoTasks.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("done")}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "done"
              ? "bg-primary/15 text-primary border border-primary/20"
              : "bg-muted/30 text-muted-foreground border border-transparent"
          }`}
        >
          已完成
          {doneTasks.length > 0 && (
            <span className="ml-0.5 w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">
              {doneTasks.length}
            </span>
          )}
        </button>
      </div>

      {/* Task list */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-4 pb-8 space-y-4">
        {activeTab === "todo" && todoTasks.length === 0 && (
          <div className="flex flex-col items-center pt-12">
            <CheckCircle2 className="w-10 h-10 text-status-connected/30 mb-3" />
            <p className="text-sm text-muted-foreground">暂无进行中的任务</p>
          </div>
        )}

        {activeTab === "done" && doneTasks.length === 0 && (
          <div className="flex flex-col items-center pt-12">
            <Clock className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">暂无已完成的任务</p>
          </div>
        )}

        {(isDone ? doneTasks : todoTasks).map((task) => {
          return (
            <Card key={task.id} className="glass-card border-0 overflow-hidden">
              <CardContent className="p-4.5">
                {/* Task header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Star className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground">{task.name}</p>
                  </div>
                </div>

                {/* === 进行中 Tab: show full info === */}
                {!isDone && (
                  <>
                    {/* Task description */}
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
                      {task.description}
                    </p>

                    {/* Requirements (only for pending) */}
                    {task.status === "pending" && task.requirements.length > 0 && (
                      <div className="mb-2.5 px-2.5 py-2 rounded-lg bg-ocean-deep/20 border border-border/20">
                        <p className="text-[10px] font-medium text-muted-foreground/70 mb-1">提交要求：</p>
                        {task.requirements.map((req, i) => (
                          <p key={i} className="text-[11px] text-muted-foreground leading-relaxed">&bull; {req}</p>
                        ))}
                      </div>
                    )}

                    {/* Task meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>截止 {task.expiry}</span>
                      </div>
                      <span>已完成 {task.completed}/{task.quantity}</span>
                    </div>
                  </>
                )}

                {/* === 已完成 Tab: show time info === */}
                {isDone && (
                  <div className="space-y-1.5 mb-3">
                    {task.submittedAt && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>提审时间：{task.submittedAt}</span>
                      </div>
                    )}
                    {task.reviewedAt && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>审核时间：{task.reviewedAt}</span>
                      </div>
                    )}
                    {task.claimedAt && (
                      <div className="flex items-center gap-2 text-xs text-status-connected">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>领取时间：{task.claimedAt}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Rejected reason (both tabs) */}
                {task.status === "rejected" && task.rejectReason && (
                  <div className="mb-2.5 px-2.5 py-2 rounded-lg bg-destructive/5 border border-destructive/15">
                    <p className="text-[10px] font-medium text-destructive/70 mb-0.5">未通过原因：</p>
                    <p className="text-[11px] text-destructive/80 leading-relaxed">{task.rejectReason}</p>
                  </div>
                )}

                {/* Reward & action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-status-warning" />
                    <span className="text-xs font-semibold text-status-warning">
                      +{task.rewardLabel}
                    </span>
                  </div>

                  {task.status === "pending" && (
                    <button
                      onClick={() => onSubmitTask(task.id)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-ocean-surface to-accent text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity active:scale-95"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      提交审核
                    </button>
                  )}

                  {task.status === "submitted" && (
                    <span className="text-xs text-primary/70">客服审核中，请耐心等待</span>
                  )}

                  {task.status === "approved" && (
                    <button
                      onClick={() => handleClaim(task.id)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-status-warning to-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity active:scale-95"
                    >
                      <HandCoins className="w-3.5 h-3.5" />
                      领取{task.rewardLabel}
                    </button>
                  )}

                  {task.status === "rejected" && (
                    <button
                      onClick={() => onSubmitTask(task.id)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors active:scale-95"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      重新提交
                    </button>
                  )}

                  {task.status === "claimed" && (
                    <span className="text-xs text-status-connected font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      积分已领取
                    </span>
                  )}
                </div>

                {/* Approved hint */}
                {task.status === "approved" && (
                  <p className="text-[10px] text-status-warning/70 mt-2">
                    审核已通过，请尽快领取积分。
                  </p>
                )}
              </CardContent>
            </Card>
          )
        })}

        {/* General tips */}
        <div className="mt-2 px-1">
          <p className="text-[10px] text-muted-foreground/50 leading-relaxed text-center">
            提交后客服将在1-3个工作日内审核 &middot; 审核通过后需手动领取积分
          </p>
        </div>
      </div>
    </div>
  )
}