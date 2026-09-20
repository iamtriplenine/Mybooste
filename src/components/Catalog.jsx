import { useMemo, useState } from "react";
import { PRODUCTS, SECTIONS } from "../data/products";
import ProductIcon from "./ProductIcon";
import "../styles/catalog.css";

import { Link } from "react-router-dom";

const AUTOMATIC_FORMATS = [
  "square",
  "tall",
  "wide",
  "square",
  "wide",
  "tall",
  "square",
];

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-FR").format(price);

export default function Catalog({ user }) {
  const [activeSection, setActiveSection] = useState("all");

  const filteredProducts = useMemo(() => {
    if (activeSection === "all") {
      return PRODUCTS;
    }

    return PRODUCTS.filter(
      (product) => product.section === activeSection,
    );
  }, [activeSection]);

  return (
    <section className="catalog">
      <div className="catalog-heading">
        <div>
          <span className="section-kicker">EXPLORER</span>
          <h2>Tout découvrir</h2>
        </div>

        <span className="product-count">
          {filteredProducts.length} produits
        </span>
      </div>

      <div className="section-navigation liquid-glass">
        {SECTIONS.map((section) => (
          <button
            className={`section-button ${
              activeSection === section.id ? "active" : ""
            }`}
            type="button"
            key={section.id}
            aria-pressed={activeSection === section.id}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="product-masonry">
        {filteredProducts.map((product, index) => {
          const format =
            product.format ??
            AUTOMATIC_FORMATS[
              index % AUTOMATIC_FORMATS.length
            ];

          const owned =
            user?.ownedProducts?.includes(product.id) ?? false;

          return (
            <Link
  className={`product-card product-${format} liquid-glass ${
    product.coverImage ? "product-has-cover" : ""
  }`}
  key={product.id}
  to={`/produit/${product.id}`}
>
              {product.coverImage ? (
  <div
    className="product-cover-image"
    style={{
      backgroundImage: `url("${product.coverImage}")`,
    }}
    aria-hidden="true"
  />
) : (
  <div className="product-card-glow" />
)}

              <div className="product-card-top">
                <span className="product-type">
                  {product.type}
                </span>

                <span className="product-id">
                  {product.id}
                </span>
              </div>

              {!product.coverImage && (
  <div className="product-icon">
    <ProductIcon
      name={product.icon}
      size={format === "tall" ? 58 : 44}
    />
  </div>
)}

              <div className="product-information">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>

              <div className="product-card-bottom">
                {owned ? (
                  <span className="access-badge owned">
                    Possédé
                  </span>
                ) : product.access === "free" ? (
                  <span className="access-badge free">
                    Gratuit
                  </span>
                ) : (
                  <span className="product-price">
                    {formatPrice(product.price)} MB
                  </span>
                )}

                <span className="product-arrow">→</span>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-section liquid-glass">
          Aucun produit dans cette section.
        </div>
      )}
    </section>
  );
}