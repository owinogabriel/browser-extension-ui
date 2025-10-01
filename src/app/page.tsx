"use client"

import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function Home() {
  const [activeState, setActiveState] = useState("All");
  const filters = ["All", "Active", "Inactive"];

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl  font-bold">Browser Extension</h1>
        <div className="flex gap-4">
          {filters.map((filter) => (
            <Button
              size="sm"
              key={filter}
              variant={activeState === filter ? "default" : "outline"}
              className={
                activeState === filter
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : ""
              }
              onClick={() => setActiveState(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
