Write-Host "🔍 Verificando pasta public..." -ForegroundColor Cyan
Write-Host "📁 Diretório atual: $(Get-Location)" -ForegroundColor Gray

# Verificar se estamos na raiz do projeto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Não encontrou package.json. Execute este script na raiz do projeto Next.js" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Encontrou package.json" -ForegroundColor Green

# Verificar pasta public
if (-not (Test-Path "public")) {
    Write-Host "❌ Pasta public não existe!" -ForegroundColor Red
    Write-Host "💡 Criando pasta public..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Name "public"
    Write-Host "✅ Pasta public criada" -ForegroundColor Green
} else {
    Write-Host "✅ Pasta public existe" -ForegroundColor Green
}

# Listar conteúdo da pasta public
Write-Host ""
Write-Host "📋 Conteúdo da pasta public:" -ForegroundColor Cyan
Get-ChildItem "public" -Force | Format-Table Name, Length, LastWriteTime

# Verificar logo específico
if (Test-Path "public/kalender-logo.png") {
    Write-Host "✅ kalender-logo.png encontrado!" -ForegroundColor Green
    Get-Item "public/kalender-logo.png" | Format-List Name, Length, LastWriteTime
} else {
    Write-Host "❌ kalender-logo.png NÃO encontrado!" -ForegroundColor Red
    
    # Procurar arquivos similares
    Write-Host "🔍 Procurando arquivos similares..." -ForegroundColor Yellow
    $similarFiles = Get-ChildItem "public" -Recurse | Where-Object { $_.Name -like "*logo*" -or $_.Name -like "*kalender*" }
    if ($similarFiles) {
        $similarFiles | Format-Table Name, Directory
    } else {
        Write-Host "Nenhum arquivo similar encontrado" -ForegroundColor Gray
    }
}

# Verificar Git
Write-Host ""
Write-Host "🔄 Verificando Git..." -ForegroundColor Cyan
try {
    git rev-parse --git-dir 2>$null
    Write-Host "✅ É um repositório Git" -ForegroundColor Green
    
    Write-Host "📁 Arquivos da pasta public no Git:" -ForegroundColor Cyan
    $gitFiles = git ls-files public/
    if ($gitFiles) {
        $gitFiles
    } else {
        Write-Host "Nenhum arquivo da pasta public no Git" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "⚠️  Arquivos não rastreados na pasta public:" -ForegroundColor Yellow
    $untrackedFiles = git ls-files --others --exclude-standard public/
    if ($untrackedFiles) {
        $untrackedFiles
    } else {
        Write-Host "Nenhum arquivo não rastreado" -ForegroundColor Gray
    }
    
} catch {
    Write-Host "⚠️  Não é um repositório Git" -ForegroundColor Yellow
}

# Verificar .gitignore
Write-Host ""
Write-Host "🔍 Verificando .gitignore..." -ForegroundColor Cyan
if (Test-Path ".gitignore") {
    $gitignoreContent = Get-Content ".gitignore"
    $problematicLines = $gitignoreContent | Where-Object { $_ -match "public/" -or $_ -match "/public" }
    
    if ($problematicLines) {
        Write-Host "❌ PROBLEMA: .gitignore está ignorando a pasta public!" -ForegroundColor Red
        Write-Host "Linhas problemáticas:" -ForegroundColor Red
        $problematicLines
    } else {
        Write-Host "✅ .gitignore não está ignorando a pasta public" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️  Arquivo .gitignore não encontrado" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Se o logo não existe, adicione o arquivo kalender-logo.png na pasta public/" -ForegroundColor White
Write-Host "2. Execute: git add public/" -ForegroundColor White
Write-Host "3. Execute: git commit -m 'Add kalender logo'" -ForegroundColor White
Write-Host "4. Execute: git push" -ForegroundColor White
Write-Host "5. Faça deploy no Vercel" -ForegroundColor White
