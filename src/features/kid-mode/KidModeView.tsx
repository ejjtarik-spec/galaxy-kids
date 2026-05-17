"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DailyBonus from "../dashboard/DailyBonus";
import DailySchedule from "../day/DailySchedule";
import MissionPanel from "../missions/MissionPanel";
import RewardShop from "../rewards/RewardShop";
import GalaxyMap from "../galaxy/GalaxyMap";
import EcoModeView from "../eco/EcoModeView";

import { getLevelFromXP, getNextLevelXP } from "../../utils/level";
import { getBadges } from "../../utils/badges";
import { Child, Reward, Task } from "../../types";

type EcoReward = {
  xp: number;
  coins: number;
};

type KidModeViewProps = {
  child: Child;
  tasks: Task[];
  rewards: Reward[];
  today: string;
  taskTitle: string;
  loadingMission: boolean;
  completedEcoActions: string[];
  onClaimDailyBonus: () => void;
  onTaskTitleChange: (value: string) => void;
  onGenerateMission: () => void;
  onAddTask: () => void;
  onCompleteTask: (task: Task) => void;
  onBuyReward: (reward: Reward) => void;
  onCompleteEcoAction: (actionId: string, reward: EcoReward) => void;
};

type KidSection =
  | "today"
  | "missions"
  | "eco"
  | "map"
  | "rewards"
  | "badges";

const KID_SECTIONS: {
  id: KidSection;
  icon: string;
  label: string;
  glow: string;
}[] = [
  { id: "today", icon: "🏠", label: "Jour", glow: "from-cyan-400 to-blue-500" },
  { id: "missions", icon: "🚀", label: "Missions", glow: "from-fuchsia-500 to-purple-600" },
  { id: "eco", icon: "🌿", label: "Éco", glow: "from-green-400 to-emerald-600" },
  { id: "map", icon: "🌌", label: "Carte", glow: "from-indigo-500 to-cyan-500" },
  { id: "rewards", icon: "🎁", label: "Shop", glow: "from-yellow-400 to-orange-500" },
  { id: "badges", icon: "🏅", label: "Badges", glow: "from-pink-500 to-rose-500" },
];

export default function KidModeView({
  child,
  tasks,
  rewards,
  today,
  taskTitle,
  loadingMission,
  completedEcoActions,
  onClaimDailyBonus,
  onTaskTitleChange,
  onGenerateMission,
  onAddTask,
  onCompleteTask,
  onBuyReward,
  onCompleteEcoAction,
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
    <div className="relative overflow-hidden rounded-[2.5rem] border border-cyan-400/10 bg-[#090014] pb-28 shadow-[0_35px_140px_rgba(0,0,0,0.55)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#312e81_0%,#090014_70%)]" />

      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-indigo-600 via-purple-700 to-fuchsia-700 px-5 py-6 text-white">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-pink-400/20 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-cyan-300 via-purple-400 to-pink-500 text-6xl shadow-[0_20px_80px_rgba(103,232,249,0.35)]"
          >
            {child.avatar || "🚀"}
          </motion.div>

          <div className="flex-1">
            <p className="text-sm font-black uppercase tracking-widest text-cyan-100">
              Mode enfant
            </p>

            <h1 className="text-4xl font-black leading-tight">
              Salut {child.name} 🚀
            </h1>

            <p className="mt-1 text-sm font-black text-white/80">
              Niveau {level} • {xp} XP
            </p>
          </div>
        </div>

        <div className="relative mt-6 rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-black text-cyan-100">
              Progression galaxie
            </span>

            <span className="text-sm font-black text-white/80">
              {xp} / {nextLevelXP}
            </span>
          </div>

          <div className="h-5 overflow-hidden rounded-full bg-black/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${animatedProgress}%` }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-yellow-300 shadow-[0_0_30px_rgba(103,232,249,0.8)]"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-3 p-4">
        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 text-center shadow-xl backdrop-blur-xl">
          <p className="text-3xl">🪙</p>
          <p className="mt-1 text-2xl font-black text-yellow-200">{coins}</p>
          <p className="text-[11px] font-black uppercase text-white/40">Pièces</p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 text-center shadow-xl backdrop-blur-xl">
          <p className="text-3xl">🔥</p>
          <p className="mt-1 text-2xl font-black text-orange-300">{streak}</p>
          <p className="text-[11px] font-black uppercase text-white/40">Streak</p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 text-center shadow-xl backdrop-blur-xl">
          <p className="text-3xl">✅</p>
          <p className="mt-1 text-2xl font-black text-green-300">
            {completedTasks}
          </p>
          <p className="text-[11px] font-black uppercase text-white/40">Faites</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 space-y-4 p-4 pt-0"
        >
          {activeSection === "today" && (
            <>
              <div className="rounded-[2.5rem] border border-cyan-400/10 bg-[#160A38] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                <h2 className="text-3xl font-black text-white">📅 Ta journée</h2>

                <p className="mt-2 text-sm font-bold text-white/60">
                  Continue ta série et termine tes missions galactiques.
                </p>

                <div className="mt-5 rounded-[2rem] bg-gradient-to-r from-cyan-400/15 to-fuchsia-500/15 p-5">
                  <p className="font-black text-cyan-200">
                    Missions restantes
                  </p>

                  <p className="mt-1 text-5xl font-black text-white">
                    {remainingTasks}
                  </p>
                </div>
              </div>

              <DailySchedule canEdit={false} />

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

          {activeSection === "eco" && (
            <EcoModeView
              completedActionIds={completedEcoActions}
              onCompleteEcoAction={onCompleteEcoAction}
            />
          )}

          {activeSection === "map" && (
            <GalaxyMap child={child} tasks={tasks} today={today} />
          )}

          {activeSection === "rewards" && (
            <RewardShop
              child={child}
              rewards={rewards}
              onBuyReward={onBuyReward}
            />
          )}

          {activeSection === "badges" && (
            <div className="rounded-[2.5rem] border border-pink-400/10 bg-[#160A38] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
              <h2 className="text-3xl font-black text-white">🏅 Tes badges</h2>

              <p className="mt-2 text-sm font-bold text-white/60">
                Débloque des badges en gagnant de l’XP et des pièces.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {badges.length > 0 ? (
                  badges.map((badge) => (
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      key={badge}
                      className="rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/15 to-orange-400/15 p-5 text-center shadow-xl"
                    >
                      <div className="text-5xl">{badge}</div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-2 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
                    <p className="text-6xl">🔒</p>

                    <p className="mt-3 font-black text-white/60">
                      Aucun badge pour l’instant
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-4 left-1/2 z-50 w-[96%] max-w-md -translate-x-1/2">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#14072F]/90 p-2 shadow-[0_25px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/[0.05] via-fuchsia-500/[0.05] to-yellow-300/[0.05]" />

          <div className="relative grid grid-cols-6 gap-1">
            {KID_SECTIONS.map((section) => {
              const isActive = activeSection === section.id;

              return (
                <motion.button
                  key={section.id}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setActiveSection(section.id)}
                  className={`relative overflow-hidden rounded-[1.5rem] px-1 py-3 text-center transition ${
                    isActive
                      ? `bg-gradient-to-br ${section.glow} text-white shadow-[0_0_30px_rgba(255,255,255,0.2)]`
                      : "text-white/45"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="kid-nav-glow"
                      className="absolute inset-0 rounded-[1.5rem] bg-white/10"
                    />
                  )}

                  <div className="relative z-10 text-xl">{section.icon}</div>

                  <div className="relative z-10 mt-1 text-[9px] font-black uppercase tracking-wide">
                    {section.label}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}