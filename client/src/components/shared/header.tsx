import { CountdownProps } from "@/constant";
import Countdown from "./countdown";

export default function Header({
  countdown,
}: {
  countdown: CountdownProps;
}) {
  return (
    <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-lg">My Stock Portfolio</h1>
        <Countdown countdown={countdown} />
      </div>
  );
}
