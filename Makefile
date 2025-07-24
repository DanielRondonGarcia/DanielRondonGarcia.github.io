# Makefile para generar presentaciones con Marp

# Directorios
SLIDES_DIR = slides
OUTPUT_DIR = $(SLIDES_DIR)/output
THEMES_DIR = $(SLIDES_DIR)/themes
PUBLIC_SLIDES_DIR = public/slides
IMAGES_DIR = public/images

# Archivos fuente
MD_FILES = $(wildcard $(SLIDES_DIR)/*.md)
HTML_FILES = $(patsubst $(SLIDES_DIR)/%.md,$(OUTPUT_DIR)/%.html,$(MD_FILES))
PUBLIC_HTML_FILES = $(patsubst $(SLIDES_DIR)/%.md,$(PUBLIC_SLIDES_DIR)/%.html,$(MD_FILES))
PNG_FILES = $(patsubst $(SLIDES_DIR)/%.md,$(IMAGES_DIR)/%.png,$(MD_FILES))

# Comando Marp
MARP = marp
MARP_OPTS = --theme-set $(THEMES_DIR) --html --allow-local-files --bespoke.progress true --bespoke.transition

# Objetivo principal
all: $(HTML_FILES) $(PUBLIC_HTML_FILES) $(PNG_FILES)
	@echo "Todas las presentaciones han sido generadas"

# Crear directorios si no existen
$(OUTPUT_DIR):
	@mkdir -p $(OUTPUT_DIR)

$(PUBLIC_SLIDES_DIR):
	@mkdir -p $(PUBLIC_SLIDES_DIR)

$(IMAGES_DIR):
	@mkdir -p $(IMAGES_DIR)

# Generar HTML en output/
$(OUTPUT_DIR)/%.html: $(SLIDES_DIR)/%.md | $(OUTPUT_DIR)
	@echo "Generando $@..."
	$(MARP) $(MARP_OPTS) --output $@ $<

# Copiar HTML a public/slides/ para Next.js
$(PUBLIC_SLIDES_DIR)/%.html: $(OUTPUT_DIR)/%.html | $(PUBLIC_SLIDES_DIR)
	@echo "Copiando $@ para Next.js..."
	@cp $< $@

# Generar imágenes PNG para las presentaciones
$(IMAGES_DIR)/%.png: $(SLIDES_DIR)/%.md | $(IMAGES_DIR)
	@echo "Generando imagen PNG para $@..."
	$(MARP) --theme-set $(THEMES_DIR) --image png --output $@ $<

# Limpiar archivos generados
clean:
	@echo "Limpiando archivos generados..."
	@rm -rf $(OUTPUT_DIR)
	@rm -rf $(PUBLIC_SLIDES_DIR)
	@rm -f $(IMAGES_DIR)/*.png

# Generar una presentación específica
%.html: $(SLIDES_DIR)/%.md | $(OUTPUT_DIR) $(PUBLIC_SLIDES_DIR)
	@echo "Generando $@..."
	$(MARP) $(MARP_OPTS) --output $(OUTPUT_DIR)/$@ $<
	@cp $(OUTPUT_DIR)/$@ $(PUBLIC_SLIDES_DIR)/$@

# Compilar presentaciones y hacer build de Next.js
build-all: all
	@echo "Ejecutando npm run build..."
	npm run build

# Servir presentaciones en modo desarrollo
serve:
	$(MARP) -I $(SLIDES_DIR) -w -s --theme-set $(THEMES_DIR)

# Listar archivos generados
list:
	@echo "Presentaciones HTML:"
	@ls -la $(PUBLIC_SLIDES_DIR)/ 2>/dev/null || echo "No hay archivos HTML"
	@echo "\nImágenes SVG:"
	@ls -la $(IMAGES_DIR)/*.png 2>/dev/null || echo "No hay imágenes PNG"

# Mostrar ayuda
help:
	@echo "Comandos disponibles:"
	@echo "  make          - Generar todas las presentaciones e imágenes PNG"
	@echo "  make clean    - Limpiar archivos generados"
	@echo "  make build-all - Generar presentaciones y hacer build de Next.js"
	@echo "  make serve    - Servir presentaciones en modo desarrollo"
	@echo "  make list     - Listar archivos generados"
	@echo "  make help     - Mostrar esta ayuda"
	@echo "  make <name>.html - Generar una presentación específica"

.PHONY: all clean help build-all serve list