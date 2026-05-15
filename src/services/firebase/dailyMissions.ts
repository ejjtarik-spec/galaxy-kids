import {
    collection,
    doc,
    getDoc,
    setDoc,
  } from "firebase/firestore";
  
  import { db } from "./firestore";
  import { createTask } from "./tasks";
  
  type GenerateDailyMissionsParams = {
    userId: string;
    childId: string;
    childName: string;
    childAge: number;
  };
  
  export async function generateDailyMissions({
    userId,
    childId,
    childName,
    childAge,
  }: GenerateDailyMissionsParams) {
    const today = new Date().toISOString().split("T")[0];
  
    const dailyMissionRef = doc(
      db,
      "users",
      userId,
      "children",
      childId,
      "dailyMissions",
      today
    );
  
    const dailyMissionSnap = await getDoc(dailyMissionRef);
  
    if (dailyMissionSnap.exists()) {
      return;
    }
  
    await setDoc(dailyMissionRef, {
      date: today,
      createdAt: new Date().toISOString(),
    });
  
    const response = await fetch("/api/generate-daily-missions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        childName,
        childAge,
      }),
    });
  
    const data = await response.json();
  
    const missions: string[] = data.missions || [];
  
    for (const mission of missions) {
      await createTask(userId, childId, {
        title: mission,
        xp: 20,
        coins: 10,
        date: today,
      });
    }
  }