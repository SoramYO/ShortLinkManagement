import React, { useState } from 'react';
import { Settings, Plus, Trash } from 'lucide-react';
import type { ShortenerAPI } from '../types/api';

interface APIFormProps {
  onSubmit: (api: ShortenerAPI) => void;
}

export default function APIForm({ onSubmit }: APIFormProps) {
  const [formData, setFormData] = useState<Partial<ShortenerAPI>>({
    name: '',
    url: '',
    apiKey: '',
    maxViewsPerIP: 1,
    priority: 1,
    content: '',
    schedule: {
      enabled: false,
      startTime: '00:00',
      endTime: '23:59'
    },
    countries: ['ALL'],
    active: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: crypto.randomUUID(),
      ...formData as ShortenerAPI
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <Settings className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Add New API</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">API Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">API URL</label>
          <input
            type="url"
            required
            placeholder="https://sitename.com/st?api=XXXXX&url="
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.url}
            onChange={(e) => setFormData({...formData, url: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">API Key</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.apiKey}
            onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Max Views per IP/24h</label>
          <input
            type="number"
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.maxViewsPerIP}
            onChange={(e) => setFormData({...formData, maxViewsPerIP: parseInt(e.target.value)})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <input
            type="number"
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value)})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Countries (comma-separated)</label>
          <input
            type="text"
            placeholder="ALL or VN,US,GB,TH"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.countries?.join(',')}
            onChange={(e) => setFormData({...formData, countries: e.target.value.split(',')})}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Content/Instructions</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
          />
        </div>

        <div className="col-span-2">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={formData.schedule?.enabled}
              onChange={(e) => setFormData({
                ...formData,
                schedule: {
                  ...formData.schedule!,
                  enabled: e.target.checked
                }
              })}
            />
            <span className="text-sm font-medium text-gray-700">Enable Schedule</span>
          </div>

          {formData.schedule?.enabled && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.schedule?.startTime}
                  onChange={(e) => setFormData({
                    ...formData,
                    schedule: {
                      ...formData.schedule!,
                      startTime: e.target.value
                    }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.schedule?.endTime}
                  onChange={(e) => setFormData({
                    ...formData,
                    schedule: {
                      ...formData.schedule!,
                      endTime: e.target.value
                    }
                  })}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add API
        </button>
      </div>
    </form>
  );
}