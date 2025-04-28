import {Input} from "@/components/ui/input";

interface FormGeneratorProps {
    inputType : "input"
    type ?: "email" | "password" | "text"
    label?: string
    placeholder?: string
}

const FormGenerator = ({inputType,type, label, placeholder} : FormGeneratorProps) => {
    switch (inputType) {
        case "input" : {
            return <Input type={type} placeholder={placeholder} />
        }
    }
}

export default FormGenerator