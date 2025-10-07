import { User } from "lucide-react";
interface IMetricCard {
    label: string
    value: string | number
    icon: React.ReactNode
}
export function MetricCard({label, value, icon}: IMetricCard) {
    return(
        <div className="bg-white p-2 border-solid border-sidebar-ring rounded-md">
        <div className="flex justify-between items-center">
          <span>{label}</span>
          {icon}
        </div>
        <span className="text-xl">{value}</span>
      </div>
    )
}