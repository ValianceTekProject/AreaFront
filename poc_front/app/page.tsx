"use client";

import { useEffect, useState } from "react";
import AddItemForm from "@/components/Item_form";
import TodoColumn from "@/components/TodoColumn";
import Meteo from "./meteo";

export type TodoItem = {
  Id: number;
  Item: string;
  Completed: boolean;
};

export type AddItemPayload = {
  Item: string;
};

export type DeleteItemPayload = {
  Item: string;
};

export type ToggleDonePayload = {
  Item: string;
  Completed: boolean;
};

export default function TodoPage() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [bgClass, setBgClass] = useState<string>("bg-gray-200");

  const API_URL = "/api/todo";

  const loadItems = async () => {
    const res = await fetch(API_URL);
    const data: TodoItem[] = await res.json();
    setItems(data);
  };

  const addItem = async (data: AddItemPayload) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    loadItems();
  };

  const deleteItem = async (Item: string) => {
    const payload: DeleteItemPayload = { Item };
    await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    loadItems();
  };

  const toggleDone = async (Item: string, Completed: boolean) => {
    const payload: ToggleDonePayload = { Item, Completed: !Completed };
    await fetch(API_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, []);

  const todoItems = items.filter((item) => !item.Completed);
  const doneItems = items.filter((item) => item.Completed);

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
