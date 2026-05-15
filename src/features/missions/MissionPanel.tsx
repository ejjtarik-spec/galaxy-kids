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
  const completedTasks = tasks.filter((task) => task.done).length;
  const remainingTasks = tasks.length - completedTasks;

  return (
    <div className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-xl">
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl shadow-lg backdrop-blur">
            {child.avatar || "🚀"}
          </div>

          <div>
            <p className="text-sm font-black text-white/80">
              Centre de missions
            </p>

            <h2 className="text-2xl font-black">
              Missions de {child.name}
            </h2>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-white/20 p-4 text-center backdrop-blur">
            <p className="text-3xl font-black">{remainingTasks}</p>
            <p className="text-xs font-bold text-white/80">À terminer</p>
          </div>

          <div className="rounded-3xl bg-white/20 p-4 text-center backdrop-blur">
            <p className="text-3xl font-black">{completedTasks}</p>
            <p className="text-xs font-bold text-white/80">Réussies</p>
          </div>
        </div>
      </div>

      {canManageMissions && (
        <div className="space-y-3 bg-purple-50 p-5">
          <button
            onClick={onGenerateMission}
            disabled={loadingMission}
            className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 p-4 font-black text-white shadow-lg transition active:scale-95 disabled:opacity-60"
          >
            {loadingMission ? "🤖 Génération en cours..." : "🤖 Générer mission IA"}
          </button>

          <input
            value={taskTitle}
            onChange={(e) => onTaskTitleChange(e.target.value)}
            placeholder={`Nouvelle mission pour ${child.name}`}
            className="w-full rounded-2xl border-2 border-purple-100 bg-white p-4 font-bold outline-none transition focus:border-purple-400"
          />

          <button
            onClick={onAddTask}
            disabled={!taskTitle.trim()}
            className="w-full rounded-2xl bg-green-500 p-4 font-black text-white shadow-lg transition active:scale-95 disabled:opacity-50"
          >
            ➕ Ajouter mission à {child.name}
          </button>
        </div>
      )}

      <div className="space-y-3 p-5">
        {tasks.length === 0 && (
          <div className="rounded-3xl bg-gray-50 p-6 text-center">
            <p className="text-5xl">🌙</p>

            <p className="mt-3 text-lg font-black text-gray-700">
              Aucune mission
            </p>

            <p className="mt-1 text-sm font-bold text-gray-400">
              Les prochaines aventures apparaîtront ici.
            </p>
          </div>
        )}

        {tasks.map((task, index) => {
          const isDone = task.done;

          return (
            <div
              key={task.id}
              className={`relative overflow-hidden rounded-3xl border-2 p-4 shadow-sm transition ${
                isDone
                  ? "border-green-200 bg-green-50"
                  : "border-purple-100 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl font-black shadow ${
                    isDone
                      ? "bg-green-500 text-white"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {isDone ? "✓" : index + 1}
                </div>

                <div className="flex-1">
                  <p
                    className={`text-lg font-black leading-snug ${
                      isDone ? "text-green-800 line-through" : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-700">
                      ⭐ +{task.xp} XP
                    </span>

                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-700">
                      🪙 +{task.coins}
                    </span>
                  </div>

                  {!isDone ? (
                    <button
                      onClick={() => onCompleteTask(task)}
                      className="mt-4 w-full rounded-2xl bg-purple-600 px-4 py-3 font-black text-white shadow-lg transition active:scale-95"
                    >
                      ✅ Mission terminée
                    </button>
                  ) : (
                    <p className="mt-4 rounded-2xl bg-green-500 px-4 py-3 text-center font-black text-white">
                      🎉 Mission accomplie
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}