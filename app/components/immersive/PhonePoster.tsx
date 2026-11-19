/** CSS glass phone — used when WebGL is skipped (mobile / low-end / reduced-motion). */
export function PhonePoster({ state = "idle" }: { state?: string }) {
  return (
    <div className={`phone-poster phone-poster--${state}`} aria-hidden="true">
      <div className="phone-poster__glow" />
      <div className="phone-poster__shaft phone-poster__shaft--a" />
      <div className="phone-poster__shaft phone-poster__shaft--b" />
      <div className="phone-poster__body">
        <div className="phone-poster__bezel">
          <div className="phone-poster__screen">
            <div className="phone-poster__core" />
            <div className="phone-poster__notch" />
          </div>
        </div>
      </div>
      <div className="phone-poster__particles">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} style={{ ["--i" as string]: i }} />
        ))}
      </div>
    </div>
  );
}
