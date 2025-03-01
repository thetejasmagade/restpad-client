import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ApiGeneratorComponentProps } from "../types";
import * as Types from "@/components/types";
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
          <div key={i} className="flex items-center justify-center md:justify-start gap-2 md:gap-3 mb-2">
            <div>
              <label htmlFor={i+'_input'} className="block text-sm text-gray-600 mb-1">
                Column Title
              </label>
              <Input
                type="text"
                id={i+'_input'}
                className="border-2 font-medium w-[100%] md:w-auto"
                placeholder={'Column ' + (i+1)}
                value={el.name}
                onChange={(e) => {
                  props.fieldHandlerFn
                    ? props.fieldHandlerFn(
                        Types.ValueTypes.Name,
                        e.target.value,
                        el.id
                      )
                    : "";
                }}
              />
            </div>
            <div>
              <label htmlFor={i+'_dropdown'} className="block text-sm text-gray-600 mb-1">
                Datatype
              </label>
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
                    id={i+'_dropdown'}
                    className="border-2 w-[180px] md:w-[200px] justify-between"
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
                          className="cursor-pointer"
                          key={type.value}
                          value={type.value}
                          onSelect={(currentValue) => {
                            if (props.fieldHandlerFn)
                              props?.fieldHandlerFn(
                                Types.ValueTypes.Type,
                                currentValue === el.type ? "" : currentValue,
                                el.id
                              );
                            handleOpenChange(i, false);
                          }}
                        >
                          {type.name}
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
              <Trash2
                color="#C74438"
                size={20}
                className="cursor-pointer"
                onClick={() =>
                  props.fieldHandlerFn
                    ? props.fieldHandlerFn(
                        Types.ValueTypes.RemoveField,
                        "",
                        el.id
                      )
                    : ""
                }
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
