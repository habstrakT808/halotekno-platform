'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
    Users,
    Search,
    Plus,
    Download,
    Check,
    X,
    Edit2,
    Trash2,
    Filter,
    Loader2,
    UserCheck,
    UserX,
    Shield,
    Store,
    User as UserIcon,
} from 'lucide-react'
import CreateUserModal from '@/components/admin/create-user-modal'
import EditUserModal from '@/components/admin/edit-user-modal'
import { toast } from 'sonner'

interface User {
    id: string
    name: string | null
    email: string
    role: string
    phone: string | null
    isActive: boolean
    mitraStatus: string | null
    createdAt: string
    updatedAt: string
}

interface Stats {
    byRole: Record<string, number>
    pendingMitra: number
}

export default function UsersPage() {
    const router = useRouter()
    const [users, setUsers] = useState<User[]>([])
    const [stats, setStats] = useState<Stats>({ byRole: {}, pendingMitra: 0 })
    const [loading, setLoading] = useState(true)
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())

    // Filters
    const [roleFilter, setRoleFilter] = useState('ALL')
    const [mitraStatusFilter, setMitraStatusFilter] = useState('ALL')
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // Modals
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)

    // Fetch users
    const fetchUsers = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '20',
                role: roleFilter,
                mitraStatus: mitraStatusFilter,
                search: searchQuery,
            })

            const res = await fetch(`/api/admin/users?${params}`)

            // Check if response is ok
            if (!res.ok) {
                if (res.status === 401) {
                    toast.error('Unauthorized. Please login as admin.')
                    router.push('/login')
                    return
                }
                throw new Error('Failed to fetch users')
            }

            // Check if response has content
            const text = await res.text()
            if (!text) {
                throw new Error('Empty response from server')
            }

            const data = JSON.parse(text)
            setUsers(data.users || [])
            setStats(data.stats || { byRole: {}, pendingMitra: 0 })
            setTotalPages(data.pagination?.totalPages || 1)
        } catch (error) {
            console.error('Error fetching users:', error)
            toast.error('Failed to load users')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [page, roleFilter, mitraStatusFilter, searchQuery])

    // Selection handlers
    const toggleSelectAll = () => {
        if (selectedUsers.size === users.length) {
            setSelectedUsers(new Set())
        } else {
            setSelectedUsers(new Set(users.map((u) => u.id)))
        }
    }

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selectedUsers)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedUsers(newSelected)
    }

    // Bulk actions
    const handleBulkAction = async (action: string) => {
        if (selectedUsers.size === 0) return

        if (!confirm(`Are you sure you want to ${action} ${selectedUsers.size} users?`)) {
            return
        }

        try {
            const res = await fetch('/api/admin/users/bulk-action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action,
                    userIds: Array.from(selectedUsers),
                }),
            })

            if (!res.ok) throw new Error('Bulk action failed')

            toast.success(`Successfully ${action}ed ${selectedUsers.size} users`)
            setSelectedUsers(new Set())
            fetchUsers()
        } catch (error) {
            console.error('Error performing bulk action:', error)
            toast.error('Failed to perform bulk action')
        }
    }

    // Export CSV
    const handleExport = () => {
        const params = new URLSearchParams({
            role: roleFilter,
            mitraStatus: mitraStatusFilter,
        })
        window.open(`/api/admin/users/export?${params}`, '_blank')
    }

    // Delete user
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return

        try {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: 'DELETE',
            })

            if (!res.ok) throw new Error('Failed to delete user')

            toast.success('User deleted successfully')
            fetchUsers()
        } catch (error) {
            console.error('Error deleting user:', error)
            toast.error('Failed to delete user')
        }
    }

    // Approve/Reject mitra
    const handleMitraAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        try {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mitraStatus: status }),
            })

            if (!res.ok) throw new Error('Failed to update mitra status')

            toast.success(`Mitra ${status.toLowerCase()} successfully`)
            fetchUsers()
        } catch (error) {
            console.error('Error updating mitra status:', error)
            toast.error('Failed to update mitra status')
        }
    }

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'SUPER_ADMIN':
                return 'bg-purple-100 text-purple-700'
            case 'ADMIN':
                return 'bg-blue-100 text-blue-700'
            case 'MITRA':
                return 'bg-green-100 text-green-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    const getMitraStatusBadge = (status: string | null) => {
        if (!status) return null

        switch (status) {
            case 'PENDING':
                return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">Pending</span>
            case 'APPROVED':
                return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Approved</span>
            case 'REJECTED':
                return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Rejected</span>
        }
    }

    const totalUsers = Object.values(stats.byRole).reduce((a, b) => a + b, 0)

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Kelola Users</h1>
                <p className="mt-2 text-gray-600">Manage all users, roles, and mitra approvals</p>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Users</p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">{totalUsers}</p>
                        </div>
                        <div className="rounded-xl bg-blue-500 p-3">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Teknisi</p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">{stats.byRole.ADMIN || 0}</p>
                        </div>
                        <div className="rounded-xl bg-purple-500 p-3">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Mitra</p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">{stats.byRole.MITRA || 0}</p>
                        </div>
                        <div className="rounded-xl bg-green-500 p-3">
                            <Store className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Pending Approval</p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">{stats.pendingMitra}</p>
                        </div>
                        <div className="rounded-xl bg-yellow-500 p-3">
                            <UserCheck className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Actions */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 gap-4">
                    {/* Role Filter */}
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    >
                        <option value="ALL">All Roles</option>
                        <option value="CUSTOMER">Customer</option>
                        <option value="ADMIN">Teknisi</option>
                        <option value="MITRA">Mitra</option>
                        <option value="SUPER_ADMIN">Super Admin</option>
                    </select>

                    {/* Mitra Status Filter */}
                    {roleFilter === 'MITRA' && (
                        <select
                            value={mitraStatusFilter}
                            onChange={(e) => setMitraStatusFilter(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="ALL">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    )}

                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                        <Download className="h-5 w-5" />
                        Export
                    </button>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 font-medium text-white transition-all hover:shadow-lg"
                    >
                        <Plus className="h-5 w-5" />
                        Add User
                    </button>
                </div>
            </div>

            {/* Bulk Actions Bar */}
            {selectedUsers.size > 0 && (
                <div className="mb-4 flex items-center justify-between rounded-lg bg-blue-50 p-4">
                    <span className="font-medium text-blue-900">
                        {selectedUsers.size} user(s) selected
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleBulkAction('approve')}
                            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                        >
                            <Check className="h-4 w-4" />
                            Approve
                        </button>
                        <button
                            onClick={() => handleBulkAction('reject')}
                            className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
                        >
                            <X className="h-4 w-4" />
                            Reject
                        </button>
                        <button
                            onClick={() => handleBulkAction('delete')}
                            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </button>
                    </div>
                </div>
            )}

            {/* Users Table */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    </div>
                ) : users.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Users className="h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-gray-500">No users found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.size === users.length}
                                            onChange={toggleSelectAll}
                                            className="rounded border-gray-300"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Mitra Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.has(user.id)}
                                                onChange={() => toggleSelect(user.id)}
                                                className="rounded border-gray-300"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-gray-900">{user.name || 'N/A'}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                                {user.phone && <div className="text-sm text-gray-500">{user.phone}</div>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {user.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getMitraStatusBadge(user.mitraStatus)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {user.role === 'MITRA' && user.mitraStatus === 'PENDING' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleMitraAction(user.id, 'APPROVED')}
                                                            className="rounded-lg bg-green-100 p-2 text-green-600 hover:bg-green-200"
                                                            title="Approve"
                                                        >
                                                            <Check className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleMitraAction(user.id, 'REJECTED')}
                                                            className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                                                            title="Reject"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        setEditingUser(user)
                                                        setShowEditModal(true)
                                                    }}
                                                    className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                {user.role !== 'SUPER_ADMIN' && (
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 text-gray-700">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Modals */}
            <CreateUserModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={fetchUsers}
            />
            <EditUserModal
                isOpen={showEditModal}
                user={editingUser}
                onClose={() => {
                    setShowEditModal(false)
                    setEditingUser(null)
                }}
                onSuccess={fetchUsers}
            />
        </div>
    )
}
