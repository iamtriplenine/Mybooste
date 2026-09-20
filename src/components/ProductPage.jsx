import { Link, useParams } from "react-router-dom";
import { findProductById } from "../data/products";
import ProductIcon from "./ProductIcon";
import "../styles/product-page.css";

import {
  GUEST_USER,
  findUserById,
} from "../data/users";

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

  const storedUserId =
  window.localStorage.getItem("mybooste-profile-id");

const user =
  findUserById(storedUserId) ?? GUEST_USER;

const owned =
  user.ownedProducts?.includes(product.id) ?? false;

const canView =
  product.access === "free" || owned;

const canDownload = owned;

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
          


          <div
  className={`product-detail-icon liquid-glass ${
    product.coverImage ? "product-detail-has-image" : ""
  }`}
>
  {product.coverImage ? (
    <img
      src={product.coverImage}
      alt=""
      aria-hidden="true"
    />
  ) : (
    <ProductIcon name={product.icon} size={46} />
  )}
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

        {!canView && (
          <section className="product-message liquid-glass">
            <h2>Accès nécessaire</h2>
            <p>
              Ce produit doit être ajouté à ton compte
              avant de pouvoir être consulté.
            </p>
          </section>
        )}

        {canView && !product.file && (
          <section className="product-message liquid-glass">
            <h2>Fichier bientôt disponible</h2>
            <p>
              Aucun fichier n’est encore associé à ce
              produit.
            </p>
          </section>
        )}

        {canView &&
          product.file &&
          product.contentType === "pdf" && (
            <section className="product-content">
              

              <div className="pdf-viewer liquid-glass">
                <iframe
                  src={`${product.file}#toolbar=${
                  canDownload ? "1" : "0"
                  }&navpanes=0&view=FitH`}
                  title={product.title}
                  loading="lazy"
                />
              </div>

              <p className="pdf-fallback">
                 {canDownload
                 ? "Ce produit est enregistré dans ton compte. Tu peux le consulter ou le télécharger."
                 : "Ce document peut être consulté sur le site. Le téléchargement est réservé aux propriétaires."}
              </p>
            </section>
          )}
      </main>
    </div>
  );
}