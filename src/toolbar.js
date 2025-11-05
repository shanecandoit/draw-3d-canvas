// Toolbar for drawing tools
export class Toolbar {
    constructor(onToolChange) {
        this.currentTool = 'pan';
        this.onToolChange = onToolChange;
        this.element = null;
        this.init();
    }

    init() {
        // Create toolbar container
        this.element = document.createElement('div');
        this.element.id = 'toolbar';
        this.element.style.cssText = `
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.95);
            border-radius: 8px;
            padding: 8px;
            display: flex;
            gap: 4px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
        `;

        // Define tools
        const tools = [
            { id: 'pan', icon: '✋', title: 'Pan (V)' },
            { id: 'select', icon: '⬚', title: 'Select (S)' },
            { id: 'box', icon: '▢', title: 'Box (B)' },
            { id: 'line', icon: '╱', title: 'Line (L)' },
            { id: 'text', icon: 'T', title: 'Text (T)' }
        ];

        // Create tool buttons
        tools.forEach(tool => {
            const button = this.createToolButton(tool);
            this.element.appendChild(button);
        });

        document.body.appendChild(this.element);

        // Setup keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    createToolButton(tool) {
        const button = document.createElement('button');
        button.id = `tool-${tool.id}`;
        button.innerHTML = tool.icon;
        button.title = tool.title;
        button.style.cssText = `
            width: 40px;
            height: 40px;
            border: 2px solid transparent;
            border-radius: 6px;
            background: white;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            user-select: none;
        `;

        // Set active state for default tool
        if (tool.id === this.currentTool) {
            this.setActiveButton(button);
        }

        // Hover effect
        button.addEventListener('mouseenter', () => {
            if (tool.id !== this.currentTool) {
                button.style.background = '#f5f5f5';
            }
        });

        button.addEventListener('mouseleave', () => {
            if (tool.id !== this.currentTool) {
                button.style.background = 'white';
            }
        });

        // Click handler
        button.addEventListener('click', () => {
            this.selectTool(tool.id);
        });

        return button;
    }

    setActiveButton(button) {
        button.style.background = '#e3f2fd';
        button.style.borderColor = '#2196f3';
    }

    selectTool(toolId) {
        // Deselect previous tool
        const previousButton = document.getElementById(`tool-${this.currentTool}`);
        if (previousButton) {
            previousButton.style.background = 'white';
            previousButton.style.borderColor = 'transparent';
        }

        // Select new tool
        this.currentTool = toolId;
        const newButton = document.getElementById(`tool-${toolId}`);
        if (newButton) {
            this.setActiveButton(newButton);
        }

        // Notify callback
        if (this.onToolChange) {
            this.onToolChange(toolId);
        }

        console.log(`Tool selected: ${toolId}`);
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ignore if typing in input/textarea
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            const keyMap = {
                'v': 'pan',
                's': 'select',
                'b': 'box',
                'l': 'line',
                't': 'text'
            };

            const tool = keyMap[e.key.toLowerCase()];
            if (tool) {
                e.preventDefault();
                this.selectTool(tool);
            }
        });
    }

    getCurrentTool() {
        return this.currentTool;
    }

    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}
