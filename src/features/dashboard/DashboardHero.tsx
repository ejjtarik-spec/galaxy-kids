import { PALETTE } from "../../constants/theme";

type DashboardHeroProps = {
  name: string;
};

export default function DashboardHero({
  name,
}: DashboardHeroProps) {
  return (
    <div className="text-center">
      <h1
        className="text-4xl font-bold"
        style={{ color: PALETTE.purple }}
      >
        Bonjour {name} 🚀
      </h1>

      <p
        className="mt-2"
        style={{ color: PALETTE.sub }}
      >
        Bienvenue dans Galaxy Kids
      </p>
    </div>
  );
}