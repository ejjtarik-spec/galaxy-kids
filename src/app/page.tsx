import { app } from "../lib/firebase";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import DashboardHero from "../features/dashboard/DashboardHero";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card>
        <div className="flex flex-col items-center gap-4">
          <DashboardHero name="Tarik" />

          <Button>Commencer</Button>
        </div>
      </Card>
    </main>
  );
}