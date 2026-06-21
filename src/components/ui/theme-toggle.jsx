import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "../../lib/utils"

export function ThemeToggle({ className }) {
  const [isDark, setIsDark] = useState(true)

  // next-themes
  // const { resolvedTheme, setTheme } = useTheme()
  // const isDark = resolvedTheme === "dark"
  // onClick={() => setTheme(isDark ? "light" : "dark")}

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark 
          ? "bg-zinc-950 border border-zinc-800" 
          : "bg-white border border-zinc-200",
        className
      )}
      onClick={() => setIsDark(!isDark)}
      role="button"
      tabIndex={0}
      style={{
        display: 'flex', width: '64px', height: '32px', padding: '4px', borderRadius: '9999px', cursor: 'pointer', transition: 'all 0.3s',
        backgroundColor: isDark ? 'rgba(15, 15, 15, 0.75)' : '#ffffff',
        backdropFilter: isDark ? 'blur(16px)' : 'none',
        boxShadow: isDark ? 'var(--glow-accent), 0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.25)' : '#e4e4e7'}`
      }}
    >
      <div className="flex justify-between items-center w-full" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark 
              ? "transform translate-x-0 bg-zinc-800" 
              : "transform translate-x-8 bg-gray-200"
          )}
          style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '24px', height: '24px', borderRadius: '9999px', transition: 'transform 0.3s',
            transform: isDark ? 'translateX(0)' : 'translateX(32px)',
            backgroundColor: isDark ? '#27272a' : '#e5e7eb'
          }}
        >
          {isDark ? (
            <Moon 
              className="w-4 h-4 text-white" 
              strokeWidth={1.5}
              style={{ width: '16px', height: '16px', color: '#ffffff' }}
            />
          ) : (
            <Sun 
              className="w-4 h-4 text-gray-700" 
              strokeWidth={1.5}
              style={{ width: '16px', height: '16px', color: '#374151' }}
            />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark 
              ? "bg-transparent" 
              : "transform -translate-x-8"
          )}
          style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '24px', height: '24px', borderRadius: '9999px', transition: 'transform 0.3s',
            backgroundColor: 'transparent',
            transform: isDark ? 'none' : 'translateX(-32px)'
          }}
        >
          {isDark ? (
            <Sun 
              className="w-4 h-4 text-gray-500" 
              strokeWidth={1.5}
              style={{ width: '16px', height: '16px', color: '#6b7280' }}
            />
          ) : (
            <Moon 
              className="w-4 h-4 text-black" 
              strokeWidth={1.5}
              style={{ width: '16px', height: '16px', color: '#000000' }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
