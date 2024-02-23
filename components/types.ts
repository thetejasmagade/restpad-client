export interface Field {
    id: string;
    name: string;
    type: string;
    value: string;
}

export type Fields = Array<Field>;

export interface ApiGeneratorComponentProps {
    fields: Fields;
    handleColumnName?(value: string, id: string): void;
    handleColumnType?(value: string, id: string): void;
    handleRemoveColumn?(id: string): void;
}

