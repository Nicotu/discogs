"use client";

import React, { FC } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type SearchProps = {
  initialValue?: string;
  placeholder?: string;
};

export const Search: FC<SearchProps> = (props) => {
  const { initialValue = "", placeholder = "Search.." } = props;
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    const searchTerm = formData.get("search-term");

    if (typeof searchTerm !== "string") return;

    router.push(
      searchTerm.length > 0
        ? `/search-results?q=${encodeURIComponent(searchTerm)}`
        : "/"
    );
  };

  return (
    <form action={handleSubmit} className="flex gap-2 py-4">
      <Input
        name="search-term"
        type="text"
        placeholder={placeholder}
        defaultValue={initialValue}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
