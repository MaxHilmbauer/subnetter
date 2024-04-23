"use client";

import * as React from "react";

import TranslateIcon from "@mui/icons-material/Translate";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function LanguageDropdown() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <TranslateIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push("/en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/de")}>
          German
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
