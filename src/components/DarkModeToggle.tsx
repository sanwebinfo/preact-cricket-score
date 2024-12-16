import { useState, useEffect } from "preact/hooks";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (darkMode) {
      body.classList.add("dark-mode");
      html.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
      html.classList.remove("dark-mode");
    }

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div class="dark-mode-toggle has-text-white has-text-centered mt-2">
      <label class="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode((prevMode) => !prevMode)}
        />
        <span class="slider round"></span>
      </label>
    </div>
  );
}
