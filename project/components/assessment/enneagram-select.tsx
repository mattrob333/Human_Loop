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
      <SelectTrigger className="w-full text-base h-12">
        <SelectValue placeholder="Select your Enneagram Type" />
      </SelectTrigger>
      <SelectContent className="text-base">
        {enneagramTypes.map((type) => (
          <SelectItem key={type.value} value={type.value} className="text-base py-2">
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}