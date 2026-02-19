(() => {
  const styleId = 'mermaid-viewer-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
.mermaid-render {
  background: var(--overlay, #393552);
  border: 1px solid var(--highlight-high, #56526e);
  border-radius: 10px;
  padding: 12px;
  cursor: zoom-in;
}
.mermaid-render svg {
  width: 100%;
  height: auto;
  display: block;
}
.mermaid-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  display: none;
  align-items: center;
  justify-content: center;
}
.mermaid-modal.open {
  display: flex;
}
.mermaid-modal-inner {
  width: 92vw;
  height: 90vh;
  background: var(--base, #232136);
  border: 1px solid var(--highlight-high, #56526e);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}
.mermaid-modal-toolbar {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 8px;
  z-index: 2;
}
.mermaid-modal-toolbar button {
  appearance: none;
  border: 1px solid var(--highlight-high, #56526e);
  background: rgba(0, 0, 0, 0.25);
  color: var(--text, #e0def4);
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  line-height: 1;
}
.mermaid-modal-toolbar button:hover {
  background: rgba(0, 0, 0, 0.35);
}
.mermaid-modal-close {
  position: absolute;
  top: 10px;
  right: 12px;
  border: none;
  background: var(--rose, #ea9a97);
  color: var(--base, #232136);
  font-weight: 700;
  font-size: 18px;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  z-index: 2;
}
.mermaid-modal-viewport {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.mermaid-modal-content {
  transform-origin: 0 0;
  will-change: transform;
  position: absolute;
  top: 0;
  left: 0;
}
.mermaid-modal-content svg {
  max-width: none;
  max-height: none;
  width: auto;
  height: auto;
}
`;
    document.head.appendChild(style);
  }

  const modal = document.createElement('div');
  modal.className = 'mermaid-modal';
  modal.innerHTML = `
    <div class="mermaid-modal-inner">
      <div class="mermaid-modal-toolbar">
        <button class="mermaid-modal-fit" type="button">Fit</button>
        <button class="mermaid-modal-center" type="button">Center</button>
        <button class="mermaid-modal-zoomout" type="button">−</button>
        <button class="mermaid-modal-zoomin" type="button">+</button>
        <button class="mermaid-modal-reset" type="button">100%</button>
      </div>
      <button class="mermaid-modal-close" type="button">×</button>
      <div class="mermaid-modal-viewport">
        <div class="mermaid-modal-content"></div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.mermaid-modal-close');
  const viewport = modal.querySelector('.mermaid-modal-viewport');
  const content = modal.querySelector('.mermaid-modal-content');
  const fitBtn = modal.querySelector('.mermaid-modal-fit');
  const centerBtn = modal.querySelector('.mermaid-modal-center');
  const zoomOutBtn = modal.querySelector('.mermaid-modal-zoomout');
  const zoomInBtn = modal.querySelector('.mermaid-modal-zoomin');
  const resetBtn = modal.querySelector('.mermaid-modal-reset');

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let startTranslateX = 0;
  let startTranslateY = 0;

  const applyTransform = () => {
    if (content) {
      content.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
  };

  const resetTransform = () => {
    scale = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  let intrinsicWidth = 0;
  let intrinsicHeight = 0;

  const updateIntrinsicSize = (svg) => {
    // Try to get viewBox first
    const vb = svg?.viewBox?.baseVal;
    if (vb && vb.width > 0 && vb.height > 0) {
      intrinsicWidth = vb.width;
      intrinsicHeight = vb.height;
    } else {
        // Fallback to BBox
        try {
          const bbox = svg.getBBox();
          if (bbox && bbox.width > 0 && bbox.height > 0) {
            intrinsicWidth = bbox.width;
            intrinsicHeight = bbox.height;
          } else {
             const rect = svg.getBoundingClientRect();
             intrinsicWidth = rect.width || 800;
             intrinsicHeight = rect.height || 600;
          }
        } catch (e) {
             const rect = svg.getBoundingClientRect();
             intrinsicWidth = rect.width || 800;
             intrinsicHeight = rect.height || 600;
        }
    }
    
    // Set explicit pixel size to container based on intrinsic size
    // This prevents "blurriness" from CSS scaling up a small container
    // content is the wrapper div
    content.style.width = `${intrinsicWidth}px`;
    content.style.height = `${intrinsicHeight}px`;
  };

  const centerContent = () => {
    const viewportRect = viewport.getBoundingClientRect();
    translateX = (viewportRect.width - intrinsicWidth * scale) / 2;
    translateY = (viewportRect.height - intrinsicHeight * scale) / 2;
    applyTransform();
  };

  const fitToScreen = () => {
    const viewportRect = viewport.getBoundingClientRect();
    const padding = 60; // Increased padding
    
    // Safety check for zero intrinsic size
    if (intrinsicWidth <= 0 || intrinsicHeight <= 0) {
        intrinsicWidth = 800;
        intrinsicHeight = 600;
    }
    
    const sx = (viewportRect.width - padding) / intrinsicWidth;
    const sy = (viewportRect.height - padding) / intrinsicHeight;
    
    // Choose the smaller scale to fit entirely
    scale = Math.min(sx, sy);
    
    // Don't limit max scale artificially too much, 
    // but prevent it from being huge if the diagram is tiny
    if (scale > 3) scale = 3; 
    
    // Ensure minimum visibility
    if (scale < 0.05) scale = 0.05;
    
    centerContent();
  };

  const zoomAt = (newScale, anchorX, anchorY) => {
    const next = clamp(newScale, 0.1, 10);
    if (next === scale) return;
    translateX = anchorX - (anchorX - translateX) * (next / scale);
    translateY = anchorY - (anchorY - translateY) * (next / scale);
    scale = next;
    applyTransform();
  };

  const zoomBy = (factor) => {
    const viewportRect = viewport.getBoundingClientRect();
    zoomAt(scale * factor, viewportRect.width / 2, viewportRect.height / 2);
  };

  const openModal = async (source) => {
    content.innerHTML = ''; // Clear previous content
    modal.classList.add('open'); // Open first to calculate sizes correctly

    try {
      // Re-render fresh SVG for the modal
      const id = `mermaid-modal-${Date.now()}`;
      
      // Force higher scale/resolution during render config if possible, 
      // but standard mermaid.render usually creates vector SVG.
      // The blurriness might come from CSS scaling of a small SVG.
      
      const { svg } = await window.mermaid.render(id, source);
      content.innerHTML = svg;
      
      const svgElement = content.querySelector('svg');
      if (svgElement) {
        // Force SVG to be "intrinsic size" initially to calculate real dimensions
        svgElement.style.width = 'auto';
        svgElement.style.height = 'auto';
        svgElement.style.maxWidth = 'none';
        svgElement.style.maxHeight = 'none';
        svgElement.style.display = 'block';
        svgElement.style.transform = 'none'; 
        
        // Wait a tick for DOM update to get real BBox
        requestAnimationFrame(() => {
             updateIntrinsicSize(svgElement);
             
             // Now that we have intrinsic size, we can let it behave normally
             // or keep it as block. 
             // IMPORTANT: Don't force width/height 100% here, 
             // let the transform handle the scaling.
             
             fitToScreen();
        });
      }
      
      // Log for debugging
      console.log('Mermaid Viewer: Modal opened with re-rendered SVG');
    } catch (e) {
      console.error('Mermaid Viewer: Error rendering in modal', e);
      content.innerHTML = `<div style="color:red; padding:20px">Error rendering diagram: ${e.message}</div>`;
    }
  };

  const closeModal = () => {
    modal.classList.remove('open');
    content.innerHTML = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
    if (!modal.classList.contains('open')) return;
    if (event.key === '+' || event.key === '=') zoomBy(1.2);
    if (event.key === '-') zoomBy(1 / 1.2);
    if (event.key === '0') fitToScreen();
    if (event.key.toLowerCase() === 'c') centerContent();
    if (event.key.toLowerCase() === 'r') {
      resetTransform();
      centerContent();
    }
  });

  fitBtn.addEventListener('click', fitToScreen);
  centerBtn.addEventListener('click', centerContent);
  zoomOutBtn.addEventListener('click', () => zoomBy(1 / 1.2));
  zoomInBtn.addEventListener('click', () => zoomBy(1.2));
  resetBtn.addEventListener('click', () => {
    resetTransform();
    centerContent();
  });

  viewport.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.mermaid-modal-toolbar')) return;
    isDragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    startTranslateX = translateX;
    startTranslateY = translateY;
    viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    translateX = startTranslateX + (event.clientX - dragStartX);
    translateY = startTranslateY + (event.clientY - dragStartY);
    applyTransform();
  });
  viewport.addEventListener('pointerup', (event) => {
    isDragging = false;
    viewport.releasePointerCapture(event.pointerId);
  });
  viewport.addEventListener('pointerleave', () => {
    isDragging = false;
  });
  viewport.addEventListener('wheel', (event) => {
    event.preventDefault();
    const viewportRect = viewport.getBoundingClientRect();
    const mouseX = event.clientX - viewportRect.left;
    const mouseY = event.clientY - viewportRect.top;
    const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;
    zoomAt(scale * zoomFactor, mouseX, mouseY);
  }, { passive: false });


  const loadMermaid = () => new Promise((resolve) => {
    if (window.mermaid) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.onload = resolve;
    script.onerror = resolve;
    document.head.appendChild(script);
  });

  const renderMermaid = async () => {
    if (!window.mermaid) return;

    const rootStyles = getComputedStyle(document.documentElement);
    const cssVar = (name, fallback) => rootStyles.getPropertyValue(name).trim() || fallback;
    const themeVariables = {
      background: 'transparent',
      fontFamily: cssVar('--font', 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'),
      primaryColor: cssVar('--overlay', '#393552'),
      primaryTextColor: cssVar('--text', '#e0def4'),
      primaryBorderColor: cssVar('--highlight-high', '#56526e'),
      secondaryColor: cssVar('--surface', '#2a273f'),
      tertiaryColor: cssVar('--base', '#232136'),
      lineColor: cssVar('--foam', '#9ccfd8'),
      textColor: cssVar('--text', '#e0def4'),
      mainBkg: cssVar('--base', '#232136'),
      nodeBkg: cssVar('--overlay', '#393552'),
      nodeTextColor: cssVar('--text', '#e0def4'),
      nodeBorder: cssVar('--highlight-high', '#56526e'),
      clusterBkg: cssVar('--surface', '#2a273f'),
      clusterBorder: cssVar('--highlight-high', '#56526e'),
      edgeLabelBackground: cssVar('--base', '#232136')
    };

    try {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'dark', // Back to dark theme as requested
        securityLevel: 'loose',
        flowchart: {
            useMaxWidth: false, // Important for resolution
            htmlLabels: true
        }
      });
      console.log('Mermaid Viewer: Initialized');
    } catch (e) {
      console.error('Mermaid Viewer: Init error', e);
    }

    // Try multiple selectors to be safe
    const codeBlocks = Array.from(document.querySelectorAll('pre[is="marp-pre"] > code, pre > code, div.mermaid, code.language-mermaid'))
      .filter((code) => {
         const isMermaid = code.className.includes('language-mermaid') || code.className.includes('mermaid');
         // Avoid double rendering
         const alreadyRendered = code.getAttribute('data-processed');
         return isMermaid && !alreadyRendered;
      });

    console.log(`Mermaid Viewer: Found ${codeBlocks.length} blocks to render`);

    for (let i = 0; i < codeBlocks.length; i += 1) {
      const code = codeBlocks[i];
      code.setAttribute('data-processed', 'true'); // Mark as processed
      const pre = code.parentElement;
      if (!pre) continue;
      
      const source = code.textContent || '';
      console.log(`Mermaid Viewer: Rendering block ${i}`, source.substring(0, 20) + '...');
      
      const container = document.createElement('div');
      container.className = 'mermaid-render';
      container.style.cursor = 'zoom-in'; // Ensure cursor style
      
      try {
        // Generate unique ID
        const id = `mermaid-${Date.now()}-${i}`;
        const { svg } = await window.mermaid.render(id, source);
        container.innerHTML = svg;
        container.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent slide navigation
            openModal(source); // Pass source code, not SVG element
        });

        if (pre.tagName === 'PRE') {
            pre.replaceWith(container);
        } else {
            code.replaceWith(container);
        }
      } catch (error) {
      }
    }
  };

  const run = () => {
    loadMermaid().then(() => {
      renderMermaid();
      setTimeout(renderMermaid, 500);
      setTimeout(renderMermaid, 2000);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
