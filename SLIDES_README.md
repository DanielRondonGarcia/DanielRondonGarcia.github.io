# Guía de Comandos para Presentaciones Marp

Este proyecto ahora incluye scripts npm que reemplazan la funcionalidad del Makefile para generar presentaciones con Marp.

## Comandos Disponibles

### Generar Presentaciones
```bash
# Generar todas las presentaciones (HTML + imágenes PNG)
npm run slides:build

# Solo generar archivos HTML
npm run slides:html

# Solo generar imágenes PNG
npm run slides:images
```

### Desarrollo
```bash
# Servir presentaciones en modo desarrollo con auto-reload
npm run slides:serve
```

### Utilidades
```bash
# Listar archivos generados
npm run slides:list

# Limpiar archivos generados
npm run slides:clean
```

### Build Completo
```bash
# Generar presentaciones y hacer build de Next.js
npm run build:all
```

## Estructura de Archivos

- **Archivos fuente**: `slides/*.md`
- **Temas**: `slides/themes/`
- **Presentaciones HTML**: `public/slides/` → `out/slides/`
- **Imágenes PNG**: `public/images/` → `out/images/`

## Flujo de Trabajo Recomendado

1. **Desarrollo**: Usa `npm run slides:serve` para trabajar en las presentaciones
2. **Compilación**: Usa `npm run slides:build` para generar los archivos HTML e imágenes PNG
3. **Deploy**: Usa `npm run build:all` para preparar todo para producción

## Ventajas sobre PowerShell/Bash

- ✅ Funciona nativamente en Windows
- ✅ No requiere herramientas adicionales
- ✅ Integrado con el ecosistema npm
- ✅ Comandos más simples y memorables
- ✅ Compatible con cualquier terminal

## Makefile

El Makefile sigue disponible pero requiere Git Bash para funcionar en Windows:
```bash
# Usar con Git Bash
bash -c "make"
bash -c "make build-all"
```

Sin embargo, se recomienda usar los comandos npm por su mejor compatibilidad con Windows.