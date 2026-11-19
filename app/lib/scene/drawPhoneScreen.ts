/**
 * Crisp 2D UI drawn onto a canvas — used as Three.js screen texture
 * and mirrored by PhonePoster DOM for no-WebGL / mobile.
 */

export type PhoneScreenState =
  | "idle"
  | "ring"
  | "missed"
  | "lost"
  | "text"
  | "quote"
  | "booked"
  | "review";

const W = 420;
const H = 860;

const INK = "#0B1220";
const PAPER = "#F2F5F8";
const MINT = "#3DDC97";
const ORANGE = "#D9480F";
const MUTED = "#8A96A8";

export function screenAccent(state: PhoneScreenState): "mint" | "orange" | "ink" {
  if (state === "ring" || state === "missed" || state === "lost") return "orange";
  if (state === "text" || state === "quote" || state === "booked" || state === "review")
    return "mint";
  return "ink";
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawStatusBar(ctx: CanvasRenderingContext2D, time: string, tint: string) {
  ctx.fillStyle = tint;
  ctx.font = "600 22px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(time, 36, 56);
  ctx.textAlign = "right";
  ctx.fillText("▮▮▮", W - 36, 56);
}

function drawIdle(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);
  // soft mint wash
  const g = ctx.createRadialGradient(W / 2, H * 0.42, 20, W / 2, H * 0.42, 280);
  g.addColorStop(0, "rgba(61,220,151,0.35)");
  g.addColorStop(1, "rgba(11,18,32,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  drawStatusBar(ctx, "7:04", PAPER);
  ctx.fillStyle = PAPER;
  ctx.font = "700 34px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Uptisement", W / 2, H * 0.42);
  ctx.fillStyle = MUTED;
  ctx.font = "500 20px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("Booking-first for trades", W / 2, H * 0.42 + 36);
}

function drawMissedCall(ctx: CanvasRenderingContext2D, ringing: boolean) {
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);
  const g = ctx.createRadialGradient(W / 2, H * 0.38, 10, W / 2, H * 0.38, 260);
  g.addColorStop(0, ringing ? "rgba(217,72,15,0.55)" : "rgba(217,72,15,0.28)");
  g.addColorStop(1, "rgba(11,18,32,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  drawStatusBar(ctx, "7:04", PAPER);

  // avatar
  ctx.beginPath();
  ctx.arc(W / 2, 210, 54, 0, Math.PI * 2);
  ctx.fillStyle = "#1a2436";
  ctx.fill();
  ctx.strokeStyle = ORANGE;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = ORANGE;
  ctx.font = "700 36px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("J", W / 2, 222);

  ctx.fillStyle = PAPER;
  ctx.font = "700 40px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText(ringing ? "Incoming call" : "Missed call", W / 2, 310);
  ctx.fillStyle = MUTED;
  ctx.font = "500 22px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("Jordan · furnace lead", W / 2, 348);
  ctx.fillStyle = ORANGE;
  ctx.font = "700 26px ui-monospace, Menlo, monospace";
  ctx.fillText(ringing ? "RINGING" : "7:04 PM", W / 2, 400);

  // decline / answer pills
  roundRect(ctx, 48, H - 160, 140, 52, 26);
  ctx.fillStyle = ringing ? "#3a1520" : "#2a1520";
  ctx.fill();
  roundRect(ctx, W - 188, H - 160, 140, 52, 26);
  ctx.fillStyle = ringing ? "#143028" : "#1a2436";
  ctx.fill();
  ctx.fillStyle = PAPER;
  ctx.font = "600 18px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText(ringing ? "Decline" : "Call back", 118, H - 128);
  ctx.fillText(ringing ? "Answer" : "Message", W - 118, H - 128);
}

function drawLost(ctx: CanvasRenderingContext2D) {
  drawMissedCall(ctx, false);
  ctx.fillStyle = "rgba(11,18,32,0.55)";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = ORANGE;
  ctx.font = "700 32px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("No answer", W / 2, H * 0.55);
  ctx.fillStyle = PAPER;
  ctx.font = "500 20px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("Lead went cold", W / 2, H * 0.55 + 36);
}

function drawTextBack(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#0e1624";
  ctx.fillRect(0, 0, W, H);
  drawStatusBar(ctx, "7:05", PAPER);
  ctx.fillStyle = PAPER;
  ctx.font = "700 28px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Jordan", 36, 110);
  ctx.fillStyle = MUTED;
  ctx.font = "500 18px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("Text · sent from your number", 36, 138);

  // outgoing bubble
  roundRect(ctx, 90, 200, 290, 130, 22);
  ctx.fillStyle = MINT;
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = "600 22px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "left";
  const lines = [
    "Hey Jordan — missed your",
    "call. Still need help with",
    "the furnace tonight?",
  ];
  lines.forEach((line, i) => ctx.fillText(line, 110, 240 + i * 30));

  ctx.fillStyle = MUTED;
  ctx.font = "500 16px ui-monospace, Menlo, monospace";
  ctx.textAlign = "right";
  ctx.fillText("Delivered · 7:05 PM", W - 40, 360);

  // reply hint
  roundRect(ctx, 36, 400, 220, 72, 18);
  ctx.fillStyle = "#1a2436";
  ctx.fill();
  ctx.fillStyle = PAPER;
  ctx.font = "500 20px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Yes — still need it", 52, 444);
}

function drawQuote(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#0e1624";
  ctx.fillRect(0, 0, W, H);
  drawStatusBar(ctx, "7:07", PAPER);
  ctx.fillStyle = PAPER;
  ctx.font = "700 28px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Rough range", 36, 120);
  ctx.fillStyle = MUTED;
  ctx.font = "500 18px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("Photo quote · you approve first", 36, 150);

  roundRect(ctx, 28, 190, W - 56, 320, 24);
  ctx.fillStyle = "#152033";
  ctx.fill();
  ctx.strokeStyle = "rgba(61,220,151,0.45)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = MUTED;
  ctx.font = "600 16px ui-monospace, Menlo, monospace";
  ctx.fillText("ESTIMATE", 52, 240);
  ctx.fillStyle = MINT;
  ctx.font = "800 56px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("$180–$320", 52, 310);
  ctx.fillStyle = PAPER;
  ctx.font = "500 20px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("Furnace no-heat visit", 52, 360);
  ctx.fillStyle = MUTED;
  ctx.font = "500 18px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("Parts extra if needed", 52, 392);
  ctx.fillText("Crew photo only · simulated", 52, 424);

  roundRect(ctx, 52, 450, W - 160, 44, 22);
  ctx.fillStyle = MINT;
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = "700 18px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Send to Jordan →", W / 2, 478);
}

function drawBooked(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#0e1624";
  ctx.fillRect(0, 0, W, H);
  drawStatusBar(ctx, "7:10", PAPER);

  // mint success wash
  const g = ctx.createRadialGradient(W / 2, 280, 20, W / 2, 280, 300);
  g.addColorStop(0, "rgba(61,220,151,0.4)");
  g.addColorStop(1, "rgba(14,22,36,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // calendar card
  roundRect(ctx, 36, 160, W - 72, 380, 28);
  ctx.fillStyle = "#152033";
  ctx.fill();
  ctx.strokeStyle = MINT;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = MINT;
  ctx.font = "700 18px ui-monospace, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.fillText("CONFIRMED", W / 2, 210);

  ctx.fillStyle = PAPER;
  ctx.font = "800 44px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("Booked", W / 2, 280);
  ctx.font = "700 36px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("9:00 AM", W / 2, 340);

  ctx.fillStyle = MUTED;
  ctx.font = "500 20px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("Tomorrow · on your calendar", W / 2, 390);
  ctx.fillText("Lead board → Booked", W / 2, 424);

  // check
  ctx.beginPath();
  ctx.arc(W / 2, 490, 28, 0, Math.PI * 2);
  ctx.fillStyle = MINT;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 12, 490);
  ctx.lineTo(W / 2 - 2, 500);
  ctx.lineTo(W / 2 + 14, 480);
  ctx.stroke();
}

function drawReview(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#0e1624";
  ctx.fillRect(0, 0, W, H);
  drawStatusBar(ctx, "7:12", PAPER);
  ctx.fillStyle = PAPER;
  ctx.font = "700 28px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("After the job", 36, 120);
  ctx.fillStyle = MUTED;
  ctx.font = "500 18px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("Thank-you + Google review link", 36, 150);

  roundRect(ctx, 28, 190, W - 56, 300, 24);
  ctx.fillStyle = "#152033";
  ctx.fill();

  ctx.fillStyle = PAPER;
  ctx.font = "600 22px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("How was the visit?", W / 2, 250);

  // 5 stars
  ctx.fillStyle = MINT;
  ctx.font = "700 42px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("★★★★★", W / 2, 330);

  ctx.fillStyle = MUTED;
  ctx.font = "500 18px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("Same link to everyone", W / 2, 380);
  ctx.fillText("No review gating", W / 2, 410);

  roundRect(ctx, 70, 440, W - 140, 48, 24);
  ctx.fillStyle = MINT;
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = "700 18px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("Leave a Google review →", W / 2, 470);
}

/** Paint one screen state into an existing canvas (resizes to W×H). */
export function drawPhoneScreen(
  canvas: HTMLCanvasElement,
  state: PhoneScreenState,
): void {
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  switch (state) {
    case "idle":
      drawIdle(ctx);
      break;
    case "ring":
      drawMissedCall(ctx, true);
      break;
    case "missed":
      drawMissedCall(ctx, false);
      break;
    case "lost":
      drawLost(ctx);
      break;
    case "text":
      drawTextBack(ctx);
      break;
    case "quote":
      drawQuote(ctx);
      break;
    case "booked":
      drawBooked(ctx);
      break;
    case "review":
      drawReview(ctx);
      break;
  }
}

export const PHONE_SCREEN_SIZE = { w: W, h: H };
