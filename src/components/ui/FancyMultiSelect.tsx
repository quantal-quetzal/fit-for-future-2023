import * as Portal from "@radix-ui/react-portal";
import { X } from "lucide-react";
import * as React from "react";

import { Command as CommandPrimitive } from "cmdk";
import { useEffect, useRef, useState } from "react";
import { Badge } from "./badge";
import { Command, CommandGroup, CommandItem } from "./command";

export type ItemType = {
  value: string | number;
  label: string;
};

const DropdownPortal = ({
  children,
  triggerRef,
}: {
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLInputElement>;
}) => {
  const [position, setPosition] = useState({});
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 18,
        left: rect.left + window.scrollX - 20,
        width: rect.width,
      });
    }
  }, [triggerRef]);

  return (
    <Portal.Portal>
      <div
        ref={dropdownRef}
        style={{
          position: "absolute",
          ...position,
          zIndex: 1000, // or any high value to ensure it's on top
        }}
      >
        {children}
      </div>
    </Portal.Portal>
  );
};

export function FancyMultiSelect<T extends ItemType>({
  placeholder,
  items,
  selected,
  setSelected,
}: {
  placeholder?: string;
  items: T[];
  selected: T[];
  setSelected: (values: T[]) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (item: T) => {
    console.log({ removeItem: item, selected });
    setSelected(selected.filter((s) => s.value !== item.value));
  };

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            const newSelected = [...selected];
            newSelected.pop();
            setSelected(newSelected);
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selected, setSelected]
  );

  const selectables = items.filter((item) => !selected.includes(item));

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="w-full h-full group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((selectedItem) => {
            return (
              <Badge key={selectedItem.value} variant="secondary">
                {selectedItem.label}
                <button
                  type="button"
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(selectedItem);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(selectedItem)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <DropdownPortal triggerRef={inputRef}>
            <div className="absolute z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((selectableItem) => {
                  return (
                    <CommandItem
                      key={selectableItem.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(_value) => {
                        setInputValue("");
                        setSelected([...selected, selectableItem]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {selectableItem.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          </DropdownPortal>
        ) : null}
      </div>
    </Command>
  );
}
