import { useState, useEffect } from "preact/hooks";
import ApiInputForm from "./components/ApiInputForm";
import LiveScoreDisplay from "./components/LiveScoreDisplay";
import DarkModeToggle from "./components/DarkModeToggle";

export default function App() {
  const [markdownUrl, setMarkdownUrl] = useState(() => localStorage.getItem("markdownUrl") || "one.md");
  const [lastContent, setLastContent] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);

  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    if (!isPageLoaded) {
      setIsPageLoaded(true);
    }
  }, [isPageLoaded]);

  const handleSave = (url: string) => {
    setMarkdownUrl(url);
  };

  const handleContentChange = (newContent: string) => {
    if (newContent !== lastContent) {
      setLastContent(newContent);
    }
  };

  const showNotification = () => {
    setNotifications((prev) => [
      ...prev,
      "Live score content updated",
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 2000);
  };

  return (
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-three-fifths">
            <DarkModeToggle />
            <div class="notifications-section">
              {notifications.length > 0 && (
                <div class="notification is-success is-light">
                  {notifications[0]}
                </div>
              )}
            </div>
            <ApiInputForm onSave={handleSave} />
            <LiveScoreDisplay
              markdownUrl={markdownUrl}
              onContentChange={handleContentChange}
              onRefresh={showNotification}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
