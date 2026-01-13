import { useState } from "react";
import { Sparkles, Music, Loader2, FileText, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import { useToast } from "@/hooks/use-toast";

const styleOptions = [
  { id: "pop", label: "流行", emoji: "🎤" },
  { id: "classical", label: "古典", emoji: "🎻" },
  { id: "electronic", label: "电子", emoji: "🎹" },
  { id: "folk", label: "民谣", emoji: "🎸" },
  { id: "jazz", label: "爵士", emoji: "🎷" },
  { id: "rock", label: "摇滚", emoji: "🎸" },
];

const voiceOptions = [
  { id: "male", label: "默认男声", emoji: "👨" },
  { id: "female", label: "默认女声", emoji: "👩" },
  { id: "elder", label: "我的声音1", emoji: "👴" },
  { id: "robot", label: "我的声音2", emoji: "🤖" },
];

const moodOptions = [
  { id: "happy", label: "欢快", color: "from-yellow-400 to-orange-400" },
  { id: "calm", label: "平静", color: "from-blue-400 to-cyan-400" },
  { id: "sad", label: "忧伤", color: "from-purple-400 to-indigo-400" },
  { id: "energetic", label: "激昂", color: "from-red-400 to-pink-400" },
];

export default function CreateMusic() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      navigate("/create/preview");
    }, 3000);
  };

  return (
    <PageLayout 
      title="AI音乐创作"
      headerRightAction={
        <Button 
          variant="ghost" 
          size="sm"
          className="text-muted-foreground"
          onClick={() => navigate("/works")}
        >
          我的音乐
        </Button>
      }
    >
      <div className="px-4 py-6 space-y-6">
        {/* Lyrics Input */}
        <section className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            歌词
          </label>
          <Textarea
            placeholder="输入歌词内容，AI将根据歌词创作相应的歌曲..."
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="min-h-[120px] bg-card border-border focus:border-primary resize-none"
          />
        </section>
        {/* Prompt Input */}
        <section className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            描述歌曲的氛围（提示词，可选）
          </label>
          <Textarea
            placeholder="例如：欢快的夏日海边，阳光洒在波光粼粼的海面上..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[20px] bg-card border-border focus:border-primary resize-none"
          />
        </section>

        {/* Voice Selection */}
        <section className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Mic className="w-4 h-4 text-accent" />
            选择音色
          </label>
          <div className="flex flex-wrap gap-2">
            {voiceOptions.map((voice) => (
              <Button
                key={voice.id}
                variant={selectedVoice === voice.id ? "gradient" : "outline"}
                size="sm"
                onClick={() => setSelectedVoice(voice.id)}
                className="gap-1"
              >
                <span>{voice.emoji}</span>
                <span>{voice.label}</span>
              </Button>
            ))}
          </div>
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

      </div>
    </PageLayout>
  );
}

