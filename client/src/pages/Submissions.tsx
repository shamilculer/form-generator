import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Apirequest from "../config/api"

type Field = {
    label: string;
    value: string | boolean;
  };
  
  type Submission = {
    _id: string;
    formId: string;
    createdAt: Date;
    fields: Field[];
  };
  
  type SubmissionData = {
    formName: string;
    submissions: Submission[];
  };

const Submissions = () => {

    const { formId } = useParams()
    const [submissionsData, setSubmissionsData] = useState<SubmissionData>()

    useEffect(() => {
        async function getSubmissions() {
            try {
                const response = await Apirequest.get(`form/submissions/${formId}`)
                const data = response.data
                setSubmissionsData(data)
            } catch (error) {
                console.log(error)
            }
        }

        getSubmissions()
    }, [formId])
  return (
    <div className="mt-10">
       <h2 className="text-2xl font-semibold">Submissions form {submissionsData?.formName}</h2>

       <div className="space-y-4 mt-6">
        {submissionsData?.submissions.map((submission) => (
          <div key={submission._id} className="p-4 border rounded-md">
            <p className="text-sm text-gray-500">Submitted at: {new Date(submission.createdAt).toLocaleString()}</p>
            <div className="space-y-2 mt-2">
              {submission.fields.map((field, index) => (
                <div key={index} className="mt-4 flex items-center gap-3">
                  <span className="font-medium text-lg">{field.label}:</span>
                  <span>{String(field.value)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Submissions
