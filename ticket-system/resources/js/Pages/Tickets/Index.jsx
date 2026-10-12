import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

export default ({ tickets }) => {
    const { flash } = usePage().props;
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this ticket?")) {
            destroy(route("tickets.destroy", id));
        }
    };

    const getPriorityBadge = (priority) => {
        const colors = {
            Low: "bg-gray-100 text-gray-800",
            Medium: "bg-blue-100 text-blue-800",
            High: "bg-orange-100 text-orange-800",
            Urgent: "bg-red-100 text-red-800",
        };
        return (
            <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${colors[priority]}`}
            >
                {priority}
            </span>
        );
    };

    const getStatusBadge = (status) => {
        const colors = {
            Open: "bg-yellow-100 text-yellow-800",
            "In Progress": "bg-indigo-100 text-indigo-800",
            Resolved: "bg-green-100 text-green-800",
            Closed: "bg-gray-100 text-gray-800",
        };
        return (
            <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${colors[status]}`}
            >
                {status}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    My Support Tickets
                </h2>
            }
        >
            <Head title="Tickets" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                            {flash.success}
                        </div>
                    )}

                    <div className="flex justify-between mb-6">
                        <Link
                            href={route("tickets.create")}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-indigo-500"
                        >
                            Create Ticket
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {tickets.data.length === 0 ? (
                            <p className="text-gray-500 text-center py-6">
                                No tickets found. Create your first ticket!
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {tickets.data.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                                    >
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Link
                                                    href={route(
                                                        "tickets.show",
                                                        ticket.id
                                                    )}
                                                    className="font-bold text-lg text-indigo-600 hover:underline"
                                                >
                                                    {ticket.title}
                                                </Link>
                                                {getPriorityBadge(
                                                    ticket.priority
                                                )}
                                                {getStatusBadge(ticket.status)}
                                            </div>
                                            <p className="text-sm text-gray-600 line-clamp-1">
                                                {ticket.description}
                                            </p>
                                            <span className="text-xs text-gray-400">
                                                Category: {ticket.category}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={route(
                                                    "tickets.edit",
                                                    ticket.id
                                                )}
                                                className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(ticket.id)
                                                }
                                                className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination Links */}
                        <div className="mt-6 flex justify-between">
                            {tickets.links.map((link, key) => (
                                <Link
                                    key={key}
                                    href={link.url || "#"}
                                    className={`px-3 py-1 border rounded text-sm ${
                                        link.active
                                            ? "bg-indigo-600 text-white"
                                            : "bg-white text-gray-700"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
