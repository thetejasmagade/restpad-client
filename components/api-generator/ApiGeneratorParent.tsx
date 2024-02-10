import { FieldsSelector } from "@/components/api-generator/FieldsSelector";
import { DataPreviewTable } from "@/components/base/DataPreviewTable";


export const ApiGeneratorParent = () => {
  return (
    <div className="block xl:flex justify-between items-end gap-4">
      <div className="w-full xl:w-1/2 mb-4 xl:mb-0">
        <div className="flex items-baseline justify-between mb-3">
          <p className="font-semibold text-lg">Select Your Fields</p>
          <button>Add New Column</button>
        </div>
        <div className="border p-2 rounded-md h-[40vh] xl:h-[80vh]">
            <FieldsSelector />
        </div>
      </div>
      <div className="w-full xl:w-1/2 border p-2 rounded-md h-[40vh] xl:h-[80vh]">
        <DataPreviewTable />
      </div>
    </div>
  );
};
