/** Film grain + vignette over the whole frame. Purely decorative; never intercepts input. */
export function Atmosphere() {
  return (
    <>
      <div aria-hidden className="film-vignette pointer-events-none fixed inset-0 z-40" />
      <div aria-hidden className="film-grain pointer-events-none fixed inset-[-50%] z-40" />
    </>
  );
}
