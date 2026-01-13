import { useState, useRef, useEffect } from "react";
import { Play, Pause, Scissors, X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function CreateMusicPreview() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClipping, setIsClipping] = useState(false);
  const [showSaveSuccessDialog, setShowSaveSuccessDialog] = useState(false);
  const [clipStart, setClipStart] = useState(20);
  const [clipEnd, setClipEnd] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<"start" | "end" | "move" | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  const totalDuration = 154; // 2:34 in seconds
  const selectedDuration = Math.round(((clipEnd - clipStart) / 100) * totalDuration);

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
      title="预览与截取"
      headerRightAction={
        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => navigate(-1)}>
          返回
        </Button>
      }
    >
      <div className="px-4 py-6 space-y-6">
        {/* Generated Music Preview */}
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
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  console.log("保存AI创作歌曲到我的音乐");
                  setShowSaveSuccessDialog(true);
                }}
              >
                <Check className="w-5 h-5" />
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
                    : "bg-muted",
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

        {/* Clipping Interface - Bottom Sheet */}
        {isClipping && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setIsClipping(false);
                setClipStart(20);
                setClipEnd(50);
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsClipping(false);
                        setClipStart(20);
                        setClipEnd(50);
                      }}
                    >
                      <X className="w-4 h-4 mr-1" />
                      取消
                    </Button>
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={handleConfirmClip}
                    >
                      <Scissors className="w-4 h-4 mr-1" />
                      截取
                    </Button>
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
                                : "bg-muted-foreground/30",
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
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Save Success Dialog */}
        <Dialog open={showSaveSuccessDialog} onOpenChange={setShowSaveSuccessDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                保存成功
              </DialogTitle>
              <DialogDescription>
                音乐已成功保存到「我的音乐」
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => setShowSaveSuccessDialog(false)}
              >
                关闭窗口
              </Button>
              <Button
                variant="accent"
                className="w-full sm:w-auto"
                onClick={() => {
                  setShowSaveSuccessDialog(false);
                  navigate("/works");
                }}
              >
                前往我的音乐
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
}


