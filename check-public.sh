#!/bin/bash

echo "🔍 Verificando pasta public..."
echo "📁 Diretório atual: $(pwd)"

# Verificar se estamos na raiz do projeto
if [ ! -f "package.json" ]; then
    echo "❌ Não encontrou package.json. Execute este script na raiz do projeto Next.js"
    exit 1
fi

echo "✅ Encontrou package.json"

# Verificar pasta public
if [ ! -d "public" ]; then
    echo "❌ Pasta public não existe!"
    echo "💡 Criando pasta public..."
    mkdir public
    echo "✅ Pasta public criada"
else
    echo "✅ Pasta public existe"
fi

# Listar conteúdo da pasta public
echo ""
echo "📋 Conteúdo da pasta public:"
ls -la public/

# Verificar logo específico
if [ -f "public/kalender-logo.png" ]; then
    echo "✅ kalender-logo.png encontrado!"
    ls -lh public/kalender-logo.png
else
    echo "❌ kalender-logo.png NÃO encontrado!"
    
    # Procurar arquivos similares
    echo "🔍 Procurando arquivos similares..."
    find public/ -name "*logo*" -o -name "*kalender*" 2>/dev/null || echo "Nenhum arquivo similar encontrado"
fi

# Verificar Git
echo ""
echo "🔄 Verificando Git..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo "✅ É um repositório Git"
    
    echo "📁 Arquivos da pasta public no Git:"
    git ls-files public/ || echo "Nenhum arquivo da pasta public no Git"
    
    echo ""
    echo "⚠️  Arquivos não rastreados na pasta public:"
    git ls-files --others --exclude-standard public/ || echo "Nenhum arquivo não rastreado"
    
else
    echo "⚠️  Não é um repositório Git"
fi

# Verificar .gitignore
echo ""
echo "🔍 Verificando .gitignore..."
if [ -f ".gitignore" ]; then
    if grep -q "public/" .gitignore || grep -q "/public" .gitignore; then
        echo "❌ PROBLEMA: .gitignore está ignorando a pasta public!"
        echo "Linhas problemáticas:"
        grep -n "public" .gitignore
    else
        echo "✅ .gitignore não está ignorando a pasta public"
    fi
else
    echo "⚠️  Arquivo .gitignore não encontrado"
fi

echo ""
echo "🎯 Próximos passos:"
echo "1. Se o logo não existe, adicione o arquivo kalender-logo.png na pasta public/"
echo "2. Execute: git add public/"
echo "3. Execute: git commit -m 'Add kalender logo'"
echo "4. Execute: git push"
echo "5. Faça deploy no Vercel"
