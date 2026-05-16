"use client";

import { motion } from "framer-motion";

import GameButton from "../../components/ui/GameButton";

import { Child, Task } from "../../types";

type MissionPanelProps = {
  child: Child;
  tasks: Task[];
  taskTitle: string;
  loadingMission: boolean;
  canManageMissions?: boolean;
  onTaskTitleChange: (value: string) => void;
  onGenerateMission: () => void;
  onAddTask: () => void;
  onCompleteTask: (task: Task) => void;
};

const missionIcons = [
  "🧹",
  "📚",
  "🧠",
  "🚀",
  "🎨",
  "⚽",
  "🛏️",
  "🦷",
];

export default function MissionPanel({
  child,
  tasks,
  taskTitle,
  loadingMission,
  canManageMissions = true,
  onTaskTitleChange,
  onGenerateMission,
  onAddTask,
  onCompleteTask,
}: MissionPanelProps) {
  const completedTasks = tasks.filter(
    (task) => task.done
  ).length;

  const remainingTasks =
    tasks.length - completedTasks;

  return (
    <div className="mt-6 overflow-hidden rounded-[2.8rem] border border-fuchsia-400/20 bg-[#160A38]/90 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-fuchsia-600 via-purple-700 to-indigo-700 p-6 text-white">
        <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-pink-400/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

        <motion.div
          animate={{
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-10 top-10 text-white/40">
            ✦
          </div>

          <div className="absolute right-16 top-20 text-white/30">
            ✦
          </div>

          <div className="absolute bottom-10 left-1/3 text-white/20">
            ✦
          </div>
        </motion.div>

        <div className="relative z-10 flex items-center gap-4">
          <motion.div
            animate={{
              y: [0, -6, 0],
              rotate: [0, -4, 4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-[2rem]
              bg-gradient-to-br
              from-pink-400
              via-fuchsia-500
              to-indigo-500
              text-5xl
              shadow-[0_20px_60px_rgba(192,132,252,0.45)]
            "
          >
            {child.avatar || "🚀"}
          </motion.div>

          <div>
            <p className="text-sm font-black uppercase tracking-widest text-fuchsia-200">
              Centre de missions
            </p>

            <h2 className="mt-1 text-4xl font-black leading-tight text-white">
              Tes missions ✨
            </h2>
          </div>
        </div>

        <div className="relative z-10 mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 text-center shadow-xl backdrop-blur-xl">
            <p className="text-5xl font-black text-cyan-300">
              {remainingTasks}
            </p>

            <p className="mt-1 text-xs font-black uppercase tracking-wide text-white/70">
              À terminer
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 text-center shadow-xl backdrop-blur-xl">
            <p className="text-5xl font-black text-green-300">
              {completedTasks}
            </p>

            <p className="mt-1 text-xs font-black uppercase tracking-wide text-white/70">
              Réussies
            </p>
          </div>
        </div>
      </div>

      {canManageMissions && (
        <div className="space-y-4 border-b border-white/5 bg-white/[0.03] p-5">
          <GameButton
            onClick={onGenerateMission}
            disabled={loadingMission}
            className="
              w-full
              bg-gradient-to-r
              from-fuchsia-500
              via-purple-500
              to-cyan-500
              text-lg
            "
          >
            {loadingMission
              ? "🤖 Génération..."
              : "🤖 Générer mission IA"}
          </GameButton>

          <input
            value={taskTitle}
            onChange={(e) =>
              onTaskTitleChange(e.target.value)
            }
            placeholder={`Nouvelle mission pour ${child.name}`}
            className="
              w-full
              rounded-[1.8rem]
              border
              border-white/10
              bg-white/10
              p-4
              text-lg
              font-bold
              text-white
              outline-none
              backdrop-blur-xl
              placeholder:text-white/40
              focus:border-fuchsia-400/40
            "
          />

          <GameButton
            onClick={onAddTask}
            disabled={!taskTitle.trim()}
            className="
              w-full
              bg-gradient-to-r
              from-green-400
              via-emerald-500
              to-teal-500
              text-lg
            "
          >
            ➕ Ajouter mission
          </GameButton>
        </div>
      )}

      <div className="space-y-5 p-5">
        {tasks.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
            <p className="text-7xl">🌙</p>

            <p className="mt-4 text-3xl font-black text-white">
              Aucune mission
            </p>

            <p className="mt-2 text-sm font-bold text-white/50">
              Les prochaines aventures apparaîtront ici.
            </p>
          </div>
        )}

        {tasks.map((task, index) => {
          const isDone = task.done;

          return (
            <motion.div
              key={task.id}
              whileHover={{
                scale: 1.015,
              }}
              className={`
                relative
                overflow-hidden
                rounded-[2.3rem]
                border
                p-5
                shadow-[0_15px_60px_rgba(0,0,0,0.35)]
                backdrop-blur-2xl
                transition
                ${
                  isDone
                    ? "border-cyan-400/40 bg-[#0E1A5A]"
                    : "border-fuchsia-400/20 bg-[#120A45]"
                }
              `}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-cyan-300/[0.03]" />

              {isDone && (
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
              )}

              <div className="relative z-10 flex items-start gap-4">
                <div
                  className={`
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-[1.7rem]
                    text-4xl
                    shadow-[0_10px_35px_rgba(0,0,0,0.35)]
                    ${
                      isDone
                        ? "bg-gradient-to-br from-green-400 to-emerald-500"
                        : "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500"
                    }
                  `}
                >
                  {isDone
                    ? "✓"
                    : missionIcons[
                        index % missionIcons.length
                      ]}
                </div>

                <div className="flex-1">
                  <p
                    className={`
                      text-2xl
                      font-black
                      leading-tight
                      ${
                        isDone
                          ? "text-cyan-100"
                          : "text-white"
                      }
                    `}
                  >
                    {task.title}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <div className="rounded-full bg-yellow-300/15 px-4 py-2 text-sm font-black text-yellow-200">
                      ⭐ +{task.xp} XP
                    </div>

                    <div className="rounded-full bg-orange-300/15 px-4 py-2 text-sm font-black text-orange-200">
                      🪙 +{task.coins}
                    </div>
                  </div>

                  {!isDone ? (
                    <div className="mt-5">
                      <GameButton
                        onClick={() =>
                          onCompleteTask(task)
                        }
                        className="
                          w-full
                          bg-gradient-to-r
                          from-green-400
                          via-emerald-500
                          to-teal-500
                          text-lg
                        "
                      >
                        🎉 Mission accomplie
                      </GameButton>
                    </div>
                  ) : (
                    <div className="mt-5 rounded-[1.7rem] bg-gradient-to-r from-green-400 to-emerald-500 px-5 py-4 text-center text-lg font-black text-white shadow-[0_10px_40px_rgba(34,197,94,0.35)]">
                      ✅ Mission terminée
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}