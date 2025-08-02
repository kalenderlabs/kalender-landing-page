"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function GitStatusCheck() {
  const [commands, setCommands] = useState<string[]>([])

  const generateCommands = () => {
    const commandList = [
      "# 🔍 VERIFICAR SE O ARQUIVO ESTÁ NO GIT",
      "",
      "# 1. Verificar se o arquivo existe localmente",
      "ls -la public/kalender-logo.png",
      "",
      "# 2. Verificar se está no Git",
      "git ls-files public/kalender-logo.png",
      "",
      "# 3. Se NÃO estiver no Git, adicionar FORÇADAMENTE",
      "git add -f public/kalender-logo.png",
      "",
      "# 4. Verificar status",
      "git status public/kalender-logo.png",
      "",
      "# 5. Fazer commit",
      'git commit -m "Add kalender-logo.png to public folder"',
      "",
      "# 6. Enviar para repositório",
      "git push",
      "",
      "# 7. Verificar se foi enviado",
      "git ls-files public/kalender-logo.png",
      "",
      "# 🚨 SE AINDA NÃO FUNCIONAR:",
      "",
      "# Verificar .gitignore",
      "cat .gitignore | grep -i public",
      "cat .gitignore | grep -i png",
      "",
      "# Se .gitignore estiver ignorando, remover as linhas problemáticas",
      "# Depois repetir os passos 3-6",
    ]

    setCommands(commandList)
  }

  const copyCommands = () => {
    const commandText = commands.join("\n")
    navigator.clipboard.writeText(commandText)
    alert("✅ Comandos copiados! Execute no terminal do seu projeto.")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>🔧 Comandos para Adicionar Logo ao Git</CardTitle>
        <p className="text-muted-foreground">O arquivo não está sendo incluído no build porque não está no Git</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="font-semibold text-red-800 mb-2">🚨 Problema Identificado:</h3>
          <p className="text-red-700">
            O arquivo <code>kalender-logo.png</code> não está sendo commitado no Git. O Vercel só faz deploy dos
            arquivos que estão no repositório Git.
          </p>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Solução:</h3>
          <p className="text-blue-700">
            Execute os comandos abaixo na raiz do seu projeto para forçar a adição do arquivo ao Git.
          </p>
        </div>

        <Button onClick={generateCommands} className="w-full">
          📋 Gerar Comandos de Correção
        </Button>

        {commands.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Comandos para Executar:</h3>
              <Button onClick={copyCommands} variant="outline" size="sm">
                📋 Copiar Todos
              </Button>
            </div>

            <pre className="bg-muted p-4 rounded text-sm overflow-x-auto whitespace-pre-wrap">
              {commands.join("\n")}
            </pre>

            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <h3 className="font-semibold text-green-800 mb-2">✅ Após Executar os Comandos:</h3>
              <ul className="text-green-700 space-y-1">
                <li>1. O arquivo será adicionado ao Git</li>
                <li>2. Será feito commit e push</li>
                <li>3. O Vercel detectará a mudança</li>
                <li>4. O próximo deploy incluirá o arquivo</li>
                <li>5. O logo aparecerá no site</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
