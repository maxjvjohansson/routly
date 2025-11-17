export function sanitizeFilename(name: string): string {
  if (!name) return "route.gpx";

  return (
    name
      // Normalize to NFD form: "å" becomes "a" + combining accent
      .normalize("NFD")

      // Remove all Unicode combining marks (accents, diacritics)
      // Regex \u0300–\u036f = Unicode range for combining diacritical marks
      .replace(/[\u0300-\u036f]/g, "")

      // Convert to lowercase
      .toLowerCase()

      // Replace any sequence of non-alphanumeric characters with "_"
      // [^a-z0-9] match any character NOT a-z or 0-9
      // + quantifier means "one or more"
      .replace(/[^a-z0-9]+/g, "_")

      // Collapse multiple underscores "___" to "_"
      .replace(/_+/g, "_")

      // Trim underscores at start or end of string: "_test_" → "test"
      // ^_+  → underscores at beginning
      // _+$  → underscores at end
      .replace(/^_+|_+$/g, "") + ".gpx"
  ); // Append file extension
}
