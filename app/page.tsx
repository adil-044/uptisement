import { ImmersiveHome } from "./components/ImmersiveHome";
import { PhonePoster } from "./components/immersive/PhonePoster";

/**
 * Server-rendered LCP shell (wordmark + phone) so paint is not gated on hydration.
 * ImmersiveHome hydrates nav/scroll/WebGL on top.
 */
export default function HomePage() {
  return (
    <div className="immersive-home">
      <h1 className="immersive-wordmark" id="uptisement-brand">
        <span>Uptisement</span>
      </h1>
      <PhonePoster state="idle" />
      <ImmersiveHome />
    </div>
  );
}
