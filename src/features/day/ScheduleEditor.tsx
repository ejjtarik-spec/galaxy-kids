"use client";

import { useState } from "react";
import { ScheduleActivity } from "../../types";
import GameButton from "../../components/ui/GameButton";

type ScheduleEditorProps = {
  activities: ScheduleActivity[];
  onSave: (activities: ScheduleActivity[]) => void;
  onClose: () => void;
};

const emptyActivity: ScheduleActivity = {
  id: "",
  title: "",
  time: "08:00",
  icon: "⭐",
  completed: false,
};

export default function ScheduleEditor({
  activities,
  onSave,
  onClose,
}: ScheduleEditorProps) {
  const [draftActivities, setDraftActivities] =
    useState<ScheduleActivity[]>(activities);

  const updateActivity = (
    id: string,
    field: keyof ScheduleActivity,
    value: string | boolean
  ) => {
    setDraftActivities((current) =>
      current.map((activity) =>
        activity.id === id
          ? {
              ...activity,
              [field]: value,
            }
          : activity
      )
    );
  };

  const addActivity = () => {
    const newActivity: ScheduleActivity = {
      ...emptyActivity,
      id: crypto.randomUUID(),
    };

    setDraftActivities((current) => [...current, newActivity]);
  };

  const removeActivity = (id: string) => {
    setDraftActivities((current) =>
      current.filter((activity) => activity.id !== id)
    );
  };

  const handleSave = () => {
    const cleanedActivities = draftActivities
      .filter((activity) => activity.title.trim())
      .sort((a, b) => a.time.localeCompare(b.time));

    onSave(cleanedActivities);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-md overflow-hidden rounded-[2.5rem] border border-cyan-400/20 bg-[#120A2A] shadow-[0_30px_120px_rgba(0,0,0,0.7)]">
        <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 p-6 text-white">
          <p className="text-sm font-black uppercase tracking-widest text-cyan-100">
            Contrôle parental
          </p>

          <h2 className="mt-1 text-3xl font-black">
            🔒 Modifier la journée
          </h2>

          <p className="mt-2 text-sm font-bold text-white/70">
            Ajoute, modifie ou supprime les activités de l’enfant.
          </p>
        </div>

        <div className="max-h-[58vh] space-y-4 overflow-y-auto bg-[#090014] p-5">
          {draftActivities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-xl"
            >
              <div className="grid grid-cols-[70px_1fr] gap-3">
                <input
                  value={activity.icon}
                  onChange={(e) =>
                    updateActivity(activity.id, "icon", e.target.value)
                  }
                  className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center text-2xl text-white outline-none"
                  placeholder="⭐"
                />

                <input
                  value={activity.title}
                  onChange={(e) =>
                    updateActivity(activity.id, "title", e.target.value)
                  }
                  className="rounded-2xl border border-white/10 bg-white/10 p-3 font-bold text-white outline-none placeholder:text-white/40"
                  placeholder="Nom de l’activité"
                />
              </div>

              <div className="mt-3 flex gap-3">
                <input
                  type="time"
                  value={activity.time}
                  onChange={(e) =>
                    updateActivity(activity.id, "time", e.target.value)
                  }
                  className="flex-1 rounded-2xl border border-white/10 bg-white/10 p-3 font-bold text-white outline-none"
                />

                <button
                  type="button"
                  onClick={() => removeActivity(activity.id)}
                  className="rounded-2xl bg-red-500/20 px-4 py-3 text-sm font-black text-red-200 transition active:scale-95"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addActivity}
            className="w-full rounded-[2rem] border border-dashed border-cyan-300/30 bg-cyan-300/10 p-5 text-center font-black text-cyan-100 transition active:scale-95"
          >
            ➕ Ajouter une activité
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-white/10 bg-[#120A2A] p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-white/10 px-5 py-4 font-black text-white transition active:scale-95"
          >
            Annuler
          </button>

          <GameButton
            onClick={handleSave}
            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
          >
            Sauvegarder
          </GameButton>
        </div>
      </div>
    </div>
  );
}