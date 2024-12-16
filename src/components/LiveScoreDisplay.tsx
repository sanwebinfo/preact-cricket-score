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

  const fetchContent = async () => {
    if (!markdownUrl) {
      setError("Markdown URL is required.");
      return;
    }

    setError(null);

    try {
      const content = await fetchMarkdownContent(markdownUrl);
      if (!content) {
        setError("No content available for the selected match.");
        setScoreContent(null);
        return;
      }

      setScoreContent(content);
      onContentChange(content);
      onRefresh();
    } catch (err: any) {
      setScoreContent(null);
      setError(err.message || "An unknown error occurred.");
    }
  };

  useEffect(() => {
    if (markdownUrl) {
      fetchContent();
    }
  }, [markdownUrl]);

  return (
    <div class="box terminal-style">
      <h2 class="title is-5 mt-5 text-mode">Live Cricket Score 🏏</h2>

      {markdownUrl && (
        <div class="field has-text-centered">
          <button class="button is-info mb-3" onClick={fetchContent}>
            Refresh Score
          </button>
        </div>
      )}

      {error && (
        <div class="notification is-danger mb-2 box">{`Error: ${error}`}</div>
      )}

      {scoreContent ? (
        <div class="has-text-white mt-5">
          <pre>{scoreContent}</pre>
        </div>
      ) : (
        <p class="text-mode">No live score available or no match selected.</p>
      )}
    </div>
  );
}
