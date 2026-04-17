export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-4">
      <div className="relative h-16 w-16">
        <span className="absolute inset-0 rounded-full border-4 border-slate-200" />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand-dark border-r-brand-mid" />
      </div>
      <p className="text-sm font-medium text-slate-500">Loading your friend shelf...</p>
    </div>
  );
}
