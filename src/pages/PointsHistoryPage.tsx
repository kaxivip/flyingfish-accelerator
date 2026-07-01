import { useState } from "react"
import { ChevronLeft, ArrowUpCircle, ArrowDownCircle } from "lucide-react"

export interface PointsRecord {
  id: number
  type: "earn" | "spend"
  title: string
  amount: number
  time: string
}

interface PointsHistoryPageProps {
  records: PointsRecord[]
  currentPoints: number
  onBack: () => void
}

export function PointsHistoryPage({ records, currentPoints: _currentPoints, onBack }: PointsHistoryPageProps) {
  const [activeTab, setActiveTab] = useState<"earn" | "spend">("earn")

  const earnRecords = records.filter(r => r.type === "earn").slice(0, 50)
  const spendRecords = records.filter(r => r.type === "spend").slice(0, 50)
  const activeRecords = activeTab === "earn" ? earnRecords : spendRecords

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
        <h2 className="text-lg font-bold text-foreground">积分明细</h2>
      </div>

      {/* Tabs */}
      <div className="relative z-10 px-5 pt-5">
        <div className="flex rounded-xl bg-muted/30 p-1">
          <button
            onClick={() => setActiveTab("earn")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === "earn"
                ? "bg-status-connected/15 text-status-connected shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            获取
          </button>
          <button
            onClick={() => setActiveTab("spend")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === "spend"
                ? "bg-status-disconnected/15 text-status-disconnected shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            消耗
          </button>
        </div>
      </div>

      {/* Record list */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-3 pb-8 space-y-2">
        {activeRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20">
            <p className="text-sm text-muted-foreground">
              {activeTab === "earn" ? "暂无获取记录" : "暂无消耗记录"}
            </p>
          </div>
        ) : (
          activeRecords.map((record) => (
            <div
              key={record.id}
              className="glass-card rounded-xl px-4 py-3 flex items-center gap-3"
            >
              {/* Icon */}
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                record.type === "earn" ? "bg-status-connected/10" : "bg-status-disconnected/10"
              }`}>
                {record.type === "earn" ? (
                  <ArrowUpCircle className="w-4.5 h-4.5 text-status-connected" />
                ) : (
                  <ArrowDownCircle className="w-4.5 h-4.5 text-status-disconnected" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{record.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{record.time}</p>
              </div>

              {/* Amount */}
              <span className={`text-sm font-bold flex-shrink-0 ${
                record.type === "earn" ? "text-status-connected" : "text-status-disconnected"
              }`}>
                {record.type === "earn" ? "+" : "-"}{record.amount}
              </span>
            </div>
          ))
        )}

        {/* Bottom hint */}
        {activeRecords.length > 0 && (
          <p className="text-center text-[10px] text-muted-foreground/40 pt-2 pb-4">
            仅显示最近 {activeRecords.length} 条记录
          </p>
        )}
      </div>
    </div>
  )
}
