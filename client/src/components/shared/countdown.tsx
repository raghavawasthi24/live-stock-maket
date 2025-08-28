import { RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { CountdownProps } from "@/constant";

export default function Countdown({
  countdown,
}: {
  countdown: CountdownProps;
}) {
  return (
    <Button variant="outline" className="text-green-700">
      <RefreshCw className="h-4 w-4" />
      {countdown.state} {countdown.time > 0 ? `in ${countdown.time}` : null}
    </Button>
  );
}
