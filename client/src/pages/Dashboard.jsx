import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ListTodo,
  TrendingUp,
} from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import Topbar from "../components/layout/Topbar";
// import mockTasks from "../data/mockTasks";
import { useTaskContext } from "../hooks/useTaskContext";
import { isOverdue } from "../utils/dateHelpers";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
import RecentTasks from "../components/dashboard/RecentTasks";

function Dashboard() {
  // const tasks = mockTasks;

  const { tasks } = useTaskContext();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const overdue = tasks.filter(isOverdue).length;
  const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <>
      <Topbar title="Dashboard" />
      <div className="p-6">
        {total === 0 ? (
          <div className="rounded-card border border-ink-300/40 bg-white">
            <p className="text-center text-ink-500 py-16">
              No tasks yet - create your first one to see your dashboard com
              alive.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <StatCard
                icon={ListTodo}
                label="Total Tasks"
                value={total}
                delay={0}
              />
              <StatCard
                icon={Clock}
                label="Pending"
                value={pending}
                delay={0.05}
                accent="text-status-progress"
              />
              <StatCard
                icon={TrendingUp}
                label="In Progress"
                value={inProgress}
                delay={0.1}
                assent="text-status-progress"
              />
              <StatCard
                icon={CheckCircle2}
                label="Completed"
                value={completed}
                delay={0.15}
                assent="text-success"
              />
              <StatCard
                icon={AlertTriangle}
                label="Overdue"
                value={overdue}
                delay={0.2}
                accent="text-danger"
              />
            </div>

            <div className="rounded-card border border-ink-300/40 bg-white p-5 mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-ink-900">
                  Completion Rate
                </span>
                <span className="text-sm font-bold text-brand-600">
                  {completionPct}%
                </span>
              </div>
              <div className="w-full h-2 bg-ink-300/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-600 rounded-full transition-all duration-500"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-card border border-ink-300/40 bg-white p-5">
                <h2 className="text-sm font-semibold text-ink-900 mb-4">
                  Upcoming Deadlines
                </h2>
                <UpcomingDeadlines tasks={tasks} />
              </div>
              <div className="rounded-card border border-ink-300/40 bg-white p-5">
                <h2 className="text-sm font-semibold text-ink-900 mb-4">
                  Recent Tasks
                </h2>
                <RecentTasks tasks={tasks} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
