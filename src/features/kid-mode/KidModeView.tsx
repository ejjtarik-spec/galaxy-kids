import { useEffect, useState } from "react";

import DailyBonus from "../dashboard/DailyBonus";
import MissionPanel from "../missions/MissionPanel";
import RewardShop from "../rewards/RewardShop";

import { getLevelFromXP, getNextLevelXP } from "../../utils/level";
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
  const level = getLevelFromXP(xp);
  const nextLevelXP = getNextLevelXP(xp);
  const progress = Math.min((xp / nextLevelXP) * 100, 100);

  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className="rounded-3xl bg-white/80 p-5 shadow-xl">
      <div className="text-center">
        <div className="text-6xl">{child.avatar}</div>

        <h1 className="mt-2 text-3xl font-extrabold">
          Salut {child.name} 🚀
        </h1>

        <p className="mt-2 text-lg font-bold text-purple-700">
          ⭐ {xp} XP • 🪙 {child.coins || 0} pièces • 🔥 {child.streak || 0}
        </p>

        <div className="mt-5 rounded-3xl bg-purple-100 p-4">
          <p className="font-extrabold text-purple-700">
            🌟 Niveau {level}
          </p>

          <div className="mt-3 h-4 overflow-hidden rounded-full bg-white">
            <div
              className="h-4 rounded-full bg-purple-600 transition-all duration-1000 ease-out"
              style={{ width: `${animatedProgress}%` }}
            />
          </div>

          <p className="mt-2 text-sm font-bold text-gray-600">
            {xp} / {nextLevelXP} XP
          </p>
        </div>
      </div>

      <DailyBonus
        child={child}
        today={today}
        onClaim={onClaimDailyBonus}
      />

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

      <RewardShop
        child={child}
        rewards={rewards}
        onBuyReward={onBuyReward}
      />
    </div>
  );
}