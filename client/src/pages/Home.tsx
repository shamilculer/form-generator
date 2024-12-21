import { useEffect, useState } from "react"
import Apirequest from "../config/api";
import { Link } from "react-router-dom";

const Home = () => {
    const [forms, setForms] = useState<any[]>();

    useEffect(() => {
        async function fetchForms() {
            const response = await Apirequest.get("/form")
            const data = response.data.forms
            setForms(data)
        }

        fetchForms()
    }, [])

    return (
        <div className="w-full mt-10">
            {forms ? (
                <div className="space-y-4">
                    {forms.map(form => (
                        <div key={form._id} className="w-full bg-gray-100 p-8 flex items-center justify-between rounded-lg">
                            <div>
                                <h2 className="text-3xl font-semibold">{form.name}</h2>
                            </div>

                            <div className="flex items-center gap-4">
                                <Link to={`/form/${form._id}`} className="bg-blue-400 text-white p-3 rounded-md text-sm font-medium">View form</Link>

                                <Link to={`/submissions/${form._id}`} className="bg-blue-700 text-white p-3 rounded-md text-sm font-medium">View Submission</Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                </div>
            )}
        </div>
    )
}

export default Home
