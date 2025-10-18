# LOTP Badge Design Specification

## Dimensions
- Export: 954×1518 px (portrait, 1.5× retina)
- Print ready: 637×1011 px @ 300 dpi (future use)

## Colors
- Black: #000000
- Gold: #D4AF37
- Gold Dark: #A88427
- Green Accent: #2EB67D (sparingly)

## Park Codes & Accent Colors
- Acacia → ACAC → #D4AF37 (gold)
- Discovery → DISC → #1E88E5 (blue) & #8BC34A (lime)
- Veterans → VETS → #6A1B9A (purple)
- Sunset → SUNS → #C62828 (red)

## Typography
- Headlines: Cinzel (tracking +8)
- Data fields: Inter
- Member ID: Roboto Mono

## Member ID Format
LTP-<PARK4>-<000000>

## Barcode Payload (Code-128)
LOTP|v1|<member_id>|<park_code>|<issued_at_iso>

## Badge Fields (Privacy-Safe)
✅ Name, Role, Park Code, Member ID, Join MM/YYYY
❌ NO DOB, NO street address

## Layout
- Left: 240px circular photo + 2px gold ring
- Right: Name → Role → 2-column spec list
- Bottom: 128px gold barcode band with Code-128 bars

## Visual Details
- 1px faint gold inner frame around whole card
- 3-4% diagonal noise texture on black background
- Micro green dot separator between fields
- Mono caption in barcode band with 1px hairline above
