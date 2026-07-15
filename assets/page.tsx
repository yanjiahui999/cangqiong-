'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';

/* ============================================================
   Scroll Reveal Hook
   ============================================================ */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function RevealSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ============================================================
   Rune SVG Decoration
   ============================================================ */
function RuneDecoration({ className = '' }: { className?: string }) {
  return (
    <svg className={`animate-rune-glow ${className}`} viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 10 L20 10 M25 5 L30 10 L25 15 M35 10 L45 10 M50 3 L50 17 M55 10 L65 10 M70 5 L75 10 L70 15 M80 10 L100 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/* ============================================================
   Ember Particles
   ============================================================ */
function EmberParticles() {
  const [embers] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${(i * 8.3 + 5) % 100}%`,
      delay: `${(i * 0.27) % 3}s`,
      duration: `${2 + (i * 0.19) % 2}s`,
      size: 2 + (i * 0.25) % 3,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {embers.map((e) => (
        <div
          key={e.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: e.left,
            width: e.size,
            height: e.size,
            background: `radial-gradient(circle, #f4d03f, #e67e22)`,
            animation: `ember-float ${e.duration} ease-out infinite`,
            animationDelay: e.delay,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   Section Title
   ============================================================ */
function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <RuneDecoration className="w-24 h-5 mx-auto mb-4 text-gold" />
      <h2 className="section-title text-3xl md:text-4xl font-bold text-gold-gradient animate-fire-shimmer">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-ash-dim text-sm md:text-base tracking-wider max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="blood-line w-48 mx-auto mt-6" />
    </div>
  );
}

/* ============================================================
   HERO SECTION - 活动名称
   ============================================================ */
function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <Image
          src="/hero-bg.jpeg"
          alt="暗黑破坏神不朽背景"
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
      </div>

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0 z-10" />

      {/* Ember Particles */}
      <div className="absolute inset-0 z-20">
        <EmberParticles />
      </div>

      {/* Content */}
      <div className="relative z-30 text-center px-4 max-w-4xl mx-auto">
        {/* Guild Emblem */}
        <div className="mb-8 animate-fade-in-up">
          <div className="inline-block relative">
            <div className="w-28 h-28 md:w-36 md:h-36 mx-auto border-2 border-gold/40 rounded-full flex items-center justify-center animate-border-glow">
              <div className="w-24 h-24 md:w-32 md:h-32 border border-gold/20 rounded-full flex items-center justify-center">
                <span className="font-cinzel text-4xl md:text-5xl text-gold-gradient font-black">C</span>
              </div>
            </div>
            <div className="absolute -inset-3 border border-gold/10 rounded-full animate-rune-glow" />
          </div>
        </div>

        {/* Event Name */}
        <div className="animate-fade-in-up delay-100">
          <p className="font-cinzel text-xs md:text-sm text-blood-bright tracking-[0.5em] mb-4">
            CANOPY GUILD PRESENTS
          </p>
        </div>

        <h1 className="font-serif-cn text-4xl md:text-6xl lg:text-7xl font-black text-gold-gradient animate-fire-shimmer animate-fade-in-up delay-200 tracking-wider leading-tight">
          苍穹杯
        </h1>
        <h2 className="font-serif-cn text-2xl md:text-4xl lg:text-5xl font-bold text-ash animate-fade-in-up delay-300 mt-2 tracking-wider">
          工会争霸赛
        </h2>

        {/* Season Tag */}
        <div className="my-6 animate-fade-in-up delay-400">
          <div className="inline-block px-6 py-2 border border-gold/30 rounded-sm">
            <span className="font-cinzel text-gold text-sm tracking-[0.3em]">SEASON I - 2025</span>
          </div>
        </div>

        {/* Event Info */}
        <div className="my-8 animate-fade-in-up delay-500">
          <div className="gothic-divider max-w-lg mx-auto">
            <span className="text-gold text-xs tracking-[0.3em]">DIABLO IMMORTAL</span>
          </div>
        </div>

        {/* Tagline */}
        <div className="animate-fade-in-up delay-600">
          <p className="text-ash-dim text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            黑暗降临，群雄逐鹿。八人战队，巅峰对决。<br className="hidden md:block" />
            谁将登顶苍穹，铸就永恒传奇？
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-700">
          <a href="#register-form" className="btn-gothic px-8 py-3 text-sm md:text-base rounded-sm">
            立即报名
          </a>
          <a
            href="#rules"
            className="px-8 py-3 text-sm md:text-base rounded-sm border border-gold/30 text-gold font-cinzel tracking-wider hover:bg-gold/10 hover:border-gold/60 transition-all duration-300"
          >
            活动规则
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up delay-800">
          <div className="flex flex-col items-center gap-2 text-gold/40">
            <span className="text-xs tracking-widest font-cinzel">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   报名要求 SECTION
   ============================================================ */
function RequirementSection() {
  const requirements = [
    { icon: '⚔️', title: '战队人数', desc: '每支战队必须由 8 名成员组成，不可少于或多于 8 人' },
    { icon: '🏰', title: '工会归属', desc: '所有参赛成员必须隶属于青冥·白玉京；紫霄·琉璃殿；月栖·瑶光阙；北笙；邂逅；烟雨缥缈阁' },
    { icon: '💎', title: '等级要求', desc: '每位参赛成员等级不低于 1550' },
    { icon: '📋', title: '报名资格', desc: '同一玩家不可重复报名' },
    { icon: '🕐', title: '在线要求', desc: '比赛期间全员必须在线，迟到超过 5 分钟视为弃权' },
    { icon: '🤝', title: '体育精神', desc: '禁止使用外挂、利用 BUG 等违规行为，违者永久禁赛' },
  ];

  return (
    <section id="requirements" className="relative py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <RevealSection>
          <SectionTitle title="报名要求" subtitle="欲戴王冠，必承其重" />
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {requirements.map((req, i) => (
            <RevealSection key={i}>
              <div className="gothic-card rounded-sm p-6 h-full relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/20 group-hover:border-gold/50 transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/20 group-hover:border-gold/50 transition-colors duration-500" />

                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">{req.icon}</span>
                  <div>
                    <h3 className="font-serif-cn text-lg font-bold text-ash group-hover:text-gold transition-colors duration-300">
                      {req.title}
                    </h3>
                    <p className="text-ash-dim text-sm mt-2 leading-relaxed">{req.desc}</p>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   活动规则 SECTION
   ============================================================ */
function RulesSection() {
  const rules = [
    {
      category: '赛制规则',
      items: [
        '比赛采用 8v8 团队对抗模式，每队场上 8 人，不可使用替补',
        '比赛期间，所有参赛人员不得携带传奇宝石，普通宝石，符文',
        '比赛期间，所有参赛人员下掉备战使魔，只能携带一只出战使魔',
        '比赛期间，所有参赛人员清空赫拉迪姆（下水道）等级',
        '比赛期间，所有参赛人员身上携带的装备均为3属性词条装备',
        '每场比赛采用一局定胜负制（BO1），决赛采用三局两胜制（BO3）',
        '禁止使用任何第三方辅助工具，仅允许游戏内合法操作',
        '比赛中途掉线不暂停，比赛继续进行',
      ],
    },
    {
      category: '职业限制',
      items: [
        '每支战队至多 1 名术士职业',
        '同一职业最多上场 2 人，确保阵容多样性',
        '赛前需提交阵容配置，赛中不可更改',
      ],
    },
    {
      category: '违规处罚',
      items: [
        '违规：取消该战队本次比赛资格',
        '使用外挂/BUG：永久禁赛并通报全服',
        '恶意挂机/送人头：视情节轻重给予禁赛处罚',
      ],
    },
  ];

  return (
    <section id="rules" className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-abyss via-abyss-light to-abyss">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <SectionTitle title="活动规则" subtitle="无规矩不成方圆，以规则铸就公平" />
        </RevealSection>

        <div className="space-y-8">
          {rules.map((ruleGroup, i) => (
            <RevealSection key={i}>
              <div className="gothic-card rounded-sm p-6 md:p-8 relative overflow-hidden">
                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/20" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/20" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/20" />

                {/* Category Title */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-blood-bright rounded-full shadow-[0_0_8px_rgba(192,57,43,0.6)]" />
                  <h3 className="font-serif-cn text-xl md:text-2xl font-bold text-gold tracking-wider">
                    {ruleGroup.category}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
                </div>

                {/* Rules List */}
                <ul className="space-y-3">
                  {ruleGroup.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-ash-dim text-sm md:text-base leading-relaxed">
                      <span className="text-gold/60 mt-1 flex-shrink-0 font-cinzel text-xs">{String(j + 1).padStart(2, '0')}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   报名时间 SECTION
   ============================================================ */
function RegisterTimeSection() {
  return (
    <section id="register" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealSection>
          <SectionTitle title="报名时间" subtitle="时不我待，把握当下" />
        </RevealSection>

        <RevealSection>
          <div className="gothic-card rounded-sm p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-blood/5 via-transparent to-gold/5 pointer-events-none" />

            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gold/30" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/30" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/30" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gold/30" />

            {/* Content */}
            <div className="relative z-10">
              <p className="font-cinzel text-xs text-blood-bright tracking-[0.5em] mb-6">REGISTRATION PERIOD</p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                {/* Start Date */}
                <div className="text-center">
                  <p className="text-ash-dim text-xs tracking-wider mb-2 font-cinzel">START</p>
                  <div className="font-cinzel text-3xl md:text-4xl font-black text-gold-gradient">
                    07.15
                  </div>
                  <p className="text-ash-dim text-sm mt-1">2025 年 7 月 15 日</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center gap-2 text-gold/40">
                  <div className="w-16 h-px bg-gradient-to-r from-gold/40 to-gold/20" />
                  <span className="text-gold text-lg">&#9654;</span>
                  <div className="w-16 h-px bg-gradient-to-r from-gold/20 to-gold/40" />
                </div>
                <div className="md:hidden text-gold/40 text-xl">&#9660;</div>

                {/* End Date */}
                <div className="text-center">
                  <p className="text-ash-dim text-xs tracking-wider mb-2 font-cinzel">DEADLINE</p>
                  <div className="font-cinzel text-3xl md:text-4xl font-black text-blood-bright">
                    07.31
                  </div>
                  <p className="text-ash-dim text-sm mt-1">2025 年 7 月 31 日</p>
                </div>
              </div>

              <div className="blood-line w-64 mx-auto my-8" />

              <p className="text-ash-dim text-sm leading-relaxed max-w-md mx-auto">
                请各战队队长在截止时间前完成报名，<br />
                逾期将不再接受补报。报名成功后如需更换队员，<br />
                请在赛前 48 小时内联系组委会。
              </p>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ============================================================
   报名项目 SECTION
   ============================================================ */
const GUILD_OPTIONS = ['青冥·白玉京', '紫霄·琉璃殿', '月栖·瑶光阙', '邂逅', '北笙', '烟雨缥缈阁'];
const CLASS_OPTIONS = ['猎魔人', '圣教军', '狂骑士', '法师', '野蛮人', '死灵法师', '武僧', '术士', '雾刃'];

interface MemberData {
  name: string;
  charClass: string;
  guild: string;
}

interface TeamRegistration {
  teamName: string;
  guild: string;
  captain: string;
  members: MemberData[];
  registeredAt: string;
  operator: string; // 报名操作人（登录账号）
}

interface OperationLog {
  type: 'register' | 'cancel';
  teamName: string;
  operator: string;
  time: string;
}

// API functions to replace localStorage
async function fetchRegistrations(): Promise<TeamRegistration[]> {
  try {
    const res = await fetch('/api/registrations');
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return (data.registrations || []).map((r: { team_name: string; guild: string; captain: string; members: MemberData[]; operator: string; created_at: string }) => ({
      teamName: r.team_name,
      guild: r.guild,
      captain: r.captain,
      members: r.members,
      operator: r.operator,
      registeredAt: new Date(r.created_at).toLocaleString('zh-CN'),
    }));
  } catch {
    return [];
  }
}

async function fetchOperationLogs(operator: string): Promise<OperationLog[]> {
  if (operator !== 'guanliyuan') return [];
  try {
    const res = await fetch(`/api/operation-logs?operator=${operator}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return (data.logs || []).map((l: { action: string; team_name: string; operator: string; created_at: string }) => ({
      type: l.action as 'register' | 'cancel',
      teamName: l.team_name,
      operator: l.operator,
      time: new Date(l.created_at).toLocaleString('zh-CN'),
    }));
  } catch {
    return [];
  }
}

async function submitRegistration(data: TeamRegistration): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        team_name: data.teamName,
        guild: data.guild,
        captain: data.captain,
        members: data.members,
        operator: data.operator,
      }),
    });
    const result = await res.json();
    if (result.error) return { success: false, error: result.error };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : '提交失败' };
  }
}

async function cancelRegistration(teamName: string, operator: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/registrations?team_name=${encodeURIComponent(teamName)}&operator=${encodeURIComponent(operator)}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (result.error) return { success: false, error: result.error };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : '取消失败' };
  }
}

function RegisterFormSection({
  currentUser,
  onLoginClick,
}: {
  currentUser: string | null;
  onLoginClick: () => void;
}) {
  const [teamName, setTeamName] = useState('');
  const [guild, setGuild] = useState('');
  const [captain, setCaptain] = useState('');
  const [members, setMembers] = useState<MemberData[]>(
    Array.from({ length: 8 }, () => ({ name: '', charClass: '', guild: '' }))
  );
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [myRegistration, setMyRegistration] = useState<TeamRegistration | null>(null);
  const [viewingList, setViewingList] = useState(false);
  const [allRegistrations, setAllRegistrations] = useState<TeamRegistration[]>([]);
  const [operationLogs, setOperationLogs] = useState<OperationLog[]>([]);
  const [registrationCount, setRegistrationCount] = useState(0);
  // Cancel flow states
  const [cancelMode, setCancelMode] = useState(false);
  const [selectedTeamForCancel, setSelectedTeamForCancel] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch registrations on mount
  useEffect(() => {
    fetchRegistrations().then((regs) => {
      setAllRegistrations(regs);
      setRegistrationCount(regs.length);
    });
  }, []);

  const refreshData = async () => {
    const regs = await fetchRegistrations();
    setAllRegistrations(regs);
    setRegistrationCount(regs.length);
    if (currentUser === 'guanliyuan') {
      const logs = await fetchOperationLogs(currentUser);
      setOperationLogs(logs);
    }
  };

  const updateMember = (index: number, field: keyof MemberData, value: string) => {
    setMembers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const validate = (existing: TeamRegistration[]): string => {
    if (!teamName.trim()) return '请填写战队名称';
    if (!guild) return '请选择所属工会';
    if (!captain.trim()) return '请填写队长名称';

    if (existing.some((r) => r.teamName === teamName.trim())) {
      return '战队名称已被使用，请更换';
    }
    if (existing.some((r) => r.captain === captain.trim())) {
      return '该报名人员已注册过战队，不可重复报名';
    }

    for (let i = 0; i < 8; i++) {
      if (!members[i].name.trim()) return `请填写第 ${i + 1} 位成员的角色名`;
      if (!members[i].charClass) return `请选择第 ${i + 1} 位成员的职业`;
      if (!members[i].guild) return `请选择第 ${i + 1} 位成员的所属工会`;

      const allNames = [...existing.flatMap((r) => r.members.map((m) => m.name)), ...members.slice(0, i).map((m) => m.name)];
      if (allNames.includes(members[i].name.trim())) {
        return `角色名「${members[i].name.trim()}」已被使用，不可重复`;
      }
    }

    const classCount: Record<string, number> = {};
    for (const m of members) {
      classCount[m.charClass] = (classCount[m.charClass] || 0) + 1;
    }
    for (const [cls, count] of Object.entries(classCount)) {
      if (count > 2) return `职业「${cls}」最多选择 2 人，当前有 ${count} 人`;
    }

    return '';
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const existing = await fetchRegistrations();
      const err = validate(existing);
      if (err) {
        setError(err);
        setLoading(false);
        return;
      }
      setError('');
      const registration: TeamRegistration = {
        teamName: teamName.trim(),
        guild,
        captain: captain.trim(),
        members: members.map((m) => ({ ...m, name: m.name.trim() })),
        registeredAt: new Date().toLocaleString('zh-CN'),
        operator: currentUser || '',
      };
      const result = await submitRegistration(registration);
      if (!result.success) {
        setError(result.error || '提交失败');
        setLoading(false);
        return;
      }
      setMyRegistration(registration);
      setSubmitted(true);
      await refreshData();
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = async () => {
    const regs = await fetchRegistrations();
    setAllRegistrations(regs);
    setViewingList(true);
  };

  const handleEnterCancelMode = async () => {
    const regs = await fetchRegistrations();
    setAllRegistrations(regs);
    setCancelMode(true);
    setSelectedTeamForCancel('');
  };

  const handleConfirmCancel = async () => {
    if (!selectedTeamForCancel) return;
    setLoading(true);
    try {
      const result = await cancelRegistration(selectedTeamForCancel, currentUser || '');
      if (!result.success) {
        setError(result.error || '取消失败');
        setShowConfirmDialog(false);
        setLoading(false);
        return;
      }
      // If this was my own registration, reset form
      if (myRegistration && myRegistration.teamName === selectedTeamForCancel) {
        setSubmitted(false);
        setMyRegistration(null);
      }
      // Reset cancel flow
      setCancelMode(false);
      setViewingList(false);
      setSelectedTeamForCancel('');
      setShowConfirmDialog(false);
      setTeamName('');
      setGuild('');
      setCaptain('');
      setMembers(Array.from({ length: 8 }, () => ({ name: '', charClass: '', guild: '' })));
      setError('');
      await refreshData();
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setMyRegistration(null);
    setViewingList(false);
    setCancelMode(false);
    setSelectedTeamForCancel('');
    setShowConfirmDialog(false);
    setTeamName('');
    setGuild('');
    setCaptain('');
    setMembers(Array.from({ length: 8 }, () => ({ name: '', charClass: '', guild: '' })));
    setError('');
  };

  /* ---- Cancel Mode: select team to cancel ---- */
  if (cancelMode) {
    return (
      <section className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-abyss via-abyss-light to-abyss">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <SectionTitle title="取消报名" subtitle="选择需要取消的战队" />
          </RevealSection>

          <RevealSection>
            <div className="gothic-card rounded-sm p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/20" />

              {allRegistrations.length === 0 ? (
                <p className="text-ash-dim text-center text-sm py-8">暂无报名记录</p>
              ) : (
                <div className="space-y-4">
                  {allRegistrations.map((reg, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedTeamForCancel(reg.teamName)}
                      className={`cursor-pointer border rounded-sm transition-all duration-300 ${
                        selectedTeamForCancel === reg.teamName
                          ? 'border-blood/60 bg-blood/5 shadow-[0_0_15px_rgba(139,26,26,0.15)]'
                          : 'border-gold/10 hover:border-gold/20'
                      }`}
                    >
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                            <div>
                              <span className="text-ash-dim text-xs tracking-wider">战队名称</span>
                              <p className="text-gold font-bold text-base mt-0.5">{reg.teamName}</p>
                            </div>
                            <div>
                              <span className="text-ash-dim text-xs tracking-wider">所属工会</span>
                              <p className="text-ash text-sm mt-0.5">{reg.guild}</p>
                            </div>
                            <div>
                              <span className="text-ash-dim text-xs tracking-wider">队长</span>
                              <p className="text-ash text-sm mt-0.5">{reg.captain}</p>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          {selectedTeamForCancel === reg.teamName ? (
                            <div className="w-6 h-6 rounded-full border-2 border-blood bg-blood/20 flex items-center justify-center">
                              <svg className="w-3.5 h-3.5 text-blood-bright" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border border-gold/20" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setCancelMode(false);
                    setSelectedTeamForCancel('');
                  }}
                  className="px-8 py-3 text-sm rounded-sm border border-gold/20 text-ash-dim hover:text-gold hover:border-gold/40 transition-all duration-300"
                >
                  返回
                </button>
                <button
                  onClick={() => {
                    if (selectedTeamForCancel) setShowConfirmDialog(true);
                  }}
                  disabled={!selectedTeamForCancel}
                  className={`px-8 py-3 text-sm rounded-sm font-cinzel tracking-wider transition-all duration-300 ${
                    selectedTeamForCancel
                      ? 'border border-blood/50 text-blood-bright hover:bg-blood/10 hover:border-blood/70'
                      : 'border border-gold/10 text-ash-dim/30 cursor-not-allowed'
                  }`}
                >
                  提交取消
                </button>
              </div>
            </div>
          </RevealSection>

          {/* Confirmation Dialog */}
          {showConfirmDialog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
              <div className="gothic-card rounded-sm p-6 md:p-8 max-w-md w-full relative">
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-blood/30" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-blood/30" />
                <div className="text-center mb-6">
                  <div className="inline-block w-12 h-12 rounded-full border border-blood/40 bg-blood/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blood-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="font-serif-cn text-lg font-bold text-gold mb-2">确认取消报名</h3>
                  <p className="text-ash-dim text-sm">
                    确定要取消战队 <span className="text-blood-bright font-bold">「{selectedTeamForCancel}」</span> 的报名吗？
                  </p>
                  <p className="text-ash-dim/50 text-xs mt-2">此操作不可撤销</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setShowConfirmDialog(false)}
                    className="px-6 py-2.5 text-sm rounded-sm border border-gold/20 text-ash-dim hover:text-gold hover:border-gold/40 transition-all duration-300"
                  >
                    返回
                  </button>
                  <button
                    onClick={handleConfirmCancel}
                    className="px-6 py-2.5 text-sm rounded-sm border border-blood/50 text-blood-bright hover:bg-blood/10 hover:border-blood/70 transition-all duration-300"
                  >
                    确认取消
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  /* ---- View Mode: show registered info ---- */
  if (submitted && myRegistration) {
    return (
      <section className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-abyss via-abyss-light to-abyss">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <SectionTitle title="报名信息" subtitle="报名成功，愿荣耀与你同在" />
          </RevealSection>

          <RevealSection>
            <div className="gothic-card rounded-sm p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/20" />

              {/* Success Badge */}
              <div className="text-center mb-8">
                <div className="inline-block px-6 py-2 border border-gold/40 rounded-sm bg-gold/5">
                  <span className="font-cinzel text-gold text-sm tracking-wider">REGISTRATION CONFIRMED</span>
                </div>
              </div>

              <CollapsibleTeamCard data={myRegistration} />

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={handleReset} className="btn-gothic px-8 py-3 text-sm rounded-sm">
                  继续报名
                </button>
                <button
                  onClick={handleViewAll}
                  className="px-8 py-3 text-sm rounded-sm border border-gold/30 text-gold font-cinzel tracking-wider hover:bg-gold/10 hover:border-gold/60 transition-all duration-300"
                >
                  查看所有报名
                </button>
                <button
                  onClick={handleEnterCancelMode}
                  className="px-8 py-3 text-sm rounded-sm border border-blood/40 text-blood-bright font-cinzel tracking-wider hover:bg-blood/10 hover:border-blood/60 transition-all duration-300"
                >
                  取消报名
                </button>
              </div>
            </div>
          </RevealSection>

          {/* All Registrations List */}
          {viewingList && (
            <RevealSection>
              <div id="all-registrations-list" className="mt-8 gothic-card rounded-sm p-6 md:p-8 relative overflow-hidden scroll-mt-8">
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/20" />
                <h3 className="font-serif-cn text-xl font-bold text-gold mb-6 text-center">全部报名战队</h3>
                {allRegistrations.length === 0 ? (
                  <p className="text-ash-dim text-center text-sm">暂无报名记录</p>
                ) : (
                  <div className="space-y-4">
                    {allRegistrations.map((reg, idx) => (
                      <CollapsibleTeamCard key={idx} data={reg} />
                    ))}
                  </div>
                )}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setViewingList(false)}
                    className="px-6 py-2 text-sm rounded-sm border border-gold/20 text-ash-dim hover:text-gold hover:border-gold/40 transition-all duration-300"
                  >
                    收起
                  </button>
                </div>
              </div>
            </RevealSection>
          )}

          {/* Operation Logs - Only visible to admin (guanliyuan) */}
          {viewingList && currentUser === 'guanliyuan' && (
            <RevealSection>
              <div className="mt-8 gothic-card rounded-sm p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/20" />
                <h3 className="font-serif-cn text-xl font-bold text-gold mb-6 text-center">操作记录</h3>
                {operationLogs.length === 0 ? (
                  <p className="text-ash-dim text-center text-sm">暂无操作记录</p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                    {operationLogs.map((log, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-3 bg-abyss-light/30 border border-gold/10 rounded-sm">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          log.type === 'register' ? 'bg-green-900/30 border border-green-500/30' : 'bg-blood/20 border border-blood/30'
                        }`}>
                          {log.type === 'register' ? (
                            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-blood-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded-sm ${
                              log.type === 'register' ? 'bg-green-900/30 text-green-400' : 'bg-blood/20 text-blood-bright'
                            }`}>
                              {log.type === 'register' ? '报名' : '取消'}
                            </span>
                            <span className="text-ash text-sm font-medium truncate">{log.teamName}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-ash-dim">
                            <span>操作人：{log.operator}</span>
                            <span>{log.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </RevealSection>
          )}
        </div>
      </section>
    );
  }

  /* ---- Not Logged In - Show Login Prompt ---- */
  if (!currentUser) {
    return (
      <section id="register-form" className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-abyss via-abyss-light to-abyss">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <SectionTitle title="报名处" subtitle="八人同心，其利断金" />
          </RevealSection>

          <RevealSection>
            <div className="gothic-card gothic-card-static rounded-sm p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/20" />

              <div className="w-16 h-16 mx-auto mb-6 border border-gold/30 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h3 className="font-serif text-gold text-2xl tracking-wider mb-3">请先登录</h3>
              <p className="text-ash-dim text-sm mb-8 max-w-md mx-auto">
                报名参赛需要先登录账号，登录后即可填写战队信息并提交报名
              </p>

              <button
                onClick={onLoginClick}
                className="btn-gothic px-8 py-3 text-sm tracking-wider"
              >
                立即登录
              </button>
            </div>
          </RevealSection>
        </div>
      </section>
    );
  }

  /* ---- Form Mode ---- */
  return (
    <section id="register-form" className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-abyss via-abyss-light to-abyss">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <SectionTitle title="报名处" subtitle="八人同心，其利断金" />
        </RevealSection>

        <RevealSection>
          <div className="gothic-card gothic-card-static rounded-sm p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/20" />

            {/* Current User Display */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gold/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-gold/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-ash text-sm">当前用户：<span className="text-gold font-bold">{currentUser}</span></span>
              </div>
            </div>

            {/* Team Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-ash-dim text-xs tracking-wider mb-2 font-cinzel">战队名称 *</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="输入战队名称"
                  className="gothic-input rounded-sm px-4 py-3 text-sm"
                />
              </div>
              <div>
                <label className="block text-ash-dim text-xs tracking-wider mb-2 font-cinzel">所属工会 *</label>
                <select
                  value={guild}
                  onChange={(e) => setGuild(e.target.value)}
                  className="gothic-input gothic-select rounded-sm px-4 py-3 text-sm"
                >
                  <option value="">请选择工会</option>
                  {GUILD_OPTIONS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-ash-dim text-xs tracking-wider mb-2 font-cinzel">队长 *</label>
                <input
                  type="text"
                  value={captain}
                  onChange={(e) => setCaptain(e.target.value)}
                  placeholder="输入队长角色名"
                  className="gothic-input rounded-sm px-4 py-3 text-sm"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent mb-6" />

            {/* Members Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="text-left py-3 px-3 font-cinzel text-xs text-gold tracking-wider w-10">#</th>
                    <th className="text-left py-3 px-3 font-cinzel text-xs text-gold tracking-wider">角色名</th>
                    <th className="text-left py-3 px-3 font-cinzel text-xs text-gold tracking-wider">职业</th>
                    <th className="text-left py-3 px-3 font-cinzel text-xs text-gold tracking-wider">所属工会</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, i) => (
                    <tr key={i} className="border-b border-gold/5">
                      <td className="py-2 px-3 font-cinzel text-ash-dim text-sm">{String(i + 1).padStart(2, '0')}</td>
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => updateMember(i, 'name', e.target.value)}
                          placeholder={`成员 ${i + 1} 角色名`}
                          className="gothic-input rounded-sm px-3 py-2 text-sm"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <select
                          value={member.charClass}
                          onChange={(e) => updateMember(i, 'charClass', e.target.value)}
                          className="gothic-input gothic-select rounded-sm px-3 py-2 text-sm"
                        >
                          <option value="">选择职业</option>
                          {CLASS_OPTIONS.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2 px-3">
                        <select
                          value={member.guild}
                          onChange={(e) => updateMember(i, 'guild', e.target.value)}
                          className="gothic-input gothic-select rounded-sm px-3 py-2 text-sm"
                        >
                          <option value="">选择工会</option>
                          {GUILD_OPTIONS.map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 border border-blood/40 rounded-sm bg-blood/10">
                <p className="text-blood-bright text-sm">{error}</p>
              </div>
            )}

            {/* Note */}
            <div className="mt-6 p-4 border border-gold/10 rounded-sm bg-abyss/30">
              <p className="text-ash-dim text-xs leading-relaxed">
                <span className="text-gold mr-2">&#9670;</span>
                报名需填写全部信息。战队名称与报名人员不可重复。每位成员须选择职业与所属工会。
              </p>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={handleSubmit} disabled={loading} className="btn-gothic px-12 py-4 text-base md:text-lg rounded-sm order-1 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? '提交中...' : '提交报名'}
              </button>
              {registrationCount > 0 && (
                <button
                  onClick={handleEnterCancelMode}
                  className="px-6 py-3 text-sm rounded-sm border border-blood/30 text-blood-bright hover:bg-blood/10 hover:border-blood/50 transition-all duration-300 order-2"
                >
                  取消报名
                </button>
              )}
            </div>

            {/* View Registered Teams */}
            {registrationCount > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => { handleViewAll(); setTimeout(() => { document.getElementById('all-registrations-list')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
                  className="inline-flex items-center gap-2 px-6 py-2 text-sm text-gold/70 border border-gold/20 rounded-sm hover:text-gold hover:border-gold/50 hover:bg-gold/5 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="font-cinzel tracking-wider">查看已报名战队 ({registrationCount})</span>
                </button>
              </div>
            )}

            {/* All Registrations List (from form view) */}
            {viewingList && (
              <div id="all-registrations-list" className="mt-8 border border-gold/10 rounded-sm p-6 relative scroll-mt-8">
                <h3 className="font-serif-cn text-xl font-bold text-gold mb-6 text-center">全部报名战队</h3>
                {allRegistrations.length === 0 ? (
                  <p className="text-ash-dim text-center text-sm">暂无报名记录</p>
                ) : (
                  <div className="space-y-4">
                    {allRegistrations.map((reg, idx) => (
                      <CollapsibleTeamCard key={idx} data={reg} />
                    ))}
                  </div>
                )}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setViewingList(false)}
                    className="px-6 py-2 text-sm rounded-sm border border-gold/20 text-ash-dim hover:text-gold hover:border-gold/40 transition-all duration-300"
                  >
                    收起
                  </button>
                </div>
              </div>
            )}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ---- Registration Detail Sub-component ---- */
function CollapsibleTeamCard({ data, onCancel }: { data: TeamRegistration; onCancel?: (teamName: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gold/10 rounded-sm overflow-hidden">
      {/* Team header - always visible */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div>
              <span className="text-ash-dim text-xs tracking-wider">战队名称</span>
              <p className="text-gold font-bold text-base mt-0.5">{data.teamName}</p>
            </div>
            <div>
              <span className="text-ash-dim text-xs tracking-wider">所属工会</span>
              <p className="text-ash text-sm mt-0.5">{data.guild}</p>
            </div>
            <div>
              <span className="text-ash-dim text-xs tracking-wider">队长</span>
              <p className="text-ash text-sm mt-0.5">{data.captain}</p>
            </div>
            {data.registeredAt && (
              <div>
                <span className="text-ash-dim text-xs tracking-wider">报名时间</span>
                <p className="text-ash-dim text-xs mt-0.5">{data.registeredAt}</p>
              </div>
            )}
            {data.operator && (
              <div>
                <span className="text-ash-dim text-xs tracking-wider">操作人</span>
                <p className="text-ash text-sm mt-0.5">{data.operator}</p>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-4 flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gold/20 rounded-sm text-gold hover:bg-gold/10 hover:border-gold/40 transition-all duration-300"
          aria-label={expanded ? '收起成员' : '展开成员'}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expandable members section */}
      {expanded && (
        <div className="border-t border-gold/10">
          <div className="p-4">
            <p className="text-ash-dim text-xs tracking-wider mb-3 font-cinzel">战队成员</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/15">
                    <th className="text-left text-ash-dim font-normal text-xs tracking-wider py-2 pr-4">#</th>
                    <th className="text-left text-ash-dim font-normal text-xs tracking-wider py-2 pr-4">角色名</th>
                    <th className="text-left text-ash-dim font-normal text-xs tracking-wider py-2 pr-4">职业</th>
                    <th className="text-left text-ash-dim font-normal text-xs tracking-wider py-2">所属工会</th>
                  </tr>
                </thead>
                <tbody>
                  {data.members.map((m, i) => (
                    <tr key={i} className="border-b border-gold/5 hover:bg-gold/[0.02] transition-colors">
                      <td className="py-2 pr-4 text-ash-dim text-xs">{i + 1}</td>
                      <td className="py-2 pr-4 text-gold font-medium">{m.name}</td>
                      <td className="py-2 pr-4 text-ember">{m.charClass}</td>
                      <td className="py-2 text-ash-dim text-xs">{m.guild}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {onCancel && (
            <div className="px-4 pb-4 text-right">
              <button
                onClick={() => onCancel(data.teamName)}
                className="px-4 py-1.5 text-xs rounded-sm border border-blood/30 text-blood-bright hover:bg-blood/10 hover:border-blood/50 transition-all duration-300"
              >
                取消报名
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   赛程安排 SECTION
   ============================================================ */
function ScheduleSection() {
  const schedule = [
    {
      phase: '小组赛',
      date: '8月5日 - 8月10日',
      desc: '16 支战队分为 4 组，组内循环赛，每组前 2 名晋级',
      status: 'upcoming',
    },
    {
      phase: '淘汰赛',
      date: '8月12日 - 8月15日',
      desc: '8 强单败淘汰制，BO3 赛制，决出 4 强',
      status: 'upcoming',
    },
    {
      phase: '半决赛',
      date: '8月17日',
      desc: '4 强对决，BO3 赛制，胜者进入决赛',
      status: 'upcoming',
    },
    {
      phase: '总决赛',
      date: '8月19日',
      desc: '巅峰对决，BO5 赛制，全服直播，争夺冠军荣耀',
      status: 'highlight',
    },
  ];

  return (
    <section id="schedule" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealSection>
          <SectionTitle title="赛程安排" subtitle="从小组赛到总决赛，步步为营" />
        </RevealSection>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-blood/40 to-gold/40" />

          <div className="space-y-8">
            {schedule.map((item, i) => (
              <RevealSection key={i}>
                <div className="relative flex gap-6 md:gap-10 pl-12 md:pl-20">
                  {/* Dot */}
                  <div className={`absolute left-[14px] md:left-[26px] top-6 w-4 h-4 rounded-full border-2 z-10 ${
                    item.status === 'highlight'
                      ? 'bg-blood-bright border-gold shadow-[0_0_12px_rgba(192,57,43,0.6)]'
                      : 'bg-abyss border-gold/50'
                  }`} />

                  {/* Content Card */}
                  <div className={`gothic-card rounded-sm p-6 flex-1 relative overflow-hidden group ${
                    item.status === 'highlight' ? 'border-gold/30 animate-border-glow' : ''
                  }`}>
                    {/* Phase Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`font-serif-cn text-xl md:text-2xl font-bold ${
                        item.status === 'highlight' ? 'text-gold-gradient' : 'text-ash'
                      } group-hover:text-gold transition-colors duration-300`}>
                        {item.phase}
                      </h3>
                      <span className="font-cinzel text-xs text-ash-dim tracking-wider">{item.date}</span>
                    </div>

                    <p className="text-ash-dim text-sm md:text-base leading-relaxed">{item.desc}</p>

                    {/* Highlight indicator */}
                    {item.status === 'highlight' && (
                      <div className="absolute top-0 right-0 px-3 py-1 bg-blood-bright/20 border-b border-l border-gold/20 rounded-bl-sm">
                        <span className="font-cinzel text-xs text-gold tracking-wider">FINAL</span>
                      </div>
                    )}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   奖励机制 SECTION
   ============================================================ */
function RewardsSection() {
  const rewards = [
    {
      rank: '冠军',
      icon: '👑',
      color: '#f4d03f',
      items: [
        '队伍内每人一个高级先祖',      
      ],
    },
    {
      rank: '亚军',
      icon: '🥈',
      color: '#c0c0c0',
      items: [
        '队伍内每人一张月卡',
      ],
    },
    {
      rank: '季军',
      icon: '🥉',
      color: '#cd7f32',
      items: [
        '队伍内每人一个基础先祖',
      ],
    },
    {
      rank: '参与奖',
      icon: '🎖️',
      color: '#c9a84c',
      items: [
        '获得公会全员鼓励~重在参与！',
      ],
    },
  ];

  return (
    <section id="rewards" className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-abyss via-abyss-light to-abyss">
      <div className="max-w-6xl mx-auto">
        <RevealSection>
          <SectionTitle title="奖励机制" subtitle="荣耀加冕，实力为证" />
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward, i) => (
            <RevealSection key={i}>
              <div className="gothic-card rounded-sm p-6 h-full relative overflow-hidden group text-center">
                {/* Top Accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${reward.color}, transparent)` }}
                />

                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-gold/15 group-hover:border-gold/40 transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-gold/15 group-hover:border-gold/40 transition-colors duration-500" />

                {/* Icon */}
                <div className="text-4xl mb-3">{reward.icon}</div>

                {/* Rank */}
                <h3
                  className="font-cinzel text-xl font-bold tracking-wider mb-4"
                  style={{ color: reward.color }}
                >
                  {reward.rank}
                </h3>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-4" />

                {/* Items */}
                <ul className="space-y-2 text-left">
                  {reward.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-ash-dim text-sm">
                      <span className="text-gold/50 mt-0.5 flex-shrink-0 text-xs">&#9670;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>
          ))}
        </div>

        {/* Additional Note */}
        <RevealSection>
          <div className="mt-12 text-center">
            <div className="gothic-card rounded-sm p-6 max-w-2xl mx-auto">
              <p className="text-ash-dim text-sm leading-relaxed">
                <span className="text-gold mr-2">&#9670;</span>
                所有奖励将在比赛结束后 72 小时内发放至每个人手中。
                最终解释权归苍穹工会所有。
              </p>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-gold/10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center">
              <span className="font-cinzel text-gold text-lg font-bold">C</span>
            </div>
            <div>
              <span className="font-cinzel text-gold text-sm tracking-wider">CANOPY GUILD</span>
              <p className="text-ash-dim/50 text-xs">暗黑破坏神：不朽</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-ash-dim text-sm">
            <a href="#requirements" className="hover:text-gold transition-colors duration-300">报名要求</a>
            <a href="#rules" className="hover:text-gold transition-colors duration-300">活动规则</a>
            <a href="#schedule" className="hover:text-gold transition-colors duration-300">赛程安排</a>
            <a href="#rewards" className="hover:text-gold transition-colors duration-300">奖励机制</a>
          </div>

          {/* Copyright */}
          <div className="text-ash-dim/30 text-xs tracking-wider">
            DIABLO IMMORTAL &copy; CANOPY GUILD 2025
          </div>
        </div>

        {/* Bottom Rune */}
        <div className="mt-8 flex justify-center">
          <RuneDecoration className="w-20 h-4 text-gold/20" />
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function Navigation({
  currentUser,
  onLoginClick,
  onLogout,
}: {
  currentUser: string | null;
  onLoginClick: () => void;
  onLogout: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-abyss/95 backdrop-blur-sm border-b border-gold/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 border border-gold/30 rounded-full flex items-center justify-center transition-all duration-300 ${scrolled ? 'scale-90' : ''}`}>
            <span className="font-cinzel text-gold text-sm font-bold">C</span>
          </div>
          <span className="font-cinzel text-gold text-xs tracking-[0.2em] hidden sm:inline">CANOPY</span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-4 md:gap-6 text-sm">
          <a href="#requirements" className="text-ash-dim hover:text-gold transition-colors duration-300 tracking-wider text-xs md:text-sm hidden md:inline">
            报名要求
          </a>
          <a href="#rules" className="text-ash-dim hover:text-gold transition-colors duration-300 tracking-wider text-xs md:text-sm hidden md:inline">
            规则
          </a>
          <a href="#schedule" className="text-ash-dim hover:text-gold transition-colors duration-300 tracking-wider text-xs md:text-sm hidden md:inline">
            赛程
          </a>
          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-gold text-xs tracking-wider hidden sm:inline">
                {currentUser}
              </span>
              <button
                onClick={onLogout}
                className="text-ash-dim hover:text-blood-light transition-colors text-xs tracking-wider"
              >
                退出
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="btn-gothic px-4 py-1.5 text-xs rounded-sm"
            >
              登录
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ============================================================
   LOGIN MODAL - 登录弹窗
   ============================================================ */
function LoginModal({ onClose, onLogin }: { onClose: () => void; onLogin: (username: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  // 用户名验证：纯英文+数字，不少于8位
  const usernameRegex = /^[a-zA-Z0-9]{8,}$/;
  const isUsernameValid = usernameRegex.test(username);
  const showUsernameHint = isRegister && username.length > 0 && !isUsernameValid;

  // 密码验证：6位及以上
  const isPasswordValid = password.length >= 6;
  const showPasswordHint = isRegister && password.length > 0 && !isPasswordValid;

  const handleSubmit = async () => {
    if (!username.trim()) {
      setError('请输入用户名');
      return;
    }
    if (!password.trim()) {
      setError('请输入密码');
      return;
    }

    if (isRegister) {
      // 注册时验证用户名格式
      if (!isUsernameValid) {
        setError('用户名必须为纯英文+数字，且不少于8位');
        return;
      }
      // 注册时验证密码格式
      if (!isPasswordValid) {
        setError('密码必须为6位及以上');
        return;
      }

      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'register', username: username.trim(), password }),
        });
        const data = await res.json();
        if (data.error) {
          setError(data.error);
          return;
        }
        onLogin(username.trim());
      } catch {
        setError('注册失败，请重试');
      }
    } else {
      // 登录
      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'login', username: username.trim(), password }),
        });
        const data = await res.json();
        if (data.error) {
          setError(data.error);
          return;
        }
        onLogin(username.trim());
      } catch {
        setError('登录失败，请重试');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-abyss/95 border border-gold/20 rounded-sm p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ash-dim hover:text-gold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-4 border border-gold/30 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="font-serif text-gold text-2xl tracking-wider">{isRegister ? '注册账号' : '登录'}</h3>
          <p className="text-ash-dim text-sm mt-2">登录后即可报名参赛</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-ash-dim text-xs tracking-wider mb-2">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              className={`w-full bg-abyss-light/50 border rounded-sm px-4 py-3 text-ash placeholder-ash-dim/50 focus:outline-none transition-colors ${
                showUsernameHint ? 'border-blood/50' : 'border-gold/20 focus:border-gold/50'
              }`}
              placeholder="纯英文+数字，不少于8位"
            />
            {isRegister && (
              <p className={`text-xs mt-1.5 ${isUsernameValid ? 'text-green-400' : 'text-ash-dim/60'}`}>
                {isUsernameValid ? '✓ 格式正确' : '要求：纯英文+数字，不少于8位'}
              </p>
            )}
          </div>
          <div>
            <label className="block text-ash-dim text-xs tracking-wider mb-2">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className={`w-full bg-abyss-light/50 border rounded-sm px-4 py-3 text-ash placeholder-ash-dim/50 focus:outline-none transition-colors ${
                showPasswordHint ? 'border-blood/50' : 'border-gold/20 focus:border-gold/50'
              }`}
              placeholder="6位及以上"
            />
            {isRegister && (
              <p className={`text-xs mt-1.5 ${isPasswordValid ? 'text-green-400' : 'text-ash-dim/60'}`}>
                {isPasswordValid ? '✓ 格式正确' : '要求：6位及以上'}
              </p>
            )}
          </div>

          {error && <p className="text-blood-light text-sm text-center">{error}</p>}

          <button onClick={handleSubmit} className="w-full btn-gothic py-3 text-sm tracking-wider">
            {isRegister ? '注册并登录' : '登录'}
          </button>

          <div className="text-center pt-2">
            <button
              onClick={() => { setIsRegister(!isRegister); setError(''); }}
              className="text-ash-dim text-sm hover:text-gold transition-colors"
            >
              {isRegister ? '已有账号？点击登录' : '没有账号？点击注册'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function Page() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('canopy_current_user');
    if (saved) setCurrentUser(saved);
  }, []);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    localStorage.setItem('canopy_current_user', username);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('canopy_current_user');
  };

  return (
    <main className="relative overflow-hidden">
      <Navigation
        currentUser={currentUser}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />
      <HeroSection />
      <RequirementSection />
      <RulesSection />
      <RegisterTimeSection />
      <RegisterFormSection
        currentUser={currentUser}
        onLoginClick={() => setShowLoginModal(true)}
      />
      <ScheduleSection />
      <RewardsSection />
      <Footer />
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}
    </main>
  );
}
