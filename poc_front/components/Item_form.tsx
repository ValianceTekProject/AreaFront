"use client";

import { TextField, Button } from "@mui/material";
import { useState } from "react";

export type AddItemPayload = {
  Item: string;
  Completed: boolean;
};

export default function AddItemForm({
  onAdd,
}: {
  onAdd: (item: AddItemPayload) => void;
}) {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({ Item: title, Completed: false });
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
        className="bg-white rounded-md"
      />
      <Button variant="contained" type="submit">
        Ajouter
      </Button>
    </form>
  );
}
