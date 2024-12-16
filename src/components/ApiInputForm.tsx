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
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (markdownUrl) {
      onSave(markdownUrl);
    }
  }, [markdownUrl, onSave]);

  const handleSave = () => {
    if (!markdownUrl) {
      setError("Markdown URL is required!");
      setSuccess(false);
      return;
    }

    localStorage.setItem("markdownUrl", markdownUrl);
    setError("");
    setSuccess(true);

    onSave(markdownUrl);

    setTimeout(() => {
      setError("");
      setSuccess(false);
      window.location.reload();
    }, 2000);
  };

  return (
      <div class="box terminal-style mt-6 mb-6">
        <h2 class="title is-5 mt-5 text-mode has-text-centered">Choose Match</h2>

        <div class="field has-text-centered">
          <label class="label text-mode">Select Match:</label>
          <div class="control">
            <div class="select is-warning">
              <select
                value={markdownUrl}
                onChange={(e) => setMarkdownUrl((e.target as HTMLSelectElement).value)}
              >
                <option value="one.md">Match 1</option>
                <option value="two.md">Match 2</option>
              </select>
            </div>
          </div>
        </div>

        <div class="has-text-centered">
          <button class="button is-info mt-3" onClick={handleSave}>
            Save
          </button>
        </div>

        <div class="mt-2">
          {error && <div class="notification is-danger">{error}</div>}
          {success && <div class="notification is-success has-text-centered">{`Live Match Score Page Updated`}</div>}
        </div>
      </div>
  );
}
