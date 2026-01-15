import { useState, useEffect } from "react"

export default function UsersPanel() {
  const [users, setUsers] = useState<Array<{
    id: string
    email: string
    authorized: boolean
    admin: boolean
  }>>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch("http://localhost:8080/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (response.status === 401 || response.status === 403) {
          setIsAdmin(false)
          setError("access denied")
          setLoading(false)
          return
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response?.json()
        if (Array.isArray(data)) {
          setUsers(data)
          setIsAdmin(true)
        } else {
          console.error("Data is not an array:", data)
          setUsers([])
          setIsAdmin(false)
        }
      } catch (err) {
        console.error("Network error", err)
        setUsers([])
        setError("Erreur lors du chargement des utilisateurs")
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const changeAuthorizationStatus = async (userId: string, authorize: boolean) => {
    try {
      const token = localStorage.getItem('authToken');
      await fetch(`http://localhost:8080/users/${userId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ authorize })
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, authorized: authorize } : user
        )
      );
    } catch (err) {
      console.error("Network error", err)
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1B264F] rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-white">Users</h2>
        <p className="text-white/60">Chargement...</p>
      </div>
    )
  }

  if (!isAdmin || error) {
    return (
      <div className="bg-[#1B264F] rounded-xl shadow p-6 flex items-center justify-center min-h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Access denied</h2>
          <p className="text-white/60">You do not have the necessary permissions to access this page.</p>
        </div>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="bg-[#1B264F] rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-white">Users</h2>
        <p className="text-white/60">Aucun utilisateur trouvé</p>
      </div>
    )
  }

  return (
    <div className="bg-[#1B264F] rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Users</h2>
      <table className="w-full text-left text-white">
        <thead>
          <tr className="border-b border-white/20">
            <th className="pb-3">Email</th>
            <th>Status</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-white/10 last:border-0">
              <td className="py-4">{u.email}</td>
              <td>
                <span 
                  onClick={() => changeAuthorizationStatus(u.id, !u.authorized)}
                  className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer
                  ${
                    u.authorized
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {u.authorized ? "AUTHORIZED" : "UNAUTHORIZED"}
                </span>
              </td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    u.admin === true
                      ? "bg-purple-500/20 text-purple-300"
                      : "bg-blue-500/20 text-blue-300"
                  }`}
                >
                  {u.admin ? "ADMIN" : "USER"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}