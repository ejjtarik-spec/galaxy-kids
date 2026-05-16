"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { toast } from "sonner";

import Card from "../components/ui/Card";
import SpaceBackground from "../components/ui/SpaceBackground";
import GameButton from "../components/ui/GameButton";

import DashboardHero from "../features/dashboard/DashboardHero";
import DailyBonus from "../features/dashboard/DailyBonus";
import GoogleLoginButton from "../features/auth/GoogleLoginButton";
import ChildCard from "../features/kids/ChildCard";
import MissionPanel from "../features/missions/MissionPanel";
import RewardShop from "../features/rewards/RewardShop";
import Leaderboard from "../features/leaderboard/Leaderboard";
import KidModeView from "../features/kid-mode/KidModeView";
import LevelUpModal from "../features/level/LevelUpModal";
import FloatingReward from "../features/animations/FloatingReward";
import SplashScreen from "../features/splash/SplashScreen";
import GalaxyMascot from "../features/mascot/GalaxyMascot";

import { getLevelFromXP, getNextLevelXP } from "../utils/level";
import { getBadges } from "../utils/badges";

import { buyReward } from "../services/firebase/rewards";
import { claimDailyBonus } from "../services/firebase/streak";
import { generateDailyMissions } from "../services/firebase/dailyMissions";

import { useAuth } from "../hooks/useAuth";
import { useChildren } from "../hooks/useChildren";
import { useTasks } from "../hooks/useTasks";

import { rewards } from "../constants/rewards";
import { Reward, Task } from "../types";

type AppMode = "parent" | "kid";

type FloatingRewardState = {
  id: number;
  xp: number;
  coins: number;
};

const MODE_STORAGE_KEY = "galaxy-kids-mode";

export default function Home() {
  const { user } = useAuth();

  const {
    children,
    selectedChild,
    selectedChildId,
    addChild,
    removeChild,
    selectChild,
  } = useChildren(user);

  const { tasks, addTask, completeSelectedTask } =
    useTasks(user, selectedChildId);

  const [childName, setChildName] =
    useState("");

  const [childAge, setChildAge] =
    useState(8);

  const [taskTitle, setTaskTitle] =
    useState("");

  const [loadingMission, setLoadingMission] =
    useState(false);

  const [mode, setMode] =
    useState<AppMode>("parent");

  const [showSplash, setShowSplash] =
    useState(true);

  const [showLevelUp, setShowLevelUp] =
    useState(false);

  const [levelUpLevel, setLevelUpLevel] =
    useState(1);

  const [
    showFloatingReward,
    setShowFloatingReward,
  ] = useState(false);

  const [floatingReward, setFloatingReward] =
    useState<FloatingRewardState>({
      id: 0,
      xp: 0,
      coins: 0,
    });

  const previousLevelRef =
    useRef<number>(1);

  const floatingRewardTimeoutRef =
    useRef<NodeJS.Timeout | null>(null);

  const today = new Date()
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 2200);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem(
      MODE_STORAGE_KEY
    );

    if (
      savedMode === "parent" ||
      savedMode === "kid"
    ) {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (floatingRewardTimeoutRef.current) {
        clearTimeout(
          floatingRewardTimeoutRef.current
        );
      }
    };
  }, []);

  useEffect(() => {
    if (
      !user ||
      !selectedChildId ||
      !selectedChild
    )
      return;

    generateDailyMissions({
      userId: user.uid,
      childId: selectedChildId,
      childName: selectedChild.name,
      childAge: selectedChild.age,
    });
  }, [
    user,
    selectedChildId,
    selectedChild,
  ]);

  useEffect(() => {
    if (!selectedChild) return;

    const currentLevel = getLevelFromXP(
      selectedChild.xp || 0
    );

    if (
      currentLevel >
      previousLevelRef.current
    ) {
      setLevelUpLevel(currentLevel);

      setShowLevelUp(true);

      confetti({
        particleCount: 250,
        spread: 120,
        origin: { y: 0.6 },
      });

      toast.success(
        `${selectedChild.name} est niveau ${currentLevel} 🚀`
      );
    }

    previousLevelRef.current =
      currentLevel;
  }, [selectedChild]);

  const triggerFloatingReward = (
    xp: number,
    coins: number
  ) => {
    if (
      floatingRewardTimeoutRef.current
    ) {
      clearTimeout(
        floatingRewardTimeoutRef.current
      );
    }

    setFloatingReward({
      id: Date.now(),
      xp,
      coins,
    });

    setShowFloatingReward(true);

    floatingRewardTimeoutRef.current =
      setTimeout(() => {
        setShowFloatingReward(false);
      }, 1400);
  };

  const handleChangeMode = (
    nextMode: AppMode
  ) => {
    setMode(nextMode);

    localStorage.setItem(
      MODE_STORAGE_KEY,
      nextMode
    );
  };

  const handleAddChild = async () => {
    await addChild(childName, childAge);

    setChildName("");

    setChildAge(8);

    toast.success("Enfant ajouté ✨");
  };

  const handleGenerateMission =
    async () => {
      if (!selectedChild) return;

      try {
        setLoadingMission(true);

        const response = await fetch(
          "/api/generate-mission",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              childName:
                selectedChild.name,
              childAge:
                selectedChild.age,
            }),
          }
        );

        const data =
          await response.json();

        setTaskTitle(data.mission);

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });

        toast.success(
          "Mission IA générée 🤖"
        );
      } catch (error) {
        toast.error(
          "Erreur génération IA"
        );
      } finally {
        setLoadingMission(false);
      }
    };

  const handleAddTask = async () => {
    await addTask(taskTitle);

    setTaskTitle("");

    toast.success(
      "Mission ajoutée ✅"
    );
  };

  const handleCompleteTask = async (
    task: Task
  ) => {
    triggerFloatingReward(
      task.xp,
      task.coins
    );

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
    });

    await completeSelectedTask(task);

    toast.success(
      "Mission accomplie 🎉"
    );
  };

  const handleBuyReward = async (
    reward: Reward
  ) => {
    if (!user || !selectedChild)
      return;

    if (
      (selectedChild.coins || 0) <
      reward.price
    ) {
      toast.error(
        "Pas assez de pièces 🪙"
      );

      return;
    }

    await buyReward(
      user.uid,
      selectedChild.id,
      reward.price
    );

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
    });

    toast.success(
      `${selectedChild.name} a acheté : ${reward.name} 🎁`
    );
  };

  const handleClaimDailyBonus =
    async () => {
      if (!user || !selectedChild)
        return;

      if (
        selectedChild.lastBonusDate ===
        today
      ) {
        toast.warning(
          "Bonus déjà récupéré aujourd’hui 🔥"
        );

        return;
      }

      triggerFloatingReward(10, 5);

      await claimDailyBonus(
        user.uid,
        selectedChild.id
      );

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });

      toast.success(
        "+10 XP et +5 pièces 🎁"
      );
    };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            visible={showSplash}
          />
        )}
      </AnimatePresence>

      <SpaceBackground />

      {selectedChild && (
        <GalaxyMascot
          message={`Bravo ${selectedChild.name} 🚀 Continue tes missions galactiques !`}
        />
      )}

      <LevelUpModal
        level={levelUpLevel}
        open={showLevelUp}
        onClose={() =>
          setShowLevelUp(false)
        }
      />

      <FloatingReward
        key={floatingReward.id}
        xp={floatingReward.xp}
        coins={floatingReward.coins}
        visible={showFloatingReward}
      />

      <main className="relative min-h-screen p-4">
        <div className="mx-auto max-w-md">
          <Card>
            <div className="flex flex-col gap-4">
              <DashboardHero name="Tarik" />

              <div className="flex items-center justify-center gap-3">
                <GameButton
                  onClick={() =>
                    handleChangeMode(
                      "parent"
                    )
                  }
                  className={
                    mode === "parent"
                      ? "bg-gradient-to-r from-purple-500 to-fuchsia-500"
                      : "bg-white/10"
                  }
                >
                  👨 Parent
                </GameButton>

                <GameButton
                  onClick={() =>
                    handleChangeMode(
                      "kid"
                    )
                  }
                  className={
                    mode === "kid"
                      ? "bg-gradient-to-r from-pink-500 to-orange-400"
                      : "bg-white/10"
                  }
                >
                  🧒 Enfant
                </GameButton>
              </div>

              {user ? (
                <>
                  <div className="text-center">
                    <p className="font-bold text-green-400">
                      Connecté ✅
                    </p>

                    <p className="text-sm text-white/60">
                      {
                        user.displayName
                      }
                    </p>
                  </div>

                  {mode === "kid" &&
                  selectedChild ? (
                    <KidModeView
                      child={
                        selectedChild
                      }
                      tasks={tasks}
                      rewards={rewards}
                      today={today}
                      taskTitle={
                        taskTitle
                      }
                      loadingMission={
                        loadingMission
                      }
                      onClaimDailyBonus={
                        handleClaimDailyBonus
                      }
                      onTaskTitleChange={
                        setTaskTitle
                      }
                      onGenerateMission={
                        handleGenerateMission
                      }
                      onAddTask={
                        handleAddTask
                      }
                      onCompleteTask={
                        handleCompleteTask
                      }
                      onBuyReward={
                        handleBuyReward
                      }
                    />
                  ) : (
                    <>
                      {mode ===
                        "parent" && (
                        <div className="rounded-[2rem] bg-white/10 p-4 backdrop-blur-xl">
                          <div className="flex flex-col gap-3">
                            <input
                              value={
                                childName
                              }
                              onChange={(
                                e
                              ) =>
                                setChildName(
                                  e.target
                                    .value
                                )
                              }
                              placeholder="Nom de l’enfant"
                              className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/10
                                p-4
                                text-white
                                placeholder:text-white/40
                              "
                            />

                            <input
                              type="number"
                              value={
                                childAge
                              }
                              onChange={(
                                e
                              ) =>
                                setChildAge(
                                  Number(
                                    e
                                      .target
                                      .value
                                  )
                                )
                              }
                              className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/10
                                p-4
                                text-white
                              "
                            />

                            <GameButton
                              onClick={
                                handleAddChild
                              }
                              className="
                                bg-gradient-to-r
                                from-purple-500
                                via-pink-500
                                to-orange-400
                              "
                            >
                              ✨ Ajouter
                              enfant
                            </GameButton>
                          </div>
                        </div>
                      )}

                      {children.length >
                        0 && (
                        <Leaderboard
                          children={
                            children
                          }
                        />
                      )}

                      <div className="flex flex-col gap-4">
                        {children.map(
                          (child) => {
                            const xp =
                              child.xp ||
                              0;

                            const coins =
                              child.coins ||
                              0;

                            const level =
                              getLevelFromXP(
                                xp
                              );

                            const nextLevelXP =
                              getNextLevelXP(
                                xp
                              );

                            const progress =
                              Math.min(
                                (xp /
                                  nextLevelXP) *
                                  100,
                                100
                              );

                            const isSelected =
                              selectedChildId ===
                              child.id;

                            const badges =
                              getBadges(
                                xp,
                                coins
                              );

                            return (
                              <ChildCard
                                key={
                                  child.id
                                }
                                child={
                                  child
                                }
                                isSelected={
                                  isSelected
                                }
                                level={
                                  level
                                }
                                progress={
                                  progress
                                }
                                nextLevelXP={
                                  nextLevelXP
                                }
                                badges={
                                  badges
                                }
                                showDelete={
                                  mode ===
                                  "parent"
                                }
                                onSelect={() =>
                                  selectChild(
                                    child.id
                                  )
                                }
                                onDelete={() =>
                                  removeChild(
                                    child.id
                                  )
                                }
                              />
                            );
                          }
                        )}
                      </div>

                      {selectedChild && (
                        <div
                          key={
                            selectedChild.id
                          }
                        >
                          <DailyBonus
                            child={
                              selectedChild
                            }
                            today={today}
                            onClaim={
                              handleClaimDailyBonus
                            }
                          />

                          <MissionPanel
                            child={
                              selectedChild
                            }
                            tasks={tasks}
                            taskTitle={
                              taskTitle
                            }
                            loadingMission={
                              loadingMission
                            }
                            canManageMissions={
                              mode ===
                              "parent"
                            }
                            onTaskTitleChange={
                              setTaskTitle
                            }
                            onGenerateMission={
                              handleGenerateMission
                            }
                            onAddTask={
                              handleAddTask
                            }
                            onCompleteTask={
                              handleCompleteTask
                            }
                          />

                          <RewardShop
                            child={
                              selectedChild
                            }
                            rewards={
                              rewards
                            }
                            onBuyReward={
                              handleBuyReward
                            }
                          />
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <GoogleLoginButton />
              )}
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}