"use client"

import { useState, useEffect } from "react"

export function LogoDiagnostic() {
  const [diagnostics, setDiagnostics] = useState<{
    directImageLoad: boolean
    fetchTest: boolean
    currentUrl: string
    userAgent: string
    errors: string[]
  }>({
    directImageLoad: false,
    fetchTest: false,
    currentUrl: "",
    userAgent: "",
    errors: [],
  })

  useEffect(() => {
    const runDiagnostics = async () => {
      const errors: string[] = []
      let directImageLoad = false
      let fetchTest = false

      // Test 1: Direct image loading
      try {
        const img = new Image()
        await new Promise((resolve, reject) => {
          img.onload = () => {
            directImageLoad = true
            resolve(true)
          }
          img.onerror = (e) => {
            errors.push(`Direct image load failed: ${e}`)
            reject(e)
          }
          img.src = "/kalender-logo.png"
        })
      } catch (error) {
        errors.push(`Image load error: ${error}`)
      }

      // Test 2: Fetch test
      try {
        const response = await fetch("/kalender-logo.png")
        if (response.ok) {
          fetchTest = true
        } else {
          errors.push(`Fetch failed with status: ${response.status} ${response.statusText}`)
        }
      } catch (error) {
        errors.push(`Fetch error: ${error}`)
      }

      setDiagnostics({
        directImageLoad,
        fetchTest,
        currentUrl: window.location.origin,
        userAgent: navigator.userAgent,
        errors,
      })
    }

    runDiagnostics()
  }, [])

  return (
    <div className="p-6 border rounded-lg bg-gray-50 space-y-4">
      <h2 className="text-xl font-semibold">Logo Loading Diagnostics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-medium">Test Results</h3>
          <div className="space-y-1 text-sm">
            <div
              className={`flex items-center gap-2 ${diagnostics.directImageLoad ? "text-green-600" : "text-red-600"}`}
            >
              {diagnostics.directImageLoad ? "✅" : "❌"} Direct Image Load
            </div>
            <div className={`flex items-center gap-2 ${diagnostics.fetchTest ? "text-green-600" : "text-red-600"}`}>
              {diagnostics.fetchTest ? "✅" : "❌"} Fetch Test
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Environment Info</h3>
          <div className="text-sm space-y-1">
            <div>
              <strong>URL:</strong> {diagnostics.currentUrl}
            </div>
            <div>
              <strong>Environment:</strong> {process.env.NODE_ENV}
            </div>
          </div>
        </div>
      </div>

      {diagnostics.errors.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-red-600">Errors Found</h3>
          <div className="bg-red-50 p-3 rounded text-sm">
            {diagnostics.errors.map((error, index) => (
              <div key={index} className="text-red-700">
                • {error}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="font-medium">Quick Tests</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 border rounded">
            <p className="text-sm font-medium mb-2">Current Logo</p>
            <img
              src="/kalender-logo.png"
              alt="Logo test"
              className="h-8"
              onLoad={() => console.log("✅ Logo loaded successfully")}
              onError={(e) => console.error("❌ Logo failed to load:", e)}
            />
          </div>

          <div className="p-3 border rounded">
            <p className="text-sm font-medium mb-2">Case Test 1</p>
            <img
              src="/Kalender-Logo.png"
              alt="Logo test"
              className="h-8"
              onError={() => console.log("❌ Uppercase version not found")}
            />
          </div>

          <div className="p-3 border rounded">
            <p className="text-sm font-medium mb-2">Case Test 2</p>
            <img
              src="/KALENDER-LOGO.PNG"
              alt="Logo test"
              className="h-8"
              onError={() => console.log("❌ All caps version not found")}
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded">
        <h3 className="font-medium text-blue-800 mb-2">Troubleshooting Steps</h3>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>
            Check if the file exists at: <code>{diagnostics.currentUrl}/kalender-logo.png</code>
          </li>
          <li>Verify the file is exactly named "kalender-logo.png" (lowercase)</li>
          <li>Ensure the file is in the public/ directory of your project</li>
          <li>Clear Vercel cache and redeploy</li>
          <li>Check Vercel deployment logs for build errors</li>
        </ol>
      </div>
    </div>
  )
}
