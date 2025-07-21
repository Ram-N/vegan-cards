# Vegan Cards Scripts

This directory contains utility scripts for the Vegan Cards application.

## Create Translation JSON

The `create_translation_json.py` script reads data from a Google Sheet and creates a properly formatted JSON file for the Vegan Cards application.

### Prerequisites

1. Python 3.6+
2. Required Python packages:
   ```
   pip install requests
   ```

3. A Google Sheet with the following columns:
   - `Language 1` - The primary language name (e.g., "English")
   - `Phrase 1` - The phrase in the primary language
   - `Language 2` - The secondary language name (e.g., "Spanish")
   - `Translation` - The translated phrase
   - `Category` (optional) - The category for the phrase (e.g., "restaurant", "shopping")
   - `Tags` (optional) - Comma-separated list of tags for the phrase

4. The Google Sheet must be published to the web (File > Share > Publish to web)

### Usage

Basic usage:

```bash
python create_translation_json.py
```

This will use the default spreadsheet ID and create the file at `src/data/cards/vegan-phrases.json`.

Custom options:

```bash
python create_translation_json.py --spreadsheet-id YOUR_SPREADSHEET_ID --sheet-gid YOUR_SHEET_GID --output custom/path/output.json --category-column "YourCategoryColumnName" --no-backup
```

### Command Line Arguments

- `--spreadsheet-id`: The ID of your Google Spreadsheet (default: the example spreadsheet)
- `--sheet-gid`: The GID of the specific sheet (tab) within the spreadsheet (default: "0")
- `--output`: Path to the output JSON file (default: "src/data/cards/vegan-phrases.json")
- `--no-backup`: Disable automatic backup of existing file (default: backup is enabled)
- `--category-column`: Name of the category column in the spreadsheet (default: "Category")

### Example Spreadsheet Format

| Language 1 | Phrase 1 | Language 2 | Translation | Category | Tags |
|------------|----------|------------|-------------|----------|------|
| English    | I am vegan    | Spanish    | Soy vegano/a | restaurant | dining,basics |
| English    | No meat please | French    | Pas de viande s'il vous plaît | restaurant | dining |

### ID Generation

Each card gets a unique ID generated from:
- The language codes (first 2 letters of each language)
- A sanitized version of the phrase
- The row number

For example: `vegan-en-es-i-am-vegan-1`

This makes it easy to identify which languages are involved in each translation pair.

### Output Format

The script generates a JSON file following the format documented in `/docs/Cards-Format.md`.

Example output:

```json
[
  {
    "id": "vegan-en-es-i-am-vegan-1",
    "type": "translation",
    "category": "restaurant",
    "language1": "English",
    "language2": "Spanish",
    "frontContent": {
      "title": "English",
      "content": "I am vegan. I don't eat any animal products.",
      "imageUrl": null
    },
    "backContent": {
      "title": "Español",
      "content": "Soy vegano/a. No como productos de origen animal.",
      "imageUrl": null
    },
    "metadata": {
      "created": "2025-07-21T18:30:00Z",
      "tags": ["vegan", "restaurant", "basics"]
    }
  }
]
```

### Backup System

The script automatically backs up existing files before overwriting them:

```
src/data/cards/vegan-phrases.json.backup.1626914532
```

You can disable this with the `--no-backup` flag.

### Error Handling

The script provides helpful error messages for common issues:
- Missing required columns
- Unable to access Google Sheet
- Invalid data formats

### Notes

- The script creates the output directory if it doesn't exist
- Tags are automatically generated based on category if not provided
- Cards are generated in the same order as they appear in the spreadsheet