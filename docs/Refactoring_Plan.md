# Refactoring Plan: Generic Card App with Pluggable Features

## Objective
The primary objective is to refactor the existing React card application into a more generic and modular structure. The current "mortality countdown" functionality will be replaced by a "translation flashcard" feature, but critically, the core card display logic will be decoupled from specific functionalities like translation. This will allow for easy integration of other features (e.g., quiz, mortality countdown, image gallery) in the future without modifying the core card component.

### Core Principles for the AI Coding Agent
Separation of Concerns: Ensure that the generic display of a card is completely separate from any specific feature's logic (e.g., translation flipping, quiz answers, countdown timers).

Reusability: Maximize the reusability of the GenericCard component.

Modularity: Encapsulate feature-specific logic within dedicated components.

Data-Driven: The components should primarily render based on data passed via props.

## 1. JSON Structure
The JSON data structure needs to be flexible enough to support generic card content and allow for feature-specific extensions.

1.1 Generic Card Data Structure
All cards will adhere to a base structure, allowing for common properties like id, title, and content.

// cards.json (or a similar generic data source)
```json
[
  {
    "id": "card-1",
    "type": "text",
    "title": "Welcome",
    "content": "This is a generic card."
  },
  {
    "id": "card-2",
    "type": "image",
    "title": "A Picture",
    "content": "https://placehold.co/400x200/000/FFF?text=Image+Placeholder"
  }
]
```
1.2 Translation Feature Data Structure
For the translation feature, the JSON will contain the source and target language texts. This data will be consumed by the TranslationFeature component.

// translations.json
```json
[
  {
    "id": "trans-1",
    "originalText": "Hello",
    "translatedText": "Hola",
    "language1": "English",
    "language2": "Spanish"
  },
  {
    "id": "trans-2",
    "originalText": "Thank you",
    "translatedText": "Gracias",
    "language1": "English",
    "language2": "Spanish"
  },
  {
    "id": "trans-3",
    "originalText": "Goodbye",
    "translatedText": "Adiós",
    "language1": "English",
    "language2": "Spanish"
  }
]
```
## 2. Component Repurposing & Creation
2.1 Repurpose: GenericCard.tsx (from existing card component)
The existing card component (.tsx file) should be refactored and renamed to GenericCard.tsx. It will be a purely presentational component.

Purpose: To display content in a card-like UI, without any specific application logic (e.g., flipping, counting down, quiz state).

Props: It should accept generic props such as:

id: string

title?: string

content: React.ReactNode (can be string, number, or another JSX element)

footer?: React.ReactNode

className?: string (for styling flexibility)

onClick?: () => void (to allow parent components to handle clicks)

Styling: Use Tailwind CSS for all styling. Ensure it's responsive and visually appealing with rounded corners.

No Internal State for Feature Logic: This component should not manage isFlipped state or any other feature-specific state.

2.2 Create: TranslationFeature.tsx
This new component will encapsulate all the logic specific to the translation flashcard functionality.

Purpose: To manage the state of translation cards (e.g., current card, flipped state) and render the GenericCard component with the appropriate translation text.

Data Source: It will import and use the translations.json data.

Internal State:

currentIndex: number (to track which translation pair is currently displayed).

isFlipped: boolean (to control whether the original or translated text is shown).

Methods:

handleFlip(): Toggles the isFlipped state.

handleNext(): Increments currentIndex, cycling through the translations.json array.

handlePrevious(): Decrements currentIndex, cycling through the translations.json array.

Rendering: It will render the GenericCard component. The content prop of GenericCard will be dynamically set based on isFlipped and the current translation pair. It will also pass handleFlip to the onClick prop of GenericCard.

UI Elements: Include "Next" and "Previous" buttons to navigate through the translation cards.

2.3 Update: App.tsx
The main App.tsx component will become the orchestrator, deciding which feature to render.

Purpose: To serve as the entry point and potentially manage which feature is active (though for this task, it will directly render TranslationFeature).

Rendering: For now, App.tsx will simply render the TranslationFeature component. In the future, it could include logic to switch between different features (e.g., based on a route or a user selection).

No Feature-Specific Logic: App.tsx should not contain any translation-specific logic.

## 3. Implementation Steps (Tasks for the AI Coding Agent)
Refactor Existing Card Component:

Rename the existing card component file to GenericCard.tsx.

Modify its props to be generic (title, content, onClick, className).

Remove any existing mortality countdown or other specific logic.

Ensure it uses Tailwind CSS for all styling.

Create translations.json:

Create a new JSON file named translations.json with the structure defined in Section 1.2. Populate it with at least 3-5 example translation pairs.

Create TranslationFeature.tsx:

Create a new React functional component file named TranslationFeature.tsx.

Import translations.json.

Implement useState hooks for currentIndex and isFlipped.

Implement handleFlip, handleNext, and handlePrevious functions.

Render the GenericCard component inside TranslationFeature, passing the appropriate originalText or translatedText as content based on isFlipped.

Add "Next" and "Previous" buttons, styled with Tailwind CSS.

Ensure the onClick prop of GenericCard is set to handleFlip.

Update App.tsx:

Import TranslationFeature.

Replace the rendering of the old card components with a single instance of TranslationFeature.

Ensure basic overall app layout with Tailwind CSS.

Styling and Responsiveness:

Apply Tailwind CSS extensively to all components for a modern, responsive, and visually appealing design.

Ensure rounded corners on all elements.

Confirm the app is fully responsive across mobile, tablet, and desktop views.

Code Quality:

Add comprehensive comments to explain logic, component purpose, and prop usage.

Implement basic error handling where appropriate.

Ensure all code is self-contained and runnable within the provided React environment.

## 4. Future Considerations (for Human Developer)
Once this refactoring is complete, adding new features will be straightforward:

New Feature Component: Create a new component (e.g., MortalityCountdownFeature.tsx, QuizFeature.tsx).

Feature-Specific Data: Define a new JSON structure for that feature's data.

Rendering GenericCard: The new feature component will consume its specific data and render GenericCard instances, passing relevant content and handling its own unique logic (e.g., countdown, quiz answer checking).

App.tsx as Feature Selector: App.tsx could be extended to include a simple navigation or state management to switch between different features (e.g., a dropdown to select "Translation Flashcards", "Mortality Countdown", "My Quiz").
