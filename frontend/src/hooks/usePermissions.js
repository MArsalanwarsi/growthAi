import { useSelector } from 'react-redux'

export function usePermissions() {
  const role = useSelector((state) => state.auth.user?.role || 'Viewer')

  return {
    role,
    canManageBilling: ['Owner', 'Admin'].includes(role),
    canManageTeam: ['Owner', 'Admin'].includes(role),
    canExportReports: ['Owner', 'Admin', 'Analyst'].includes(role),
  }
}
