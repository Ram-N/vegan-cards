## Project: Vegan Cards App UI/UX Redesign - Phase 1

### Goal:
Transition from a "play button" slideshow model to a phrase-selection grid with a stacked dual-card translation view, prioritizing user control and clear language display.

### Overall Objective:
Eliminate the slideshow "play button" functionality and replace it with a user-driven interface for selecting and viewing translations.

---

### **`bmd`** (Backend/Model/Data) Tasks:

1.  **`bmd-data-structure-verification`**:
    * **Objective:** Confirm the existing JSON data structure (`src/data/cards/vegan-phrases.json`) is adequate for the new UI.
    * **Details:** Ensure `frontContent.content` reliably holds the English phrase and `backContent.content` holds the translated phrase, and `language1`/`language2` fields correctly identify the languages. No changes anticipated for this phase, but verify compatibility.
    * **Dependencies:** None.

---

### **`planning.markdown`** (Frontend/UI/UX) Tasks:

#### **Core UI/UX Principles:**
* **Discoverability:** All 15 (or more) phrases should be easily discoverable from the initial screen.
* **Simplicity:** User interaction should be intuitive (tap to select, view).
* **Clarity:** Translations must be presented clearly, distinguishing between source and target languages.

---

#### **Screen 1: Phrase Selection Grid**

1.  **`planning-screen1-layout`**:
    * **Objective:** Design and implement a grid-based layout for displaying up to 15 (or more, dynamically scaled) phrase selection cards.
    * **Details:**
        * The layout should be a **grid** (e.g., 3 columns x 5 rows for 15 phrases, or responsive to screen size).
        * Each grid cell will contain a "phrase selection card."
        * The primary focus of each phrase selection card will be the **English phrase** (`frontContent.content`).
        * The cards should be visually distinct and tap-friendly.
        * Consider adding a subtle indicator if the phrase has a translation available (e.g., a small icon, though not strictly required for this phase if all phrases will be translated).
    * **Visual Reference:** Imagine a tile-based dashboard where each tile is an English phrase.

2.  **`planning-screen1-data-binding`**:
    * **Objective:** Populate the phrase selection grid using data from the `vegan-phrases.json` file.
    * **Details:**
        * For each entry in the JSON array, create a corresponding phrase selection card in the grid.
        * Display the `frontContent.content` (English phrase) prominently on each card.
        * Each card should be unique and linked to its corresponding `id` from the JSON.
    * **Dependencies:** `bmd-data-structure-verification`, `planning-screen1-layout`.

3.  **`planning-screen1-interaction`**:
    * **Objective:** Implement tap/click functionality for each phrase selection card.
    * **Details:**
        * When a user taps a phrase selection card, it should trigger a transition to "Screen 2: Translation View."
        * The tapped card's `id` (or relevant data) must be passed to the next screen to load the correct translation.
    * **Dependencies:** `planning-screen1-layout`, `planning-screen1-data-binding`, `planning-screen2-layout`.

---

#### **Screen 2: Translation View (Vertically Stacked Cards)**

1.  **`planning-screen2-layout`**:
    * **Objective:** Design and implement a new screen that displays two distinct cards, vertically stacked.
    * **Details:**
        * **Top Card:** Dedicated to the translated phrase.
            * Prominently display the `language2` name (e.g., "Français," "Español") as a title or label.
            * Display the `backContent.content` (translated phrase) clearly.
            * The card should be visually distinct from the bottom card.
        * **Bottom Card:** Dedicated to the original English phrase.
            * Prominently display the `language1` name (e.g., "English") as a title or label.
            * Display the `frontContent.content` (original English phrase) clearly.
            * The card should be visually distinct from the top card.
        * Ensure sufficient padding and spacing between the two cards and the screen edges.
        * Implement a clear **back navigation** mechanism (e.g., a back arrow/button) to return to "Screen 1: Phrase Selection Grid."
    * **Visual Reference:** Think of two large flashcards, one above the other, each containing a version of the same phrase.

2.  **`planning-screen2-data-binding`**:
    * **Objective:** Dynamically populate the top and bottom cards with the correct translation and original phrase based on the user's selection from Screen 1.
    * **Details:**
        * Retrieve the specific card data using the `id` passed from Screen 1.
        * Populate the top card with `language2` and `backContent.content`.
        * Populate the bottom card with `language1` and `frontContent.content`.
    * **Dependencies:** `planning-screen1-interaction`, `planning-screen2-layout`.

---

#### **General / App-Wide Tasks:**

1.  **`planning-navigation-flow`**:
    * **Objective:** Define the seamless user journey between the two screens.
    * **Details:**
        * App launches -> "Screen 1: Phrase Selection Grid".
        * Tap a phrase card on Screen 1 -> Transition to "Screen 2: Translation View" for that phrase.
        * Tap back on Screen 2 -> Transition back to "Screen 1: Phrase Selection Grid".
    * **Dependencies:** All screen-specific layout and interaction tasks.

2.  **`planning-remove-play-button`**:
    * **Objective:** Completely remove all UI elements and associated logic related to the "play button" slideshow functionality.
    * **Details:** This includes the button itself, any slideshow timers, auto-advance features, and sequential navigation logic.
    * **Dependencies:** None (this is a removal task).

