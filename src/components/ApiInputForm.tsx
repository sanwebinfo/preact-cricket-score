import { useState, useEffect } from "preact/hooks";

interface ApiInputFormProps {
  onSave: (markdownUrl: string) => void;
}

export default function ApiInputForm({ onSave }: ApiInputFormProps) {
  const [markdownUrl, setMarkdownUrl] = useState<string>(() => {
    const savedUrl = localStorage.getItem("markdownUrl");
    return savedUrl ? savedUrl : "one.md";
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (markdownUrl) {
      try {
        localStorage.setItem("markdownUrl", markdownUrl);
        setError("");
        onSave(markdownUrl);
      } catch (err: any) {
        setError("Failed to update match URL. Please try again.");
      }
    }
  }, [markdownUrl, onSave]);

  const handleSelectionChange = (e: Event) => {
    const selectedValue = (e.target as HTMLSelectElement).value;

    if (!selectedValue) {
      setError("Invalid match selection. Please try again.");
      return;
    }

    setMarkdownUrl(selectedValue);
  };

  return (
    <div class="box terminal-style mt-6 mb-6">
      <h2 class="title is-5 mt-5 text-mode has-text-centered">Choose Match 🥎</h2>

      <div class="field has-text-centered">
        <label class="label text-mode is-6">Select Match</label>
        <div class="control">
          <div class="select is-warning">
            <select
              value={markdownUrl}
              onChange={handleSelectionChange}
            >
              <option value="one.md">Match 1</option>
              <option value="two.md">Match 2</option>
            </select>
          </div>
        </div>
      </div>

      <div class="mt-2">
        {error && <div class="notification is-danger">{error}</div>}
        {!error && (
          <div class="notification is-success has-text-centered mt-5 mb-4">
            Currently Showing Match <strong>{markdownUrl.replace('.md', ' ')}</strong>Score Data
          </div>
        )}
      </div>
    </div>
  );
}
