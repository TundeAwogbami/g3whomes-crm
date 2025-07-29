"use client"

export function DebugEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <div className="p-4 bg-gray-100 rounded-lg text-sm">
      <h3 className="font-bold mb-2">Environment Variables Debug:</h3>
      <p>
        <strong>URL:</strong> {supabaseUrl ? "✅ Set" : "❌ Missing"}
      </p>
      <p>
        <strong>Key:</strong> {supabaseKey ? "✅ Set" : "❌ Missing"}
      </p>
      {supabaseUrl && <p className="text-xs text-gray-600">URL: {supabaseUrl}</p>}
      {supabaseKey && <p className="text-xs text-gray-600">Key: {supabaseKey.substring(0, 20)}...</p>}
    </div>
  )
}
