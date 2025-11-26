"use client";
import { Card, CardContent, CardActions, Button, Checkbox } from "@mui/material";

export type TodoItem = {
  Id : number;
  Item: string;
  Completed: boolean;
};

export type TodoWishlistItemProps = {
  item: TodoItem;
  onDelete: (Item: string) => void;
  onToggle: (Item: string, Completed: boolean) => void;
};

export default function TodoWishlistItem({
  item,
  onDelete,
  onToggle,
}: TodoWishlistItemProps) {
  return (
    <Card className="shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <CardContent className="flex items-center gap-3 flex-1 min-w-0 pb-2 sm:pb-4">
          <Checkbox
            checked={item.Completed}
            onChange={() => onToggle(item.Item, item.Completed)}
            className="shrink-0"
          />
          <span
            className={`wrap-break-words ${item.Completed ? "line-through text-gray-400" : ""}`}
            style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
          >
            {item.Item}
          </span>
        </CardContent>

        <CardActions className="shrink-0 pt-0 sm:pt-2">
          <Button
            color="error"
            onClick={() => onDelete(item.Item)}
            size="small"
            className="w-full sm:w-auto"
          >
            Supprimer
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}
