import { useNavigate } from "react-router-dom";

export default function Header({ setOpen }) {
  const navigate = useNavigate();

  const headerStyle = {
    position: "sticky",
    top: "16px",
    margin: "16px auto",
    width: "calc(98% - 32px)",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "14px 24px",
    borderRadius: "60px",

    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",

    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",

    zIndex: 1000,
  };

  const buttonStyle = {
    background: "rgba(255, 255, 255, 0.12)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "10px 18px",
    borderRadius: "50px",
    color: "white",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  return (
    <header style={headerStyle}>
      <button
        style={buttonStyle}
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      <h2 style={{ margin: 0, fontWeight: 600 }}>
        Mon Application
      </h2>

      <button
        style={buttonStyle}
        onClick={() => navigate("/profile")}
      >
        Profil
      </button>
    </header>
  );
}