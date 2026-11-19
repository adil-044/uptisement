import { ImmersiveHome } from "./components/ImmersiveHome";

/**
 * Server-rendered LCP shell (wordmark) so paint is not gated on hydration.
 * Phone + chrome hydrate via ImmersiveHome.
 */
export default function HomePage() {
  return (
    <div className="immersive-home">
      <h1 className="immersive-wordmark" id="uptisement-brand">
        <span>Uptisement</span>
      </h1>
      <ImmersiveHome />
    </div>
  );
}
