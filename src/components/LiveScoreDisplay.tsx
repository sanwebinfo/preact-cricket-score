import { useState, useEffect } from "preact/hooks";
import { fetchMarkdownContent } from "../utils/api";

interface LiveScoreDisplayProps {
  markdownUrl: string;
  onContentChange: (newContent: string) => void;
  onRefresh: () => void;
}

export default function LiveScoreDisplay({
  markdownUrl,
  onContentChange,
  onRefresh,
}: LiveScoreDisplayProps) {
  const [scoreContent, setScoreContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContent = async () => {
    if (!markdownUrl) {
      setError("Please select a match first");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const content = await fetchMarkdownContent(markdownUrl);
      if (!content) {
        setError("No content available for the selected match");
        setScoreContent(null);
        return;
      }

      setScoreContent(content);
      onContentChange(content);
      onRefresh();
    } catch (err) {
      setScoreContent(null);
      setError(err.message || "Failed to fetch live scores");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (markdownUrl) {
      fetchContent();
    }
  }, [markdownUrl]);

  return (
    <div class="card">
      <div class="card-title">
        <button 
          class="icon-button" 
          onClick={fetchContent}
          disabled={isLoading}
          aria-label="Refresh scores"
        >
          {isLoading ? (
            <span class="spinner"></span>
          ) : (
            <span class="material-icons">refresh</span>
          )}
        </button>
      </div>

      {error ? (
        <div class="score-display">
          <p>{error}</p>
        </div>
      ) : scoreContent ? (
        <div class="score-display">
          <pre>{scoreContent}</pre>
        </div>
      ) : (
        <div class="empty-state">
          <p>No live score available</p>
        </div>
      )}
    </div>
  );
}