"use client";

import {
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import React from "react";

// Container grafik responsif
export function ChartContainer({
  children,
  className,
  config,
}: {
  children: React.ReactElement; // ReactElement saja (bukan ReactNode)
  className?: string;
  config: Record<string, { label: string; color: string }>;
}) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}

// Wrapper untuk Tooltip Recharts, dengan validasi aktif
export function ChartTooltip({
  active,
  payload,
  label,
  content,
  cursor,
}: TooltipProps<any, string> & {
  content: React.ReactElement;
}) {
  if (!active || !payload || payload.length === 0) return null;

  // Tooltip di Recharts perlu content dalam bentuk fungsi
  return <Tooltip content={() => content} cursor={cursor} />;
}

// Komponen isi custom tooltip
export function ChartTooltipContent({
  payload,
  label,
  indicator = "solid",
}: {
  payload?: {
    name?: string;
    value?: number | string;
    color?: string;
  }[];
  label?: string;
  indicator?: "solid" | "dashed";
}) {
  return (
    <div className="rounded-md border bg-background p-2 shadow-sm">
      <div className="mb-2 text-sm font-medium">{label}</div>
      {payload?.map((entry, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <Badge
              className="h-2 w-2 rounded-full p-0"
              style={{
                backgroundColor: entry.color ?? "#000",
                border:
                  indicator === "dashed"
                    ? "1px dashed black"
                    : "none",
              }}
            />
            <span className="text-xs text-muted-foreground">
              {entry.name}
            </span>
          </div>
          <span className="text-sm font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}
