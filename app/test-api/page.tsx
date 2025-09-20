'use client';

import { useState } from 'react';

export default function TestAPI() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testCourseId, setTestCourseId] = useState<string>('1'); // Dynamic course ID

  // Test data for creating a course
  const testCourseData = {
    staticCourseId: "1", // This should match one of your course IDs from courses.ts
    professorName: "Dr. John Smith",
    professorEmail: "jsmith@example.com",
    description: "This is a test course description for EECS 2030",
    classWebsite: "https://example.com/course"
  };

  const makeRequest = async (url: string, method: string, body?: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }
      
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">API Testing Dashboard</h1>
      
      {/* Test Buttons */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Test Course ID: 
          <input 
            type="text" 
            value={testCourseId} 
            onChange={(e) => setTestCourseId(e.target.value)}
            className="ml-2 px-2 py-1 border rounded text-black"
            placeholder="Enter course ID"
          />
        </label>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button 
          onClick={() => makeRequest('/api/course-details', 'GET')}
          className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          disabled={loading}
        >
          Get All Courses
        </button>
        
        <button 
          onClick={() => makeRequest('/api/course-details', 'POST', testCourseData)}
          className="bg-green-500 text-white p-3 rounded hover:bg-green-600"
          disabled={loading}
        >
          Create Course
        </button>
        
        <button 
          onClick={() => makeRequest(`/api/course-details/${testCourseId}`, 'GET')}
          className="bg-purple-500 text-white p-3 rounded hover:bg-purple-600"
          disabled={loading}
        >
          Get Course #{testCourseId}
        </button>
        
        <button 
          onClick={() => makeRequest(`/api/course-details/${testCourseId}`, 'PUT', {
            professorName: "Dr. Updated Name",
            description: "Updated description"
          })}
          className="bg-orange-500 text-white p-3 rounded hover:bg-orange-600"
          disabled={loading}
        >
          Update Course #{testCourseId}
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Loading...
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="bg-gray-100 border border-gray-300 rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Result:</h3>
          <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}