import { SkeltonLoading } from "./SkeltonLoading";
interface IMetricCard {
  label: string
  value: string | number
  icon: React.ReactNode
  loading?: boolean
}
export function MetricCard({ label, value, icon, loading }: IMetricCard) {
  return (
    <>
      {loading && <SkeltonLoading />}
      {!loading && <div className="bg-white p-2 border-solid border-sidebar-ring rounded-md">
        <div className="flex justify-between items-center">
          <span>{label}</span>
          {icon}
        </div>
        <span className="text-xl">{value}</span>
      </div>}
    </>
  )
}