import { useState, useEffect } from "preact/hooks";

interface ApiInputFormProps {
  onSave: (markdownUrl: string) => void;
}

export default function ApiInputForm({ onSave }: ApiInputFormProps) {
  const [markdownUrl, setMarkdownUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("markdownUrl") || "one.md";
    }
    return "one.md";
  });

  useEffect(() => {
    if (markdownUrl && typeof window !== 'undefined') {
      try {
        localStorage.setItem("markdownUrl", markdownUrl);
        onSave(markdownUrl);
      } catch (err) {
        console.error("Failed to save match selection");
      }
    }
  }, [markdownUrl, onSave]);

  const handleSelectionChange = (e: Event) => {
    const selectedValue = (e.target as HTMLSelectElement).value;
    setMarkdownUrl(selectedValue);
  };

  const getMatchStatus = () => {
    return markdownUrl === "one.md" ? "Match 1" : "Match 2";
  };

  return (
    <div class="card">
      <div class="card-title">
        <h3>🥎 Choose Match <span class="match-status">{getMatchStatus()}</span></h3>
      </div>
      
      <div class="form-control">
        <label class="label">Select Match:</label>
        <div class="select">
          <select value={markdownUrl} onChange={handleSelectionChange}>
            <option value="one.md">Match 1</option>
            <option value="two.md">Match 2</option>
          </select>
        </div>
      </div>
    </div>
  );
}