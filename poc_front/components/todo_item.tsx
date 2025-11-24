"use client";

import { Card, CardContent, CardActions, Button, Checkbox } from "@mui/material";

export default function TodoItem({ item, onDelete, onToggle }) {
  return (
    <Card className="shadow-md flex items-center justify-between">
      <CardContent className="flex items-center gap-3">
        <Checkbox
          checked={item.done}
          onChange={() => onToggle(item.id, item.done)}
        />
        <span className={item.done ? "line-through text-gray-400" : ""}>
          {item.title}
        </span>
      </CardContent>
      <CardActions>
        <Button color="error" onClick={() => onDelete(item.id)}>
          Supprimer
        </Button>
      </CardActions>
    </Card>
  );
}
