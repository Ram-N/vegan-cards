import requests
import csv
import json
import os
import shutil
from datetime import datetime
import argparse
import re

def generate_translation_cards(spreadsheet_id, sheet_gid, output_path="src/data/cards/vegan-phrases.json", backup=True, category_col=None):
    """
    Reads translation data from a Google Sheet and generates a JSON file
    in the specified Translation Card Format.

    Args:
        spreadsheet_id (str): The ID of your Google Spreadsheet.
        sheet_gid (str): The GID of the specific sheet (tab) within the spreadsheet.
        output_path (str): Path to the JSON file to create.
        backup (bool): Whether to backup existing file.
        category_col (str): Optional column name for category data.
    """
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Backup existing file if it exists and backup is enabled
    if backup and os.path.exists(output_path):
        timestamp = int(datetime.now().timestamp())
        backup_path = f"{output_path}.backup.{timestamp}"
        shutil.copy2(output_path, backup_path)
        print(f"Backed up existing file to {backup_path}")

    csv_url = f"https://docs.google.com/spreadsheets/d/{spreadsheet_id}/export?format=csv&gid={sheet_gid}"

    try:
        response = requests.get(csv_url)
        response.raise_for_status()

        csv_content = response.content.decode('utf-8')
        csv_reader = csv.reader(csv_content.splitlines())

        header = next(csv_reader)
        print(f"Detected header: {header}")

        # Get column indices based on header names
        required_columns = ["Language 1", "English Phrase", "Language 2", "Translation"]
        column_indices = {}
        
        for col_name in required_columns:
            try:
                column_indices[col_name] = header.index(col_name)
            except ValueError:
                raise ValueError(f"Missing required column: '{col_name}'")
        
        # Check for optional category column
        category_col_index = None
        if category_col and category_col in header:
            category_col_index = header.index(category_col)
            print(f"Found category column at index {category_col_index}")
        
        # Check for optional tags column
        tags_col_index = None
        if "Tags" in header:
            tags_col_index = header.index("Tags")
            print(f"Found tags column at index {tags_col_index}")

        translation_cards = []
        current_time_iso = datetime.utcnow().isoformat(timespec='seconds') + 'Z'

        for i, row in enumerate(csv_reader):
            if not row or all(not cell.strip() for cell in row):
                continue # Skip empty rows

            # Ensure row has enough columns
            max_required_index = max(column_indices.values())
            if len(row) <= max_required_index:
                print(f"Skipping row {i+2} due to insufficient columns: {row}")
                continue

            language1_name = row[column_indices["Language 1"]].strip()
            english_phrase = row[column_indices["English Phrase"]].strip()
            language2_name = row[column_indices["Language 2"]].strip()
            translation = row[column_indices["Translation"]].strip()

            # Skip row if essential content is missing
            if not english_phrase or not translation:
                print(f"Skipping row {i+2} due to missing phrase or translation.")
                continue

            # Determine category
            category = "restaurant"  # Default category
            if category_col_index is not None and len(row) > category_col_index and row[category_col_index].strip():
                category = row[category_col_index].strip().lower()

            # Process tags
            tags = ["vegan", category]  # Default tags
            if tags_col_index is not None and len(row) > tags_col_index and row[tags_col_index].strip():
                custom_tags = [tag.strip().lower() for tag in row[tags_col_index].split(',') if tag.strip()]
                tags.extend(custom_tags)
            
            # Remove duplicates from tags while preserving order
            tags = list(dict.fromkeys(tags))

            # Create a sanitized ID based on languages and the phrase
            base_id = re.sub(r'[^a-z0-9]', '-', english_phrase.lower())
            base_id = re.sub(r'-+', '-', base_id)  # Replace multiple hyphens with a single one
            base_id = base_id[:20].strip('-')  # Limit length and trim trailing hyphens
            
            # Add language codes to ID (first 2 chars of each language)
            lang1_code = language1_name[:2].lower()
            lang2_code = language2_name[:2].lower()
            card_id = f"vegan-{lang1_code}-{lang2_code}-{base_id}-{i+1}"

            card = {
                "id": card_id,
                "type": "translation",
                "category": category,
                "language1": language1_name,
                "language2": language2_name,
                "frontContent": {
                    "title": language1_name,
                    "content": english_phrase,
                    "imageUrl": None
                },
                "backContent": {
                    "title": language2_name,
                    "content": translation,
                    "imageUrl": None
                },
                "metadata": {
                    "created": current_time_iso,
                    "tags": tags
                }
            }
            translation_cards.append(card)

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(translation_cards, f, indent=2, ensure_ascii=False)

        print(f"Successfully created '{output_path}' with {len(translation_cards)} translation cards.")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from Google Sheet: {e}")
        print("Please ensure the Google Sheet is published to the web and accessible (Viewer access).")
    except ValueError as e:
        print(f"Error processing CSV data: {e}")
        print("Please ensure your Google Sheet has the required columns: 'Language 1', 'English Phrase', 'Language 2', and 'Translation'.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

def main():
    parser = argparse.ArgumentParser(description="Generate translation cards JSON from Google Sheets")
    parser.add_argument("--spreadsheet-id", default="1V-pQUWowrtvy6VU-a-9cWzI6fuk_V2aTbLW7pIo-iZM", 
                        help="Google Spreadsheet ID")
    parser.add_argument("--sheet-gid", default="0", 
                        help="Sheet GID (tab identifier)")
    parser.add_argument("--output", default="src/data/cards/vegan-phrases.json", 
                        help="Output JSON file path")
    parser.add_argument("--no-backup", action="store_true", 
                        help="Disable backup of existing file")
    parser.add_argument("--category-column", default="Category", 
                        help="Name of the category column in the spreadsheet")
    
    args = parser.parse_args()
    
    generate_translation_cards(
        args.spreadsheet_id, 
        args.sheet_gid,
        args.output,
        not args.no_backup,
        args.category_column
    )

# Run the script
if __name__ == "__main__":
    main()