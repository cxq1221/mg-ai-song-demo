import { useState } from "react";
import { Play, Pause, MoreVertical, Scissors, Share2, Trash2, Music, ArrowLeft, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const works = [
  { 
    id: 1, 
    name: "夏日回忆", 
    date: "2024-01-15", 
    duration: "2:34", 
    type: "AI创作",
    cover: "from-cyan-400 to-blue-500"
  },
  { 
    id: 2, 
    name: "我的声音测试", 
    date: "2024-01-14", 
    duration: "1:45", 
    type: "声音克隆",
    cover: "from-pink-400 to-purple-500"
  },
  { 
    id: 3, 
    name: "生日祝福歌", 
    date: "2024-01-12", 
    duration: "3:12", 
    type: "人声合成",
    cover: "from-amber-400 to-red-500"
  },
  { 
    id: 4, 
    name: "旅行Vlog BGM", 
    date: "2024-01-10", 
    duration: "4:20", 
    type: "音乐合成",
    cover: "from-green-400 to-teal-500"
  },
];

export default function MyWorks() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <PageLayout 
      title="我的作品"
      headerRightAction={
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      }
    >
      <div className="px-3 py-6 space-y-6">
        {/* Stats Header */}
        <section className="glass rounded-2xl p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold gradient-text">{works.length}</p>
              <p className="text-xs text-muted-foreground">总作品</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text-accent">12:31</p>
              <p className="text-xs text-muted-foreground">总时长</p>
            </div>
          </div>
        </section>

        {/* Works List */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">最近作品</h3>
          
          {works.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center">
              <Music className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-foreground font-medium">还没有作品</p>
              <p className="text-sm text-muted-foreground mt-1">开始创作你的第一首歌曲吧</p>
            </div>
          ) : (
            works.map((work, index) => (
              <div
                key={work.id}
                className={cn(
                  "glass rounded-2xl p-4 transition-all duration-300 animate-fade-in",
                  playingId === work.id && "ring-2 ring-primary shadow-glow"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  {/* Cover */}
                  <div className={cn(
                    "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0",
                    work.cover
                  )}>
                    <Button
                      variant="glass"
                      size="icon"
                      className="w-10 h-10"
                      onClick={() => setPlayingId(playingId === work.id ? null : work.id)}
                    >
                      {playingId === work.id ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </Button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{work.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                        {work.type}
                      </span>
                      <span>{work.duration}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{work.date}</p>
                  </div>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem 
                        className="gap-2"
                        onClick={() => {
                          toast({
                            title: "功能待开发",
                            description: "后续会跳转到 AI Vlog 制作页面",
                          });
                        }}
                      >
                        <Video className="w-4 h-4" />
                        制作 vlog
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="w-4 h-4" />
                        删除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Playing Waveform */}
                {playingId === work.id && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-end gap-[2px] h-8">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex-1 rounded-full bg-gradient-to-t animate-wave",
                            work.cover.replace("from-", "from-").replace("to-", "to-")
                          )}
                          style={{
                            height: `${20 + Math.random() * 80}%`,
                            animationDelay: `${i * 0.05}s`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0:45</span>
                      <span>{work.duration}</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </section>
      </div>
    </PageLayout>
  );
}
