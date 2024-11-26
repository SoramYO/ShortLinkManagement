import { Dialog, Transition } from "@headlessui/react";
import { DialogActions } from "@mui/material";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Power,
  Search,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import type { ShortenerAPI, ShortenerAPIResponse } from "../types/api";

interface APIListProps {
  apis: ShortenerAPIResponse[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (api: ShortenerAPIResponse) => void;
}

export default function APIList({
  apis,
  onDelete,
  onToggle,
  onEdit,
}: APIListProps) {
  const [sortColumn, setSortColumn] = useState<keyof ShortenerAPI>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(
    null
  );

  const handleSort = (column: keyof ShortenerAPI) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedApis = apis
    .filter(
      (api) =>
        api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        api.url.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ column }: { column: keyof ShortenerAPI }) => {
    if (column !== sortColumn) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search APIs..."
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
                "Priority",
                "Views/IP",
                "Countries",
                "Schedule",
                "Status",
                "Actions",
              ].map((header, index) => (
                <th
                  key={header}
                  onClick={() =>
                    handleSort(header.toLowerCase() as keyof ShortenerAPI)
                  }
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center">
                    {header}
                    <SortIcon
                      column={header.toLowerCase() as keyof ShortenerAPI}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedApis.map((api) => (
              <tr key={api.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {api.name}
                  </div>
                  <div className="text-sm text-gray-500">{api.url}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {api.priority}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {api.maxViewsPerIP}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {api.countries?.join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {api.schedule.enabled ? (
                    <span>
                      {api.schedule.startTime} - {api.schedule.endTime}
                    </span>
                  ) : (
                    <span>Always On</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      api.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {api.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onToggle(api.id)}
                      className={`p-1 rounded-full ${
                        api.active
                          ? "text-green-600 hover:text-green-900"
                          : "text-red-600 hover:text-red-900"
                      }`}
                      aria-label={
                        api.active ? "Deactivate API" : "Activate API"
                      }
                    >
                      <Power className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onEdit(api)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded-full"
                      aria-label="Edit API"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmation(api.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded-full"
                      aria-label="Delete API"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Transition show={!!deleteConfirmation} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setDeleteConfirmation(null)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogActions className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Confirm Deletion
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this API? This action cannot
                    be undone.
                  </p>
                </div>

                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setDeleteConfirmation(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={() => {
                      if (deleteConfirmation) {
                        onDelete(deleteConfirmation);
                        setDeleteConfirmation(null);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
