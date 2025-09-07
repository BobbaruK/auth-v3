import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container py-4 flex-col flex items-center gap-4">
      <h1>Boilerplate for better auth</h1>
      <div className="flex items-center gap-4">
        <Button variant={"default"} effect={"gradientSlideShow"}>
          Hello World
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
