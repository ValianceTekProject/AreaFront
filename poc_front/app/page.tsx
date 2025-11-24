"use client";

import { useEffect, useState } from "react";
import AddItemForm from "@/components/Item_form";
import TodoColumn from "@/components/TodoColumn";
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

  const todoItems = items.filter((item) => !item.done);
  const doneItems = items.filter((item) => item.done);

  return (
    <div className={`min-h-screen ${bgClass} bg-cover bg-center`}>
      <Meteo onBackgroundChange={setBgClass} />
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-white">Ma To-Do List</h1>
        <AddItemForm onAdd={addItem} />

        <div className="grid grid-cols-2 gap-6 mt-6">
          <TodoColumn
            title="À faire"
            items={todoItems}
            onDelete={deleteItem}
            onToggle={toggleDone}
          />
          <TodoColumn
            title="Complété"
            items={doneItems}
            onDelete={deleteItem}
            onToggle={toggleDone}
          />
        </div>
      </div>
    </div>
  );
}
