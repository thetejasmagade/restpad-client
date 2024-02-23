import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ApiGeneratorComponentProps } from "../types";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const columnTypes = [
  {
    name: "String",
    value: "string",
  },
  {
    name: "Boolean",
    value: "boolean",
  },
  {
    name: "Number",
    value: "number",
  },
];

export const FieldsSelector = (props: ApiGeneratorComponentProps) => {
  // Create an array to manage open/close state for each dropdown
  const [openStates, setOpenStates] = useState<Array<boolean>>(
    Array(props.fields.length).fill(false)
  );

  const handleOpenChange = (index: number, newState: boolean) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = newState;
    setOpenStates(newOpenStates);
  };

  return (
    <>
      {props.fields.map((el, i) => {
        return (
          <div key={i} className="flex items-center justify-start gap-3 mb-2">
            <div>
              <label className="block">Column Title</label>
              <Input
                type="text"
                className="border-2 font-medium w-[100%] md:w-auto"
                value={el.name}
                onChange={(e) => {
                  props.handleColumnName
                    ? props.handleColumnName(e.target.value, el.id)
                    : "";
                }}
              />
            </div>
            <div>
              <label className="block">Datatype</label>
              <Popover
                open={openStates[i]}
                onOpenChange={(newState: boolean) =>
                  handleOpenChange(i, newState)
                }
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openStates[i]}
                    className="w-[180px] md:w-[200px] justify-between"
                  >
                    {el.type
                      ? columnTypes.find((type) => type.value === el.type)?.name
                      : "Select datatype..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search datatype..."
                      className="h-9"
                    />
                    <CommandEmpty>No datatype found.</CommandEmpty>
                    <CommandGroup>
                      {columnTypes.map((type) => (
                        <CommandItem
                          key={type.value}
                          value={type.value}
                          onSelect={(currentValue) => {
                            if (props.handleColumnType)
                              props?.handleColumnType(
                                currentValue === el.type ? "" : currentValue,
                                el.id
                              );
                            handleOpenChange(i, false); // Close the dropdown when a selection is made
                          }}
                        >
                          {type.name} {/* Display type name instead of value */}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              el.type === type.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="mt-5">
              <Image
                onClick={() => props.handleRemoveColumn ? props.handleRemoveColumn(el.id) : ''}
                className="cursor-pointer"
                src="/delete-dustbin.svg"
                alt="delete"
                width={20}
                height={20}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
