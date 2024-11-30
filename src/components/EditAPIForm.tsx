import { Dialog, Transition } from "@headlessui/react";
import { Globe, Save, Settings } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import type { ShortenerAPI, ShortenerAPIResponse } from "../types/api";

interface EditAPIFormProps {
  api: ShortenerAPIResponse | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, api: Partial<ShortenerAPI>) => void;
}

const CountryCodeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Globe className="h-5 w-5 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="p-4 space-y-4">
            <h3 className="font-semibold text-gray-900">Country Codes Guide</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Default:</strong> ALL - applies to all countries
              </p>
              <p>
                <strong>Example:</strong> VN,US - only shows for Vietnam and US
                visitors
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Common Country Codes:
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>VN - Vietnam</li>
                  <li>US - United States</li>
                  <li>GB - United Kingdom</li>
                  <li>TH - Thailand</li>
                  <li>IN - India</li>
                </ul>
              </div>
              <div>
                <a
                  href="https://countrycode.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                >
                  Find more country codes
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function EditAPIForm({
  api,
  isOpen,
  onClose,
  onSubmit,
}: EditAPIFormProps) {
  const [formData, setFormData] = useState<Partial<ShortenerAPI>>({
    name: "",
    endpoint: "",
    maxViewsPerIP: 1,
    priority: 1,
    content: "",
    schedule: {
      enabled: false,
      startTime: "00:00",
      endTime: "23:59",
    },
    applicableCountries: ["ALL"],
    isActive: true,
  });

  useEffect(() => {
    if (api) {
      setFormData({
        name: api.name,
        endpoint: api.endpoint,
        maxViewsPerIP: api.maxViewsPerIP,
        priority: api.priority,
        content: api.content,
        schedule: api.schedule,
        applicableCountries: api.applicableCountries,
        isActive: api.isActive,
      });
    }
  }, [api]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (api) {
      onSubmit(api._id, formData);
      onClose();
    }
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
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
            <Transition.Child
              as="div"
              className="fixed inset-0 bg-black opacity-30"
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            />
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
            <div className="inline-block w-full max-w-4xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <Settings className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Edit API
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        API Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        API URL
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://sitename.com/st?api=XXXXX&url="
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.endpoint}
                        onChange={(e) =>
                          setFormData({ ...formData, endpoint: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Views per IP/24h
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.maxViewsPerIP}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            maxViewsPerIP: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.priority}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            priority: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        Countries (comma-separated)
                        <span className="ml-2">
                          <CountryCodeDropdown />
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="ALL or VN,US,GB,TH"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.applicableCountries?.join(",")}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            applicableCountries: e.target.value.split(","),
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content/Instructions
                      </label>
                      <textarea
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="enableSchedule"
                          checked={formData.schedule?.enabled}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              schedule: {
                                ...formData.schedule!,
                                enabled: e.target.checked,
                              },
                            })
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="enableSchedule"
                          className="text-sm font-medium text-gray-700"
                        >
                          Enable Schedule
                        </label>
                      </div>

                      {formData.schedule?.enabled && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Start Time
                            </label>
                            <input
                              type="time"
                              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={formData.schedule?.startTime}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  schedule: {
                                    ...formData.schedule!,
                                    startTime: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              End Time
                            </label>
                            <input
                              type="time"
                              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={formData.schedule?.endTime}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  schedule: {
                                    ...formData.schedule!,
                                    endTime: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
