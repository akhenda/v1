import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@v1/ui/select';
import { cn } from '@v1/ui/utils';

export function ThemeSwitcher({ triggerClass }: { triggerClass?: string }) {
  const { theme: currentTheme, setTheme, themes } = useTheme();

  return (
    <Select
      value={currentTheme}
      onValueChange={(theme) => setTheme(theme as (typeof themes)[number])}
    >
      <SelectTrigger
        className={cn(
          '!px-2 h-6 rounded border-primary/20 bg-secondary hover:border-primary/40',
          triggerClass,
        )}
      >
        <div className="flex items-start gap-2">
          {currentTheme === 'light' && <Sun className="h-[14px] w-[14px]" />}
          {currentTheme === 'dark' && <Moon className="h-[14px] w-[14px]" />}
          {currentTheme !== 'light' && currentTheme !== 'dark' && (
            <Monitor className="h-[14px] w-[14px]" />
          )}
          {currentTheme && (
            <span className="font-medium text-xs">
              {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
            </span>
          )}
        </div>
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme) => (
          <SelectItem
            key={theme}
            value={theme}
            className={`font-medium text-primary/60 text-sm ${theme === currentTheme && 'text-primary'}`}
          >
            {theme && theme.charAt(0).toUpperCase() + theme.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function ThemeSwitcherHome() {
  const { setTheme, themes } = useTheme();
  return (
    <div className="flex gap-3">
      {themes.map((theme) => (
        <button key={theme} name="theme" onClick={() => setTheme(theme)} type="button">
          {theme === 'light' && <Sun className="h-4 w-4 text-primary/80 hover:text-primary" />}
          {theme === 'dark' && <Moon className="h-4 w-4 text-primary/80 hover:text-primary" />}
          {theme !== 'light' && theme !== 'dark' && (
            <Monitor className="h-4 w-4 text-primary/80 hover:text-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
