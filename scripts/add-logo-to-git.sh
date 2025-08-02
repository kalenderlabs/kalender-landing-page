#!/bin/bash

echo "🔍 Verificando status do kalender-logo.png no Git..."

# Verificar se estamos na raiz do projeto
if [ ! -f "package.json" ]; then
    echo "❌ Execute este script na raiz do projeto Next.js"
    exit 1
fi

# Verificar se a pasta public existe
if [ ! -d "public" ]; then
    echo "❌ Pasta public não existe!"
    echo "💡 Criando pasta public..."
    mkdir public
fi

# Verificar se o arquivo existe
if [ ! -f "public/kalender-logo.png" ]; then
    echo "❌ Arquivo kalender-logo.png não encontrado em public/"
    echo "📁 Conteúdo atual da pasta public:"
    ls -la public/
    echo ""
    echo "🎯 AÇÃO NECESSÁRIA:"
    echo "1. Copie o arquivo kalender-logo.png para a pasta public/"
    echo "2. Execute este script novamente"
    exit 1
fi

echo "✅ Arquivo kalender-logo.png encontrado!"

# Verificar tamanho do arquivo
file_size=$(ls -lh public/kalender-logo.png | awk '{print $5}')
echo "�� Tamanho do arquivo: $file_size"

# Verificar se está no Git
if git ls-files --error-unmatch public/kalender-logo.png > /dev/null 2>&1; then
    echo "✅ Arquivo já está no Git"
    git ls-files public/kalender-logo.png
else
    echo "❌ Arquivo NÃO está no Git"
    echo "➕ Adicionando ao Git..."
    
    # Verificar .gitignore
    if [ -f ".gitignore" ]; then
        if grep -q "public/" .gitignore || grep -q "/public" .gitignore || grep -q "*.png" .gitignore; then
            echo "⚠️  ATENÇÃO: .gitignore pode estar ignorando o arquivo!"
            echo "Linhas problemáticas no .gitignore:"
            grep -n "public\|\.png" .gitignore || echo "Nenhuma linha problemática encontrada"
            echo ""
        fi
    fi
    
    # Forçar adição do arquivo
    git add -f public/kalender-logo.png
    
    if [ $? -eq 0 ]; then
        echo "✅ Arquivo adicionado ao Git com sucesso!"
        
        # Verificar status
        echo "📋 Status do Git:"
        git status public/kalender-logo.png
        
        # Fazer commit
        echo "💾 Fazendo commit..."
        git commit -m "Add kalender-logo.png to public folder

- Added kalender-logo.png with correct filename
- File size: $file_size
- Forced add to ensure inclusion in build"
        
        if [ $? -eq 0 ]; then
            echo "✅ Commit realizado com sucesso!"
            echo "🚀 Execute 'git push' para enviar para o repositório"
            echo ""
            echo "🔍 Verificação final:"
            git ls-files public/kalender-logo.png
        else
            echo "❌ Erro ao fazer commit"
        fi
    else
        echo "❌ Erro ao adicionar arquivo ao Git"
    fi
fi

echo ""
echo "🎯 PRÓXIMOS PASSOS:"
echo "1. Execute: git push"
echo "2. Faça deploy no Vercel"
echo "3. Teste: https://seusite.com/kalender-logo.png"
