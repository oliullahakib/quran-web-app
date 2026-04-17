
export default function Loading() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-secondary">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] scale-110 pointer-events-none"></div>
      
      <div className="relative">
        {/* Pulsing Outer Ring */}
        <div className="absolute inset-0 rounded-3xl bg-accent/20 animate-ping opacity-20 scale-150"></div>
        
        {/* Card Contained Logo */}
        <div className="relative w-24 h-24 bg-emerald-950 text-accent rounded-3xl flex items-center justify-center font-arabic text-5xl shadow-2xl animate-pulse">
          ق
        </div>
      </div>
      
      <div className="mt-12 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h2 className="text-xl font-black text-primary tracking-tight">
          Divine Wisdom Loading...
        </h2>
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-accent rounded-full animate-bounce"></span>
        </div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] max-w-[200px] leading-relaxed">
          Patience is at the first stroke of a calamity
        </p>
      </div>
    </div>
  )
}
