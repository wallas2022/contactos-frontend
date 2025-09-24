import React from "react";

export type TabItem = { key: string; label: string };

type TabsProps = {
  value: string;
  onChange: (key: string) => void;
  items: TabItem[];
  className?: string;
};

export default function Tabs({ value, onChange, items, className }: TabsProps) {
  return (
    <div className={className}>
      <div role="tablist" aria-label="Tabs" className="flex gap-2 border-b">
        {items.map((t) => {
          const active = value === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${t.key}`}
              id={`tab-${t.key}`}
              onClick={() => onChange(t.key)}
              className={[
                "px-3 py-2 transition-colors",
                active
                  ? "border-b-2 border-blue-600 text-blue-700 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
