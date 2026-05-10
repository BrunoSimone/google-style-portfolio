"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Search, Mic, X } from "lucide-react";
import { useLanguage } from "@/i18n/context";

const SUGGESTION = "Bruno Simone";

interface SearchBarProps {
  defaultValue?: string;
  variant?: "home" | "header";
  autoFocus?: boolean;
}

export function SearchBar({
  defaultValue = "",
  variant = "home",
  autoFocus = false,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSearch = (term?: string) => {
    const query = term ?? value;
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestion(false);
      inputRef.current?.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (showSuggestion && !value.trim()) {
        setValue(SUGGESTION);
        handleSearch(SUGGESTION);
      } else {
        handleSearch();
      }
    }
    if (e.key === "Escape") {
      setShowSuggestion(false);
      inputRef.current?.blur();
    }
    if (e.key === "ArrowDown" && showSuggestion) {
      e.preventDefault();
      setValue(SUGGESTION);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowSuggestion(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => setShowSuggestion(false), 200);
  };

  const clearInput = () => {
    setValue("");
    if (pathname === "/search") {
      router.push("/");
    } else {
      inputRef.current?.focus();
      setShowSuggestion(true);
    }
  };

  const isHome = variant === "home";
  const wrapperClass = isHome
    ? "w-full max-w-[584px]"
    : "w-full max-w-[692px]";
  const inputHeight = isHome ? "h-11 md:h-12" : "h-12";

  const filteredSuggestion =
    !value.trim() ||
    SUGGESTION.toLowerCase().startsWith(value.toLowerCase());

  return (
    <div className={`relative ${wrapperClass}`}>
      <div
        className={`flex items-center rounded-full border border-surface-border bg-white ${inputHeight} px-4 gap-3 ${
          isFocused ? "shadow-md" : "hover:shadow-md"
        } transition-shadow`}
      >
        <Search className="size-5 text-content-tertiary shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isHome ? t.home.searchPlaceholder : ""}
          className="flex-1 outline-none text-[16px] text-content-primary bg-transparent"
          autoComplete="off"
          spellCheck={false}
        />
        {value && (
          <>
            <button
              onClick={clearInput}
              className="p-1 hover:bg-surface-hover rounded-full"
            >
              <X className="size-5 text-content-secondary" />
            </button>
            <div className="w-px h-6 bg-surface-border" />
          </>
        )}
        <Mic className="size-5 text-google-blue shrink-0 cursor-pointer" />
      </div>

      {showSuggestion && filteredSuggestion && value !== SUGGESTION && (
        <div className="absolute top-full left-0 right-0 mt-0 bg-white border border-t-0 border-surface-border rounded-b-3xl shadow-lg z-50 overflow-hidden -translate-y-3 pt-3">
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setValue(SUGGESTION);
              setShowSuggestion(false);
              handleSearch(SUGGESTION);
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-surface-hover text-left"
          >
            <Search className="size-4 text-content-tertiary" />
            <span className="text-content-primary text-[16px]">
              {SUGGESTION}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
