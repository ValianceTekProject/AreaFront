"use client";

import { useEffect, useState } from "react";
import AddItemForm from "@/components/Item_form";
import WishlistItem from "@/components/wishlist_item";

export default function WishlistPage() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const res = await fetch("../api/wishlist");
    setItems(await res.json());
  };

  const addItem = async (data) => {
    await fetch("../api/wishlist", {
      method: "POST",
      body: JSON.stringify(data),
    });
    loadItems();
  };

  const deleteItem = async (id) => {
    await fetch("../api/wishlist", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Ma Wishlist</h1>

      <AddItemForm onAdd={addItem} />

      <div className="space-y-4">
        {items.map((item) => (
          <WishlistItem key={item.id} item={item} onDelete={deleteItem} />
        ))}
      </div>
    </div>
  );
}
