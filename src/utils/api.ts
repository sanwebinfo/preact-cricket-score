export async function fetchMarkdownContent(url: string): Promise<string> {
  try {
    const noCacheUrl = `${url}?t=${new Date().getTime()}`;
    const response = await fetch(noCacheUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Error fetching content: ${error.message}`);
  }
}