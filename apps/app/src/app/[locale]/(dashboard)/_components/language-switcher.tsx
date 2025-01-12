'use client';

import { Languages } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@v1/ui/select';

import { useChangeLocale, useCurrentLocale } from '@/locales/client';

export function LanguageSwitcher() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  const langs = [
    { text: 'English', value: 'en' },
    { text: 'French', value: 'fr' },
    { text: 'Spanish', value: 'es' },
  ];
  const formatLanguage = (lng: string) => langs.find((lang) => lang.value === lng)?.text;

  return (
    <Select value={locale} onValueChange={changeLocale}>
      <SelectTrigger className="!px-2 h-6 rounded border-primary/20 bg-secondary hover:border-primary/40">
        <div className="flex items-start gap-2">
          <Languages className="h-[14px] w-[14px]" />
          <span className="font-medium text-xs">{formatLanguage(locale)}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {langs.map(({ text, value }) => (
          <SelectItem key={value} value={value} className="font-medium text-primary/60 text-sm">
            {text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
