import { EventStatus } from "@/types/event";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, Archive } from "lucide-react";

interface EventStatusBadgeProps {
  status: EventStatus;
  showIcon?: boolean;
}

const statusConfig = {
  draft: {
    label: "مسودة",
    icon: FileText,
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  },
  active: {
    label: "نشط",
    icon: CheckCircle,
    className: "bg-green-100 text-green-800 hover:bg-green-100",
  },
  archived: {
    label: "مؤرشف",
    icon: Archive,
    className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  },
};

export default function EventStatusBadge({
  status,
  showIcon = true,
}: EventStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge className={config.className}>
      {showIcon && <Icon className="w-3 h-3 ml-1" />}
      {config.label}
    </Badge>
  );
}

