// design.md 6.7: the contour files stay untouched. Their fill and filter colours are fixed in the files,
// so as a component reads a file it gives them tokens instead (index.css), as inline styles, which win
// over the files' attributes. `name` picks the contour's opacities: hero, experience or footer.
export function themeContour(svg, name) {
  return svg
    .replaceAll('fill="#DADADA"', 'fill="#DADADA" style="fill: var(--color-ground)"')
    .replace(
      'flood-color="#A8A8A8"',
      `flood-color="#A8A8A8" style="flood-color: var(--contour-shade); flood-opacity: var(--contour-${name}-shade)"`
    )
    .replace(
      'flood-color="#FFFFFF"',
      `flood-color="#FFFFFF" style="flood-color: var(--contour-light); flood-opacity: var(--contour-${name}-light)"`
    )
}
