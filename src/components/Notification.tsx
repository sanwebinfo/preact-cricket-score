import { useEffect, useState } from "preact/hooks";

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export default function Notification({ message, type, duration = 3000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      default: return 'info';
    }
  };

  if (!isVisible) return null;

  return (
    <div class={`notification ${type}`}>
      <div class="notification-icon">
        <span class="material-icons">{getIcon()}</span>
      </div>
      <div>{message}</div>
      <button class="notification-close" onClick={onClose} aria-label="Close notification">
        <span class="material-icons">close</span>
      </button>
    </div>
  );
}