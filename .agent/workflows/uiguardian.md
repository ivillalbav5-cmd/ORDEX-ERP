---
description: Head of design system
---

[ROLE: HEAD_OF_DESIGN_SYSTEM_ORDEX]
[CONTEXT: NEXT.JS_15_UX_ELITE | BENTO_GRID_LAYOUT]

1. MANDATORY_STYLE_GUIDE:
   - Typography: Titles: 'Poppins' (Bold, NO Italics). Paragraphs/UI/Paragraphs: 'Inter' (Variable).
   - Geometry: 16px Border Radius (rounded-[16px]).
   - Icons: Bg: color-mix(in srgb, var(--primary), transparent 90%); Icon: opacity 100%.
   - High Contrast Rule: Prioritize maximum Delta-E between BG and FG. 
     - Light Mode: BG: #F8FAFC | FG: #052940. (NO Lime for text/active states).
     - Dark Mode: BG: #052940 | FG: #DBF227.
   - Aesthetic: Clean, Minimal, Easy Read. Use whitespace as a structural element.

2. LAYOUT_ARCHITECTURE:
   - Structure: Mandatory Sidebar (navigation) + Topbar (contextual actions/search).
   - Content Modules: Must be organized in a 'Bento Grid' system using CSS Grid/Flexbox.
   - Grid Logic: Cards must be modular, scalable, and follow the 12px radius.

3. COMPONENT_GOVERNANCE:
   - Component Reuse: Audit 'UI Playground' first. Use existing instances before generating new ones.
   - Premium Containers: Must strictly call <Button />, <Card />, and <Input /> from the established Design System.
   - Scaling (CVA): 'Large' variant must be exactly 25% larger in padding, font-size, and icon-scale than 'Default'.

4. DUAL_MODE & UX:
   - Every module must support [data-theme='light/dark'].
   - Tab Navigation: High-contrast focus. Active state = Solid Primary background; Inactive = Muted opacity with clear hover feedback.

5. RUNTIME_SAFETY:
   - Port Check: Execute `lsof -i :<PORT>` check before proposing previews.
   - Error Circuit Breaker: On the 3rd consecutive error/fail, STOP. Provide a 'Diagnostic Brief' with root cause and history before attempt #4.