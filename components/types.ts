export interface Field {
    id: string;
    name: string;
    type: string;
    value: string;
}

export type Fields = Array<Field>;

export enum ValueTypes {
    Name = "NAME",
    Type = "TYPE",
    RemoveField = "REMOVE_FIELD",
}

export interface ApiGeneratorComponentProps {
    fields: Fields;
    fieldHandlerFn?(handlerType: ValueTypes, value: string, id?: string): void;
}

export interface GithubAuthBtnProps {
    isLogin: boolean;
}

export interface QuotesProps {
    quote: string;
}

export interface AuthFields {
    fullName: string;
    email: string;
    password: string;
}

export enum AuthField {
    FullName = "FULLNAME",
    Email = "EMAIL",
    Password = "PASSWORD"
}

export interface VerifyMailModal {
    isModalOpen: boolean;
    email: string;
}
