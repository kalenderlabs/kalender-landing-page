"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface DiagnosticResult {
  test: string
  status: "success" | "error" | "pending"
  message: string
  details?: any
}

export function LogoDiagnostics() {
  const [results, setResults] = useState<DiagnosticResult[]>([])
  const [environment, setEnvironment] = useState<{
    isLocal: boolean
    domain: string
    userAgent: string
    nodeEnv: string
  }>({
    isLocal: false,
    domain: "",
    userAgent: "",
    nodeEnv: "",
  })

  useEffect(() => {
    const runDiagnostics = async () => {
      const domain = typeof window !== "undefined" ? window.location.origin : ""
      const isLocal = domain.includes("localhost") || domain.includes("127.0.0.1") || domain.includes("v0.dev")

      setEnvironment({
        isLocal,
        domain,
        userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
        nodeEnv: process.env.NODE_ENV || "unknown",
      })

      const diagnosticTests: DiagnosticResult[] = []

      // Test 1: Direct fetch test
      try {
        const response = await fetch("/kalender-logo.png", { method: "HEAD" })
        diagnosticTests.push({
          test: "Direct Fetch (HEAD)",
          status: response.ok ? "success" : "error",
          message: response.ok
            ? `File accessible (${response.status})`
            : `File not found (${response.status}: ${response.statusText})`,
          details: {
            status: response.status,
            headers: Object.fromEntries(response.headers.entries()),
          },
        })
      } catch (error) {
        diagnosticTests.push({
          test: "Direct Fetch (HEAD)",
          status: "error",
          message: `Network error: ${error}`,
          details: error,
        })
      }

      // Test 2: Image load test
      try {
        await new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            diagnosticTests.push({
              test: "Image Load Test",
              status: "success",
              message: `Image loaded successfully (${img.naturalWidth}x${img.naturalHeight})`,
              details: {
                width: img.naturalWidth,
                height: img.naturalHeight,
                src: img.src,
              },
            })
            resolve()
          }
          img.onerror = (error) => {
            diagnosticTests.push({
              test: "Image Load Test",
              status: "error",
              message: "Image failed to load",
              details: error,
            })
            reject(error)
          }
          img.src = "/kalender-logo.png"
        })
      } catch (error) {
        // Error already handled in onerror
      }

      // Test 3: Case sensitivity tests
      const caseVariations = [
        "/kalender-logo.png",
        "/Kalender-Logo.png",
        "/KALENDER-LOGO.PNG",
        "/Kalender-logo.png",
        "/kalender-Logo.png",
      ]

      for (const variation of caseVariations) {
        try {
          const response = await fetch(variation, { method: "HEAD" })
          diagnosticTests.push({
            test: `Case Test: ${variation}`,
            status: response.ok ? "success" : "error",
            message: response.ok ? "Found" : `Not found (${response.status})`,
            details: { status: response.status },
          })
        } catch (error) {
          diagnosticTests.push({
            test: `Case Test: ${variation}`,
            status: "error",
            message: "Network error",
            details: error,
          })
        }
      }

      // Test 4: Alternative paths
      const alternativePaths = [
        "/public/kalender-logo.png",
        "/_next/static/media/kalender-logo.png",
        "/assets/kalender-logo.png",
        "/images/kalender-logo.png",
      ]

      for (const path of alternativePaths) {
        try {
          const response = await fetch(path, { method: "HEAD" })
          if (response.ok) {
            diagnosticTests.push({
              test: `Alternative Path: ${path}`,
              status: "success",
              message: "Found at alternative location!",
              details: { status: response.status },
            })
          }
        } catch (error) {
          // Silently ignore - these are just alternative checks
        }
      }

      setResults(diagnosticTests)
    }

    runDiagnostics()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Logo Deployment Diagnostics</h1>

        {/* Environment Info */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="font-semibold mb-2">Environment Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Environment:</strong> {environment.isLocal ? "Local Development" : "Production/Vercel"}
            </div>
            <div>
              <strong>Domain:</strong> {environment.domain}
            </div>
            <div>
              <strong>Node ENV:</strong> {environment.nodeEnv}
            </div>
            <div className="md:col-span-2">
              <strong>User Agent:</strong> {environment.userAgent}
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="space-y-4">
          <h2 className="font-semibold">Diagnostic Results</h2>
          {results.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Running diagnostics...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded border-l-4 ${
                    result.status === "success"
                      ? "bg-green-50 border-green-500"
                      : result.status === "error"
                        ? "bg-red-50 border-red-500"
                        : "bg-yellow-50 border-yellow-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{result.test}</span>
                      <span className="ml-2 text-sm text-gray-600">{result.message}</span>
                    </div>
                    <div className="text-lg">
                      {result.status === "success" ? "✅" : result.status === "error" ? "❌" : "⏳"}
                    </div>
                  </div>
                  {result.details && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-500 cursor-pointer">Show details</summary>
                      <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visual Tests */}
        <div className="mt-8">
          <h2 className="font-semibold mb-4">Visual Loading Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Next.js Image</h3>
              <Image
                src="/kalender-logo.png"
                alt="Logo (Next.js)"
                width={120}
                height={40}
                className="border"
                onError={() => console.error("Next.js Image failed")}
                onLoad={() => console.log("Next.js Image loaded")}
              />
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Standard IMG</h3>
              <img
                src="/kalender-logo.png"
                alt="Logo (Standard)"
                className="h-10 border"
                onError={() => console.error("Standard IMG failed")}
                onLoad={() => console.log("Standard IMG loaded")}
              />
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Background Image</h3>
              <div
                className="w-30 h-10 border bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: "url('/kalender-logo.png')" }}
              />
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Troubleshooting Recommendations</h2>
          <div className="space-y-2 text-sm">
            {environment.isLocal ? (
              <div className="bg-green-100 p-3 rounded">
                <p className="font-medium text-green-800">✅ Running in Local Environment</p>
                <p className="text-green-700">If the logo works here but not on Vercel, the issue is likely:</p>
                <ul className="list-disc list-inside mt-1 text-green-700">
                  <li>File not committed to Git repository</li>
                  <li>Case sensitivity differences</li>
                  <li>Build process excluding the file</li>
                </ul>
              </div>
            ) : (
              <div className="bg-orange-100 p-3 rounded">
                <p className="font-medium text-orange-800">🚀 Running in Production Environment</p>
                <p className="text-orange-700">Check the diagnostic results above for specific issues.</p>
              </div>
            )}

            <div className="space-y-1">
              <p>
                <strong>1. Verify file exists:</strong> Check that kalender-logo.png is in your public/ directory
              </p>
              <p>
                <strong>2. Check Git status:</strong> Run `git status` to ensure the file is committed
              </p>
              <p>
                <strong>3. Verify case sensitivity:</strong> Ensure exact filename match (all lowercase)
              </p>
              <p>
                <strong>4. Clear Vercel cache:</strong> In Vercel dashboard, clear cache and redeploy
              </p>
              <p>
                <strong>5. Check build logs:</strong> Review Vercel deployment logs for errors
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
