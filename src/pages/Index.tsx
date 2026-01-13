import { Mic, Music, Sparkles, FileMusic, Wand2, Scissors, Badge, Video, Volume2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { FeatureCard } from "@/components/home/FeatureCard";
import { QuickAction } from "@/components/home/QuickAction";
import { WaveAnimation } from "@/components/home/WaveAnimation";
import { cn } from "@/lib/utils";

const features = [
  // {
  //   icon: Mic,
  //   title: "声音克隆录制",
  //   description: "录制1-2分钟语音，创建专属AI人声",
  //   path: "/voice-clone",
  //   gradient: "primary" as const,
  // },
  // {
  //   icon: Sparkles,
  //   title: "AI音乐创作",
  //   description: "输入描述，AI为你创作独特旋律",
  //   path: "/create",
  //   gradient: "accent" as const,
  // },
  // {
  //   icon: FileMusic,
  //   title: "音乐模板选择",
  //   description: "流行热歌、古风韵律等多种风格",
  //   path: "/templates",
  //   gradient: "secondary" as const,
  // },
  // {
  //   icon: Wand2,
  //   title: "人声合成演唱",
  //   description: "用克隆声音演唱你的歌词",
  //   path: "/synthesize",
  //   gradient: "primary" as const,
  // },
  // {
  //   icon: Music,
  //   title: "音乐人声合成",
  //   description: "旋律与人声完美融合",
  //   path: "/merge",
  //   gradient: "accent" as const,
  // },
  // {
  //   icon: Scissors,
  //   title: "作品预览截取",
  //   description: "试听并剪辑你的作品",
  //   path: "/works",
  //   gradient: "secondary" as const,
  // },
  // {
  //   icon: Badge,
  //   title: "AI水印添加",
  //   description: "为作品添加AI生成标识",
  //   path: "/watermark",
  //   gradient: "primary" as const,
  // },
  // {
  //   icon: Video,
  //   title: "一键应用BGM",
  //   description: "快速设置为Vlog背景音乐",
  //   path: "/apply-bgm",
  //   gradient: "accent" as const,
  // },
];

export default function Index() {
  return (
    <PageLayout>
      <div className="px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 p-6 border border-white/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              用AI创作属于你的
              <span className="gradient-text"> 专属音乐</span>
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              克隆你的声音，让AI为你谱曲演唱
            </p>
            <WaveAnimation bars={12} className="h-12" />
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-4">快速开始</h3>
          <div className="grid grid-cols-2 gap-4">
          <QuickAction
              icon={Sparkles}
              label="AI音乐"
              path="/create"
              variant="accent"
            />
            <QuickAction
              icon={Mic}
              label="声音克隆"
              path="/voice-clone"
              variant="primary"
            />
            
          </div>
        </section>


        {/* Stats */}
        <section className="glass rounded-2xl p-5">
          <div className="grid grid-cols-2 gap-4 text-center">
            <Link
              to="/works"
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300",
                "hover:bg-primary/10 hover:scale-105 active:scale-95 cursor-pointer"
              )}
            >
              <p className="text-2xl font-bold gradient-text">1000+</p>
              <p className="text-xs text-muted-foreground">我的音乐</p>
            </Link>
            <Link
              to="/my-voices"
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300",
                "hover:bg-accent/10 hover:scale-105 active:scale-95 cursor-pointer"
              )}
            >
              <p className="text-2xl font-bold gradient-text-accent">50+</p>
              <p className="text-xs text-muted-foreground">我的声音</p>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
