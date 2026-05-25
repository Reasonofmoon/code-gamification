import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GlossaryExplorer } from "@/components/game/GlossaryExplorer";

export default function GlossaryPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> 월드맵
      </Link>
      <GlossaryExplorer />
    </div>
  );
}
