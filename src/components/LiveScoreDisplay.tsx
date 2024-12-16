import { useState, useEffect } from "preact/hooks";
import { fetchMarkdownContent } from "../utils/api";

interface LiveScoreDisplayProps {
  markdownUrl: string;
  onContentChange: (newContent: string) => void;
  onRefresh: () => void; 
}

export default function LiveScoreDisplay({ markdownUrl, onContentChange, onRefresh }: LiveScoreDisplayProps) {
  const [scoreContent, setScoreContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    if (!markdownUrl) return;

    try {
      const content = await fetchMarkdownContent(markdownUrl);
      setScoreContent(content);
      onContentChange(content);
      onRefresh();
      setError(null);
    } catch (err: any) {
      setScoreContent(null);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (markdownUrl && scoreContent === null) {
      fetchContent();
    }
  }, [markdownUrl, scoreContent]);

  return (
    <div class="box terminal-style">
      <h2 class="title is-5 mt-5 text-mode">Live Cricket Score</h2>

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
        <p class="text-mode">Enter a Markdown URL to fetch the live score...</p>
      )}
    </div>
  );
}
