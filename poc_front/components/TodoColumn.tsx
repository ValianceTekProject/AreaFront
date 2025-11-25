"use client";

import TodoItem from "./todo_item";

export default function TodoColumn({ title, items, onDelete, onToggle }) {
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
