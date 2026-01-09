import { useState, useRef } from "react";
import { Mic, Play, Pause, RotateCcw, Check, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WaveAnimation } from "@/components/home/WaveAnimation";
import { cn } from "@/lib/utils";

const sampleText = `欢迎使用AI音乐工坊。我是一个热爱音乐的人，喜欢在阳光明媚的午后，坐在窗边弹吉他。音乐是我生活中不可或缺的一部分，它能让我放松心情，找到内心的平静。今天天气真好，鸟儿在树枝上歌唱，微风轻轻吹过脸庞。让我们一起创作属于自己的音乐吧！`;

export default function VoiceClone() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [voiceName, setVoiceName] = useState("");
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    // Simulate recording progress
    const interval = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 120) {
          clearInterval(interval);
          setIsRecording(false);
          setHasRecording(true);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    recordingIntervalRef.current = interval;
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // 清除定时器
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
    // 如果录制超过1秒，自动弹出保存对话框
    if (recordingTime >= 1) {
      setHasRecording(true);
      setShowSaveDialog(true);
    }
  };

  const handleReset = () => {
    setIsRecording(false);
    // 清除定时器
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
    setRecordingTime(0);
    setHasRecording(false);
    setVoiceName("");
  };

  const handleSaveClick = () => {
    setShowSaveDialog(true);
  };

  const handleSaveConfirm = () => {
    if (voiceName.trim()) {
      // TODO: 这里可以添加保存声音模型的逻辑
      console.log("保存声音模型:", voiceName, "录制时长:", recordingTime);
      // 保存成功后重置状态
      handleReset();
      setShowSaveDialog(false);
      // 可以跳转到我的声音页面
      // navigate("/my-voices");
    }
  };

  return (
    <PageLayout 
      title="声音克隆"
      headerRightAction={
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground"
          onClick={() => navigate("/my-voices")}
        >
          <Volume2 className="w-5 h-5" />
        </Button>
      }
    >
      <div className="px-4 py-6 space-y-6">
        {/* Instructions */}
        <section className="glass rounded-2xl p-4">
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 请在安静环境下录制，建议录制 30s 以上</li>
          </ul>
        </section>

        {/* Sample Text */}
        <section className="bg-card rounded-2xl p-4 border border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">请朗读以下文本：</h3>
          <p className="text-foreground leading-relaxed text-sm">{sampleText}</p>
        </section>

        {/* Recording Interface */}
        <section className="flex flex-col items-center py-8">
          {/* Timer */}
          <div className="mb-6 text-center">
            <p className={cn(
              "text-4xl font-bold tabular-nums transition-colors duration-300",
              isRecording ? "text-destructive" : "text-foreground"
            )}>
              {formatTime(recordingTime)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {isRecording ? "录制中..." : hasRecording ? "录制完成" : "准备录制"}
            </p>
          </div>

          {/* Wave Animation */}
          <div className="mb-8 h-16 w-full max-w-xs">
            <WaveAnimation bars={20} active={isRecording} className="h-full" />
          </div>

          {/* Recording Button */}
          <div className="flex items-center gap-4">
            {!hasRecording ? (
              <Button
                variant="record"
                size="icon-lg"
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={cn(
                  "w-20 h-20 transition-all duration-300",
                  isRecording && "animate-pulse-glow"
                )}
              >
                {isRecording ? (
                  <div className="w-6 h-6 bg-foreground rounded-sm" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="icon-lg"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-6 h-6" />
                </Button>
                <Button
                  variant="gradient"
                  size="icon-lg"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                <Button
                  variant="accent"
                  size="icon-lg"
                  onClick={handleSaveClick}
                >
                  <Check className="w-6 h-6" />
                </Button>
              </>
            )}
          </div>

          {/* Help Text */}
          <p className="text-xs text-muted-foreground mt-6 text-center max-w-xs">
            {isRecording 
              ? "点击停止按钮结束录制" 
              : hasRecording 
                ? "点击 ✓ 确认保存声音模型" 
                : "点击麦克风开始录制"}
          </p>
        </section>

        {/* Progress Indicator */}
        <section className="glass rounded-2xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">录制进度</span>
            <span className="text-foreground font-medium">
              {Math.min(Math.round((recordingTime / 60) * 100), 100)}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 rounded-full"
              style={{ width: `${Math.min((recordingTime / 60) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            建议录制至少60秒以获得最佳效果
          </p>
        </section>
      </div>

      {/* Save Voice Dialog */}
      <Dialog 
        open={showSaveDialog} 
        onOpenChange={(open) => {
          setShowSaveDialog(open);
          if (!open) {
            // 关闭对话框时清空输入，但保持录制状态
            setVoiceName("");
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>保存声音模型</DialogTitle>
            <DialogDescription>
              请输入声音模型的名称，方便后续识别和使用
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                id="voice-name"
                placeholder="例如：我的声音、专业播音等"
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && voiceName.trim()) {
                    handleSaveConfirm();
                  }
                }}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowSaveDialog(false);
                setVoiceName("");
              }}
            >
              取消
            </Button>
            <Button
              variant="accent"
              onClick={handleSaveConfirm}
              disabled={!voiceName.trim()}
            >
              确认保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
