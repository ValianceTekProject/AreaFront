"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material"

type AreaPopupProps = {
  open: boolean
  onClose: () => void
  onCreated: () => Promise<void>
}


const ACTIONS: string[] = ["Health", "Work", "Finance", "Learning"]
const REACTIONS: string[] = ["Short term", "Medium term", "Long term"]

export default function AreaPopup({ open, onClose }: AreaPopupProps) {
  const [area, setArea] = useState<string>("")
  const [reaction, setReaction] = useState<string>("")

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent className="flex flex-col gap-6 pt-6">
        <Typography variant="h6" fontWeight={600}>
          Create Area
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="area-label">Action</InputLabel>
          <Select
            labelId="area-label"
            value={area}
            label="Action"
            onChange={(e) => setArea(e.target.value)}
          >
            {ACTIONS.map((action) => (
              <MenuItem key={action} value={action}>
                {action}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="reaction-label">Reaction</InputLabel>
          <Select
            labelId="reaction-label"
            value={reaction}
            label="Reaction"
            onChange={(e) => setReaction(e.target.value)}
          >
            {REACTIONS.map((reaction) => (
              <MenuItem key={reaction} value={reaction}>
                {reaction}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions className="px-6 pb-4">
        <button onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
          Cancel
        </button>
        <button
          onClick={() => {}} className="px-4 py-2 text-sm font-medium rounded-md bg-[#5A80F0] text-white hover:bg-[#4a6cd1] transition">
          Create
        </button>
      </DialogActions>
    </Dialog>
  )
}
