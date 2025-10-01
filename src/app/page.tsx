"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useEffect, useState } from "react";

type Extension = {
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
};

export default function Home() {
  const [extension, setExtension] = useState<Extension[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
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
    if (activeFilter === "All") return true;
    if (activeFilter === "Active") return ext.isActive;
    if (activeFilter === "Inactive") return ext.isActive;
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
              variant={activeFilter === filter ? "default" : "outline"}
              className={
                activeFilter === filter
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : ""
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* CardsGrid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filterExtension.map((ext) => (
          <div
            key={ext.name}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <Image
                src={ext.logo}
                alt={ext.name}
                width={48}
                height={48}
                className="mb-4"
              />
              <h2 className="font-semibold text-lg">{ext.name}</h2>
              <p className="text-sm text-gray-600 mb-4">{ext.description}</p>
            </div>
            <div>
              <Button
                variant={ext.isActive ? "default" : "outline"}
                size="sm"
                className={
                  ext.isActive
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }
                onClick={() => toggleExtension(ext.name)}
              >
                {ext.isActive ? "Active" : "Inactive"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
