import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container py-4 flex items-center gap-4">
      <Button variant={"default"} effect={"gradientSlideShow"}>
        Hello World
      </Button>
      <ModeToggle />
    </div>
  );
}
