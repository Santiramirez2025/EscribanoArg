// app/buscar/components/skeletons.tsx
import { ViewMode } from "../types";

interface EscribanoCardSkeletonProps {
  viewMode: ViewMode;
}

export function EscribanoCardSkeleton({ viewMode }: EscribanoCardSkeletonProps) {
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
        <div className="flex gap-5">
          <div className="w-20 h-20 bg-slate-200 rounded-2xl flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
            <div className="flex gap-2">
              <div className="h-6 bg-slate-200 rounded-lg w-16" />
              <div className="h-6 bg-slate-200 rounded-lg w-16" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-10 w-24 bg-slate-200 rounded-xl" />
            <div className="h-10 w-24 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-slate-200 rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-2/3" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
        <div className="h-6 bg-slate-200 rounded w-20" />
        <div className="h-8 bg-slate-200 rounded-xl w-16" />
      </div>
    </div>
  );
}