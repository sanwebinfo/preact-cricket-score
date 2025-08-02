import { useState } from "preact/hooks";
import ApiInputForm from "./components/ApiInputForm";
import LiveScoreDisplay from "./components/LiveScoreDisplay";
import DarkModeToggle from "./components/DarkModeToggle";
import Notification from "./components/Notification";

interface NotificationItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function App() {
  const [markdownUrl, setMarkdownUrl] = useState<string>("one.md");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div class="app-container">
      <div class="container">
        <DarkModeToggle />
        
        <div class="notification-container">
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              message={notification.message}
              type={notification.type}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </div>

        <main class="main-content">
          <div class="content-wrapper">
            <ApiInputForm onSave={setMarkdownUrl} />
            <LiveScoreDisplay
              markdownUrl={markdownUrl}
              onContentChange={() => {}}
              onRefresh={() => showNotification("Scores updated successfully", "success")}
            />
          </div>
        </main>
      </div>
    </div>
  );
}