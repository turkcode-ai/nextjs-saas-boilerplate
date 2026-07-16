import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import {
  Users,
  CreditCard,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+8.2%",
      trend: "up",
      icon: CreditCard,
    },
    {
      title: "Active Sessions",
      value: "1,234",
      change: "-2.4%",
      trend: "down",
      icon: Activity,
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+4.1%",
      trend: "up",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome back, {session.user?.name || "User"}!</h1>
        <p className="text-muted-foreground">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-card border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <span
                className={`flex items-center text-sm ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change}
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
              </span>
            </div>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {[
              { name: "John Doe", email: "john@example.com", amount: "$299", plan: "Pro" },
              { name: "Jane Smith", email: "jane@example.com", amount: "$99", plan: "Enterprise" },
              { name: "Bob Johnson", email: "bob@example.com", amount: "$29", plan: "Pro" },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-medium">{tx.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium">{tx.name}</p>
                    <p className="text-sm text-muted-foreground">{tx.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{tx.amount}</p>
                  <p className="text-sm text-muted-foreground">{tx.plan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Add User", icon: Users },
              { title: "Create Invoice", icon: CreditCard },
              { title: "View Reports", icon: Activity },
              { title: "Settings", icon: TrendingUp },
            ].map((action) => (
              <button
                key={action.title}
                className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <action.icon className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">{action.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
