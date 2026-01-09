import { useState } from "react";
import { Play, Pause, Plus, Check } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "全部" },
  { id: "pop", label: "流行热歌" },
  { id: "ancient", label: "古风韵律" },
  { id: "electronic", label: "电子节拍" },
  { id: "chill", label: "轻松惬意" },
  { id: "epic", label: "史诗氛围" },
];

const templates = [
  { id: 1, name: "夏日海浪", category: "chill", duration: "2:45", bpm: 92, color: "from-cyan-400 to-blue-500" },
  { id: 2, name: "霓虹都市", category: "electronic", duration: "3:12", bpm: 128, color: "from-pink-400 to-purple-500" },
  { id: 3, name: "古韵悠长", category: "ancient", duration: "2:58", bpm: 76, color: "from-amber-400 to-red-500" },
  { id: 4, name: "流行节拍", category: "pop", duration: "3:24", bpm: 120, color: "from-green-400 to-teal-500" },
  { id: 5, name: "星际漫游", category: "epic", duration: "4:10", bpm: 100, color: "from-indigo-400 to-violet-500" },
  { id: 6, name: "午后咖啡", category: "chill", duration: "2:30", bpm: 85, color: "from-orange-400 to-amber-500" },
  { id: 7, name: "电音狂欢", category: "electronic", duration: "3:45", bpm: 140, color: "from-rose-400 to-pink-500" },
  { id: 8, name: "山水画卷", category: "ancient", duration: "3:20", bpm: 68, color: "from-emerald-400 to-green-500" },
];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredTemplates = templates.filter(
    (t) => activeCategory === "all" || t.category === activeCategory
  );

  return (
    <PageLayout title="音乐模板">
      <div className="px-4 py-6 space-y-6">
        {/* Category Tabs */}
        <section className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "gradient" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
                className="whitespace-nowrap"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </section>

        {/* Templates Grid */}
        <section className="grid grid-cols-1 gap-4">
          {filteredTemplates.map((template, index) => (
            <div
              key={template.id}
              className={cn(
                "glass rounded-2xl p-4 transition-all duration-300 animate-fade-in",
                "border-2",
                selectedId === template.id 
                  ? "border-primary shadow-glow" 
                  : "border-transparent hover:border-primary/30"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                {/* Cover Art */}
                <div className={cn(
                  "w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0",
                  template.color
                )}>
                  <Button
                    variant="glass"
                    size="icon"
                    onClick={() => setPlayingId(playingId === template.id ? null : template.id)}
                    className="w-10 h-10"
                  >
                    {playingId === template.id ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{template.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span>{template.duration}</span>
                    <span>•</span>
                    <span>{template.bpm} BPM</span>
                  </div>
                  
                  {/* Mini Waveform */}
                  {playingId === template.id && (
                    <div className="flex items-end gap-[2px] h-4 mt-2">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-1 rounded-full bg-gradient-to-t animate-wave",
                            template.color.replace("from-", "from-").replace("to-", "to-")
                          )}
                          style={{
                            height: `${30 + Math.random() * 70}%`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Select Button */}
                <Button
                  variant={selectedId === template.id ? "gradient" : "outline"}
                  size="icon"
                  onClick={() => setSelectedId(selectedId === template.id ? null : template.id)}
                >
                  {selectedId === template.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </section>

        {/* Selected Action */}
        {selectedId && (
          <section className="fixed bottom-20 left-4 right-4 z-30 animate-slide-up">
            <div className="glass rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">已选择</p>
                <p className="font-semibold text-foreground">
                  {templates.find((t) => t.id === selectedId)?.name}
                </p>
              </div>
              <Button variant="accent" size="lg">
                使用此模板
              </Button>
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
}
