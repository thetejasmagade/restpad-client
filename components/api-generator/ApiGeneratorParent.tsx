"use client";
import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Field } from "../types";
import * as Types from "@/components/types";
import { FieldsSelector } from "@/components/api-generator/FieldsSelector";
import { DataPreviewTable } from "@/components/base/DataPreviewTable";

interface AddNewFieldFnTypes {}

export const ApiGeneratorParent = () => {
  const [fields, setFields] = useState<Array<Field>>([
    {
      id: (Math.random() + 1).toString(36).substring(7),
      type: "",
      name: "",
      value: "",
    },
  ]);

  const addNewField = (options?: AddNewFieldFnTypes): void => {
    setFields([
      ...fields,
      {
        id: (Math.random() + 1).toString(36).substring(7),
        type: "",
        name: "",
        value: "",
      },
    ]);

    setTimeout(() => {
      document.querySelector(".fields-parent-div")?.scrollTo({
        top: document.querySelector(".fields-parent-div")?.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  const fieldValueHandlerFn = (
    handlerType: Types.ValueTypes,
    value: string,
    id?: string
  ) => {
    let temp = [...fields];
    console.log(handlerType);
    if (handlerType === Types.ValueTypes.Name) {
      temp.map((el) => {
        if (el.id === id) {
          return (el.name = value);
        }
      });
    } else if (handlerType === Types.ValueTypes.Type) {
      temp.map((el) => {
        if (el.id === id) {
          return (el.type = value);
        }
      });
    } else if (handlerType === Types.ValueTypes.RemoveField) {
      temp = temp.filter((el) => {
        if (el.id != id) return el;
      });
    }

    setFields(temp);
  };

  return (
    <div className="block xl:flex justify-between items-end gap-4">
      <div className="w-full xl:w-1/2 mb-4 xl:mb-0">
        <div className="flex items-baseline justify-between mb-3">
          <p className="font-semibold text-lg">Select Your Fields</p>
          <div className="flex items-center justify-between gap-3 mr-2">
            <Button
              type="button"
              onClick={addNewField}
              className="px-3 py-2 text-xs font-medium text-center hidden md:inline-flex items-center text-white bg-[#101828] rounded-lg hover:bg-[#344054] focus:outline-none"
            >
              <Plus size={15} strokeWidth={3} className="mr-0 md:mr-1" />
              <span className="hidden md:block">Add New Column</span>
            </Button>
            <button className="glow-on-hover block xl:hidden" type="button">
              <div className="flex items-center justify-between gap-2">
                <Sparkles size={15} strokeWidth={2} className="mr-0 md:mr-1" />
                <span>Generate API</span>
              </div>
            </button>
          </div>
        </div>
        <div className="fields-parent-div border border-gray-300 p-2 rounded-md overflow-y-auto h-[40vh] xl:min-h-[80vh] xl:h-[80vh]">
          <FieldsSelector
            fields={fields}
            fieldHandlerFn={fieldValueHandlerFn}
          />
          <div className="flex items-center justify-center my-6 md:hidden">
            <Button
              type="button"
              onClick={addNewField}
              className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-[#101828] rounded-lg hover:bg-[#344054] focus:outline-none"
            >
              <Plus size={15} strokeWidth={3} className="mr-1" />
              Add New Column
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full xl:w-1/2">
        <div className="hidden xl:flex justify-end mb-3">
          <button className="glow-on-hover" type="button">
            <div className="flex items-center justify-between gap-1">
              <Sparkles size={15} strokeWidth={2} className="mr-0 md:mr-1" />
              <span>Generate API</span>
            </div>
          </button>
        </div>
        <div className="rounded-md h-[43vh] md:h-[44vh] xl:h-[80vh] border border-gray-300">
          <DataPreviewTable fields={fields} />
        </div>
      </div>
    </div>
  );
};
