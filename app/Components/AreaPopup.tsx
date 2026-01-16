"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  SelectChangeEvent
} from "@mui/material"

type AreaPopupProps = {
  open: boolean
  onClose: () => void
  onCreated: () => Promise<void>
}

type SelectItem = {
  value: string
  label: string
  service: string
}

const API_URL = "http://localhost:8080"

export default function AreaPopup({ open, onClose, onCreated }: AreaPopupProps) {
  const [actions, setActions] = useState<SelectItem[]>([])
  const [reactions, setReactions] = useState<SelectItem[]>([])

  const [selectedAction, setSelectedAction] = useState("")
  const [selectedReaction, setSelectedReaction] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  if (!open) return

  fetch(`${API_URL}/about.json`)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`)
      }
      return res.json()
    })
    .then((data) => {
      if (
        !data ||
        !data.server ||
        !Array.isArray(data.server.services)
      ) {
        console.error("Invalid about.json format:", data)
        setActions([])
        setReactions([])
        return
      }

      const actionItems: SelectItem[] = []
      const reactionItems: SelectItem[] = []

      data.server.services.forEach((service: any) => {
        if (Array.isArray(service.actions)) {
          service.actions.forEach((action: any) => {
            actionItems.push({
              value: action.name,
              label: `${service.name} — ${action.description}`,
              service: service.name
            })
          })
        }

        if (Array.isArray(service.reactions)) {
          service.reactions.forEach((reaction: any) => {
            reactionItems.push({
              value: reaction.name,
              label: `${service.name} — ${reaction.description}`,
              service: service.name
            })
          })
        }
      })

      setActions(actionItems)
      setReactions(reactionItems)
    })
    .catch((err) => {
      console.error("Failed to load about.json:", err)
      setActions([])
      setReactions([])
    })
  }, [open])

  const handleCreate = async () => {
    if (!selectedAction || !selectedReaction) return

    try {
      setLoading(true)

      const token = typeof window !== "undefined"
        ? localStorage.getItem("authToken")
        : null

      const areaRes = await fetch(`${API_URL}/areas/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: selectedAction + " -> " + selectedReaction,
        }),
      })

      if (!areaRes.ok) {
        const err = await areaRes.text()
        console.error("CreateArea error:", err)
        throw new Error("Failed to create area")
      }

      const serviceMapping: Record<string, string> = {
        github: "Github",
        discord: "Discord",
        google: "Google",
        steam: "Steam",
        twitch: "Twitch",
        openweather: "OpenWeather",
      }

      const areaData = await areaRes.json()
      const areaId = areaData.area.id
      const serviceNameAction = actions.find(a => a.value === selectedAction)?.service || ""
      const serviceNameReaction = reactions.find(r => r.value === selectedReaction)?.service || ""

      await fetch(`${API_URL}/areas/${areaId}/action/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: selectedAction,
          service_name: serviceNameAction,
        }),
      })

      await fetch(`${API_URL}/areas/${areaId}/reaction/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: selectedReaction,
          service_name: serviceNameReaction,
        }),
      })

      await onCreated()
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent className="flex flex-col gap-6 pt-6">
        <Typography variant="h6" fontWeight={600}>
          Create Area
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Action</InputLabel>
          <Select
            value={selectedAction}
            label="Action"
            onChange={(e: SelectChangeEvent<string>) => setSelectedAction(e.target.value)}
          >
            {actions.map((action) => (
              <MenuItem key={action.value} value={action.value}>
                {action.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Reaction</InputLabel>
          <Select
            value={selectedReaction}
            label="Reaction"
            onChange={(e: SelectChangeEvent<string>) => setSelectedReaction(e.target.value)}
          >
            {reactions.map((reaction) => (
              <MenuItem key={reaction.value} value={reaction.value}>
                {reaction.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions className="px-6 pb-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={handleCreate}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium rounded-md bg-[#5A80F0] text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </DialogActions>
    </Dialog>
  )
}
