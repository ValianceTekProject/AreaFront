"use client";

import { TextField, Button } from "@mui/material";
import { useState } from "react";

export default function AddItemForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end">
      <TextField
        label="Tâche"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <Button variant="contained" type="submit">
        Ajouter
      </Button>
    </form>
  );
}
