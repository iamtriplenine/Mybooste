import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";

import Catalog from "./components/Catalog";
import ProductPage from "./components/ProductPage";

import {
  GUEST_USER,
  USERS,
  findUserById,
} from "./data/users";
import "./App.css";



const formatBalance = (value) =>
  new Intl.NumberFormat("fr-FR").format(value);


const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const PROFILE_STORAGE_KEY = "mybooste-profile-id";

function readStoredProfileId() {
  return window.localStorage.getItem(PROFILE_STORAGE_KEY) ?? "";
}

function getAbidjanToday() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Abidjan",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  );

  return new Date(
    Date.UTC(values.year, values.month - 1, values.day),
  );
}

function createCurrentWeek(activity = []) {
  const today = getAbidjanToday();
  const currentDayIndex = (today.getUTCDay() + 6) % 7;

  const monday = new Date(today);
  monday.setUTCDate(today.getUTCDate() - currentDayIndex);

  return DAYS.map((day, index) => {
    const date = new Date(monday);
    date.setUTCDate(monday.getUTCDate() + index);

    return {
      day,
      date: date.getUTCDate(),
      active: activity[index]?.active ?? false,
      current: index === currentDayIndex,
    };
  });
}

function useAutomaticWeek(activity) {
  const [week, setWeek] = useState(() =>
    createCurrentWeek(activity),
  );

  useEffect(() => {
    const updateCalendar = () => {
      setWeek(createCurrentWeek(activity));
    };

    const timer = window.setInterval(updateCalendar, 60_000);

    return () => window.clearInterval(timer);
  }, [activity]);

  return week;
}

function Icon({ name, size = 22 }) {
  const paths = {
    user: (
      <>
        <path d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </>
    ),
    coins: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 8v8M15 8v8" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    arrow: (
      <>
        <path d="m15 18-6-6 6-6" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21H10v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3V10h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3H14v.1A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.16.38.37.72.6 1 .3.34.7.55 1.1.6h.1V14h-.1a1.7 1.7 0 0 0-1.7 1Z" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
  };


  

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function HeaderActions({ user }) {
  return (
    <div className="header-actions">
      <div className="coin-pill liquid-glass">
        <Icon name="coins" size={19} />

        <span>
          {formatBalance(user.balance)} {user.currency}
        </span>

        <button
          className="add-balance"
          type="button"
          aria-label="Recharger le solde"
          title="Recharge manuelle bientôt disponible"
        >
          <Icon name="plus" size={17} />
        </button>
      </div>

      <button
        className="glass-icon liquid-glass"
        type="button"
        aria-label="Notifications"
      >
        <Icon name="bell" />

        {user.notifications > 0 && <span className="notification-dot" />}
      </button>

      <Link
        className="glass-icon profile-link liquid-glass"
        to="/profil"
        aria-label="Ouvrir le profil"
      >
        <Icon name="user" />
      </Link>
    </div>
  );
}

function Home() {
  const storedUser = findUserById(readStoredProfileId());
const user = storedUser ?? GUEST_USER;

  return (
    <div className="app-page home-page">
      <header className="home-header">
        <Link className="brand" to="/">
          <span className="brand-mark">M</span>
          <span>MyBooste</span>
        </Link>

        <HeaderActions user={user} />
      </header>

      <main className="home-hero">
        <div className="hero-glow" />

        <div className="hero-content">
          <span className="hero-label">MYBOOSTE</span>

          <h1>
            Une plateforme.
            <br />
            Toutes les possibilités.
          </h1>

          <p>
            La base de la nouvelle plateforme est prête. Les différentes
            fonctionnalités et catégories seront ajoutées progressivement.
          </p>

          <Link className="primary-button liquid-glass" to="/profil">
            Voir mon profil
            <Icon name="user" size={20} />
          </Link>
        </div>
      </main>


      <Catalog user={user} />


    </div>
  );
}

function Avatar({ user }) {
  if (user.avatar) {
    return <img src={user.avatar} alt={`Profil de ${user.name}`} />;
  }

  return <span>{user.initials}</span>;
}

function Profile() {
  const { id } = useParams();

  const [activeUserId, setActiveUserId] = useState(
    () => id || readStoredProfileId(),
  );

  const [identifier, setIdentifier] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginError, setLoginError] = useState("");

  const user = findUserById(activeUserId) ?? GUEST_USER;
  const isGuest = user.id === GUEST_USER.id;

  const automaticWeek = useAutomaticWeek(user.week ?? []);

  function handleLogin(event) {
    event.preventDefault();

    const cleanedIdentifier = identifier.trim();
    const foundUser = findUserById(cleanedIdentifier);

    if (!foundUser) {
      setLoginError("Identifiant introuvable.");
      return;
    }

    window.localStorage.setItem(
      PROFILE_STORAGE_KEY,
      foundUser.id,
    );

    setActiveUserId(foundUser.id);
    setIdentifier("");
    setLoginError("");
    setIsLoginOpen(false);
  }

  function handleLogout() {
    window.localStorage.removeItem(PROFILE_STORAGE_KEY);

    setActiveUserId("");
    setIdentifier("");
    setLoginError("");
    setIsLoginOpen(false);
  }

  return (


    <div className="app-page profile-page">
      <header className="profile-toolbar">
        <Link className="back-button liquid-glass" to="/">
          <Icon name="arrow" size={19} />
          <span>Accueil</span>
        </Link>

        <div className="toolbar-right">
          <div className="coin-pill liquid-glass">
            <Icon name="coins" size={19} />

            <span>
              {formatBalance(user.balance)} {user.currency}
            </span>

            <button
              className="add-balance"
              type="button"
              aria-label="Recharger le solde"
            >
              <Icon name="plus" size={17} />
            </button>
          </div>

          <button
            className="glass-icon liquid-glass"
            type="button"
            aria-label="Paramètres"
          >
            <Icon name="settings" />
          </button>

          <button
            className="glass-icon liquid-glass"
            type="button"
            aria-label="Notifications"
          >
            <Icon name="bell" />
            {user.notifications > 0 && <span className="notification-dot" />}
          </button>
        </div>
      </header>

      <main className="profile-container">
        <section className="profile-identity">
          <div className="avatar-ring">
            <div className="profile-avatar">
              <Avatar user={user} />
            </div>
          </div>

          <h1>{user.name}</h1>
          <p>{user.username}</p>
          <span className="member-id">{user.id}</span>
        </section>

        <section
  className={`login-panel liquid-glass ${
    isLoginOpen ? "login-panel-open" : ""
  }`}
>
  <button
    className="login-toggle"
    type="button"
    onClick={() => {
      setIsLoginOpen((current) => !current);
      setLoginError("");
    }}
  >
    <span className="login-toggle-left">
      <span className="login-user-icon">
        <Icon name="user" size={19} />
      </span>

      <span>
        {isGuest
          ? "Se connecter"
          : `Connecté : ${user.id}`}
      </span>
    </span>

    <span
      className={`login-chevron ${
        isLoginOpen ? "login-chevron-open" : ""
      }`}
    >
      <Icon name="arrow" size={18} />
    </span>
  </button>

  {isLoginOpen && (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="identifier-field">
        <label htmlFor="profile-identifier">
          Identifiant
        </label>

        <input
          id="profile-identifier"
          type="text"
          value={identifier}
          onChange={(event) => {
            setIdentifier(event.target.value.toUpperCase());
            setLoginError("");
          }}
          placeholder="Exemple : MB-0001"
          autoComplete="off"
          autoFocus
        />
      </div>

      {loginError && (
        <p className="login-error">{loginError}</p>
      )}

      <div className="login-actions">
        <button
          className="login-submit"
          type="submit"
          disabled={!identifier.trim()}
        >
          Se connecter
        </button>

        {!isGuest && (
          <button
            className="logout-button"
            type="button"
            onClick={handleLogout}
          >
            Se déconnecter
          </button>
        )}
      </div>
    </form>
  )}
</section>

        <section className="stats-grid liquid-glass">
          <article>
            <strong>{user.activity}%</strong>
            <span>Activité</span>
          </article>

          <article>
            <strong>{user.level}</strong>
            <span>Niveau</span>
          </article>

          <article>
            <strong>{user.days}</strong>
            <span>Jours</span>
          </article>
        </section>

        <section className="week-card liquid-glass">
          <div className="section-heading">
            <div>
              <span className="section-kicker">ACTIVITÉ</span>
              <h2>Cette semaine</h2>
            </div>

            <Icon name="calendar" />
          </div>

          <div className="week-grid">
            {automaticWeek.map((item) => (
              <div
                className={`day-card ${item.current ? "current" : ""}`}
                key={item.day}
              >
                <span className={`activity-point ${item.active ? "active" : ""}`} />
                <small>{item.day}</small>
                <strong>{item.date}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="profile-cards">
          <article className="info-card liquid-glass">
            <div className="info-icon">
              <Icon name="user" />
            </div>

            <div>
              <span className="section-kicker">COMPTE</span>
              <h2>Profil public</h2>
              <p>
                Les informations visibles sur ce profil sont enregistrées
                manuellement.
              </p>
            </div>
          </article>

          <article className="highlight-card liquid-glass">
            <div>
              <span className="section-kicker">MONNAIE</span>
              <h2>{formatBalance(user.balance)} crédits</h2>
              <p>
                Le rechargement sera traité manuellement par l’équipe via
                WhatsApp.
              </p>
            </div>

            <button type="button" className="round-action" aria-label="Ajouter">
              <Icon name="plus" />
            </button>
          </article>
        </section>

        {user.joinedAt && (
  <p className="joined-date">
    Membre depuis le {user.joinedAt}
  </p>
)}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/profil" element={<Profile />} />
  <Route path="/profil/:id" element={<Profile />} />

  <Route
  path="/produit/:id"
  element={<ProductPage />}
/>

  <Route path="*" element={<Home />} />
</Routes>
  );
}