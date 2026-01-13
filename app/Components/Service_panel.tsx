import { useState, useEffect } from "react"


export default function ServicesPanel() {
  const [services] = useState([
    {
      name: "Gmail",
      actions: ["new_mail", "mail_with_attachment"],
      reactions: ["send_mail"],
    },
    {
      name: "Github",
      actions: ["new_issue"],
      reactions: ["create_comment"],
    },
    {
      name: "Discord",
      actions: ["new_message"],
      reactions: ["send_message"],
    },
  ])

  return (
    <div className="grid grid-cols-3 gap-6">
      {services.map((s) => (
        <div
          key={s.name}
          className="bg-[#1B264F] rounded-xl shadow p-6"
        >
          <h3 className="text-xl font-bold mb-2">{s.name}</h3>
          <p className="text-white">
            Actions: {s.actions.length}
          </p>
          <p className="text-white">
            Reactions: {s.reactions.length}
          </p>
        </div>
      ))}
    </div>
  )
}

