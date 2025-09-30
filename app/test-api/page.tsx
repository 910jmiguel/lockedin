"use client";

import { useCourseDetails } from "@/lib/hooks/useCourseDetails";
import { useState } from "react";

export default function TestAPI() {
  const [result, setResult] = useState<any>(null);
  const [testCourseId, setTestCourseId] = useState<string>("1"); // Dynamic course ID

  const {
    createCourseDetails,
    getAllCourseDetails,
    getCourseDetails,
    updateCourseDetails,
    deleteCourseDetails,
    loading,
    error,
  } = useCourseDetails();

  // Test data for creating a course
  const testCourseData = {
    staticCourseId: "1", // This should match one of your course IDs from courses.ts
    professorName: "Dr. John Smith",
    professorEmail: "jsmith@example.com",
    description: "This is a test course description for EECS 2030",
    classWebsite: "https://example.com/course",
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '64rem', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        API Testing Dashboard
      </h1>

      {/* Test Buttons */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
          Test Course ID:
          <input
            type="text"
            value={testCourseId}
            onChange={(e) => setTestCourseId(e.target.value)}
            style={{ 
              marginLeft: '0.5rem', 
              padding: '0.25rem 0.5rem', 
              border: '1px solid #ccc', 
              borderRadius: '0.25rem', 
              color: 'black' 
            }}
            placeholder="Enter course ID"
          />
        </label>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <button
          onClick={() => {
            getAllCourseDetails()
              .then(setResult)
              .catch(() => {});
          }}
          style={{
            backgroundColor: loading ? '#ccc' : '#3b82f6',
            color: 'white',
            padding: '0.75rem',
            borderRadius: '0.25rem',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          disabled={loading}
        >
          Get All Courses
        </button>

        <button
          onClick={() => {
            createCourseDetails(testCourseData)
              .then(setResult)
              .catch(() => {});
          }}
          className="bg-green-500 text-white p-3 rounded hover:bg-green-600"
          disabled={loading}
        >
          Create Course
        </button>

        <button
          onClick={() => {
            getCourseDetails(testCourseId)
              .then(setResult)
              .catch(() => {});
          }}
          className="bg-purple-500 text-white p-3 rounded hover:bg-purple-600"
          disabled={loading}
        >
          Get Course #{testCourseId}
        </button>

        <button
          onClick={() => {
            updateCourseDetails(testCourseId, {
              professorName: "Dr. Updated Name",
              description: "Updated description",
            })
              .then(setResult)
              .catch(() => {});
          }}
          className="bg-orange-500 text-white p-3 rounded hover:bg-orange-600"
          disabled={loading}
        >
          Update Course #{testCourseId}
        </button>

        <button
          onClick={() => {
            deleteCourseDetails(testCourseId)
              .then(setResult)
              .catch(() => {});
          }}
          className="bg-red-500 text-white p-3 rounded hover:bg-red-600"
          disabled={loading}
        >
          Delete Course #{testCourseId}
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
