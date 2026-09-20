import { Link, useParams } from "react-router-dom";
import { findProductById } from "../data/products";
import ProductIcon from "./ProductIcon";
import "../styles/product-page.css";

export default function ProductPage() {
  const { id } = useParams();
  const product = findProductById(id);

  if (!product) {
    return (
      <main className="product-page product-not-found">
        <section className="product-message liquid-glass">
          <span className="section-kicker">PRODUIT</span>
          <h1>Produit introuvable</h1>

          <p>
            Cet identifiant ne correspond à aucun produit.
          </p>

          <Link className="product-primary-button" to="/">
            Retour à l’accueil
          </Link>
        </section>
      </main>
    );
  }

  const canAccess = product.access === "free";

  return (
    <div className="product-page">
      <header className="product-page-header">
        <Link className="product-back liquid-glass" to="/">
          <span aria-hidden="true">←</span>
          <span>Accueil</span>
        </Link>

        <span className="product-header-id">
          {product.id}
        </span>
      </header>

      <main className="product-page-container">
        <section className="product-detail-heading">
          <div className="product-detail-icon liquid-glass">
            <ProductIcon name={product.icon} size={46} />
          </div>

          <div>
            <div className="product-detail-labels">
              <span>{product.type}</span>

              {product.access === "free" && (
                <span className="free-label">
                  Gratuit
                </span>
              )}
            </div>

            <h1>{product.title}</h1>
            <p>{product.description}</p>
          </div>
        </section>

        {!canAccess && (
          <section className="product-message liquid-glass">
            <h2>Accès nécessaire</h2>
            <p>
              Ce produit doit être ajouté à ton compte
              avant de pouvoir être consulté.
            </p>
          </section>
        )}

        {canAccess && !product.file && (
          <section className="product-message liquid-glass">
            <h2>Fichier bientôt disponible</h2>
            <p>
              Aucun fichier n’est encore associé à ce
              produit.
            </p>
          </section>
        )}

        {canAccess &&
          product.file &&
          product.contentType === "pdf" && (
            <section className="product-content">
              <div className="document-actions">
                <a
                  className="document-button secondary"
                  href={product.file}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ouvrir dans un nouvel onglet
                </a>

                <a
                  className="document-button primary"
                  href={product.file}
                  download={product.downloadName}
                >
                  Télécharger
                </a>
              </div>

              <div className="pdf-viewer liquid-glass">
                <iframe
                  src={`${product.file}#toolbar=1&navpanes=0`}
                  title={product.title}
                  loading="lazy"
                />
              </div>

              <p className="pdf-fallback">
                Si le lecteur ne s’affiche pas sur ton
                appareil, utilise le bouton « Ouvrir dans
                un nouvel onglet ».
              </p>
            </section>
          )}
      </main>
    </div>
  );
}