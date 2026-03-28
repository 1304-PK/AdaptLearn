import { useState } from "react";

const getLevel = (proficiency) => {
  if (proficiency <= 0.4) return { label: "Beginner", color: "bg-rose-500", text: "text-rose-400", border: "border-rose-500/30", badge: "bg-rose-500/15 text-rose-400 border border-rose-500/25" };
  if (proficiency <= 0.8) return { label: "Proficient", color: "bg-amber-400", text: "text-amber-400", border: "border-amber-400/30", badge: "bg-amber-400/15 text-amber-400 border border-amber-400/25" };
  return { label: "Expert", color: "bg-emerald-400", text: "text-emerald-400", border: "border-emerald-400/30", badge: "bg-emerald-400/15 text-emerald-400 border border-emerald-400/25" };
};

const SkillRow = ({ skill, index }) => {
  const level = getLevel(skill.actual_proficiency);
  const pct = Math.round(skill.actual_proficiency * 100);

  return (
    <div
      className="group flex items-center gap-4 px-4 py-3 rounded-xl transition-colors duration-200 hover:bg-white/[0.04]"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {/* Title */}
      <div className="w-44 shrink-0 flex items-center gap-2">
        <span className="text-sm font-medium text-zinc-200 leading-tight truncate">
          {skill.skill_name}
        </span>
        {!skill.is_in_resume && (
          <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-zinc-700/60 text-zinc-400 border border-zinc-600/40 font-medium tracking-wide">
            GAP
          </span>
        )}
      </div>

      {/* Bar */}
      <div className="flex-1 flex items-center gap-2.5">
        <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${level.color}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className={`text-xs font-mono tabular-nums w-8 text-right ${level.text} opacity-80`}>
          {pct}%
        </span>
      </div>

      {/* Status badge */}
      <div className="w-24 shrink-0 flex justify-end">
        <span className={`text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full ${level.badge}`}>
          {level.label}
        </span>
      </div>
    </div>
  );
};

const SkillBars = ({ skillBars, title = "Skill Analysis" }) => {
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filters = [
    { key: "all", label: "All" },
    { key: "expert", label: "Expert" },
    { key: "proficient", label: "Proficient" },
    { key: "beginner", label: "Beginner" },
  ];

  const priorityFilters = [
    { key: "all", label: "All" },
    { key: "Critical", label: "Critical" },
    { key: "Normal", label: "Normal" },
  ];

  const filtered = skillBars.filter((s) => {
    const levelMatch =
      filter === "all" ||
      (filter === "expert" && s.actual_proficiency > 0.8) ||
      (filter === "proficient" && s.actual_proficiency > 0.4 && s.actual_proficiency <= 0.8) ||
      (filter === "beginner" && s.actual_proficiency <= 0.4);
    const priorityMatch = priorityFilter === "all" || s.jd_priority === priorityFilter;
    return levelMatch && priorityMatch;
  });

  const expertCount = skillBars.filter((s) => s.actual_proficiency > 0.8).length;
  const proficientCount = skillBars.filter((s) => s.actual_proficiency > 0.4 && s.actual_proficiency <= 0.8).length;
  const beginnerCount = skillBars.filter((s) => s.actual_proficiency <= 0.4).length;

  return (
    <div className="min-h-screen bg-zinc-950 p-6 font-sans">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-zinc-100 mb-1">{title}</h1>
          <p className="text-sm text-zinc-500">{skillBars.length} skills evaluated</p>
        </div>

        {/* Summary pills */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-xs font-medium text-emerald-400">{expertCount} Expert</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/20">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span className="text-xs font-medium text-amber-400">{proficientCount} Proficient</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <span className="text-xs font-medium text-rose-400">{beginnerCount} Beginner</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all duration-150 ${
                  filter === f.key
                    ? "bg-zinc-700 text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
            {priorityFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setPriorityFilter(f.key)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all duration-150 ${
                  priorityFilter === f.key
                    ? "bg-zinc-700 text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table header */}
        <div className="flex items-center gap-4 px-4 pb-2 mb-1 border-b border-zinc-800/60">
          <span className="w-44 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Skill</span>
          <span className="flex-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Proficiency</span>
          <span className="w-24 shrink-0 text-right text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Level</span>
        </div>

        {/* Rows */}
        <div className="space-y-0.5">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-zinc-600">No skills match the current filter.</div>
          ) : (
            filtered.map((skill, i) => (
              <SkillRow key={skill.skill_name} skill={skill} index={i} />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default SkillBars;