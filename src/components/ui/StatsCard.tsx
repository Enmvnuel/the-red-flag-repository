import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  colorClass: string;
  bgClass: string;
}

export function StatsCard({ icon: Icon, value, label, colorClass, bgClass }: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-10 transition-transform group-hover:scale-150 ${bgClass}`} />
      
      <div className="relative">
        <div className={`mb-4 inline-flex rounded-2xl p-3 ${bgClass} ${colorClass}`}>
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="text-4xl font-extrabold tracking-tight text-gray-900">
          {value}
        </h3>
        <p className="mt-2 font-medium text-gray-500">{label}</p>
      </div>
    </div>
  );
}
