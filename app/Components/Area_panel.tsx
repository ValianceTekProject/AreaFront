import { useState, useEffect } from "react"

type Area = {
  id: string
  action: string
  reaction: string
  enabled: boolean
}

type UserAreas = {
  user: {
    email: string
  }
  areas: Area[]
}

export default function AreasPanel() {
  const [usersAreas] = useState<UserAreas[]>([
    {
      user: { email: "user@test.com" },
      areas: [
        {
          id: "1",
          action: "gmail:new_mail",
          reaction: "discord:send_message",
          enabled: true,
        },
        {
          id: "2",
          action: "github:new_issue",
          reaction: "gmail:send_mail",
          enabled: false,
        },
      ],
    },
    {
      user: { email: "john@doe.com" },
      areas: [
        {
          id: "3",
          action: "discord:new_message",
          reaction: "gmail:send_mail",
          enabled: true,
        },
      ],
    },
  ])

  return (
    <div className="space-y-6">
      {usersAreas.map((u) => (
        <div
          key={u.user.email}
          className="bg-[#1B264F] rounded-xl shadow p-6"
        >
          <p className="font-bold text-white mb-4">
            {u.user.email}
          </p>
          <div className="space-y-3">
            {u.areas.map((a) => (
              <div
                key={a.id}
                className="flex justify-between items-center bg-white/5 rounded-lg px-4 py-3"
              >
                <p className="text-white text-sm">
                  {a.action} → {a.reaction}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
                  ${
                    a.enabled
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {a.enabled ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
