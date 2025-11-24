"use client";

import { useEffect, useState } from "react";
import AddItemForm from "@/components/Item_form";
import TodoItem from "@/components/todo_item";
import Meteo from "./meteo";

export default function TodoPage() {
  const [items, setItems] = useState([]);
    const [bgClass, setBgClass] = useState("bg-gray-200");

  const loadItems = async () => {
    const res = await fetch("../api/todo");
    setItems(await res.json());
  };

  const addItem = async (data) => {
    await fetch("../api/todo", {
      method: "POST",
      body: JSON.stringify(data),
    });
    loadItems();
  };

  const deleteItem = async (id) => {
    await fetch("../api/todo", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    loadItems();
  };

  const toggleDone = async (id, done) => {
    await fetch("../api/todo", {
      method: "PATCH",
      body: JSON.stringify({ id, done: !done }),
    });
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className={`min-h-screen ${bgClass} bg-cover bg-center`}>
      <Meteo onBackgroundChange={setBgClass} />
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-white">Ma To-Do List</h1>

        <AddItemForm onAdd={addItem} />

        <div className="space-y-4">
          {items.map((item) => (
            <TodoItem
            key={item.id}
            item={item}
            onDelete={deleteItem}
            onToggle={toggleDone}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
