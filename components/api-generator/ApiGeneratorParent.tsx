"use client";
import { useState } from "react";
import { Field } from "../types";
import { FieldsSelector } from "@/components/api-generator/FieldsSelector";
import { DataPreviewTable } from "@/components/base/DataPreviewTable";


export const ApiGeneratorParent = () => {
  const [fields, setFields] = useState<Array<Field>>([]);

  const addNewField = () => {
    setFields([
      ...fields,
      { id: (Math.random() + 1).toString(36).substring(7), type: '', name: '', value: '' },
    ]);
  };

  const setName = (value: string, id: string) => {
    let temp = [...fields];
    temp.map((el) => {
      if (el.id === id) {
        return (el.name = value);
      }
    });
    setFields(temp);
  };

  const setType = (value: string, id: string) => {
    let temp = [...fields];
    temp.map((el) => {
      if (el.id === id) {
        return (el.type = value);
      }
    });
    setFields(temp);
  }

  const removeField = (id: string) => {
    let temp = [...fields];
    temp = temp.filter((el) => {
      if(el.id != id) return el 
    });
    setFields(temp);
  }

  return (
    <div className="block xl:flex justify-between items-end gap-4">
      <div className="w-full xl:w-1/2 mb-4 xl:mb-0">
        <div className="flex items-baseline justify-between mb-3">
          <p className="font-semibold text-lg">Select Your Fields</p>
          <button onClick={addNewField}>Add New Column</button>
        </div>
        <div className="border border-[#101828] p-2 rounded-md overflow-y-auto h-[40vh] xl:min-h-[80vh] xl:h-[80vh]">
          <FieldsSelector fields={fields} handleColumnName={setName} handleColumnType={setType} handleRemoveColumn={removeField} />
        </div>
      </div>
      <div className="w-full xl:w-1/2 border border-[#101828] p-2 rounded-md h-[40vh] xl:h-[80vh]">
        <DataPreviewTable fields={fields}  />
      </div>
    </div>
  );
};
