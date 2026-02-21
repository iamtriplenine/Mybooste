import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const { pathname } = useLocation();

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    zIndex: 999,
  };

  const drawerStyle = {
    position: "fixed",
    left: 16,
    top: 16,
    height: "calc(100vh - 32px)",
    width: 280,

    padding: 18,

    borderRadius: 28,

    /* Glass */
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    boxShadow: "0 18px 60px rgba(0, 0, 0, 0.45)",

    transform: open ? "translateX(0)" : "translateX(-120%)",
    transition: "transform 0.25s ease",

    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  };

  const topRow = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const titleStyle = { margin: 0, fontWeight: 700, letterSpacing: 0.4 };

  const closeBtnStyle = {
    width: 40,
    height: 40,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.10)",
    color: "white",
    cursor: "pointer",
    transition: "transform 0.18s ease, background 0.18s ease",
  };

  const navStyle = { display: "flex", flexDirection: "column", gap: 10 };

  const linkStyle = (active) => ({
    textDecoration: "none",
    color: "white",
    padding: "12px 14px",
    borderRadius: 18,

    background: active ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.14)",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    transition: "transform 0.18s ease, background 0.18s ease",
  });

  const hintStyle = {
    marginTop: "auto",
    fontSize: 12,
    opacity: 0.75,
    borderTop: "1px solid rgba(255,255,255,0.12)",
    paddingTop: 12,
    lineHeight: 1.4,
  };

  return (
    <>
      {open && <div onClick={() => setOpen(false)} style={overlayStyle} />}

      <aside style={drawerStyle}>
        <div style={topRow}>
          <h3 style={titleStyle}>Menu</h3>
          <button
            onClick={() => setOpen(false)}
            style={closeBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.16)";
              e.currentTarget.style.transform = "scale(1.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.10)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <nav style={navStyle}>
          <Link
            to="/"
            onClick={() => setOpen(false)}
            style={linkStyle(pathname === "/")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span>Accueil</span>
            <span style={{ opacity: 0.7 }}>›</span>
          </Link>

          <Link
            to="/public"
            onClick={() => setOpen(false)}
            style={linkStyle(pathname === "/public")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span>Fonction publique</span>
            <span style={{ opacity: 0.7 }}>›</span>
          </Link>

          <Link
            to="/private"
            onClick={() => setOpen(false)}
            style={linkStyle(pathname === "/private")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span>Fonction privée</span>
            <span style={{ opacity: 0.7 }}>›</span>
          </Link>
        </nav>

        <div style={hintStyle}>
          Certaines fonctionnalités seront disponibles sans profil, d’autres demanderont la création d’un profil.
        </div>
      </aside>
    </>
  );
}