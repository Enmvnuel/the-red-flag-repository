interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="group relative flex flex-col items-center text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-pulse rounded-full bg-rose-200 opacity-0 blur-xl transition-opacity group-hover:opacity-50" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-600 text-3xl font-bold text-white shadow-lg shadow-rose-200 transition-transform group-hover:scale-110">
          {number}
        </div>
      </div>
      <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
      <p className="max-w-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}
