import { Activity, AlertCircle } from 'lucide-react';

export default function StatusBadge({ status, error }) {
  if (error) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-red-400">
        <AlertCircle size={12} />
        <span>Disconnected</span>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <Activity size={12} className="animate-pulse" />
        <span>Connecting...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-xs text-green-400">
      <Activity size={12} />
      <span>{status}</span>
    </div>
  );
}
