# Card Format Documentation

This document explains the JSON structure that the Vegan Cards application expects for card data.

## Overview

The application supports two main types of card formats:
1. Generic cards (sample cards)
2. Translation cards (vegan phrases)

Both formats follow a similar structure but with some specific differences for translation functionality.

## Generic Card Format

Generic cards are defined in `src/data/cards/sample-cards.json` and use the following structure:

```json
[
  {
    "id": "card-1",
    "type": "text",
    "category": "sample",
    "frontContent": {
      "title": "Card Title",
      "content": "This is the front content of the card",
      "imageUrl": null
    },
    "backContent": {
      "title": "Back Title",
      "content": "This is the back content of the card with additional details",
      "imageUrl": null
    },
    "metadata": {
      "created": "2025-07-21T00:00:00Z",
      "tags": ["sample", "demo"]
    }
  }
]
```

### Fields Explanation:

- `id` (string, required): Unique identifier for the card
- `type` (string, required): Card type, typically "text" for generic cards
- `category` (string, required): Category for filtering/grouping
- `frontContent` (object, required): Content to display on the front of the card
  - `title` (string, optional): Title to display at the top
  - `content` (string, required): Main content text
  - `imageUrl` (string, optional): URL to an image, or null if none
- `backContent` (object, required): Content to display on the back of the card
  - `title` (string, optional): Title to display at the top
  - `content` (string, required): Main content text
  - `imageUrl` (string, optional): URL to an image, or null if none
- `metadata` (object, optional): Additional information about the card
  - `created` (string, optional): ISO date string of creation time
  - `tags` (array of strings, optional): Tags for categorization

## Translation Card Format

Translation cards are defined in `src/data/cards/vegan-phrases.json` and use the following structure:

```json
[
  {
    "id": "vegan-1",
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
      "created": "2025-07-21T00:00:00Z",
      "tags": ["vegan", "restaurant", "basics"]
    }
  }
]
```

### Fields Explanation:

- `id` (string, required): Unique identifier for the card
- `type` (string, required): Should be "translation" for translation cards
- `category` (string, required): Category for filtering (e.g., "restaurant", "ingredients", "shopping")
- `language1` (string, required): Primary language name (e.g., "English")
- `language2` (string, required): Secondary language name (e.g., "Spanish")
- `frontContent` (object, required): Content in the primary language
  - `title` (string, optional): Usually the name of the primary language
  - `content` (string, required): Phrase in the primary language
  - `imageUrl` (string, optional): Optional image URL, or null if none
- `backContent` (object, required): Content in the secondary language
  - `title` (string, optional): Usually the name of the secondary language
  - `content` (string, required): Translation of the phrase
  - `imageUrl` (string, optional): Optional image URL, or null if none
- `metadata` (object, optional): Additional information about the card
  - `created` (string, optional): ISO date string of creation time
  - `tags` (array of strings, optional): Tags for categorization

## Categories

The application supports filtering cards by category. Some recommended categories for vegan phrases:

- `restaurant`: Phrases for ordering food or explaining dietary restrictions
- `ingredients`: Lists of ingredients to avoid or ask about
- `shopping`: Phrases for shopping for vegan products
- `general`: General phrases about veganism

## Languages

The application supports filtering cards by language. The language names should be standard language names (e.g., "English", "Spanish", "French").

## Adding New Cards

To add new cards:

1. Decide whether you're adding generic cards or translation cards
2. Follow the respective format above
3. Add your new card objects to the appropriate JSON file:
   - Generic cards: `src/data/cards/sample-cards.json`
   - Translation cards: `src/data/cards/vegan-phrases.json`
4. Make sure each card has a unique `id`
5. Rebuild and deploy the application

## Best Practices

- Keep phrases concise and clear
- Use consistent language names
- Use categories consistently
- Include helpful context in the content when necessary
- Use proper grammar and punctuation in both languages
- For vegan phrases, focus on practical, everyday scenarios