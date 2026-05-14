"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import confetti from "canvas-confetti";

import Card from "../components/ui/Card";
import DashboardHero from "../features/dashboard/DashboardHero";
import GoogleLoginButton from "../features/auth/GoogleLoginButton";

import { auth } from "../services/firebase/auth";
import { createUserIfNotExists } from "../services/firebase/firestore";
import { createChild } from "../services/firebase/children";
import { deleteChild } from "../services/firebase/deleteChild";
import { listenChildren } from "../services/firebase/listenChildren";

import { createTask, completeTask } from "../services/firebase/tasks";
import { listenTasks } from "../services/firebase/listenTasks";

import { getLevelFromXP, getNextLevelXP } from "../utils/level";
import { getBadges } from "../utils/badges";
import { getStreakMessage } from "../utils/streak";

import { buyReward } from "../services/firebase/rewards";
import { claimDailyBonus } from "../services/firebase/streak";

const avatars = ["🧑‍🚀", "🦸", "🧙", "🐼", "🦊", "🐯"];

const rewards = [
  { name: "🍿 Soirée film", price: 30 },
  { name: "🎮 30 min de jeu", price: 40 },
  { name: "🍕 Choix du dîner", price: 50 },
  { name: "🎁 Surprise", price: 80 },
];

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState(8);
  const [taskTitle, setTaskTitle] = useState("");

  const selectedChild =
    children.find((child) => child.id === selectedChildId) || null;

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    let unsubscribeChildren: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await createUserIfNotExists(currentUser);
        unsubscribeChildren = listenChildren(currentUser.uid, setChildren);
      } else {
        setChildren([]);
        setSelectedChildId(null);
        setTasks([]);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeChildren) unsubscribeChildren();
    };
  }, []);

  useEffect(() => {
    if (!user || !selectedChildId) {
      setTasks([]);
      return;
    }

    setTasks([]);

    const unsubscribe = listenTasks(user.uid, selectedChildId, setTasks);

    return () => unsubscribe();
  }, [user, selectedChildId]);

  const handleSelectChild = (childId: string) => {
    setTasks([]);
    setTaskTitle("");
    setSelectedChildId(null);

    setTimeout(() => {
      setSelectedChildId(childId);
    }, 0);
  };

  const handleAddChild = async () => {
    if (!user || !childName.trim()) return;

    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    await createChild(user.uid, {
      name: childName,
      age: childAge,
      avatar: randomAvatar,
      xp: 0,
      coins: 0,
      streak: 0,
      lastBonusDate: "",
    });

    setChildName("");
    setChildAge(8);
  };

  const handleDeleteChild = async (childId: string) => {
    if (!user) return;

    await deleteChild(user.uid, childId);

    if (selectedChildId === childId) {
      setSelectedChildId(null);
      setTasks([]);
    }
  };

  const handleAddTask = async () => {
    if (!user || !selectedChildId || !taskTitle.trim()) return;

    await createTask(user.uid, selectedChildId, {
      title: taskTitle,
      xp: 20,
      coins: 10,
    });

    setTaskTitle("");
  };

  const handleCompleteTask = async (task: any) => {
    if (!user || !selectedChildId) return;

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
    });

    await completeTask(user.uid, selectedChildId, task.id, task.xp, task.coins);
  };

  const handleBuyReward = async (reward: { name: string; price: number }) => {
    if (!user || !selectedChild) return;

    if ((selectedChild.coins || 0) < reward.price) {
      alert("Pas assez de pièces 🪙");
      return;
    }

    await buyReward(user.uid, selectedChild.id, reward.price);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
    });

    alert(`${selectedChild.name} a acheté : ${reward.name} 🎁`);
  };

  const handleClaimDailyBonus = async () => {
    if (!user || !selectedChild) return;

    if (selectedChild.lastBonusDate === today) {
      alert("Bonus déjà récupéré aujourd’hui 🔥");
      return;
    }

    await claimDailyBonus(user.uid, selectedChild.id);

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });

    alert("+10 XP et +5 pièces 🎁");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-200 to-pink-100 p-4">
      <div className="mx-auto max-w-md">
        <Card>
          <div className="flex flex-col gap-4">
            <DashboardHero name="Tarik" />

            {user ? (
              <>
                <div className="text-center">
                  <p className="font-bold text-green-600">Connecté ✅</p>
                  <p className="text-sm text-gray-600">{user.displayName}</p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow">
                  <div className="flex flex-col gap-3">
                    <input
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Nom de l’enfant"
                      className="rounded-xl border p-3"
                    />

                    <input
                      type="number"
                      value={childAge}
                      onChange={(e) => setChildAge(Number(e.target.value))}
                      className="rounded-xl border p-3"
                    />

                    <button
                      onClick={handleAddChild}
                      className="rounded-xl bg-purple-600 p-3 font-bold text-white transition hover:scale-105"
                    >
                      ✨ Ajouter enfant
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {children.map((child) => {
                    const xp = child.xp || 0;
                    const coins = child.coins || 0;
                    const streak = child.streak || 0;
                    const level = getLevelFromXP(xp);
                    const nextLevelXP = getNextLevelXP(xp);
                    const progress = Math.min((xp / nextLevelXP) * 100, 100);
                    const isSelected = selectedChildId === child.id;
                    const badges = getBadges(xp, coins);

                    return (
                      <div
                        key={child.id}
                        className={`rounded-3xl p-5 shadow-xl transition ${
                          isSelected
                            ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                            : "bg-white"
                        }`}
                      >
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-4">
                            <div className="text-5xl">
                              {child.avatar || "🧒"}
                            </div>

                            <div>
                              <p className="text-xl font-bold">{child.name}</p>
                              <p className="text-sm">{child.age} ans</p>
                            </div>
                          </div>

                          <div>
                            <p className="font-bold">⭐ {xp} XP</p>
                            <p className="font-bold">🪙 {coins} pièces</p>
                            <p className="font-bold">
                              🔥 {streak} jour(s) — {getStreakMessage(streak)}
                            </p>
                            <p className="mt-1 font-bold">🌟 Niveau {level}</p>

                            <div className="mt-2 h-4 overflow-hidden rounded-full bg-white/30">
                              <div
                                className="h-full rounded-full bg-yellow-300"
                                style={{ width: `${progress}%` }}
                              />
                            </div>

                            <p className="mt-1 text-xs">
                              {xp} / {nextLevelXP} XP
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {badges.map((badge) => (
                              <div
                                key={badge}
                                className="rounded-full bg-yellow-200 px-3 py-1 text-sm font-bold text-black"
                              >
                                {badge}
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={() => handleSelectChild(child.id)}
                            className="rounded-xl bg-blue-500 p-3 font-bold text-white"
                          >
                            {isSelected ? "✅ En cours" : "🎮 Jouer"}
                          </button>

                          <button
                            onClick={() => handleDeleteChild(child.id)}
                            className="rounded-xl bg-red-500 p-3 font-bold text-white"
                          >
                            🗑 Supprimer
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedChild && (
                  <div key={selectedChild.id}>
                    <div className="mt-6 rounded-3xl bg-orange-100 p-5 shadow-xl">
                      <h2 className="text-xl font-bold">
                        🔥 Bonus quotidien de {selectedChild.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-600">
                        Série actuelle : 🔥 {selectedChild.streak || 0} jour(s)
                      </p>

                      <button
                        onClick={handleClaimDailyBonus}
                        disabled={selectedChild.lastBonusDate === today}
                        className={`mt-4 rounded-xl p-3 font-bold text-white ${
                          selectedChild.lastBonusDate === today
                            ? "bg-gray-400"
                            : "bg-orange-500"
                        }`}
                      >
                        {selectedChild.lastBonusDate === today
                          ? "Bonus déjà récupéré ✅"
                          : "🎁 Récupérer le bonus du jour"}
                      </button>
                    </div>

                    <div className="mt-6 rounded-3xl bg-white p-5 shadow-xl">
                      <h2 className="text-xl font-bold">
                        ✅ Missions de {selectedChild.avatar}{" "}
                        {selectedChild.name}
                      </h2>

                      <div className="mt-4 flex flex-col gap-3">
                        <input
                          value={taskTitle}
                          onChange={(e) => setTaskTitle(e.target.value)}
                          placeholder={`Nouvelle mission pour ${selectedChild.name}`}
                          className="rounded-xl border p-3"
                        />

                        <button
                          onClick={handleAddTask}
                          className="rounded-xl bg-green-600 p-3 font-bold text-white"
                        >
                          ➕ Ajouter mission à {selectedChild.name}
                        </button>
                      </div>

                      <div className="mt-4 flex flex-col gap-3">
                        {tasks.length === 0 && (
                          <p className="text-gray-500">Aucune mission.</p>
                        )}

                        {tasks.map((task) => (
                          <div
                            key={task.id}
                            className="rounded-2xl border p-4"
                          >
                            <p className="font-bold">{task.title}</p>

                            <p className="text-sm text-gray-500">
                              ⭐ {task.xp} XP • 🪙 {task.coins}
                            </p>

                            {!task.done ? (
                              <button
                                onClick={() => handleCompleteTask(task)}
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

                    <div className="mt-6 rounded-3xl bg-white p-5 shadow-xl">
                      <h2 className="text-xl font-bold">
                        🎁 Boutique de {selectedChild.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Pièces disponibles : 🪙 {selectedChild.coins || 0}
                      </p>

                      <div className="mt-4 flex flex-col gap-3">
                        {rewards.map((reward) => (
                          <div
                            key={reward.name}
                            className="flex items-center justify-between rounded-2xl border p-4"
                          >
                            <div>
                              <p className="font-bold">{reward.name}</p>
                              <p className="text-sm text-gray-500">
                                Prix : 🪙 {reward.price}
                              </p>
                            </div>

                            <button
                              onClick={() => handleBuyReward(reward)}
                              className="rounded-xl bg-yellow-500 px-4 py-2 font-bold text-white"
                            >
                              Acheter
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <GoogleLoginButton />
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}