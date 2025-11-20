# Design Guidelines: Axiom Trade Pulse Token Discovery Table Clone

## Design Approach
**Reference-Based Approach**: Drawing inspiration from crypto trading platforms (Axiom Trade, Birdeye, DEXTools) with focus on information density, real-time data visualization, and dark theme aesthetics optimized for extended trading sessions.

## Core Design Principles
1. **Information Density**: Maximize data visibility while maintaining scannability
2. **Performance Perception**: Instant feedback through micro-animations and skeleton states
3. **Trust & Clarity**: Clear risk indicators and color-coded signals for rapid decision-making
4. **Speed**: Minimal friction between data and action (Quick Buy button)

## Typography System
- **Primary Font**: Inter or System UI for headers and labels
- **Data Font**: JetBrains Mono or SF Mono for addresses, numbers, and prices (monospace ensures alignment)
- **Hierarchy**:
  - Tab labels: 14px font-semibold
  - Table headers: 12px font-medium uppercase tracking-wide
  - Token names: 14px font-bold
  - Data cells: 13px font-normal
  - Contract addresses: 12px font-mono
  - Metadata/timestamps: 11px font-normal text-gray-400

## Color Palette
**Dark Theme Foundation**:
- Background: #0a0e14 (deep charcoal)
- Surface: #141922 (card/table background)
- Border: #1f2937 (subtle dividers)

**Data Visualization**:
- Positive/Bullish: #10b981 (green-500) for price increases
- Negative/Bearish: #ef4444 (red-500) for price decreases
- Warning: #f59e0b (amber-500) for caution indicators
- Neutral: #6b7280 (gray-500) for stable data
- Accent: #3b82f6 (blue-500) for links and interactive elements
- Quick Buy: #fbbf24 (yellow-400) for lightning bolt icon

**Flash Animations**:
- Green flash: bg-green-500/20 fading to transparent over 500ms
- Red flash: bg-red-500/20 fading to transparent over 500ms

**Text Colors**:
- Primary: #f9fafb (gray-50)
- Secondary: #9ca3af (gray-400)
- Muted: #6b7280 (gray-500)

## Layout & Spacing System
**Tailwind Units**: Consistently use 2, 3, 4, 6, 8, 12 for spacing
- Table cell padding: px-4 py-3
- Section spacing: py-6
- Tab bar padding: px-6 py-4
- Filter bar padding: px-6 py-3
- Card spacing: p-6
- Gap between elements: gap-4 for most, gap-2 for tight groupings

**Container**:
- Max width: max-w-full (full viewport for data density)
- Inner content padding: px-6 lg:px-8

**Table Layout**:
- Compact row height: h-14
- Fixed column widths for stability (no layout shift)
- Sticky header: position-sticky top-0 with backdrop-blur

## Component Library

### Navigation Tabs
- Horizontal tab bar with three sections
- Active tab: border-b-2 border-blue-500, text-white
- Inactive tabs: text-gray-400, hover:text-gray-300
- Smooth transition: transition-colors duration-200
- Bottom border under entire tab bar: border-b border-gray-800

### Token Table
- Zebra striping: alternate rows subtle hover:bg-gray-800/50
- Hover state: bg-gray-800/30 transition-colors duration-150
- Column headers: bg-gray-900/50 sticky top-0 backdrop-blur-sm
- Sortable columns: cursor-pointer with arrow indicators (↑↓)
- Responsive: horizontal scroll on mobile with sticky first column

### Token Row Columns (in order):
1. **Token Logo + Symbol**: 40px circular image, bold symbol text
2. **Contract Address**: Truncated (abc...xyz) with tooltip on hover
3. **Age**: Relative time (2m, 15m, 1h) in gray-400
4. **Market Cap**: $XXX.XK format, white text
5. **Liquidity**: $XXX.XK format, white text
6. **Volume 24h**: $XXX.XK format, white text
7. **Price**: Monospace, white with decimals in gray-500
8. **Price Change**: Bold percentage with green/red color + background flash
9. **Holders**: Numeric count, gray-300
10. **Top Holder %**: Percentage with risk color coding
11. **Snipers %**: Percentage with warning color if >20%
12. **TX Count**: Numeric, gray-300
13. **Quick Buy**: Lightning bolt (⚡) button, yellow-400 with hover:bg-yellow-500/10 rounded-full p-2

### Interactive Components

**Tooltips** (for contract addresses, hover data):
- Dark background: bg-gray-900 border border-gray-700
- Small text: text-xs
- Arrow pointing to target
- Appear on hover with 200ms delay

**Popovers** (for quick actions, filters):
- Elevated surface: bg-gray-800 shadow-xl rounded-lg
- Border: border-gray-700
- Padding: p-4
- Max width: max-w-xs

**Modals** (for token details, quick buy confirmation):
- Overlay: bg-black/80 backdrop-blur-sm
- Content card: bg-gray-900 rounded-xl max-w-2xl
- Header with close button
- Footer with action buttons

### Loading States

**Skeleton Loaders**:
- Base: bg-gray-800 rounded
- Shimmer effect: animated gradient from gray-800 to gray-700
- Row skeletons: h-14 with pulsing animation
- Column skeletons match actual column widths

**Progressive Loading**:
- Load first 20 rows immediately
- Show "Loading more..." indicator at bottom
- Infinite scroll or "Load More" button

### Filter Bar
- Sticky position below tabs
- Inline filter chips: rounded-full bg-gray-800 px-3 py-1.5 text-sm
- Clear filters button: text-blue-400 hover:text-blue-300
- Preset filters dropdown with popular configurations

### Risk Indicators
- Badge system: rounded px-2 py-0.5 text-xs font-medium
- Low risk: bg-green-500/20 text-green-400
- Medium risk: bg-yellow-500/20 text-yellow-400
- High risk: bg-red-500/20 text-red-400

## Animations
**Minimal & Purposeful**:
- Price flash: 500ms fade on updates
- Tab switching: 200ms slide transition
- Hover states: 150ms color transitions
- Modal entrance: 200ms scale + fade
- No distracting scroll animations

## Accessibility
- Keyboard navigation for tabs and sortable columns
- ARIA labels for lightning bolt buttons
- Focus visible states: ring-2 ring-blue-500
- High contrast mode support

## Responsive Behavior
- Desktop (1280px+): All columns visible, optimal width
- Tablet (768px-1279px): Horizontal scroll, sticky first two columns
- Mobile (<768px): Simplified view with key metrics only, stack on tap for details

This design prioritizes rapid information processing and instant trade execution for crypto traders in a dark, professional interface.