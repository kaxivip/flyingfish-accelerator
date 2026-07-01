# 飞鱼加速器 UI 交付文档
> 适用对象：Android 原生开发 / H5/WebView 开发  
> 更新时间：2026-06-30  
> UI 源码仓库：https://github.com/kaxivip/flyingfish-accelerator

---

## 一、技术栈与运行环境

| 项目 | 说明 |
|------|------|
| 框架 | React 18 + TypeScript + Vite |
| 样式 | Tailwind CSS v3 + CSS Variables |
| 图标库 | lucide-react |
| 组件库 | shadcn/ui (Card, Button 等) |
| 构建产物 | `dist/` 目录，单页应用 SPA |
| 目标平台 | Android WebView / PWA / H5 |
| 字体 | -apple-system, PingFang SC, Microsoft YaHei, sans-serif |

---

## 二、设计 Token（色彩系统）

### 2.1 主题模式
仅使用**深色模式**（Dark Only），不支持亮色切换。

### 2.2 颜色变量（CSS Custom Properties）

```css
/* 背景层 */
--background:        hsl(220 35%  5%)   /* #090E1A 全局背景 */
--ocean-deep:        hsl(220 40%  4%)   /* #080C17 最深层 */
--ocean-mid:         hsl(220 30% 10%)   /* #121B2E 中间层/卡片底 */
--card:              hsl(220 30% 17%)   /* #1E2D47 卡片表面 */

/* 文字 */
--foreground:        hsl(200 20% 95%)   /* #EEF3F5 主文字 */
--muted-foreground:  hsl(215 15% 55%)   /* #7E8FA3 次要文字 */
--card-foreground:   hsl(200 20% 92%)   /* #E7EFF3 卡片文字 */

/* 主色 - 亮青色（加速、CTA、激活态） */
--primary:           hsl(190 100% 50%)  /* #00E5FF */
--primary-foreground:hsl(220 35%  5%)   /* 深底色，用于主色背景上的文字 */

/* 强调色 - 青绿色 */
--accent:            hsl(170  70% 35%)  /* #1AA882 */

/* 边框 */
--border:            hsl(220 20% 22%)   /* #2A3547 */
--muted:             hsl(220 20% 18%)   /* #222F42 */

/* 状态色 */
--status-connected:  hsl(150 80% 50%)   /* #1AE67A 已连接/成功（绿色）*/
--status-warning:    hsl( 45 90% 55%)   /* #F5C12B 警告/金色（广告卡片/积分） */
--status-disconnected: hsl(30 90% 55%)  /* #F58A1A 断开/橙色 */

/* 破坏性操作 */
--destructive:       hsl(  0 72% 51%)   /* #D93232 红色 */

/* 圆角基准 */
--radius: 0.75rem  /* 12px，卡片/按钮基础圆角 */
```

### 2.3 颜色使用规范

| 场景 | 颜色 Token | HEX 参考 |
|------|-----------|---------|
| 主按钮/加速CTA | `primary` | `#00E5FF` |
| 已连接状态/成功 | `status-connected` | `#1AE67A` |
| 积分/广告/金色强调 | `status-warning` | `#F5C12B` |
| 断开/橙色警告 | `status-disconnected` | `#F58A1A` |
| 卡片背景 | `card` | `#1E2D47` |
| 全局背景 | `background` | `#090E1A` |
| 主文字 | `foreground` | `#EEF3F5` |
| 次要文字 | `muted-foreground` | `#7E8FA3` |
| 分隔线/边框 | `border` | `#2A3547` |

### 2.4 渐变规范

```css
/* 全局背景渐变 */
background: linear-gradient(180deg, hsl(220 35% 5%) 0%, hsl(220 30% 8%) 40%, hsl(215 25% 12%) 100%);

/* 主色渐变按钮（加速CTA / 观看按钮） */
background: linear-gradient(90deg, hsl(190 100% 50%), hsl(170 70% 35%));

/* 黄金渐变（广告卡片观看按钮） */
background: linear-gradient(90deg, hsl(45 90% 55%), hsl(38 100% 55%));

/* 渐变文字 - 品牌名 */
background: linear-gradient(135deg, hsl(190 100% 55%), hsl(170 90% 50%));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* 玻璃态卡片 */
background: hsl(220 25% 17% / 0.9);
backdrop-filter: blur(12px);
border: 1px solid hsl(220 20% 25% / 0.7);
```

---

## 三、圆角规范

| 级别 | Token | 值 | 使用场景 |
|------|-------|-----|--------|
| sm | `rounded-sm` | 8px | 标签、小胶囊 |
| md | `rounded-md` | 10px | 输入框、小卡片 |
| lg (默认) | `rounded-lg` | 12px | 标准卡片、按钮 |
| xl | `rounded-xl` | 16px | 大卡片、弹窗 |
| 2xl | `rounded-2xl` | 20px | 底部弹窗、模态 |
| full | `rounded-full` | 9999px | 胶囊标签、圆形图标背景 |

---

## 四、间距与布局规范

- **屏幕水平边距**：`px-5`（20px）
- **卡片内边距**：`p-4`（16px）
- **组件间垂直间距**：`gap-3`（12px）/ `gap-4`（16px）
- **底部导航高度**：约 64px（含安全区）
- **顶部标题栏高度**：约 56px
- **手机模拟框宽度**：390px（居中展示，实际宽度自适应）

---

## 五、字体规范

```
字体栈：-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', 'Microsoft YaHei', sans-serif
```

| 用途 | 大小 | 字重 | 说明 |
|------|------|------|------|
| 页面大标题 | 18px / text-lg | 700 bold | 顶栏标题 |
| 品牌名（开屏） | 30px / text-3xl | 700 bold | 渐变色 |
| 卡片标题 | 15px / text-[15px] | 600 semibold | |
| 正文 | 14px / text-sm | 400 | |
| 次要说明 | 12px / text-xs | 400 | muted-foreground |
| 微标签 | 10-11px | 500-600 | 胶囊标签、角标 |
| 数字强调（积分/时长） | 24-28px | 700 bold | 使用 font-mono 等宽 |

---

## 六、页面结构与路由

### 6.1 页面流转图

```
启动页 (SplashPage, 3秒)
  └─ 首次使用 → 隐私确认弹窗 (privacy)
  └─ 已同意    → 主页 (main)

主页 (main) - 底部导航四个 Tab：
  ├─ 首页 (home)       → 加速功能主界面
  ├─ 免费会员 (tasks)  → 积分任务 / 广告赚积分 / 邀请奖励
  ├─ 分享 (share)      → 分享好友得积分
  └─ 我的 (profile)    → 用户中心

独立全屏页面（从主页跳转）：
  ├─ 登录页 (login)
  ├─ 模式选择 (mode-select)
  ├─ 线路选择 (line-select)
  ├─ 应用选择 (app-select)
  ├─ 积分兑换 (points-exchange)
  ├─ 积分明细 (points-history)
  ├─ 分享好友 (share)
  ├─ 其他福利 (other-benefits)
  ├─ 设置 (settings)
  ├─ 帮助中心 (help-center)
  ├─ 关于飞鱼 (about)
  ├─ 隐私政策 / 用户协议 (agreement)
  ├─ 任务提交 (task-submit)
  ├─ 注销账号 (account-delete)
  └─ 其他平台 (other-platforms)
```

### 6.2 各页面说明

| 页面 | 文件 | 功能描述 |
|------|------|---------|
| 启动页 | `SplashPage.tsx` | Logo + 品牌标语 + 标签，展示3秒 |
| 首页 | `HomePage.tsx` | 加速按钮（连接/断开）、线路显示、模式切换、已连接计时 |
| 免费会员 | `TaskCenterPage.tsx` | 看广告赚积分（黄金卡片）、领取邀请奖励、分享好友得积分 |
| 分享 | `SharePage.tsx` | 邀请码展示、分享链接、分享奖励说明 |
| 我的 | `ProfilePage.tsx` | 用户信息、积分、会员到期时间、菜单（帮助/设置/分享/反馈）|
| 登录 | `LoginPage.tsx` | 手机号登录 |
| 设置 | `SettingsPage.tsx` | 通知、清除缓存、注销等 |
| 帮助中心 | `HelpCenterPage.tsx` | Tab（加速问题/积分会员），折叠式FAQ |
| 关于飞鱼 | `AboutPage.tsx` | 版本号、协议链接 |

---

## 七、核心组件说明

### 7.1 加速按钮（首页核心）
- **未连接**：圆形渐变青色，图标 `Zap`（闪电），文字「加速」
- **连接中**：旋转动画，文字「连接中」
- **已连接**：绿色光晕脉冲，图标 `Pause`（暂停），文字「停止」
- 按钮外圈有动态旋转光环（`connect-ring` / `connect-ring-connected`）

### 7.2 广告卡片（免费会员页）
- 黄金色系（`status-warning` #F5C12B）
- 顶部/底部 1px 渐变高光线
- 进度点：8个圆点，完成变金色填充 + 对号图标，当前圆点有边框高亮

### 7.3 底部导航
- 4 个 Tab：首页、免费会员、分享、我的
- 激活态：图标+文字变 `primary` 青色
- 背景：`glass-card` 玻璃态 + 模糊

### 7.4 卡片样式
```css
/* 标准卡片 */
background: hsl(220 30% 17%);
border-radius: 12px;
border: 1px solid hsl(220 20% 22%);

/* 强调卡片（带发光） */
box-shadow: 0 0 40px hsl(45 100% 55% / 0.14);  /* 黄金 */
box-shadow: 0 0 40px hsl(200 80% 55% / 0.12);  /* 青色 */
```

---

## 八、图片资源

| 文件 | 路径 | 用途 |
|------|------|------|
| App 图标 | `public/images/logo.png` | 启动页、隐私弹窗、导航标题 |
| 备用图标 | `public/images/logo_v2.png` | 备选版本 |
| 火箭图 | `public/images/rocket-hd.png` | 加速页火箭动画 |
| PWA 配置 | `public/manifest.json` | PWA 安装配置 |

---

## 九、Android WebView 集成要点

### 9.1 WebView 配置建议
```java
WebSettings settings = webView.getSettings();
settings.setJavaScriptEnabled(true);
settings.setDomStorageEnabled(true);       // localStorage 需要
settings.setDatabaseEnabled(true);
settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
settings.setMediaPlaybackRequiresUserGesture(false); // 激励广告自动播放
settings.setCacheMode(WebSettings.LOAD_DEFAULT);
```

### 9.2 LocalStorage 使用
- `privacy_agreed = "1"` → 隐私协议已同意标记（首次启动判断）

### 9.3 JavaScript Bridge 预留接口（待后端实现）
```javascript
// 以下为 H5 侧需要 App 实现的 Native Bridge 接口（设计预留）
window.FeiyuBridge = {
  getUserToken: () => String,         // 获取登录 token
  showRewardedAd: (callback) => void, // 展示激励广告，完成后回调
  shareToApp: (url, text) => void,    // 调用系统分享
  getDeviceId: () => String,          // 获取设备 ID
  openAppStore: () => void,           // 打开应用市场
  vibrate: (ms) => void,              // 触觉反馈
}
```

### 9.4 屏幕适配
- 设计基准宽度：**390px**（iPhone 14 逻辑宽度）
- 使用 `viewport` meta：`width=device-width, initial-scale=1.0`
- 已使用 Tailwind 相对单位，自适应 320px ~ 430px 宽度

---

## 十、构建产物说明

```
dist/
├── index.html          # 入口 HTML（约 1.2KB）
└── assets/
    ├── index-*.js      # 主 JS Bundle（约 319KB / gzip 87KB）
    └── index-*.css     # 样式文件（约 45KB / gzip 8KB）
```

**部署方式**：静态文件服务 / CDN，所有路由重定向到 `index.html`（SPA）

---

## 十一、联系与支持

- 客服邮箱：support@feiyu.info
- UI 源码：https://github.com/kaxivip/flyingfish-accelerator
# 飞鱼加速器 - 多端开发交付文档

> 版本：v1.0.0 | 更新日期：2026-06-26
> 适用团队：H5 前端 / Android / iOS

---

## 一、项目概述

飞鱼加速器是一款面向中国大陆用户的网络加速工具，采用广告驱动型免费运营模式。用户可通过完成任务赚取积分，积分可兑换会员时长。

**核心功能：** 网络加速（全局/应用模式）、积分体系、任务中心、会员兑换、邀请分享

**技术参考：** React 18 + TypeScript + TailwindCSS 3 原型（390×844px PhoneFrame）

---

## 二、设计规范

### 2.1 色彩体系（Deep Ocean 暗色主题）

| 用途 | CSS 变量 | HSL 值 | HEX 近似值 |
|------|----------|--------|-----------|
| 背景色 | `--background` | 220 35% 5% | #080C11 |
| 前景色（主文字） | `--foreground` | 200 20% 95% | #EDF2F4 |
| 卡片背景 | `--card` | 220 30% 9% | #0F1419 |
| 主色（青色） | `--primary` | 190 100% 50% | #00D4FF |
| 辅色（紫蓝） | `--secondary` | 240 50% 20% | #191A4C |
| 弱化色 | `--muted` | 220 20% 14% | #1A1F2B |
| 弱化文字 | `--muted-foreground` | 215 15% 55% | #7A8299 |
| 强调色（青色） | `--accent` | 170 70% 35% | #1A9E8F |
| 危险色 | `--destructive` | 0 72% 51% | #EF4444 |
| 边框色 | `--border` | 220 20% 16% | #1E2430 |
| 已连接状态 | `--status-connected` | 150 80% 50% | #19E68C |
| 断开状态 | `--status-disconnected` | 30 90% 55% | #F28A1C |
| 警告状态 | `--status-warning` | 45 90% 55% | #F2C51C |
| 深海色 | `--ocean-deep` | 220 40% 4% | #060910 |
| 海洋中层 | `--ocean-mid` | 220 30% 10% | #121822 |
| 海洋表层 | `--ocean-surface` | 195 90% 45% | #0BBAD9 |
| 海洋辉光 | `--ocean-glow` | 185 100% 55% | #1AE8FF |

### 2.2 背景渐变

```
页面主背景: linear-gradient(180deg, #080C11 0%, #0F1419 40%, #161C26 100%)
卡片背景(glass): background: #131820B3 + backdrop-filter: blur(12px)
辉光效果: box-shadow: 0 0 20px #00D4FF33, 0 0 60px #00D4FF14
```

### 2.3 字体规范

| 层级 | 字号 | 字重 | 用途 |
|------|------|------|------|
| 页面标题 | 18px | Bold (700) | 顶部导航标题 |
| 卡片标题 | 14-16px | SemiBold (600) | 卡片内标题 |
| 正文 | 14px | Regular (400) | 主要内容文字 |
| 辅助文字 | 12px | Regular (400) | 次要说明 |
| 小标签 | 10px | Medium (500) | 角标、标签、底部Tab |

**字体族：** `-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', 'Microsoft YaHei', sans-serif`

### 2.4 间距与圆角

| 用途 | 值 |
|------|-----|
| 基础圆角 | 12px (0.75rem) |
| 卡片圆角 | 16px (xl) |
| 按钮圆角 | 16px (2xl) |
| 弹窗圆角 | 16px (2xl) |
| 页面左右边距 | 20px |
| 卡片内边距 | 16px |
| 列表行间距 | 0px (用 border 分隔) |

---

## 三、页面清单与流转图

### 3.1 页面总览（共 16 个页面）

| # | 页面名称 | 文件 | 类型 | 说明 |
|---|---------|------|------|------|
| 1 | 启动页 | SplashPage | 全屏 | App 启动 splash |
| 2 | 首页（加速） | HomePage | Tab页 | 核心加速功能入口 |
| 3 | 领会员（任务中心） | TaskCenterPage | Tab页 | 积分任务与会员入口 |
| 4 | 我的 | ProfilePage | Tab页 | 用户信息与功能入口 |
| 5 | 登录页 | LoginPage | 全屏 | 用户登录 |
| 6 | 模式选择 | ModeSelectPage | 全屏 | 全局加速/应用加速 |
| 7 | 应用选择 | AppSelectPage | 全屏 | 应用加速模式下选App |
| 8 | 线路选择 | LineSelectPage | 全屏 | 选择加速线路节点 |
| 9 | 积分兑换 | PointsExchangePage | 全屏 | 积分兑换会员时长 |
| 10 | 积分明细 | PointsHistoryPage | 全屏 | 积分收支流水 |
| 11 | 分享好友 | SharePage | 全屏 | 邀请好友赚取积分 |
| 12 | 其它福利 | OtherBenefitsPage | 全屏 | 额外任务（应用好评等） |
| 13 | 任务提交 | TaskSubmitPage | 全屏 | 上传任务完成凭证 |
| 14 | 协议页 | AgreementPage | 全屏 | 隐私协议/服务协议 |
| 15 | 设置 | SettingsPage | 全屏 | 通知、缓存、版本、账号 |
| 16 | 注销账号 | AccountDeletePage | 全屏 | 注销确认 |
| 17 | 其它平台 | OtherPlatformsPage | 全屏 | 多端下载 |
| 18 | 关于飞鱼 | AboutPage | 全屏 | 产品介绍与联系方式 |

### 3.2 页面流转关系

```
【底部Tab导航】
├── 首页（加速）
│   ├── → 模式选择 → 应用选择（仅应用加速模式）
│   ├── → 线路选择
│   ├── → 分享好友（右上角入口）
│   └── → 登录页（未登录时点击加速按钮）
│
├── 领会员（任务中心）
│   ├── → 积分兑换
│   ├── → 积分明细
│   ├── → 分享好友
│   └── → 其它福利 → 任务提交
│
└── 我的
    ├── → 登录页（未登录时点击卡片）
    ├── → 设置
    │   ├── → 协议页（隐私/服务协议）
    │   ├── → 其它平台客户端
    │   ├── → 关于飞鱼
    │   ├── → 注销账号
    │   └── → 退出登录
    └── → 分享好友
```

### 3.3 底部导航

3 个固定 Tab：**加速**（Zap图标）、**领会员**（Crown图标）、**我的**（User图标）

- 选中态：主色（#00D4FF），图标加粗（strokeWidth 2.5），文字主色
- 未选中态：弱化灰色（#7A8299），图标常规（strokeWidth 1.5）
- 底部栏样式：glass 毛玻璃效果，上方有半透明边框分隔

---

## 四、各页面功能详述

### 4.1 首页（加速页）

**布局（从上到下）：**
1. 顶部栏：左侧 Logo 图标 + "飞鱼加速器" 文字 | 右侧 分享按钮
2. 状态徽章："准备就绪" / "连接中..." / "加速中 HH:MM:SS"
3. 火箭动画（SVG 火箭 + 弧形仪表盘刻度）
4. "立即提速"按钮（渐变色大按钮）
5. 模式卡片 + 线路卡片（grid-cols-2 并排）
6. 广告位预留 BANNER

**加速状态机：**

| 状态 | 按钮文案 | 按钮颜色 | 状态徽章 | 火箭动画 |
|------|---------|---------|---------|---------|
| 未连接 | 立即提速 | 蓝→青渐变 | 准备就绪（蓝点） | 静止 |
| 连接中 | 连接中... | 深蓝→蓝渐变 | 连接中...（闪烁蓝点） | 旋转光环 |
| 已连接 | 已加速 | 绿→青渐变 | 加速中 HH:MM:SS（绿点） | 上浮+火焰 |

**按钮行为：**
- 未登录 → 跳转登录页
- 已登录+未连接 → 触发连接（2秒后变为已连接）
- 已连接 → 断开连接

**计时规则：** 连接成功后从 00:00:00 开始每秒递增，断开后归零

### 4.2 模式选择页

| 模式 | 说明 |
|------|------|
| 全局加速 | 加速所有网络流量 |
| 应用加速 | 仅加速指定应用，可进入应用选择页勾选 |

**已选应用默认值：** YouTube, Telegram, ChatGPT（共 16 个可选应用）

### 4.3 线路选择页

| 线路 ID | 名称 | 地区 | 延迟 | 标签 |
|---------|------|------|------|------|
| smart | 智能优选 | 自动匹配最优线路 | < 50ms | 推荐 |
| japan | 日本-东京 | 亚洲·低延迟 | ~ 80ms | 热门 |
| hongkong | 香港-九龙 | 亚洲·极速 | ~ 30ms | - |
| korea | 韩国-首尔 | 亚洲·稳定 | ~ 60ms | - |
| usa | 美国-洛杉矶 | 北美·大带宽 | ~ 180ms | - |

**默认选中：** 智能优选（smart）

### 4.4 领会员（任务中心页）

**顶部信息卡片：** 显示当前积分余额、会员剩余时长

**功能入口（四宫格）：**
| 入口 | 行为 |
|------|------|
| 邀请好友 | → 分享好友页 |
| 积分兑换 | → 积分兑换页 |
| 积分明细 | → 积分明细页 |
| 其它福利 | → 其它福利页 |

**任务列表：** 每日签到、观看广告等可领取积分的任务

### 4.5 积分兑换页

**可兑换商品：**

| 商品 | 时长 | 消耗积分 | 标签 |
|------|------|---------|------|
| 30分钟会员 | 30 min | 30 积分 | - |
| 1小时会员 | 60 min | 60 积分 | 热门 |
| 24小时会员 | 1440 min | 1200 积分 | - |
| 7天会员 | 10080 min | 7200 积分 | - |

**规则：** 积分不足时按钮显示"积分不足"且不可点击；兑换成功后显示 2 秒"兑换成功"；会员时长立即生效可叠加

### 4.6 积分明细页

**记录类型：**
- earn（收入）：每日签到(10)、观看广告(30)、邀请好友(60)、完成任务(50)
- spend（支出）：兑换30分钟(30)、兑换1小时(60)、兑换24小时(1200)、兑换7天(7200)

**列表字段：** id, type, title, amount, time(MM/DD HH:mm)

**Tab切换：** 全部 / 收入 / 支出

### 4.7 分享好友页

**邀请规则：**
- 好友成功注册：邀请者获得 60 积分
- 分享链接/邀请码生成与复制

### 4.8 其它福利页

**任务类型：** 应用市场好评等外部任务

**任务状态：**
- 可领取：手动点击领取奖励积分
- 待完成：需上传凭证
- 已完成：已审核通过

**流程：** 点击任务 → 任务提交页（上传凭证截图） → 等待审核

### 4.9 设置页

**分组与菜单项：**

| 分组 | 菜单项 | 类型 | 行为 |
|------|--------|------|------|
| 通知与存储 | 消息通知 | 开关 | 切换开/关 |
| | 清除缓存 | 操作 | 弹出确认弹窗→确认清除/取消 |
| 法律与协议 | 隐私协议 | 跳转 | → 协议页 |
| | 服务协议 | 跳转 | → 协议页 |
| 关于 | 新版本检测 | 操作 | 第1次点击检测，显示"有新版本"；第2次进入升级流程 |
| | 其它平台客户端 | 跳转 | → 其它平台页 |
| | 关于飞鱼 | 跳转 | → 关于飞鱼页 |
| 账号 | 注销账号 | 操作 | → 注销确认页（仅登录可见） |
| | 退出登录 | 操作 | 清除登录态，回到首页（仅登录可见） |

**升级流程（弹窗）：**
1. 发现新版本弹窗：版本号 v1.0.0 → v1.1.0 + 更新说明
2. 点击"立即升级" → 下载进度条（0-100%）
3. 下载完成 → "正在安装"（旋转图标 1.5 秒）
4. 安装完成 → "升级完成"确认页

### 4.10 我的页

**已登录状态：** 显示头像、昵称、积分余额、会员时长
**未登录状态：** 显示"未登录"卡片 + "登录后享更多权益"，点击进入登录页

**功能入口：** 设置（右上角齿轮图标）、分享好友

---

## 五、动效规范

| 动效名称 | 时长 | 缓动 | 触发场景 |
|----------|------|------|---------|
| 页面滑入 | 300ms | ease-out | 全屏页面进入（从右滑入） |
| 弹窗淡入 | 500ms | ease-out | 弹窗出现（透明度+上移） |
| 火箭发射 | 700ms | ease-out | 加速连接成功 |
| 火焰闪烁 | 350ms | ease-in-out | 已连接状态持续 |
| 速度线条 | 1200ms | ease-in-out | 已连接状态持续 |
| 脉冲辉光 | 2000ms | ease-in-out | 按钮/图标呼吸效果 |
| 按钮点击 | - | - | scale 0.96 缩放 |
| 旋转加载 | 8000ms | linear | 版本检测/加载指示 |
| 进度条 | 300ms | - | 升级下载进度 |

---

## 六、API 接口清单

### 6.1 用户模块

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/user/login` | POST | 用户登录，返回 token |
| `/api/user/logout` | POST | 退出登录 |
| `/api/user/info` | GET | 获取用户信息（昵称、头像、积分、会员时长） |
| `/api/user/delete` | DELETE | 注销账号，清除所有数据 |

### 6.2 加速模块

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/accel/nodes` | GET | 获取可用节点/线路列表 |
| `/api/accel/connect` | POST | 开始加速（参数：mode, line, apps） |
| `/api/accel/disconnect` | POST | 停止加速 |
| `/api/accel/status` | GET | 查询当前连接状态 |

### 6.3 积分模块

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/points/balance` | GET | 获取积分余额 |
| `/api/points/history` | GET | 获取积分流水（参数：type, page, size） |
| `/api/points/checkin` | POST | 每日签到领取积分 |
| `/api/points/earn` | POST | 通用积分获取（参数：source, amount） |

### 6.4 会员模块

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/member/status` | GET | 获取会员状态与剩余时长 |
| `/api/member/exchange` | POST | 积分兑换会员（参数：product_id） |

### 6.5 任务模块

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/tasks/list` | GET | 获取任务列表 |
| `/api/tasks/submit` | POST | 提交任务凭证（multipart/form-data 含图片） |
| `/api/tasks/claim` | POST | 领取任务奖励 |

### 6.6 分享模块

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/invite/code` | GET | 获取邀请码/链接 |
| `/api/invite/records` | GET | 获取邀请记录 |

### 6.7 版本模块

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/version/check` | GET | 检测新版本（参数：current_version, platform） |
| `/api/version/download` | GET | 获取升级包下载地址 |

### 6.8 通用接口规范

**请求头：**
```
Authorization: Bearer <token>
Content-Type: application/json
X-Platform: h5 | android | ios
X-App-Version: 1.0.0
```

**响应格式：**
```json
{
  "code": 0,          // 0=成功，非0=错误码
  "message": "success",
  "data": { ... }     // 业务数据
}
```

**错误码约定：**
| code | 说明 |
|------|------|
| 0 | 成功 |
| 401 | Token 过期/未登录 |
| 403 | 权限不足 |
| 1001 | 积分不足 |
| 1002 | 会员兑换失败 |
| 2001 | 任务不存在 |
| 2002 | 任务已完成 |
| 3001 | 已是最新版本 |

---

## 七、多端适配要求

### 7.1 H5

| 项 | 要求 |
|-----|------|
| 浏览器兼容 | Chrome 80+, Safari 14+, 微信内置浏览器 |
| PWA 支持 | manifest.json 已配置，支持添加到主屏幕 |
| 离线缓存 | Service Worker 缓存静态资源 |
| 分享 | 调用 Web Share API，降级为复制链接 |
| 广告 SDK | 需对接激励广告 SDK（WebView 内嵌） |

### 7.2 Android

| 项 | 要求 |
|-----|------|
| 最低版本 | Android 7.0 (API 24) |
| 权限 | INTERNET, VPN, POST_NOTIFICATIONS, READ_MEDIA_IMAGES |
| VPN 服务 | 使用 VpnService API 实现网络代理 |
| 通知 | 前台服务常驻通知，显示加速状态与时长 |
| 广告 | 接入 Google AdMob 或穿山甲 SDK |
| 升级 | APK 下载 + 安装（需 REQUEST_INSTALL_PACKAGES） |

### 7.3 iOS

| 项 | 要求 |
|-----|------|
| 最低版本 | iOS 15.0 |
| 权限 | Network Extension (NEPacketTunnelProvider) |
| VPN 配置 | 首次使用需安装 VPN 配置文件 |
| 推送 | APNs 推送证书配置 |
| 广告 | 接入 AdMob iOS SDK |
| 升级 | 跳转 App Store 更新 |

---

## 八、状态机汇总

### 8.1 加速状态

```
未连接 ──[点击立即提速]──→ 连接中 ──[2秒超时/成功]──→ 已连接
已连接 ──[点击已加速]──→ 未连接
连接中 ──[失败]──→ 未连接（Toast提示）
```

### 8.2 登录状态

```
未登录 ──[登录成功]──→ 已登录
已登录 ──[退出登录/Token过期]──→ 未登录
已登录 ──[注销账号]──→ 未登录（数据清除）
```

### 8.3 会员状态

```
无会员 ──[积分兑换]──→ 会员生效中
会员生效中 ──[时长耗尽]──→ 无会员
会员生效中 ──[再次兑换]──→ 会员生效中（时长叠加）
```

### 8.4 任务状态

```
待完成 ──[用户上传凭证]──→ 审核中
审核中 ──[审核通过]──→ 已完成（可领取奖励）
审核中 ──[审核未通过]──→ 待完成（显示未通过原因）
已完成 ──[手动领取]──→ 已领取
```

---

## 九、异常处理清单

| 场景 | UI 反馈 |
|------|---------|
| 网络断开 | Toast "网络连接已断开" |
| 加速连接失败 | Toast "连接失败，请重试" + 回到未连接状态 |
| Token 过期 | 弹窗 "登录已过期，请重新登录" → 跳转登录页 |
| 积分不足 | 兑换按钮显示"积分不足"，不可点击 |
| 服务器错误 | Toast "服务异常，请稍后再试" |
| 广告加载失败 | 广告位显示"暂无广告"占位 |
| 版本检测失败 | Toast "检测失败，请稍后重试" |

---

## 十、资源清单

### 10.1 图片资源

| 资源 | 格式要求 | 说明 |
|------|---------|------|
| App Logo | PNG/SVG 多尺寸 | /images/logo.png |
| 火箭动画 | SVG 矢量 | 内联 SVG 代码 |
| 应用图标(16个) | SVG/PNG 48×48 | YouTube, X, Instagram 等 |

### 10.2 应用图标列表

| ID | 名称 | 分类 |
|----|------|------|
| youtube | YouTube | 视频 |
| twitter | X (Twitter) | 社交 |
| instagram | Instagram | 社交 |
| telegram | Telegram | 通讯 |
| whatsapp | WhatsApp | 通讯 |
| tiktok | TikTok | 视频 |
| discord | Discord | 社交 |
| spotify | Spotify | 音乐 |
| netflix | Netflix | 视频 |
| chatgpt | ChatGPT | AI |
| github | GitHub | 开发 |
| reddit | Reddit | 社区 |
| medium | Medium | 阅读 |
| notion | Notion | 效率 |
| figma | Figma | 设计 |
| google | Google | 搜索 |

---

## 十一、交付 Checklist

- [ ] 全部页面截图（正常态 + 各状态）
- [ ] 设计标注稿（Figma/蓝湖）
- [ ] 图标切图导出（SVG + @2x/@3x PNG）
- [ ] 色板文件（ASE/Swatches）
- [ ] 页面流转图（本文档第三章）
- [ ] 动效 Demo 视频（GIF/MP4）
- [ ] API 接口文档（Swagger/Apifox）
- [ ] 业务逻辑文档（本文档第四章）
- [ ] 多端权限清单
- [ ] 埋点需求文档
- [ ] 测试用例文档
