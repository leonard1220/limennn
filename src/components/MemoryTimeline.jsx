import { motion } from 'framer-motion';

const floatVariants = {
  float: {
    y: [0, -10, 0],
    transition: { duration: 7, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }
  }
};

const memories = [
  {
    id: 1,
    file: "/photos/p01.jpg",
    tag: "初识的青涩",
    title: "诗歌朗诵",
    quote: "我们的轨迹，在这里初次交汇。",
    description: "在诗歌朗诵的余音里，定格了第一张合影。那时的光还有些青涩，不敢靠得太近，但心跳的声音，比诗句更震耳欲聋。",
  },
  {
    id: 2,
    file: "/photos/p02.jpg",
    tag: "最偏爱的一瞬",
    title: "海底捞点餐",
    quote: "最偏爱的一瞬，藏在烟火气里。",
    description: "屏幕的微光映着侧脸，明明只是低头翻阅菜单的寻常时刻。那一刻没有旁人，只有两道默契相依的光，安静又般配。",
  },
  {
    id: 3,
    file: "/photos/p03.jpg",
    tag: "喧嚣中的岛屿",
    title: "第一个文娱",
    quote: "人潮汹涌，而我只想抓住你。",
    description: "第一次在喧嚣中并肩。顶着周围交织的目光，把你拉进我的镜头里。外界再吵闹，你也是我最安稳的岛屿。",
  },
  {
    id: 4,
    file: "/photos/p04.jpg",
    tag: "悄悄倾斜的引力",
    title: "第一个家长日",
    quote: "连风，都看出了我的心机。",
    description: "那天总是找着各种笨拙的借口，只为能往你身边靠得近一点、再近一点。引力早在那时，就已经悄悄向你倾斜。",
  },
  {
    id: 5,
    file: "/photos/p05.jpg",
    tag: "笃定的宇宙",
    title: "第二个文娱",
    quote: "外界的目光，再也无法打扰我们。",
    description: "牵着手走过的路足够长了。长到足以让我们不再闪躲，长到足以把喧闹的世界，变成只有两人同频的安静宇宙。",
  },
  {
    id: 6,
    file: "/photos/p06.jpg",
    tag: "踏云而去的欢喜",
    title: "你的音乐会",
    quote: "那天捧着花走向你，脚步轻得像踩在云端。",
    description: "剧场的音符很美，但抱着花盒站在我面前的你，才是我心里，最想单曲循环一辈子的旋律。",
  },
  {
    id: 7,
    file: "/photos/p07.jpg",
    tag: "无期限的契约",
    title: "毕业与三年之约",
    quote: "青春的篇章翻过，但光芒不会停歇。",
    description: "钟声敲响，三年之约如期抵达。这份关于你的契约，我想单方面申请无期限延期。没关系，多久我都愿意等。",
  },
  {
    id: 8,
    file: "/photos/p08.jpg",
    tag: "星辰黯淡的傍晚",
    title: "第一次正式约会",
    quote: "微光落在你的眉眼间，那是只属于我的风景。",
    description: "第一次郑重其事的约会。海风很轻，那天特意化了妆的你很美。你笑着看向镜头时，所有的星辰都黯然失色。",
  },
  {
    id: 9,
    file: "/photos/p09.jpg",
    tag: "闪闪发光的日常",
    title: "E&O 自助餐",
    quote: "不需要波澜壮阔，只要对面坐着的是你。",
    description: "华灯初上的 E&O，柔和的灯影，和微甜的气息。与你共度的每一帧日常，都是记忆深处闪闪发光的回忆。",
  },
  {
    id: 10,
    file: "/photos/p10.jpg",
    tag: "永远的晴空",
    title: "升旗山的雨",
    quote: "细雨打湿了山路，却没有弄湿我们的心情。",
    description: "只要你在我的伞下，就算天空飘着雨，我的世界也永远是不落雨的晴空。",
  },
];

export default function MemoryTimeline() {
  return (
    <div className="w-full max-w-lg mx-auto px-6 py-24 space-y-40">
      {memories.map((memory, index) => (
        <motion.div
          key={memory.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <motion.div
            variants={floatVariants}
            animate="float"
            style={{ willChange: 'transform', animationDelay: `${index * 0.4}s` }}
            className="flex flex-col space-y-5"
          >
            {/* Tag */}
            <div className="text-xs text-white/35 tracking-[0.3em] font-thin uppercase">
              {memory.tag}
            </div>

            {/* Photo */}
            <div
              className="w-full rounded-2xl overflow-hidden relative"
              style={{
                boxShadow: '0 0 40px rgba(255,200,150,0.08), 0 8px 32px rgba(0,0,0,0.25)',
              }}
            >
              <img
                src={memory.file}
                alt={memory.title}
                className="w-full h-auto object-cover"
                style={{ display: 'block' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback placeholder */}
              <div
                className="w-full h-64 items-center justify-center"
                style={{
                  display: 'none',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '1rem',
                }}
              >
                <span className="text-white/20 font-thin tracking-widest text-sm">
                  {memory.title}
                </span>
              </div>

              {/* Soft vignette on photo */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 60%, rgba(74,59,76,0.4) 100%)',
                }}
              />
            </div>

            {/* Title */}
            <div className="text-2xl text-white/90 font-thin tracking-widest text-glow-candle">
              {memory.title}
            </div>

            {/* Quote */}
            <div
              className="text-sm text-[#FFE8D6]/80 font-thin tracking-widest italic"
              style={{ textShadow: '0 0 15px rgba(255,200,150,0.3)' }}
            >
              「{memory.quote}」
            </div>

            {/* Description */}
            <div className="text-sm text-white/55 leading-relaxed font-thin">
              {memory.description}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
