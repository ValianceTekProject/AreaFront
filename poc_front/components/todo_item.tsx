"use client";

import { Card, CardContent, CardActions, Button, Checkbox } from "@mui/material";

export default function TodoWishlistItem({ item, onDelete, onToggle }) {
  return (
    <Card className="shadow-md w-full">
      <div className="flex flex-col sm:flex-row justify-between p-4 gap-4">
        <div className="flex flex-1 min-w-0 gap-3">
          <Checkbox
            checked={item.done}
            onChange={() => onToggle(item.id, item.done)}
            sx={{ padding: 0 }}
          />
          <div className="flex flex-col gap-1 min-w-0">
            <span
              className={
                "text-base font break-words " +
                (item.done ? "line-through text-gray-400" : "")
              }
            >
              {item.title}
            </span>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                className="text-blue-600 underline text-sm break-all"
              >
                Voir le lien
              </a>
            )}
          </div>
        </div>
        <div className="flex sm:justify-end">
          <Button color="error" onClick={() => onDelete(item.id)}>
            Supprimer
          </Button>
        </div>
      </div>
    </Card>
  );
}
