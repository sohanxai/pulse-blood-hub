import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ALL_INDIAN_CITIES, INDIAN_LOCATIONS } from "@/lib/indian-cities";

interface Props {
  value: string;
  onChange: (city: string) => void;
  placeholder?: string;
  className?: string;
}

export function CityCombobox({ value, onChange, placeholder = "Select a city...", className }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return ALL_INDIAN_CITIES.filter(
      ({ city, state }) =>
        city.toLowerCase().includes(q) || state.toLowerCase().includes(q),
    ).slice(0, 60);
  }, [query]);

  const selected = ALL_INDIAN_CITIES.find((c) => c.city === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between font-normal", className)}
        >
          <span className="flex items-center gap-2 truncate">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            {value ? (
              <span className="truncate">
                {value}
                {selected && (
                  <span className="text-muted-foreground text-xs ml-1">· {selected.state}</span>
                )}
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder="Search city or state..."
              className="border-0 focus:ring-0"
            />
          </div>
          <CommandList className="max-h-72">
            <CommandEmpty>No city found.</CommandEmpty>
            {filtered ? (
              <CommandGroup heading={`${filtered.length} match${filtered.length === 1 ? "" : "es"}`}>
                {filtered.map(({ city, state }) => (
                  <CommandItem
                    key={`${state}-${city}`}
                    value={city}
                    onSelect={() => {
                      onChange(city);
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === city ? "opacity-100" : "opacity-0")} />
                    <span className="flex-1">{city}</span>
                    <span className="text-xs text-muted-foreground ml-2">{state}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              Object.entries(INDIAN_LOCATIONS).slice(0, 8).map(([state, cities]) => (
                <CommandGroup key={state} heading={state}>
                  {cities.slice(0, 8).map((city) => (
                    <CommandItem
                      key={`${state}-${city}`}
                      value={city}
                      onSelect={() => {
                        onChange(city);
                        setOpen(false);
                        setQuery("");
                      }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === city ? "opacity-100" : "opacity-0")} />
                      <span className="flex-1">{city}</span>
                      <span className="text-xs text-muted-foreground ml-2">{state}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
