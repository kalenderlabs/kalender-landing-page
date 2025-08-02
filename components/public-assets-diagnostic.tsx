"use client"

import { useState, useEffect } from "react"

interface AssetTest {
  path: string
  status: "loading" | "success" | "error"
  details?: any
}

export function PublicAssetsDiagnostic() {
  const [tests, setTests] = useState<AssetTest[]>([])
  const [environment, setEnvironment] = useState({
    isProduction: false,
    domain: "",
    timestamp: new Date().toISOString(),
  })

  useEffect(() => {
    const domain = typeof window !== "undefined" ? window.location.origin : ""
    const isProduction = !domain.includes("localhost") && !domain.includes("127.0.0.1")

    setEnvironment({
      isProduction,
      domain,
      timestamp: new Date().toISOString(),
    })

    // Lista de assets para testar
    const assetsToTest = ["/kalender-logo.png", "/favicon.ico", "/robots.txt", "/sitemap.xml"]

    const testAssets = async () => {
      const results: AssetTest[] = []

      for (const assetPath of assetsToTest) {
        results.push({ path: assetPath, status: "loading" })
        setTests([...results])

        try {
          const response = await fetch(assetPath, { method: "HEAD" })
          const index = results.findIndex((r) => r.path === assetPath)

          results[index] = {
            path: assetPath,
            status: response.ok ? "success" : "error",
            details: {
              status: response.status,
              statusText: response.statusText,
              headers: Object.fromEntries(response.headers.entries()),
            },
          }
        } catch (error) {
          const index = results.findIndex((r) => r.path === assetPath)
          results[index] = {
            path: assetPath,
            status: "error",
            details: { error: error.message },
          }
        }

        setTests([...results])
      }
    }

    testAssets()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white border rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Diagnóstico de Assets Públicos</h1>

        {/* Informações do Ambiente */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="font-semibold mb-2">Informações do Ambiente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Ambiente:</strong>{" "}
              <span className={environment.isProduction ? "text-red-600" : "text-green-600"}>
                {environment.isProduction ? "Produção (Vercel)" : "Desenvolvimento"}
              </span>
            </div>
            <div>
              <strong>Domínio:</strong> {environment.domain}
            </div>
            <div className="md:col-span-2">
              <strong>Timestamp:</strong> {environment.timestamp}
            </div>
          </div>
        </div>

        {/* Resultados dos Testes */}
        <div className="space-y-4">
          <h2 className="font-semibold">Testes de Assets</h2>

          {tests.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Testando assets...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tests.map((test, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    test.status === "success"
                      ? "bg-green-50 border-green-500"
                      : test.status === "error"
                        ? "bg-red-50 border-red-500"
                        : "bg-yellow-50 border-yellow-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm">{test.path}</span>
                      {test.details && (
                        <span className="ml-2 text-sm text-gray-600">
                          {test.status === "success"
                            ? `✅ ${test.details.status}`
                            : `❌ ${test.details.status || "Erro de rede"}`}
                        </span>
                      )}
                    </div>
                    <div className="text-lg">
                      {test.status === "loading" && "⏳"}
                      {test.status === "success" && "✅"}
                      {test.status === "error" && "❌"}
                    </div>
                  </div>

                  {test.details && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-500 cursor-pointer">Mostrar detalhes</summary>
                      <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                        {JSON.stringify(test.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Teste Visual do Logo */}
        <div className="mt-8">
          <h2 className="font-semibold mb-4">Teste Visual do Logo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Imagem Padrão</h3>
              <img
                src="/kalender-logo.png"
                alt="Kalender Logo"
                className="h-12 border"
                onLoad={() => console.log("✅ Logo carregado com sucesso")}
                onError={() => console.error("❌ Erro ao carregar logo")}
              />
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Background Image</h3>
              <div
                className="w-32 h-12 border bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: "url('/kalender-logo.png')" }}
              />
            </div>
          </div>
        </div>

        {/* Guia de Solução */}
        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Guia de Solução</h2>

          {environment.isProduction ? (
            <div className="space-y-2 text-sm">
              <p className="font-medium text-red-800">🚨 Problema detectado em produção!</p>
              <div className="bg-white p-3 rounded border-l-4 border-red-500">
                <p className="font-medium">Passos para resolver:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Verificar se a pasta public/ existe no seu projeto local</li>
                  <li>Verificar se kalender-logo.png está na pasta public/</li>
                  <li>
                    Executar: <code className="bg-gray-100 px-1 rounded">git status</code>
                  </li>
                  <li>
                    Se o arquivo não estiver no Git: <code className="bg-gray-100 px-1 rounded">git add public/</code>
                  </li>
                  <li>
                    Commit: <code className="bg-gray-100 px-1 rounded">git commit -m "Add public assets"</code>
                  </li>
                  <li>
                    Push: <code className="bg-gray-100 px-1 rounded">git push</code>
                  </li>
                  <li>Aguardar novo deploy automático no Vercel</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <p className="font-medium text-green-800">✅ Ambiente de desenvolvimento</p>
              <p>
                Se o logo funciona aqui mas não na produção, o problema é que os arquivos não estão sendo enviados para
                o Vercel.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
