import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default () => {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        priority: "Low",
        status: "Open",
        category: "Hardware",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("tickets.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Ticket
                </h2>
            }
        >
            <Head title="Create Ticket" />

            <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block font-medium text-sm text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.title && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.title}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium text-sm text-gray-700">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                rows="4"
                            />
                            {errors.description && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block font-medium text-sm text-gray-700">
                                    Priority
                                </label>
                                <select
                                    value={data.priority}
                                    onChange={(e) =>
                                        setData("priority", e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-medium text-sm text-gray-700">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="Open">Open</option>
                                    <option value="In Progress">
                                        In Progress
                                    </option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-medium text-sm text-gray-700">
                                    Category
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="Hardware">Hardware</option>
                                    <option value="Software">Software</option>
                                    <option value="Network">Network</option>
                                    <option value="Account">Account</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-500 disabled:opacity-50"
                        >
                            Save Ticket
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
