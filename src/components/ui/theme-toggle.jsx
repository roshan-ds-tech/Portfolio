import { Moon, Sun } from "lucide-react"
import { cn } from "../../lib/utils"
import { useTheme } from "../../context/ThemeContext"

export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(className)}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleTheme(); }}
      style={{
        display: 'flex', width: '64px', height: '32px', padding: '4px',
        borderRadius: '9999px', cursor: 'pointer', transition: 'all 0.3s',
        backgroundColor: isDark ? 'rgba(15,15,15,0.75)' : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(16px)',
        boxShadow: isDark
          ? 'var(--glow-accent), 0 4px 20px rgba(0,0,0,0.3)'
          : '0 4px 20px rgba(0,0,0,0.08)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.1)'}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        {/* active indicator circle */}
        <div
          style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '24px', height: '24px', borderRadius: '9999px',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
            transform: isDark ? 'translateX(0)' : 'translateX(32px)',
            backgroundColor: isDark ? '#27272a' : 'rgba(200,169,126,0.2)',
          }}
        >
          {isDark
            ? <Moon style={{ width: '14px', height: '14px', color: '#ffffff' }} strokeWidth={1.5} />
            : <Sun style={{ width: '14px', height: '14px', color: '#C8A97E' }} strokeWidth={1.5} />
          }
        </div>
        {/* inactive side icon */}
        <div
          style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '24px', height: '24px', borderRadius: '9999px',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
            transform: isDark ? 'none' : 'translateX(-32px)',
            backgroundColor: 'transparent',
          }}
        >
          {isDark
            ? <Sun style={{ width: '14px', height: '14px', color: '#6b7280' }} strokeWidth={1.5} />
            : <Moon style={{ width: '14px', height: '14px', color: '#767676' }} strokeWidth={1.5} />
          }
        </div>
      </div>
    </div>
  );
}
