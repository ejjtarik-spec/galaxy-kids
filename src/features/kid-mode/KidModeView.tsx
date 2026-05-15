import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DailyBonus from "../dashboard/DailyBonus";
import MissionPanel from "../missions/MissionPanel";
import RewardShop from "../rewards/RewardShop";

import { getLevelFromXP, getNextLevelXP } from "../../utils/level";
import { getBadges } from "../../utils/badges";
import { Child, Reward, Task } from "../../types";

type KidModeViewProps = {
  child: Child;
  tasks: Task[];
  rewards: Reward[];
  today: string;
  taskTitle: string;
  loadingMission: boolean;
  onClaimDailyBonus: () => void;
  onTaskTitleChange: (value: string) => void;
  onGenerateMission: () => void;
  onAddTask: () => void;
  onCompleteTask: (task: Task) => void;
  onBuyReward: (reward: Reward) => void;
};

type KidSection = "today" | "missions" | "rewards" | "badges";

const KID_SECTIONS: {
  id: KidSection;
  icon: string;
  label: string;
}[] = [
  { id: "today", icon: "🏠", label: "Jour" },
  { id: "missions", icon: "🚀", label: "Missions" },
  { id: "rewards", icon: "🎁", label: "Shop" },
  { id: "badges", icon: "🏅", label: "Badges" },
];

export default function KidModeView({
  child,
  tasks,
  rewards,
  today,
  taskTitle,
  loadingMission,
  onClaimDailyBonus,
  onTaskTitleChange,
  onGenerateMission,
  onAddTask,
  onCompleteTask,
  onBuyReward,
}: KidModeViewProps) {
  const xp = child.xp || 0;
  const coins = child.coins || 0;
  const streak = child.streak || 0;

  const level = getLevelFromXP(xp);
  const nextLevelXP = getNextLevelXP(xp);
  const progress = Math.min((xp / nextLevelXP) * 100, 100);
  const badges = getBadges(xp, coins);

  const completedTasks = tasks.filter((task) => task.done).length;
  const remainingTasks = tasks.length - completedTasks;

  const [activeSection, setActiveSection] = useState<KidSection>("today");
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#F4F6FF] pb-24 shadow-2xl">
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 px-5 py-6 text-white">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-yellow-300/20 blur-2xl" />

        <div className="relative flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-5xl shadow-xl backdrop-blur">
            {child.avatar || "🚀"}
          </div>

          <div className="flex-1">
            <p className="text-sm font-bold text-white/80">Mode enfant</p>

            <h1 className="text-3xl font-black leading-tight">
              Salut {child.name} 🚀
            </h1>

            <p className="mt-1 text-sm font-bold text-white/90">
              Niveau {level} • {xp} XP
            </p>
          </div>
        </div>

        <div className="relative mt-6 rounded-3xl bg-white/20 p-4 backdrop-blur">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-black">Progression galaxie</span>

            <span className="text-sm font-black">
              {xp} / {nextLevelXP} XP
            </span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-white/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 shadow-lg transition-all duration-1000 ease-out"
              style={{ width: `${animatedProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 p-4">
        <div className="rounded-3xl bg-white p-4 text-center shadow">
          <p className="text-2xl">🪙</p>
          <p className="text-xl font-black text-yellow-600">{coins}</p>
          <p className="text-xs font-bold text-gray-500">Pièces</p>
        </div>

        <div className="rounded-3xl bg-white p-4 text-center shadow">
          <p className="text-2xl">🔥</p>
          <p className="text-xl font-black text-orange-500">{streak}</p>
          <p className="text-xs font-bold text-gray-500">Streak</p>
        </div>

        <div className="rounded-3xl bg-white p-4 text-center shadow">
          <p className="text-2xl">✅</p>
          <p className="text-xl font-black text-green-600">
            {completedTasks}
          </p>
          <p className="text-xs font-bold text-gray-500">Faites</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{
            duration: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="space-y-4 p-4 pt-0"
        >
          {activeSection === "today" && (
            <>
              <div className="rounded-3xl bg-white p-5 shadow-xl">
                <h2 className="text-xl font-black text-indigo-900">
                  📅 Ta journée
                </h2>

                <p className="mt-2 text-sm font-bold text-gray-500">
                  Continue ta série, récupère ton bonus et termine tes missions.
                </p>

                <div className="mt-4 rounded-3xl bg-indigo-50 p-4">
                  <p className="font-black text-indigo-700">
                    Missions restantes
                  </p>

                  <p className="mt-1 text-3xl font-black text-indigo-900">
                    {remainingTasks}
                  </p>
                </div>
              </div>

              <DailyBonus
                child={child}
                today={today}
                onClaim={onClaimDailyBonus}
              />
            </>
          )}

          {activeSection === "missions" && (
            <MissionPanel
              child={child}
              tasks={tasks}
              taskTitle={taskTitle}
              loadingMission={loadingMission}
              canManageMissions={false}
              onTaskTitleChange={onTaskTitleChange}
              onGenerateMission={onGenerateMission}
              onAddTask={onAddTask}
              onCompleteTask={onCompleteTask}
            />
          )}

          {activeSection === "rewards" && (
            <RewardShop
              child={child}
              rewards={rewards}
              onBuyReward={onBuyReward}
            />
          )}

          {activeSection === "badges" && (
            <div className="rounded-3xl bg-white p-5 shadow-xl">
              <h2 className="text-xl font-black text-indigo-900">
                🏅 Tes badges
              </h2>

              <p className="mt-2 text-sm font-bold text-gray-500">
                Débloque des badges en gagnant de l’XP et des pièces.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {badges.length > 0 ? (
                  badges.map((badge) => (
                    <div
                      key={badge}
                      className="rounded-3xl bg-gradient-to-br from-yellow-100 to-orange-100 p-4 text-center shadow"
                    >
                      <div className="text-4xl">{badge}</div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 rounded-3xl bg-gray-50 p-5 text-center">
                    <p className="text-4xl">🔒</p>

                    <p className="mt-2 font-black text-gray-600">
                      Aucun badge pour l’instant
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 right-4 z-40 rounded-[2rem] bg-white/90 p-2 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-4 gap-2">
          {KID_SECTIONS.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`rounded-3xl px-2 py-3 text-center transition active:scale-95 ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-gray-500"
                }`}
              >
                <div className="text-2xl">{section.icon}</div>
                <div className="mt-1 text-[11px] font-black">
                  {section.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}