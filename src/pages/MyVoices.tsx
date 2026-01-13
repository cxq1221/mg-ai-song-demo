import { useState } from "react";
import { Play, Pause, MoreVertical, Mic, Trash2, Volume2, CheckCircle2, Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const voices = [
  { 
    id: 1, 
    name: "我的声音模型1", 
    date: "2024-01-15", 
    duration: "1:23",
    status: "ready",
    cover: "from-cyan-400 to-blue-500"
  },
  { 
    id: 2, 
    name: "测试声音", 
    date: "2024-01-14", 
    duration: "2:15",
    status: "ready",
    cover: "from-pink-400 to-purple-500"
  },
  { 
    id: 3, 
    name: "专业播音", 
    date: "2024-01-12", 
    duration: "1:45",
    status: "processing",
    cover: "from-amber-400 to-red-500"
  },
];

export default function MyVoices() {
  const navigate = useNavigate();
  const [playingId, setPlayingId] = useState<number | null>(null);

  const readyVoices = voices.filter(v => v.status === "ready");
  const processingVoices = voices.filter(v => v.status === "processing");

  return (
    <PageLayout 
      title="我的声音"
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
              <p className="text-2xl font-bold gradient-text">{readyVoices.length}</p>
              <p className="text-xs text-muted-foreground">可用声音</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text-accent">{voices.length}</p>
              <p className="text-xs text-muted-foreground">总数量</p>
            </div>
          </div>
        </section>

        {/* Ready Voices */}
        {readyVoices.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              已就绪
            </h3>
            
            {readyVoices.map((voice, index) => (
              <div
                key={voice.id}
                className={cn(
                  "glass rounded-2xl p-4 transition-all duration-300 animate-fade-in",
                  playingId === voice.id && "ring-2 ring-primary shadow-glow"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  {/* Cover */}
                  <div className={cn(
                    "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0",
                    voice.cover
                  )}>
                    <Button
                      variant="glass"
                      size="icon"
                      className="w-10 h-10"
                      onClick={() => setPlayingId(playingId === voice.id ? null : voice.id)}
                    >
                      {playingId === voice.id ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </Button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{voice.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                        可用
                      </span>
                      <span>{voice.duration}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{voice.date}</p>
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
                        onClick={() => navigate("/create")}
                      >
                        <Sparkles className="w-4 h-4" />
                        生成音乐
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="w-4 h-4" />
                        删除声音
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Playing Waveform */}
                {playingId === voice.id && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-end gap-[2px] h-8">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex-1 rounded-full bg-gradient-to-t animate-wave",
                            voice.cover.replace("from-", "from-").replace("to-", "to-")
                          )}
                          style={{
                            height: `${20 + Math.random() * 80}%`,
                            animationDelay: `${i * 0.05}s`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0:00</span>
                      <span>{voice.duration}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Processing Voices */}
        {processingVoices.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-amber-500" />
              处理中
            </h3>
            
            {processingVoices.map((voice, index) => (
              <div
                key={voice.id}
                className={cn(
                  "glass rounded-2xl p-4 transition-all duration-300 animate-fade-in opacity-70",
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  {/* Cover */}
                  <div className={cn(
                    "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 animate-pulse",
                    voice.cover
                  )}>
                    <Volume2 className="w-6 h-6 text-foreground" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{voice.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-xs">
                        处理中
                      </span>
                      <span>{voice.duration}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{voice.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Empty State */}
        {voices.length === 0 && (
          <div className="glass rounded-2xl p-8 text-center">
            <Mic className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium">还没有克隆的声音</p>
            <p className="text-sm text-muted-foreground mt-1">前往声音克隆页面创建你的第一个声音模型</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

