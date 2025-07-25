import { Building2 } from "lucide-react"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        {/* Main logo container with gradient background */}
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        {/* Small accent dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-2 border-white shadow-sm"></div>
      </div>

      {/* Logo text */}
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
          G3W
        </span>
        <span className="text-xs font-medium text-gray-500 -mt-1 leading-tight">HOMES</span>
      </div>
    </div>
  )
}
