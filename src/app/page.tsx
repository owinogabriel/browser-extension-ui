"use client";

import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";

type Extension = {
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
};

export default function Home() {
  const [extension, setExtension] = useState<Extension[]>([]);
  const [activeState, setActiveState] = useState("All");
  const filters = ["All", "Active", "Inactive"];

  // Fetching data from JSON file
  useEffect(() => {
    const fetchExtension = async () => {
      const res = await fetch("/data.json");
      const data = await res.json();
      setExtension(data);
    };
    fetchExtension();
  }, []);

  // filter logic
  const filterExtension = extension.filter((ext) => {
    if (activeState === "All") return true;
    if (activeState === "Active") return ext.isActive;
    if (activeState === "Inactive") return ext.isActive;
  });

  // Toggle
  const toggleExtension = (name: string) => {
    setExtension((prev) =>
      prev.map((ext) =>
        ext.name === name ? { ...ext, isActive: !ext.isActive } : ext
      )
    );
  };

  // Remove
  const removeExtension = (name: string) => {
    setExtension((prev) => prev.filter((ext) => ext.name !== name));
  };
  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl  font-bold">Extension List</h1>
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
