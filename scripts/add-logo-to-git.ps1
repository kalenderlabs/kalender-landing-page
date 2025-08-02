Write-Host "🔍 Verificando status do kalender-logo.png no Git..." -ForegroundColor Cyan

# Verificar se estamos na raiz do projeto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Execute este script na raiz do projeto Next.js" -ForegroundColor Red
    exit 1
}

# Verificar se a pasta public existe
if (-not (Test-Path "public")) {
    Write-Host "❌ Pasta public não existe!" -ForegroundColor Red
    Write-Host "💡 Criando pasta public..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Name "public"
}

# Verificar se o arquivo existe
if (-not (Test-Path "public/kalender-logo.png")) {
    Write-Host "❌ Arquivo kalender-logo.png não encontrado em public/" -ForegroundColor Red
    Write-Host "📁 Conteúdo atual da pasta public:" -ForegroundColor Yellow
    Get-ChildItem "public" | Format-Table Name, Length, LastWriteTime
    Write-Host ""
    Write-Host "🎯 AÇÃO NECESSÁRIA:" -ForegroundColor Yellow
    Write-Host "1. Copie o arquivo kalender-logo.png para a pasta public/" -ForegroundColor White
    Write-Host "2. Execute este script novamente" -ForegroundColor White
    exit 1
}

Write-Host "✅ Arquivo kalender-logo.png encontrado!" -ForegroundColor Green

# Verificar tamanho do arquivo
$fileInfo = Get-Item "public/kalender-logo.png"
$fileSize = [math]::Round($fileInfo.Length / 1KB, 2)
Write-Host "📏 Tamanho do arquivo: $fileSize KB" -ForegroundColor Gray

# Verificar se está no Git
try {
    $gitCheck = git ls-files --error-unmatch public/kalender-logo.png 2>$null
    if ($gitCheck) {
        Write-Host "✅ Arquivo já está no Git" -ForegroundColor Green
        git ls-files public/kalender-logo.png
    } else {
        throw "Arquivo não está no Git"
    }
} catch {
    Write-Host "❌ Arquivo NÃO está no Git" -ForegroundColor Red
    Write-Host "➕ Adicionando ao Git..." -ForegroundColor Yellow
    
    # Verificar .gitignore
    if (Test-Path ".gitignore") {
        $gitignoreContent = Get-Content ".gitignore"
        $problematicLines = $gitignoreContent | Where-Object { $_ -match "public/" -or $_ -match "/public" -or $_ -match "\*.png" }
        
        if ($problematicLines) {
            Write-Host "⚠️  ATENÇÃO: .gitignore pode estar ignorando o arquivo!" -ForegroundColor Yellow
            Write-Host "Linhas problemáticas no .gitignore:" -ForegroundColor Yellow
            $problematicLines | ForEach-Object { Write-Host $_ -ForegroundColor Red }
            Write-Host ""
        }
    }
    
    # Forçar adição do arquivo
    git add -f public/kalender-logo.png
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Arquivo adicionado ao Git com sucesso!" -ForegroundColor Green
        
        # Verificar status
        Write-Host "📋 Status do Git:" -ForegroundColor Cyan
        git status public/kalender-logo.png
        
        # Fazer commit
        Write-Host "💾 Fazendo commit..." -ForegroundColor Yellow
        git commit -m "Add kalender-logo.png to public folder

- Added kalender-logo.png with correct filename
- File size: $fileSize KB
- Forced add to ensure inclusion in build"
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Commit realizado com sucesso!" -ForegroundColor Green
            Write-Host "🚀 Execute 'git push' para enviar para o repositório" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "🔍 Verificação final:" -ForegroundColor Cyan
            git ls-files public/kalender-logo.png
        } else {
            Write-Host "❌ Erro ao fazer commit" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ Erro ao adicionar arquivo ao Git" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎯 PRÓXIMOS PASSOS:" -ForegroundColor Cyan
Write-Host "1. Execute: git push" -ForegroundColor White
Write-Host "2. Faça deploy no Vercel" -ForegroundColor White
Write-Host "3. Teste: https://seusite.com/kalender-logo.png" -ForegroundColor White
