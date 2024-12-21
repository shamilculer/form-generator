import { useState } from "react"
import { CirclePlus, Send, Trash } from "lucide-react"
import Apirequest from "../config/api"
import { useNavigate } from "react-router-dom"

export type Fields = {
    label: string;
    type: string;
    isRequired: boolean
}

const FormCreation = () => {

    const [formfields, setFormFields] = useState<Fields[]>([])
    const [formName, setFormName] = useState("")
    const navigate = useNavigate()

    const fieldTypes = [
        'text',
        'number',
        'email',
        'password',
        'date',
        'textarea',
    ];

    const addField = () => {
        setFormFields([...formfields, { label: '', type: 'text', isRequired: true }])
    }

    const deleteField = (index: number) => {
        const updatedFields = formfields.filter(field => field !== formfields[index])
        setFormFields(updatedFields)
    }

    const updateField = (index: number, field: any) => {
        const updatedFields = [...formfields]
        updatedFields[index] = { ...updatedFields[index], ...field }
        setFormFields(updatedFields)
    }

    const onFromSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = {
            name: formName,
            fields: formfields
        }

        try {
            const response = await Apirequest.post('/form/new', formData)
            setFormFields([])
            setFormName("")
            const newFormId = response.data?.form?._id
            navigate(`/form/${newFormId}`)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="mt-10 max-w-[70%] mx-auto">
            <form className="w-full space-y-6" onSubmit={(e) => onFromSubmit(e)} >
                <div>
                    <label className="text-2xl font-medium block" htmlFor="formName">Form name</label>
                    <input
                        id="formName"
                        type="text"
                        required
                        className="w-full mt-2 rounded-md p-2 border border-gray-600"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                    />
                </div>

                {formfields.map((field, index) => (
                    <div key={index} className="w-full bg-blue-200 bg-opacity-35 rounded-md p-7">
                        <div className="w-full flex items-center justify-between">
                            <h3 className="font-semibold text-lg">Field {index + 1}</h3>
                            <button
                                type="button"
                                onClick={() => deleteField(index)}
                                className="text-red-600">
                                <Trash size={24} />
                            </button>
                        </div>

                        <div className="w-full mt-6 space-y-6">
                            <div className="w-full">
                                <label htmlFor="fieldLabel">Label</label>
                                <input
                                    type="text"
                                    value={field.label}
                                    className="p-2 w-full border-gray-600 rounded-md"
                                    onChange={(e) => updateField(index, { label: e.target.value })}
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="fieldType">Type</label>
                                <select
                                    value={field.type || "text"}
                                    onChange={(e) => updateField(index, { type: e.target.value })}
                                    className="w-full border rounded-md p-2"
                                >
                                    {fieldTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-full gap-2">
                                <input
                                    id="fieldRequired"
                                    type="checkbox"
                                    checked={field.isRequired}
                                    onChange={(e) => updateField(index, { isRequired: e.target.checked })}
                                    className="mr-2 size-4"
                                />
                                <label htmlFor="fieldType">Required</label>
                            </div>

                        </div>
                    </div>
                ))}

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={addField}
                        className="flex items-center justify-center gap-2 py-3 px-6 bg-gray-300 rounded-xl font-medium"
                    >
                        <CirclePlus />
                        Add Field
                    </button>
                    <button
                        className="flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 rounded-xl font-medium text-white"
                        type="submit"
                    >
                        <Send />
                        Submit
                    </button>
                </div>

            </form>
        </div>

    )
}

export default FormCreation
