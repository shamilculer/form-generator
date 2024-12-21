import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Apirequest from "../config/api"
import { Fields } from "./FormCreation"
import { CircleCheckBig, Send } from "lucide-react"

type Form = {
  name: string,
  fields: Fields[],
  _id: string,
  createdAt: Date
  updateddAt: Date
}

const FormView = () => {
  const { id } = useParams()
  const [form, setForm] = useState<Form>()
  const [submissionData, setSubmissionData] = useState()

  useEffect(() => {
    async function getForm() {
      try {
        const response = await Apirequest.get(`form/${id}`)
        const data = response.data?.form
        setForm(data)
      } catch (error) {
        console.log(error)
      }
    }

    getForm()
  }, [id])

  const onFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const data = {
      fields: form?.fields.map(field => ({
        label: field.label,
        value: formData.get(field.label)
      }))
    }

    try {
      const response = await Apirequest.post(`/form/${id}/submit`, data)
      const newSubmission = response.data.submission;
      setSubmissionData(newSubmission)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-3xl min-h-screen flex items-center justify-center mx-auto">
      <div className="w-full">
        <div className="w-full bg-yellow-500 rounded-t-md p-5">
          <h1 className="text-3xl text-white font-semibold">{form?.name}</h1>
        </div>

        {submissionData ? (

          <div className="p-8 rounded-b-md bg-gray-100 min-h-96 flex items-center justify-center flex-col gap-5">
            <CircleCheckBig size={100} className="text-green-500" />
            <h4 className="text-2xl font-semibold">You have successfully submitted the form!</h4>
          </div>

        ) : (
          <div className="p-8 rounded-b-md bg-gray-100">
            <form className="w-full space-y-5" onSubmit={(e) => onFormSubmission(e)}>
              {form?.fields.map(field => {
                if (field.type === 'textarea') {
                  return (
                    <div key={field.label}>
                      <label className="block mb-2 font-medium" htmlFor={field.label}>{field.label}</label>
                      <textarea
                        name={field.label}
                        id={field.label}
                        className="w-full border border-gray-400 rounded-md p-2"
                        rows={5}
                        required={field.isRequired}
                      />
                    </div>
                  )
                }

                return (
                  <div key={field.label}>
                    <label className="block mb-2 font-medium" htmlFor={field.label}>{field.label}</label>
                    <input
                      required={field.isRequired}
                      type={field.type}
                      name={field.label}
                      className="w-full border border-gray-400 rounded-md p-2"
                    />
                  </div>
                )
              })}

              <button className="bg-yellow-500 py-2 px-6 flex items-center justify-center gap-2 text-white font-medium rounded-md">
                <Send />
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormView
