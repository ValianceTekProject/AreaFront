"use client";

import TodoItem from "./todo_item";
import type { TodoItem as ITodoItem } from "./todo_item";

export type TodoColumnProps = {
  title: string;
  items: ITodoItem[];
  onDelete: (Item: string) => void;
  onToggle: (Item: string, Completed: boolean) => void;
};

export default function TodoColumn({
  title,
  items,
  onDelete,
  onToggle,
}: TodoColumnProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <TodoItem
            key={item.Id}
            item={item}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}
