import { useState } from "react"

export default function UsersPanel() {
  const [users] = useState([
    {
      id: "1",
      email: "admin@area.io",
      role: "ADMIN",
      active: true,
    },
    {
      id: "2",
      email: "user@test.com",
      role: "USER",
      active: false,
    },
    {
      id: "3",
      email: "john@doe.com",
      role: "USER",
      active: true,
    },
  ])

  return (
    <div className="bg-[#1B264F] rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Users</h2>

      <table className="w-full text-left text-white">
        <thead>
          <tr className="border-b border-white/20">
            <th className="pb-3">Email</th>
            <th>Status</th>
            <th>Role</th>
            <th className="text-right">Deletion</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-white/10 last:border-0">
              <td className="py-4">{u.email}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    u.active
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {u.active ? "ACTIVE" : "DISABLED"}
                </span>
              </td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    u.role === "ADMIN"
                      ? "bg-purple-500/20 text-purple-300"
                      : "bg-blue-500/20 text-blue-300"
                  }`}
                >
                  {u.role}
                </span>
              </td>

              <td className="text-right">
                <button
                  className="px-4 py-1 rounded-full bg-red-500/20 text-red-300
                             hover:bg-red-500/30 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
