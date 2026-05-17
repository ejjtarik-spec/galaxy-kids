"use client";

import { ScheduleActivity } from "../../types";

type DailyScheduleProps = {
  activities?: ScheduleActivity[];
  canEdit?: boolean;
  onEdit?: () => void;
};

export const defaultScheduleActivities: ScheduleActivity[] = [
  {
    id: "wake-up",
    time: "07:00",
    title: "Réveil",
    icon: "🌅",
    completed: false,
  },
  {
    id: "breakfast",
    time: "07:30",
    title: "Petit-déjeuner",
    icon: "🥣",
    completed: false,
  },
  {
    id: "school",
    time: "08:15",
    title: "École",
    icon: "🎒",
    completed: false,
  },
  {
    id: "lunch",
    time: "12:00",
    title: "Déjeuner",
    icon: "🍽️",
    completed: false,
  },
  {
    id: "homework",
    time: "17:00",
    title: "Devoirs",
    icon: "📚",
    completed: false,
  },
  {
    id: "dinner",
    time: "19:00",
    title: "Dîner",
    icon: "🍜",
    completed: false,
  },
  {
    id: "sleep",
    time: "20:30",
    title: "Dodo",
    icon: "🌙",
    completed: false,
  },
];

export default function DailySchedule({
  activities = defaultScheduleActivities,
  canEdit = false,
  onEdit,
}: DailyScheduleProps) {
  const nextActivity =
    activities.find((activity) => !activity.completed) || activities[0];

  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-cyan-400/20 bg-[#14072F] shadow-[0_25px_100px_rgba(0,0,0,0.45)]">
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 p-6 text-white">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-fuchsia-400/20 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-cyan-100">
              Ma journée
            </p>

            <h2 className="mt-1 text-3xl font-black leading-tight">
              📅 Emploi du temps
            </h2>

            <p className="mt-2 text-sm font-bold text-white/70">
              Suis ta journée étape par étape.
            </p>
          </div>

          {canEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-black text-white shadow-xl backdrop-blur transition active:scale-95"
            >
              🔒 Modifier
            </button>
          )}
        </div>
      </div>

      <div className="bg-[#100626] p-5">
        {nextActivity && (
          <div className="rounded-[2rem] border border-cyan-300/30 bg-cyan-300/10 p-5 shadow-[0_0_45px_rgba(34,211,238,0.15)]">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-200">
              Prochaine activité
            </p>

            <div className="mt-3 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/10 text-4xl shadow-xl">
                {nextActivity.icon}
              </div>

              <div>
                <p className="text-2xl font-black text-white">
                  {nextActivity.title}
                </p>

                <p className="mt-1 text-sm font-bold text-white/60">
                  à {nextActivity.time}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-center justify-between gap-4 rounded-[2rem] border p-4 shadow-xl ${
                activity.completed
                  ? "border-green-300/20 bg-green-400/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex min-w-0 items-center gap-4">
                <p className="w-14 shrink-0 text-sm font-black text-white/60">
                  {activity.time}
                </p>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.3rem] bg-white/10 text-3xl">
                  {activity.icon}
                </div>

                <p className="truncate text-lg font-black text-white">
                  {activity.title}
                </p>
              </div>

              <div
                className={`h-9 w-9 shrink-0 rounded-full border-4 ${
                  activity.completed
                    ? "border-green-300 bg-green-400"
                    : "border-white/15"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}