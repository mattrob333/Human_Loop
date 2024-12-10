'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { enneagramTypes } from "@/lib/assessment-data";

interface EnneagramSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
}

export function EnneagramSelect({ value, onValueChange }: EnneagramSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select your Enneagram Type" />
      </SelectTrigger>
      <SelectContent>
        {enneagramTypes.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}