# Decorative sidebar button gag

The Figma-style sidebar has three controls that exist only for looks: the
"Add project" plus, the "Edit profile" pencil, and the "Design Engineer"
chevron. Clicking them does nothing today. Instead of wiring real features,
they get an escalating physical gag.

## Behavior

Per button, independent click counter:

1. Click 1: quick head-shake wiggle (~300ms), like a locked field.
2. Click 2: bigger, angrier shake with a slight tilt.
3. Click 3: the button falls off the sidebar — rotates, drops to just above
   the Resume/links section, bounces once, lies tipped over. Clicks while
   fallen are ignored.
4. After ~4s it floats back up to its slot and the counter resets.

## Implementation

- `src/components/DecorativeButton.tsx`: a client component wrapping the
  icon/content. Animations run via the Web Animations API on the button
  element itself (transform only, no layout changes).
- Fall distance is measured from the button to a `data-sidebar-floor`
  marker on the links section inside the `aside`.
- `prefers-reduced-motion: reduce`: clicks do nothing at all.
- No copy, no sound, no global state.
