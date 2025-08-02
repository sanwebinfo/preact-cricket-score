import { useState, useEffect } from "preact/hooks";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (darkMode) {
      body.setAttribute('data-theme', 'dark');
      html.setAttribute('data-theme', 'dark');
    } else {
      body.removeAttribute('data-theme');
      html.removeAttribute('data-theme');
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    }
  }, [darkMode]);

  return (
    <div class="theme-toggle">
      <button 
        class="theme-toggle-button"
        onClick={() => setDarkMode((prev) => !prev)}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span class="material-icons">
          {darkMode ? "light_mode" : "dark_mode"}
        </span>
      </button>
    </div>
  );
}