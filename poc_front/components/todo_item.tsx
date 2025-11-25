"use client";

import { Card, CardContent, CardActions, Button, Checkbox } from "@mui/material";

export default function TodoItem({ item, onDelete, onToggle }) {
  return (
    <Card className="shadow-md flex items-center justify-between">
      <CardContent className="flex items-center gap-3">
        <Checkbox
          checked={item.Completed}
          onChange={() => onToggle(item.Item, item.Completed)}
        />
        <span className={item.Completed ? "line-through text-gray-400" : ""}>
          {item.Item}
        </span>
      </CardContent>
      <CardActions>
        <Button color="error" onClick={() => onDelete(item.Item)}>
          Supprimer
        </Button>
      </CardActions>
    </Card>
  );
}
