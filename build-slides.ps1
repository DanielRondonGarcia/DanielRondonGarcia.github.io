# Script de PowerShell para generar presentaciones con Marp
# Equivalente al Makefile para sistemas Windows

param(
    [string]$Action = "all",
    [string]$File = ""
)

# Directorios
$SlidesDir = "slides"
$OutputDir = "$SlidesDir/output"
$ThemesDir = "$SlidesDir/themes"
$PublicSlidesDir = "public/slides"

# Función para crear directorios
function New-DirectoryIfNotExists {
    param([string]$Path)
    if (!(Test-Path $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
        Write-Host "Directorio creado: $Path" -ForegroundColor Green
    }
}

# Función para copiar assets
function Copy-SlidesAssets {
    Write-Host "Copiando assets de presentaciones..." -ForegroundColor Cyan
    
    # Crear directorios de destino
    New-DirectoryIfNotExists "$PublicSlidesDir/images"
    New-DirectoryIfNotExists "$PublicSlidesDir/themes"
    
    # Copiar imágenes
    if (Test-Path "$SlidesDir/images") {
        Copy-Item -Path "$SlidesDir/images/*" -Destination "$PublicSlidesDir/images/" -Recurse -Force
        Write-Host "[OK] Imágenes copiadas" -ForegroundColor Green
    }
    
    # Copiar temas
    if (Test-Path "$SlidesDir/themes") {
        Copy-Item -Path "$SlidesDir/themes/*" -Destination "$PublicSlidesDir/themes/" -Recurse -Force
        Write-Host "[OK] Temas copiados" -ForegroundColor Green
    }
    
    # Copiar whiteboard.js
    if (Test-Path "$SlidesDir/whiteboard.js") {
        Copy-Item -Path "$SlidesDir/whiteboard.js" -Destination "$PublicSlidesDir/whiteboard.js" -Force
        Write-Host "[OK] whiteboard.js copiado" -ForegroundColor Green
    }
}

# Función para generar una presentación
function Build-Presentation {
    param([string]$MarkdownFile)
    
    $BaseName = [System.IO.Path]::GetFileNameWithoutExtension($MarkdownFile)
    $OutputFile = "$PublicSlidesDir/$BaseName.html"
    
    Write-Host "Generando: $MarkdownFile -> $OutputFile" -ForegroundColor Yellow
    
    $MarpCommand = "npx marp --theme-set $ThemesDir --html --allow-local-files --output `"$OutputFile`" `"$MarkdownFile`""
    
    try {
        Invoke-Expression $MarpCommand
        Write-Host "[OK] Generado exitosamente: $OutputFile" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "[ERROR] Error generando $OutputFile : $_" -ForegroundColor Red
        return $false
    }
}

# Función principal
function Main {
    switch ($Action.ToLower()) {
        "all" {
            Write-Host "Generando todas las presentaciones..." -ForegroundColor Cyan
            
            # Crear directorios necesarios
            New-DirectoryIfNotExists $OutputDir
            New-DirectoryIfNotExists $PublicSlidesDir
            
            # Copiar assets
            Copy-SlidesAssets
            
            # Obtener todos los archivos .md
            $MarkdownFiles = Get-ChildItem -Path $SlidesDir -Filter "*.md" | Where-Object { $_.Name -ne "README.md" }
            
            if ($MarkdownFiles.Count -eq 0) {
                Write-Host "[WARNING] No se encontraron archivos .md en $SlidesDir" -ForegroundColor Yellow
                return
            }
            
            $SuccessCount = 0
            foreach ($File in $MarkdownFiles) {
                if (Build-Presentation $File.FullName) {
                    $SuccessCount++
                }
            }
            
            Write-Host "Proceso completado: $SuccessCount/$($MarkdownFiles.Count) presentaciones generadas" -ForegroundColor Green
        }
        
        "assets" {
            Write-Host "Copiando solo los assets..." -ForegroundColor Cyan
            New-DirectoryIfNotExists $PublicSlidesDir
            Copy-SlidesAssets
        }
        
        "clean" {
            Write-Host "Limpiando archivos generados..." -ForegroundColor Yellow
            
            if (Test-Path $OutputDir) {
                Remove-Item -Path $OutputDir -Recurse -Force
                Write-Host "[OK] Eliminado: $OutputDir" -ForegroundColor Green
            }
            
            if (Test-Path $PublicSlidesDir) {
                Remove-Item -Path $PublicSlidesDir -Recurse -Force
                Write-Host "[OK] Eliminado: $PublicSlidesDir" -ForegroundColor Green
            }
        }
        
        "help" {
            Write-Host "Comandos disponibles:" -ForegroundColor Cyan
            Write-Host "  .\build-slides.ps1                    - Generar todas las presentaciones"
            Write-Host "  .\build-slides.ps1 -Action all        - Generar todas las presentaciones"
            Write-Host "  .\build-slides.ps1 -Action assets     - Copiar solo los assets (imágenes, temas, whiteboard.js)"
            Write-Host "  .\build-slides.ps1 -Action clean      - Limpiar archivos generados"
            Write-Host "  .\build-slides.ps1 -Action help       - Mostrar esta ayuda"
            Write-Host "  .\build-slides.ps1 -Action single -File nombre.md - Generar una presentación específica"
        }
        
        "single" {
            if ([string]::IsNullOrEmpty($File)) {
                Write-Host "[ERROR] Debe especificar un archivo con -File" -ForegroundColor Red
                Write-Host "Ejemplo: .\build-slides.ps1 -Action single -File devops-introduction.md"
                return
            }
            
            $FullPath = "$SlidesDir/$File"
            if (!(Test-Path $FullPath)) {
                Write-Host "[ERROR] No se encontró el archivo $FullPath" -ForegroundColor Red
                return
            }
            
            New-DirectoryIfNotExists $PublicSlidesDir
            Build-Presentation $FullPath
        }
        
        default {
            Write-Host "[ERROR] Acción no reconocida: $Action" -ForegroundColor Red
            Write-Host "Use -Action help para ver los comandos disponibles"
        }
    }
}

# Ejecutar función principal
Main