export function RegistrationStats({
  stats,
}: { stats: { total: number; pending: number; approved: number; rejected: number } }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white overflow-hidden shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Total de Registros</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.total}</dd>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Pendientes</dt>
          <dd className="mt-1 text-3xl font-semibold text-yellow-600">{stats.pending}</dd>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Aprobados</dt>
          <dd className="mt-1 text-3xl font-semibold text-green-600">{stats.approved}</dd>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Rechazados</dt>
          <dd className="mt-1 text-3xl font-semibold text-red-600">{stats.rejected}</dd>
        </div>
      </div>
    </div>
  )
}
