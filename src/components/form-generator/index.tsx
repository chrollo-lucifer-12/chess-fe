import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

interface FormGeneratorProps {
    inputType : "input"
    type ?: "email" | "password" | "text"
    label?: string
    placeholder?: string
    name : string
    error ?: string | string[] | undefined
}

const FormGenerator = ({inputType,type, label, placeholder, name, error} : FormGeneratorProps) => {
    switch (inputType) {
        case "input" : {
            return <div className={"flex flex-col gap-y-1"}>
                <Label htmlFor={name} className={"text-inputtext font-bold"}>{label}</Label>
                <Input name={name} id={name} type={type} placeholder={placeholder} className={"bg-inputbg text-white rounded-md border-none h-8"} />
                <span className={"text-xs text-red-300"}>{error}</span>
            </div>
        }
    }
}

export default FormGenerator