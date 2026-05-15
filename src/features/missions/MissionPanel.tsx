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
  return (
    <div className="mt-6 rounded-3xl bg-white p-5 shadow-xl">
      <h2 className="text-xl font-bold">
        ✅ Missions de {child.avatar} {child.name}
      </h2>

      {canManageMissions && (
        <div className="mt-4 flex flex-col gap-3">
          <button
            onClick={onGenerateMission}
            disabled={loadingMission}
            className="rounded-xl bg-pink-500 p-3 font-bold text-white"
          >
            {loadingMission ? "🤖 Génération..." : "🤖 Générer mission IA"}
          </button>

          <input
            value={taskTitle}
            onChange={(e) => onTaskTitleChange(e.target.value)}
            placeholder={`Nouvelle mission pour ${child.name}`}
            className="rounded-xl border p-3"
          />

          <button
            onClick={onAddTask}
            className="rounded-xl bg-green-600 p-3 font-bold text-white"
          >
            ➕ Ajouter mission à {child.name}
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3">
        {tasks.length === 0 && (
          <p className="text-gray-500">Aucune mission.</p>
        )}

        {tasks.map((task) => (
          <div key={task.id} className="rounded-2xl border p-4">
            <p className="font-bold">{task.title}</p>

            <p className="text-sm text-gray-500">
              ⭐ {task.xp} XP • 🪙 {task.coins}
            </p>

            {!task.done ? (
              <button
                onClick={() => onCompleteTask(task)}
                className="mt-3 rounded-xl bg-purple-600 px-4 py-2 font-bold text-white"
              >
                ✅ Mission terminée
              </button>
            ) : (
              <p className="mt-3 font-bold text-green-600">
                🎉 Mission accomplie
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}