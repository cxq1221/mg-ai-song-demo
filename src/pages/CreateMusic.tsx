import { useState, useRef, useEffect } from "react";
import { Sparkles, Music, Loader2, Play, Pause, Download, User, FileText, Scissors, X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WaveAnimation } from "@/components/home/WaveAnimation";
import { cn } from "@/lib/utils";

const styleOptions = [
  { id: "pop", label: "流行", emoji: "🎤" },
  { id: "classical", label: "古典", emoji: "🎻" },
  { id: "electronic", label: "电子", emoji: "🎹" },
  { id: "folk", label: "民谣", emoji: "🎸" },
  { id: "jazz", label: "爵士", emoji: "🎷" },
  { id: "rock", label: "摇滚", emoji: "🎸" },
];

const moodOptions = [
  { id: "happy", label: "欢快", color: "from-yellow-400 to-orange-400" },
  { id: "calm", label: "平静", color: "from-blue-400 to-cyan-400" },
  { id: "sad", label: "忧伤", color: "from-purple-400 to-indigo-400" },
  { id: "energetic", label: "激昂", color: "from-red-400 to-pink-400" },
];

export default function CreateMusic() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClipping, setIsClipping] = useState(false);
  const [clipMode, setClipMode] = useState<"full" | "highlight">("full");
  const [clipStart, setClipStart] = useState(0);
  const [clipEnd, setClipEnd] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<"start" | "end" | "move" | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  
  const totalDuration = 154; // 2:34 in seconds
  const selectedDuration = Math.round(((clipEnd - clipStart) / 100) * totalDuration);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getPercentFromEvent = (clientX: number) => {
    if (!waveformRef.current) return 0;
    const rect = waveformRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.max(0, Math.min(100, (x / rect.width) * 100));
  };

  const handleWaveformDown = (clientX: number, type: "start" | "end" | "move") => {
    if (!waveformRef.current) return;
    setIsDragging(true);
    setDragType(type);
    const percent = getPercentFromEvent(clientX);
    
    if (type === "start") {
      setClipStart(Math.min(percent, clipEnd - 1));
    } else if (type === "end") {
      setClipEnd(Math.max(percent, clipStart + 1));
    }
  };

  const handleWaveformMove = (clientX: number) => {
    if (!isDragging || !waveformRef.current || !dragType) return;
    const percent = getPercentFromEvent(clientX);
    
    if (dragType === "start") {
      setClipStart(Math.min(percent, clipEnd - 1));
    } else if (dragType === "end") {
      setClipEnd(Math.max(percent, clipStart + 1));
    } else if (dragType === "move") {
      const width = clipEnd - clipStart;
      const newStart = Math.max(0, Math.min(100 - width, percent - width / 2));
      setClipStart(newStart);
      setClipEnd(newStart + width);
    }
  };

  const handleWaveformMouseDown = (e: React.MouseEvent, type: "start" | "end" | "move") => {
    e.preventDefault();
    handleWaveformDown(e.clientX, type);
  };

  const handleWaveformMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleWaveformMove(e.clientX);
    }
  };

  const handleWaveformMouseUp = () => {
    setIsDragging(false);
    setDragType(null);
  };

  const handleWaveformTouchStart = (e: React.TouchEvent, type: "start" | "end" | "move") => {
    e.preventDefault();
    const touch = e.touches[0];
    handleWaveformDown(touch.clientX, type);
  };

  const handleWaveformTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      const touch = e.touches[0];
      handleWaveformMove(touch.clientX);
    }
  };

  const handleWaveformTouchEnd = () => {
    setIsDragging(false);
    setDragType(null);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        handleWaveformMove(e.clientX);
      };
      
      const handleMouseUp = () => {
        setIsDragging(false);
        setDragType(null);
      };

      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        if (e.touches[0]) {
          handleWaveformMove(e.touches[0].clientX);
        }
      };
      
      const handleTouchEnd = () => {
        setIsDragging(false);
        setDragType(null);
      };
      
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
      
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging, dragType, clipStart, clipEnd]);

  const handleConfirmClip = () => {
    // TODO: 处理确认截取逻辑
    console.log("截取片段:", { start: clipStart, end: clipEnd, duration: selectedDuration });
    setIsClipping(false);
  };

  return (
    <PageLayout 
      title="AI音乐创作"
      headerRightAction={
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground"
          onClick={() => navigate("/works")}
        >
          <User className="w-5 h-5" />
        </Button>
      }
    >
      <div className="px-4 py-6 space-y-6">
        {/* Prompt Input */}
        <section className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            描述你想要的音乐
          </label>
          <Textarea
            placeholder="例如：欢快的夏日海边，阳光洒在波光粼粼的海面上..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] bg-card border-border focus:border-primary resize-none"
          />
          <p className="text-xs text-muted-foreground">
            描述越详细，AI创作的音乐越符合你的想象
          </p>
        </section>

        {/* Lyrics Input */}
        <section className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            歌词
          </label>
          <Textarea
            placeholder="输入歌词内容，AI将根据歌词创作相应的旋律..."
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="min-h-[120px] bg-card border-border focus:border-primary resize-none"
          />
          <p className="text-xs text-muted-foreground">
            可选：输入歌词后，AI会为歌词匹配相应的旋律
          </p>
        </section>

        {/* Style Selection */}
        <section className="space-y-3">
          <label className="text-sm font-medium text-foreground">选择风格</label>
          <div className="flex flex-wrap gap-2">
            {styleOptions.map((style) => (
              <Button
                key={style.id}
                variant={selectedStyle === style.id ? "gradient" : "outline"}
                size="sm"
                onClick={() => setSelectedStyle(style.id)}
                className="gap-1"
              >
                <span>{style.emoji}</span>
                <span>{style.label}</span>
              </Button>
            ))}
          </div>
        </section>

        {/* Mood Selection */}
        <section className="space-y-3">
          <label className="text-sm font-medium text-foreground">选择情绪</label>
          <div className="grid grid-cols-4 gap-2">
            {moodOptions.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={cn(
                  "p-3 rounded-xl text-center transition-all duration-300",
                  "border-2",
                  selectedMood === mood.id
                    ? `bg-gradient-to-br ${mood.color} border-transparent shadow-lg scale-105`
                    : "bg-card border-border hover:border-primary/30"
                )}
              >
                <span className={cn(
                  "text-sm font-medium",
                  selectedMood === mood.id ? "text-foreground" : "text-muted-foreground"
                )}>
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Generate Button */}
        <Button
          variant="accent"
          size="xl"
          className="w-full"
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              AI创作中...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              开始创作
            </>
          )}
        </Button>

        {/* Generation Progress */}
        {isGenerating && (
          <section className="glass rounded-2xl p-6 text-center animate-fade-in">
            <WaveAnimation bars={15} active className="h-16 mb-4" />
            <p className="text-foreground font-medium">AI正在为你创作音乐</p>
            <p className="text-sm text-muted-foreground mt-1">预计需要 30-60 秒</p>
          </section>
        )}

        {/* Generated Music Preview */}
        {isGenerated && (
          <section className="glass rounded-2xl p-5 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">夏日海边</h3>
                <p className="text-sm text-muted-foreground">AI创作 · 2:34</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="gradient"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Waveform Visualization */}
            <div className="h-16 flex items-center gap-[2px]">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 rounded-full transition-all duration-300",
                    isPlaying 
                      ? "bg-gradient-to-t from-primary to-accent animate-wave" 
                      : "bg-muted"
                  )}
                  style={{
                    height: `${20 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                  style={{ width: isPlaying ? "35%" : "0%" }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{isPlaying ? "0:53" : "0:00"}</span>
                <span>2:34</span>
              </div>
            </div>

            {/* Clip Button */}
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setIsClipping(true)}
            >
              <Scissors className="w-4 h-4 mr-2" />
              截片段
            </Button>
          </section>
        )}

        {/* Clipping Interface - Bottom Sheet */}
        {isClipping && isGenerated && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setIsClipping(false);
                setClipStart(0);
                setClipEnd(100);
              }}
            />
            
            {/* Bottom Sheet */}
            <div className="fixed bottom-0 left-0 right-0 z-50 glass safe-bottom border-t border-border rounded-t-3xl animate-in slide-in-from-bottom duration-300">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
              </div>

              <div className="px-4 pb-4 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Control Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    已选 {formatTime(selectedDuration)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setClipMode("full")}
                      className={cn(
                        "px-3 py-1 rounded-lg text-sm transition-colors",
                        clipMode === "full"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      全曲
                    </button>
                    <div className="w-px h-4 bg-border" />
                    <button
                      onClick={() => setClipMode("highlight")}
                      className={cn(
                        "px-3 py-1 rounded-lg text-sm transition-colors",
                        clipMode === "highlight"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      高光
                    </button>
                  </div>
                </div>

                {/* Waveform with Selection */}
                <div className="glass rounded-2xl p-4">
                  <div
                    ref={waveformRef}
                    className="relative h-20 bg-muted/50 rounded-xl overflow-hidden cursor-pointer touch-none"
                    onMouseMove={handleWaveformMouseMove}
                    onMouseUp={handleWaveformMouseUp}
                    onMouseLeave={handleWaveformMouseUp}
                    onTouchMove={handleWaveformTouchMove}
                    onTouchEnd={handleWaveformTouchEnd}
                  >
                    {/* Waveform bars */}
                    <div className="absolute inset-0 flex items-end gap-[2px] px-2 py-2">
                      {Array.from({ length: 100 }).map((_, i) => {
                        const barPercent = (i / 100) * 100;
                        const isSelected = barPercent >= clipStart && barPercent <= clipEnd;
                        return (
                          <div
                            key={i}
                            className={cn(
                              "flex-1 rounded-full transition-colors",
                              isSelected
                                ? "bg-destructive"
                                : "bg-muted-foreground/30"
                            )}
                            style={{
                              height: `${20 + Math.random() * 80}%`,
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Selection frame */}
                    <div
                      className="absolute top-0 bottom-0 border-2 border-foreground rounded"
                      style={{
                        left: `${clipStart}%`,
                        width: `${clipEnd - clipStart}%`,
                      }}
                    >
                      {/* Left handle */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-2 bg-foreground/50 cursor-ew-resize rounded-l touch-none"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleWaveformMouseDown(e, "start");
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          handleWaveformTouchStart(e, "start");
                        }}
                      />
                      {/* Right handle */}
                      <div
                        className="absolute right-0 top-0 bottom-0 w-2 bg-foreground/50 cursor-ew-resize rounded-r touch-none"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleWaveformMouseDown(e, "end");
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          handleWaveformTouchStart(e, "end");
                        }}
                      />
                      {/* Move area */}
                      <div
                        className="absolute inset-0 cursor-move touch-none"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleWaveformMouseDown(e, "move");
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          handleWaveformTouchStart(e, "move");
                        }}
                      />
                    </div>

                    {/* Playhead */}
                    {isPlaying && (
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-destructive z-10"
                        style={{ left: "35%" }}
                      />
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setIsClipping(false);
                      setClipStart(0);
                      setClipEnd(100);
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    取消
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button
                    variant="accent"
                    className="flex-1"
                    onClick={handleConfirmClip}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    确认
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}

