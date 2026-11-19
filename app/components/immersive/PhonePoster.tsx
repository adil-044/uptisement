/** CSS glass phone with chapter screen UI (mobile / no-WebGL). */

type Props = { state?: string };

function ScreenUI({ state }: { state: string }) {
  switch (state) {
    case "ring":
      return (
        <div className="phone-ui phone-ui--orange">
          <p className="phone-ui__time">7:04</p>
          <div className="phone-ui__avatar">J</div>
          <p className="phone-ui__title">Incoming call</p>
          <p className="phone-ui__sub">Jordan · furnace lead</p>
          <p className="phone-ui__badge">RINGING</p>
        </div>
      );
    case "missed":
      return (
        <div className="phone-ui phone-ui--orange">
          <p className="phone-ui__time">7:04</p>
          <div className="phone-ui__avatar">J</div>
          <p className="phone-ui__title">Missed call</p>
          <p className="phone-ui__sub">Jordan · furnace lead</p>
          <p className="phone-ui__badge">7:04 PM</p>
        </div>
      );
    case "lost":
      return (
        <div className="phone-ui phone-ui--orange phone-ui--dim">
          <p className="phone-ui__time">7:08</p>
          <div className="phone-ui__avatar">J</div>
          <p className="phone-ui__title">Missed call</p>
          <p className="phone-ui__title phone-ui__title--sm">No answer</p>
          <p className="phone-ui__sub">Lead went cold</p>
        </div>
      );
    case "text":
      return (
        <div className="phone-ui phone-ui--mint">
          <p className="phone-ui__time">7:05</p>
          <p className="phone-ui__label">Jordan</p>
          <p className="phone-ui__hint">Text · sent from your number</p>
          <div className="phone-ui__bubble">
            Hey Jordan — missed your call. Still need help with the furnace
            tonight?
          </div>
          <p className="phone-ui__meta">Delivered · 7:05 PM</p>
        </div>
      );
    case "quote":
      return (
        <div className="phone-ui phone-ui--mint">
          <p className="phone-ui__time">7:07</p>
          <p className="phone-ui__label">Rough range</p>
          <p className="phone-ui__hint">Photo quote · you approve first</p>
          <div className="phone-ui__card">
            <p className="phone-ui__eyebrow">ESTIMATE</p>
            <p className="phone-ui__price">$180–$320</p>
            <p className="phone-ui__sub">Furnace no-heat visit</p>
            <p className="phone-ui__hint">Crew photo only · simulated</p>
          </div>
        </div>
      );
    case "booked":
      return (
        <div className="phone-ui phone-ui--mint phone-ui--glow">
          <p className="phone-ui__time">7:10</p>
          <div className="phone-ui__card phone-ui__card--booked">
            <p className="phone-ui__eyebrow">CONFIRMED</p>
            <p className="phone-ui__title">Booked</p>
            <p className="phone-ui__price">9:00 AM</p>
            <p className="phone-ui__sub">Tomorrow · on your calendar</p>
          </div>
        </div>
      );
    case "review":
      return (
        <div className="phone-ui phone-ui--mint">
          <p className="phone-ui__time">7:12</p>
          <p className="phone-ui__label">After the job</p>
          <div className="phone-ui__card">
            <p className="phone-ui__title phone-ui__title--sm">How was the visit?</p>
            <p className="phone-ui__stars" aria-hidden="true">
              ★★★★★
            </p>
            <p className="phone-ui__sub">Same link · no review gating</p>
          </div>
        </div>
      );
    default:
      return (
        <div className="phone-ui phone-ui--idle">
          <p className="phone-ui__time">7:04</p>
          <p className="phone-ui__brand">Uptisement</p>
          <p className="phone-ui__sub">Booking-first for trades</p>
        </div>
      );
  }
}

export function PhonePoster({ state = "idle" }: Props) {
  return (
    <div
      className={`phone-poster phone-poster--${state}`}
      data-phone-state={state}
      aria-hidden="true"
    >
      <div className="phone-poster__glow" />
      <div className="phone-poster__shaft phone-poster__shaft--a" />
      <div className="phone-poster__shaft phone-poster__shaft--b" />
      <div className="phone-poster__body">
        <div className="phone-poster__bezel">
          <div className="phone-poster__screen">
            <div className="phone-poster__notch" />
            <ScreenUI state={state} />
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
