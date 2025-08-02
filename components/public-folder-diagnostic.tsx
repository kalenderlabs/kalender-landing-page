"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FileTest {
  path: string
  status: "testing" | "found" | "not-found"
  size?: string
  error?: string
}

export function PublicFolderDiagnostic() {
  const [tests, setTests] = useState<FileTest[]>([])
  const [environment, setEnvironment] = useState("")

  const filesToTest = ["kalender-logo.png", "favicon.ico", "robots.txt", "sitemap.xml"]

  useEffect(() => {
    // Detectar ambiente
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname
      if (hostname.includes("vercel.app") || hostname.includes("vercel.com")) {
        setEnvironment("Vercel Production")
      } else if (hostname === "localhost") {
        setEnvironment("Local Development")
      } else {
        setEnvironment(`Custom Domain (${hostname})`)
      }
    }
  }, [])

  const testFiles = async () => {
    const initialTests = filesToTest.map((file) => ({
      path: `/${file}`,
      status: "testing" as const,
    }))

    setTests(initialTests)

    for (let i = 0; i < filesToTest.length; i++) {
      const file = filesToTest[i]
      const path = `/${file}`

      try {
        const response = await fetch(path, { method: "HEAD" })

        setTests((prev) =>
          prev.map((test, index) =>
            index === i
              ? {
                  ...test,
                  status: response.ok ? "found" : "not-found",
                  size: response.headers.get("content-length") || "unknown",
                  error: response.ok ? undefined : `HTTP ${response.status}`,
                }
              : test,
          ),
        )
      } catch (error) {
        setTests((prev) =>
          prev.map((test, index) =>
            index === i
              ? {
                  ...test,
                  status: "not-found",
                  error: error instanceof Error ? error.message : "Network error",
                }
              : test,
          ),
        )
      }
    }
  }

  const copyCommands = () => {
    const commands = [
      "# Verificar se a pasta public existe",
      "ls -la public/",
      "",
      "# Adicionar arquivos ao Git",
      "git add public/",
      "git commit -m 'Add public assets'",
      "git push",
      "",
      "# Verificar status do Git",
      "git ls-files public/",
    ].join("\n")

    navigator.clipboard.writeText(commands)
    alert("Comandos copiados para a área de transferência!")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🔍 Diagnóstico da Pasta Public</CardTitle>
          <p className="text-muted-foreground">
            Verificando se os arquivos da pasta public estão acessíveis no ambiente atual
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <strong>Ambiente:</strong>
              <Badge variant="outline">{environment || "Detectando..."}</Badge>
            </div>

            <div className="flex items-center gap-2">
              <strong>URL Base:</strong>
              <code className="bg-muted px-2 py-1 rounded text-sm">
                {typeof window !== "undefined" ? window.location.origin : "N/A"}
              </code>
            </div>

            <Button onClick={testFiles} className="w-full">
              🧪 Testar Arquivos da Pasta Public
            </Button>
          </div>
        </CardContent>
      </Card>

      {tests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>📋 Resultados dos Testes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tests.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    <code className="text-sm">{test.path}</code>
                    {test.size && <span className="text-xs text-muted-foreground">({test.size} bytes)</span>}
                  </div>

                  <div className="flex items-center gap-2">
                    {test.status === "testing" && <Badge variant="secondary">🔄 Testando...</Badge>}
                    {test.status === "found" && <Badge variant="default">✅ Encontrado</Badge>}
                    {test.status === "not-found" && (
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">❌ Não encontrado</Badge>
                        {test.error && <span className="text-xs text-red-500">{test.error}</span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>🛠️ Comandos para Corrigir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Se os arquivos não foram encontrados, execute estes comandos no terminal do seu projeto:
            </p>

            <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
              {`# 1. Verificar se a pasta public existe
ls -la public/

# 2. Se não existir, criar a pasta
mkdir public

# 3. Adicionar o logo (substitua pelo caminho correto)
cp /caminho/para/seu/logo.png public/kalender-logo.png

# 4. Verificar se os arquivos estão no Git
git ls-files public/

# 5. Se não estiverem, adicionar ao Git
git add public/
git commit -m "Add public assets including kalender-logo"
git push

# 6. Verificar .gitignore
grep -n "public" .gitignore`}
            </pre>

            <Button onClick={copyCommands} variant="outline" className="w-full">
              📋 Copiar Comandos
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🎯 Checklist de Verificação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="check1" />
              <label htmlFor="check1" className="text-sm">
                Pasta <code>public/</code> existe na raiz do projeto
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="check2" />
              <label htmlFor="check2" className="text-sm">
                Arquivo <code>kalender-logo.png</code> está na pasta public
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="check3" />
              <label htmlFor="check3" className="text-sm">
                Arquivos da pasta public estão commitados no Git
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="check4" />
              <label htmlFor="check4" className="text-sm">
                <code>.gitignore</code> não está ignorando a pasta public
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="check5" />
              <label htmlFor="check5" className="text-sm">
                Middleware permite acesso a arquivos estáticos
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
