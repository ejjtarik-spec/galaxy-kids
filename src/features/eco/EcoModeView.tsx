"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { EcoAction } from "../../types";

type EcoReward = {
  xp: number;
  coins: number;
};

type EcoModeViewProps = {
  actions?: EcoAction[];
  completedActionIds?: string[];
  onCompleteEcoAction?: (
    actionId: string,
    reward: EcoReward
  ) => void;
};

const defaultActions: EcoAction[] = [
  {
    id: "food-1",
    title: "Tout mangé dans l'assiette",
    icon: "🍽️",
    category: "food",
    stars: 1,
    energy: 10,
    done: false,
  },
  {
    id: "food-2",
    title: "Goûté un nouveau plat",
    icon: "🥗",
    category: "food",
    stars: 2,
    energy: 15,
    done: false,
  },
  {
    id: "food-3",
    title: "Zéro gaspillage alimentaire",
    icon: "🚫",
    category: "food",
    stars: 1,
    energy: 10,
    done: false,
  },
  {
    id: "water-1",
    title: "Eau coupée en brossage",
    icon: "💧",
    category: "water",
    stars: 1,
    energy: 8,
    done: false,
  },
  {
    id: "water-2",
    title: "Douche courte < 5 min",
    icon: "🚿",
    category: "water",
    stars: 1,
    energy: 10,
    done: false,
  },
  {
    id: "electricity-1",
    title: "Lumière éteinte en partant",
    icon: "💡",
    category: "electricity",
    stars: 1,
    energy: 8,
    done: false,
  },
  {
    id: "electricity-2",
    title: "Écrans inutiles éteints",
    icon: "📵",
    category: "electricity",
    stars: 1,
    energy: 8,
    done: false,
  },
  {
    id: "eco-1",
    title: "Tri des déchets bien fait",
    icon: "♻️",
    category: "ecology",
    stars: 1,
    energy: 10,
    done: false,
  },
  {
    id: "eco-2",
    title: "Allé(e) à pied ou en vélo",
    icon: "🚶",
    category: "ecology",
    stars: 2,
    energy: 12,
    done: false,
  },
];

const categories = [
  {
    id: "food",
    label: "Alimentation",
    icon: "🍽️",
  },
  {
    id: "water",
    label: "Eau",
    icon: "💧",
  },
  {
    id: "electricity",
    label: "Électricité",
    icon: "⚡",
  },
  {
    id: "ecology",
    label: "Écologie",
    icon: "♻️",
  },
] as const;

export default function EcoModeView({
  actions = defaultActions,
  completedActionIds = [],
  onCompleteEcoAction,
}: EcoModeViewProps) {
  const [ecoActions, setEcoActions] = useState<EcoAction[]>([]);

  useEffect(() => {
    const mapped = actions.map((action) => ({
      ...action,
      done: completedActionIds.includes(action.id),
    }));

    setEcoActions(mapped);
  }, [actions, completedActionIds]);

  const completedActions = ecoActions.filter(
    (action) => action.done
  );

  const totalStars = completedActions.reduce(
    (acc, action) => acc + action.stars,
    0
  );

  const totalEnergy = completedActions.reduce(
    (acc, action) => acc + action.energy,
    0
  );

  const progress =
    ecoActions.length > 0
      ? Math.min(
          (completedActions.length / ecoActions.length) * 100,
          100
        )
      : 0;

  const toggleAction = (actionId: string) => {
    const selectedAction = ecoActions.find(
      (action) => action.id === actionId
    );

    if (!selectedAction) return;

    if (selectedAction.done) return;

    setEcoActions((currentActions) =>
      currentActions.map((action) =>
        action.id === actionId
          ? {
              ...action,
              done: true,
            }
          : action
      )
    );

    onCompleteEcoAction?.(actionId, {
      xp: selectedAction.energy,
      coins: selectedAction.stars,
    });
  };

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-[2.5rem] border border-green-400/20 bg-[#102116] shadow-[0_25px_100px_rgba(0,0,0,0.45)]">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-6 text-white">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/20 blur-3xl" />

          <div className="relative z-10">
            <p className="text-sm font-black uppercase tracking-widest text-green-100">
              Mode Éco
            </p>

            <h2 className="mt-2 text-4xl font-black">
              🌿 Mes bons gestes
            </h2>

            <p className="mt-2 text-sm font-bold text-white/75">
              Clique sur les gestes accomplis aujourd’hui.
            </p>
          </div>
        </div>

        <div className="bg-[#0E1C13] p-5">
          <div className="rounded-[2rem] border border-green-300/20 bg-green-300/10 p-5">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  rotate: [0, -4, 4, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/10 text-4xl"
              >
                🌍
              </motion.div>

              <div>
                <p className="text-2xl font-black text-white">
                  Bons gestes du jour
                </p>

                <p className="mt-1 text-lg font-black text-green-200">
                  +{totalStars}⭐ • +{totalEnergy}⚡
                </p>
              </div>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="h-full rounded-full bg-gradient-to-r from-green-300 via-emerald-400 to-cyan-300 shadow-[0_0_25px_rgba(74,222,128,0.7)]"
              />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {categories.map((category) => {
              const categoryActions = ecoActions.filter(
                (action) => action.category === category.id
              );

              return (
                <div key={category.id}>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>

                    <h3 className="text-2xl font-black text-white/70">
                      {category.label}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {categoryActions.map((action) => (
                      <motion.button
                        type="button"
                        whileTap={action.done ? undefined : { scale: 0.96 }}
                        whileHover={
                          action.done ? undefined : { scale: 1.01 }
                        }
                        onClick={() => toggleAction(action.id)}
                        disabled={action.done}
                        key={action.id}
                        className={`flex w-full items-center justify-between gap-4 rounded-[2rem] border p-4 text-left shadow-xl transition ${
                          action.done
                            ? "cursor-not-allowed border-green-300/40 bg-green-400/15 opacity-90"
                            : "border-white/10 bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <motion.div
                            animate={
                              action.done
                                ? {
                                    rotate: [0, -8, 8, 0],
                                    scale: [1, 1.12, 1],
                                  }
                                : undefined
                            }
                            transition={{
                              duration: 0.5,
                            }}
                            className={`flex h-16 w-16 items-center justify-center rounded-[1.5rem] text-4xl ${
                              action.done
                                ? "bg-gradient-to-br from-green-300 to-emerald-500"
                                : "bg-white/10"
                            }`}
                          >
                            {action.icon}
                          </motion.div>

                          <div>
                            <p
                              className={`text-xl font-black ${
                                action.done
                                  ? "text-green-100"
                                  : "text-white"
                              }`}
                            >
                              {action.title}
                            </p>

                            <p className="mt-1 text-sm font-black text-yellow-200">
                              +{action.energy} XP • +{action.stars} 🪙
                            </p>
                          </div>
                        </div>

                        <motion.div
                          animate={
                            action.done
                              ? {
                                  scale: [1, 1.2, 1],
                                }
                              : undefined
                          }
                          transition={{
                            duration: 0.4,
                          }}
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 font-black ${
                            action.done
                              ? "border-green-200 bg-green-400 text-white shadow-[0_0_25px_rgba(74,222,128,0.6)]"
                              : "border-white/15 text-transparent"
                          }`}
                        >
                          ✓
                        </motion.div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}