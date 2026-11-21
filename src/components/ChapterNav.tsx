import { CHAPTERS } from '../data/content'
import { useRobot, type ChapterId } from '../lib/robot'

export function ChapterNav() {
  const { state, setChapter } = useRobot()

  const scrollToChapter = (chapterId: ChapterId) => {
    setChapter(chapterId)
    const el = document.getElementById(`ch${chapterId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isDark = state.chapter === 4

  return (
    <nav
      aria-label="Chapter progress rail"
      className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-6 select-none"
    >
      {/* Background tracking line */}
      <div
        className={`absolute right-[7px] top-2 bottom-2 w-px transition-colors duration-500 ${
          isDark ? 'bg-[#D8C29B]/20' : 'bg-[#141414]/12'
        }`}
      />

      {CHAPTERS.map((ch) => {
        const active = state.chapter === ch.id
        return (
          <button
            key={ch.id}
            type="button"
            onClick={() => scrollToChapter(ch.id as ChapterId)}
            className="group relative flex items-center gap-3.5 py-1 text-right focus:outline-none cursor-pointer"
          >
            {/* Label */}
            <span
              className={`font-mono text-[10px] tracking-[0.22em] transition-all duration-300 ${
                active
                  ? isDark
                    ? 'font-semibold text-[#D8C29B] translate-x-0'
                    : 'font-semibold text-[#141414] translate-x-0'
                  : 'opacity-40 group-hover:opacity-80 translate-x-1'
              } ${isDark && !active ? 'text-[#EFECE6]' : ''}`}
            >
              {ch.label}
            </span>

            {/* Indicator Dot */}
            <div className="relative flex h-4 w-4 items-center justify-center">
              {active ? (
                <>
                  <span className="absolute h-3.5 w-3.5 rounded-full border border-[#f06b83]/60 animate-ping opacity-60" />
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#D8C29B] to-[#f06b83] shadow-[0_0_8px_rgba(240,107,131,0.6)]" />
                </>
              ) : (
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-125 ${
                    isDark ? 'bg-[#D8C29B]/40 group-hover:bg-[#D8C29B]' : 'bg-[#141414]/30 group-hover:bg-[#141414]'
                  }`}
                />
              )}
            </div>
          </button>
        )
      })}
    </nav>
  )
}
