import { ApiGeneratorComponentProps } from "../types";

export const DataPreviewTable = (props: ApiGeneratorComponentProps) => {
  return <>
    {
        props.fields.map((el, i) => {
            return (
                <p key={i}>{el.id} = {el.name} = {el.type} - {el.value}</p>
            )
        })
    }
  </>;
};
