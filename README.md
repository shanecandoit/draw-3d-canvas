# Draw 3D Canvas

A high-performance 2.5D collaborative drawing application built with Three.js and WebGL. Think Excalidraw meets 3D rendering - infinite canvas, smooth interactions, and designed for real-time collaboration.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## Goals

Draw 3D Canvas aims to be a next-generation collaborative whiteboard that combines:
- **Performance First**: GPU-accelerated rendering via WebGL/Three.js
- **2.5D Perspective**: Top-down infinite canvas with subtle depth
- **Real-time Collaboration**: Multiple users drawing together seamlessly
- **Rich Content**: Support for boxes, lines, text, and images

Inspired by tools like Excalidraw, tldraw, and Figma, but leveraging 3D rendering technology for unprecedented performance and visual effects.

---

## ✨ Features

### Current
- ✅ Top-down 2.5D camera view
- ✅ Smooth panning and zooming (OrbitControls)
- ✅ Infinite grid canvas (100x100 units)
- ✅ Debug overlay (FPS, mouse coordinates, camera position)
- ✅ GPU-accelerated rendering

### Planned
- 🔲 **Primitives**: Boxes, circles, lines, arrows
- 📝 **Text**: Rich text with SDF rendering (Troika-three-text)
- 🖼️ **Images**: Drag and drop image support
- 🎨 **Styling**: Colors, strokes, fills, opacity
- 👥 **Collaboration**: Real-time multi-user editing
- 💾 **Persistence**: Save/load canvas state
- 🔍 **Selection**: Multi-select, grouping, transformations
- ⌨️ **Shortcuts**: Keyboard navigation and quick actions

---

## 🏗️ Architecture

### Frontend: Three.js + WebGL
- **Renderer**: `THREE.WebGLRenderer` for GPU-accelerated 2D/3D rendering
- **Camera**: Top-down `THREE.PerspectiveCamera` locked at 90° angle
- **Entities**: All canvas elements (boxes, images, text) as Three.js meshes
- **Interaction**: `THREE.Raycaster` for precise object picking on the grid plane
- **Text Rendering**: Canvas textures or Troika-three-text for high-performance SDF text

### Collaboration (Coming Soon)
- **Server**: Node.js + Socket.io (or Rust + WebSockets) as single source of truth
- **Protocol**: Delta-based state synchronization
- **Client**: Socket.io client for real-time updates
- **Strategy**: Operational Transform (OT) or CRDT for conflict resolution

### Future: Desktop App (Tauri)
- **Package**: Tauri for lightweight native executables
- **Size**: < 10MB binaries (vs 100MB+ with Electron)
- **Performance**: Native webview (WebView2, WKWebView, WebKitGTK)
- **Platform**: Windows, macOS, Linux

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/draw-3d-canvas.git
cd draw-3d-canvas

# Install dependencies
npm install

# Start development server
npm run dev
```

### Controls
- **Pan**: Left-click + drag or Right-click + drag
- **Zoom**: Mouse wheel
- **Debug**: Bottom-left overlay shows FPS and coordinates

---

## 🛠️ Tech Stack

- **Rendering**: [Three.js](https://threejs.org/) - WebGL library
- **Build Tool**: [Vite](https://vitejs.dev/) - Lightning-fast dev server
- **Language**: JavaScript/TypeScript
- **Future**: Tauri for desktop builds

---

## 📋 Roadmap

### Phase 1: Core Drawing (Current)
- [x] Canvas setup with grid
- [x] Camera controls (pan, zoom)
- [x] Debug overlay
- [ ] Basic shape primitives (boxes, circles)
- [ ] Selection and transformation

### Phase 2: Content Types
- [ ] Line and arrow tools
- [ ] Text rendering with Troika
- [ ] Image upload and placement
- [ ] Color picker and styling

### Phase 3: Collaboration
- [ ] WebSocket server setup
- [ ] Real-time cursor tracking
- [ ] Delta synchronization
- [ ] User presence indicators

### Phase 4: Polish
- [ ] Keyboard shortcuts
- [ ] Undo/redo
- [ ] Export (PNG, SVG, JSON)
- [ ] Performance optimization (culling, LOD)

### Phase 5: Desktop App
- [ ] Tauri integration
- [ ] File system access
- [ ] Native menus
- [ ] Cross-platform builds

---

## 🤝 Contributing

Contributions are welcome! This project is in active development.

### Development Focus
- Keep performance as the #1 priority
- Maintain 60 FPS even with 1000+ objects
- Write clean, documented code
- Test on multiple browsers

---

## 📄 License

AGPL

---

## 🙏 Inspiration

- [Excalidraw](https://excalidraw.com/) - Beautiful hand-drawn aesthetics
- [tldraw](https://tldraw.com/) - Smooth UX and infinite canvas
- [Figma](https://figma.com/) - Multiplayer collaboration
- [Three.js](https://threejs.org/) - 3D rendering capabilities

---
