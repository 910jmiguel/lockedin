export default function AuthDebug() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">OAuth Configuration Guide</h1>

      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-2">
            🔧 Google Cloud Console Setup
          </h2>
          <p className="mb-2">Add these redirect URIs to your OAuth client:</p>
          <div className="bg-white p-3 rounded border">
            <code className="text-sm">
              https://vrikvnoqsjjxwbsyvxmu.supabase.co/auth/v1/callback
              <br />
              http://localhost:3000/auth/callback
              <br />
              http://localhost:3001/auth/callback
            </code>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-2">
            🎯 Supabase Dashboard Setup
          </h2>
          <p className="mb-2">
            Configure these URLs in Authentication → Settings:
          </p>
          <div className="bg-white p-3 rounded border">
            <strong>Site URL:</strong>
            <br />
            <code className="text-sm">http://localhost:3000</code>
            <br />
            <br />
            <strong>Redirect URLs:</strong>
            <br />
            <code className="text-sm">
              http://localhost:3000/auth/callback
              <br />
              http://localhost:3001/auth/callback
              <br />
              http://localhost:3000/dashboard
              <br />
              http://localhost:3001/dashboard
            </code>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-2">🔐 Current Configuration</h2>
          <div className="bg-white p-3 rounded border">
            <strong>Your Supabase URL:</strong>
            <br />
            <code className="text-sm">
              https://vrikvnoqsjjxwbsyvxmu.supabase.co
            </code>
            <br />
            <br />
            <strong>Expected Callback URL:</strong>
            <br />
            <code className="text-sm">
              https://vrikvnoqsjjxwbsyvxmu.supabase.co/auth/v1/callback
            </code>
            <br />
            <br />
            <strong>Google Client ID:</strong>
            <br />
            <code className="text-sm">
              884765754230-tg51ehtb3t9dcq03v7rrmtlhrposnsma.apps.googleusercontent.com
            </code>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-2">🚨 Common Issues</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Make sure there are no trailing slashes in redirect URIs</li>
            <li>Check that the Google Client ID matches exactly</li>
            <li>
              Verify the project is the correct one in Google Cloud Console
            </li>
            <li>
              Wait a few minutes after making changes for them to take effect
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <a
          href="/test-auth"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
        >
          Go to Auth Test Page
        </a>
      </div>
    </div>
  );
}
