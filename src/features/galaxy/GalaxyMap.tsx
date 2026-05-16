"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Child, Task } from "../../types";
import { getLevelFromXP } from "../../utils/level";

type GalaxyMapProps = {
  child: Child;
  tasks: Task[];
  today: string;
};

type Planet = {
  level: number;
  name: string;
  icon: string;
  color: string;
  glow: string;
  description: string;
};

const planets: Planet[] = [
  {
    level: 1,
    name: "Lune Douce",
    icon: "🌙",
    color: "from-cyan-300 via-blue-400 to-indigo-500",
    glow: "rgba(34,211,238,0.6)",
    description: "Le début de ton aventure spatiale.",
  },
  {
    level: 2,
    name: "Planète Étoile",
    icon: "⭐",
    color: "from-yellow-300 via-orange-400 to-pink-500",
    glow: "rgba(250,204,21,0.7)",
    description: "Tu commences à briller dans la galaxie.",
  },
  {
    level: 3,
    name: "Mars Courage",
    icon: "🔴",
    color: "from-red-400 via-orange-500 to-yellow-400",
    glow: "rgba(248,113,113,0.7)",
    description: "Une planète pour les enfants courageux.",
  },
  {
    level: 4,
    name: "Jupiter Géante",
    icon: "🪐",
    color: "from-purple-400 via-fuchsia-500 to-pink-500",
    glow: "rgba(217,70,239,0.7)",
    description: "Tes pouvoirs grandissent très vite.",
  },
  {
    level: 5,
    name: "Galaxie Magique",
    icon: "🌌",
    color: "from-indigo-400 via-violet-500 to-purple-700",
    glow: "rgba(139,92,246,0.8)",
    description: "Tu entres dans une zone légendaire.",
  },
  {
    level: 6,
    name: "Soleil Héros",
    icon: "☀️",
    color: "from-yellow-200 via-orange-400 to-red-500",
    glow: "rgba(251,191,36,0.8)",
    description: "Le niveau des vrais héros cosmiques.",
  },
];

const weekLabels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function getWeekDays(today: string) {
  const currentDate = new Date(today);
  const day = currentDate.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + diffToMonday + index);

    return {
      label: weekLabels[index],
      date: date.toISOString().split("T")[0],
    };
  });
}

export default function GalaxyMap({ child, tasks, today }: GalaxyMapProps) {
  const level = getLevelFromXP(child.xp || 0);

  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  const todayTasks = tasks.filter((task) => !task.date || task.date === today);
  const completedToday = todayTasks.filter((task) => task.done).length;
  const totalToday = todayTasks.length;
  const missionProgress =
    totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  const weekDays = getWeekDays(today);

  return (
    <div className="mt-6 overflow-hidden rounded-[2.5rem] bg-[#100A2E] text-white shadow-[0_30px_120px_rgba(76,29,149,0.45)]">
      <div className="relative overflow-hidden bg-gradient-to-br from-fuchsia-600 via-purple-700 to-indigo-800 p-5">
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 22 }).map((_, index) => (
            <motion.div
              key={index}
              animate={{
                opacity: [0.15, 1, 0.15],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: 2 + (index % 4),
                repeat: Infinity,
                delay: index * 0.15,
              }}
              className="absolute text-white/40"
              style={{
                left: `${(index * 37) % 100}%`,
                top: `${(index * 53) % 100}%`,
              }}
            >
              ✦
            </motion.div>
          ))}
        </div>

        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-yellow-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-pink-400/30 blur-3xl" />

        <div className="relative z-10">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-purple-100">
            Carte Galaxie
          </p>

          <div className="mt-2 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black leading-tight">
                Aventure de {child.name} 🚀
              </h2>

              <p className="mt-2 text-sm font-bold text-white/70">
                Explore les planètes, termine les missions et débloque la galaxie.
              </p>
            </div>

            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[2rem] bg-white/10 text-5xl shadow-2xl backdrop-blur"
            >
              🛸
            </motion.div>
          </div>

          <div className="mt-6 rounded-[2rem] bg-white/10 p-4 shadow-inner backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-white/70">
                  Missions du jour
                </p>

                <p className="mt-1 text-4xl font-black">
                  {completedToday} / {totalToday}
                </p>

                <p className="mt-1 text-xs font-bold text-white/60">
                  Aujourd’hui : {today}
                </p>
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-yellow-300 to-orange-500 text-center text-purple-950 shadow-[0_0_40px_rgba(250,204,21,0.55)]"
              >
                <div>
                  <p className="text-3xl font-black">{missionProgress}%</p>
                  <p className="text-[10px] font-black uppercase">terminé</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-5 h-4 overflow-hidden rounded-full bg-white/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${missionProgress}%` }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 shadow-[0_0_30px_rgba(250,204,21,0.8)]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 bg-[#140D3A] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black">📅 Semaine cosmique</h3>

            <p className="mt-1 text-sm font-bold text-white/50">
              Garde ton énergie toute la semaine.
            </p>
          </div>

          <div className="rounded-2xl bg-orange-400/20 px-4 py-2 text-sm font-black text-orange-200">
            🔥 {child.streak || 0}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
            const dayTasks = tasks.filter((task) =>
              !task.date ? day.date === today : task.date === day.date
            );

            const completed = dayTasks.filter((task) => task.done).length;
            const total = dayTasks.length;
            const isToday = day.date === today;
            const isComplete = total > 0 && completed === total;

            return (
              <motion.div
                key={day.date}
                whileTap={{ scale: 0.92 }}
                className={`rounded-2xl p-2 text-center transition ${
                  isToday
                    ? "bg-gradient-to-br from-yellow-300 to-orange-400 text-purple-950 shadow-[0_0_25px_rgba(250,204,21,0.65)]"
                    : isComplete
                      ? "bg-green-400/20 text-green-200"
                      : "bg-white/10 text-white/70"
                }`}
              >
                <p className="text-[10px] font-black uppercase">{day.label}</p>

                <p className="mt-1 text-xl">
                  {isComplete ? "✅" : isToday ? "🚀" : "🪐"}
                </p>

                <p className="mt-1 text-[10px] font-black">
                  {completed}/{total}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="relative overflow-hidden p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),_transparent_45%)]" />

        <div className="absolute left-1/2 top-8 h-[calc(100%-4rem)] w-1 -translate-x-1/2 rounded-full bg-white/10" />

        <motion.div
          initial={{ height: 0 }}
          animate={{
            height: `${Math.min((level / planets.length) * 100, 100)}%`,
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-8 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-yellow-300 via-orange-400 to-pink-500 shadow-[0_0_30px_rgba(250,204,21,0.9)]"
        />

        <div className="relative flex flex-col gap-8">
          {planets.map((planet, index) => {
            const unlocked = level >= planet.level;
            const current = level === planet.level;

            return (
              <motion.button
                type="button"
                key={planet.level}
                onClick={() => setSelectedPlanet(planet)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.96 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.4,
                }}
                className={`relative flex w-full items-center text-left ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <motion.div
                  animate={
                    current
                      ? {
                          scale: [1, 1.05, 1],
                        }
                      : undefined
                  }
                  transition={
                    current
                      ? {
                          duration: 1.5,
                          repeat: Infinity,
                        }
                      : undefined
                  }
                  className={`relative w-[80%] overflow-hidden rounded-[2rem] border p-4 shadow-xl transition ${
                    unlocked
                      ? "border-white/20 bg-white/10"
                      : "border-white/10 bg-white/5 opacity-60"
                  }`}
                  style={{
                    boxShadow: current
                      ? `0 0 60px ${planet.glow}`
                      : undefined,
                  }}
                >
                  {unlocked && (
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${planet.color} opacity-20`}
                    />
                  )}

                  <div className="relative flex items-center gap-4">
                    <motion.div
                      animate={
                        current
                          ? {
                              rotate: [0, -10, 10, 0],
                              y: [0, -6, 0],
                            }
                          : unlocked
                            ? {
                                y: [0, -4, 0],
                              }
                            : undefined
                      }
                      transition={
                        current || unlocked
                          ? {
                              duration: current ? 1.8 : 3,
                              repeat: Infinity,
                            }
                          : undefined
                      }
                      className={`flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br text-5xl shadow-2xl ${
                        unlocked ? planet.color : "from-gray-500 to-gray-700"
                      }`}
                    >
                      {unlocked ? planet.icon : "🔒"}
                    </motion.div>

                    <div className="flex-1">
                      <p className="text-xs font-black uppercase text-white/50">
                        Niveau {planet.level}
                      </p>

                      <h3 className="text-xl font-black">{planet.name}</h3>

                      <p className="mt-1 text-xs font-bold text-white/60">
                        {current
                          ? "Planète actuelle ✨"
                          : unlocked
                            ? "Débloquée ✅"
                            : "À débloquer"}
                      </p>

                      {current && (
                        <div className="mt-3 inline-flex rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-purple-950">
                          🚀 En cours
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {current && (
                  <motion.div
                    animate={{
                      scale: [1, 1.7, 1],
                      opacity: [1, 0.35, 1],
                    }}
                    transition={{
                      duration: 1.3,
                      repeat: Infinity,
                    }}
                    className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300 shadow-[0_0_40px_rgba(250,204,21,1)]"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {selectedPlanet && (
        <div className="border-t border-white/10 bg-[#140D3A] p-5">
          <motion.div
            key={selectedPlanet.level}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`rounded-[2rem] bg-gradient-to-br ${selectedPlanet.color} p-[2px] shadow-2xl`}
          >
            <div className="rounded-[1.9rem] bg-[#100A2E]/95 p-5">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${selectedPlanet.color} text-4xl shadow-xl`}
                >
                  {level >= selectedPlanet.level ? selectedPlanet.icon : "🔒"}
                </div>

                <div>
                  <p className="text-xs font-black uppercase text-white/50">
                    Détail planète
                  </p>

                  <h3 className="text-2xl font-black">
                    {selectedPlanet.name}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm font-bold text-white/70">
                {selectedPlanet.description}
              </p>

              <button
                type="button"
                onClick={() => setSelectedPlanet(null)}
                className="mt-5 w-full rounded-2xl bg-white/10 px-4 py-3 font-black text-white transition active:scale-95"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}