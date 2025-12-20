Build a “sliding cards” section like the screenshot (only the horizontal card deck that swipes left/right).

Tech: React Native + Expo (no extra libraries unless needed). Use Animated + FlatList.
Goal: A horizontally scrollable list of drill cards that:

- scrolls left/right
- snaps so one card is centered
- shows a bit of the next/previous card (peeking)
- scales the centered card slightly larger (subtle “focus” effect)
- has rounded corners and an overlay at the bottom for text + rating
- optional: heart icon top-right (just UI)

DATA
Assume I have `drills` array like:
[
{ id: "41", title: "Drive Pressure", subtitle: "Intermediate", rating: 5.0, reviews: 143, image: <url or require(...)> },
...
]

DELIVERABLES

1. Create a reusable component: `SlidingDrillCards.tsx`
2. Export default component that renders the deck
3. It should accept `drills` and `onPressCard(drill)` props

IMPLEMENTATION DETAILS

- Use `Animated.FlatList` horizontal
- `showsHorizontalScrollIndicator={false}`
- Use `snapToInterval={CARD_WIDTH + SPACING}` and `decelerationRate="fast"`
- Add side padding so first/last card can center (contentContainerStyle paddingHorizontal)
- Use `onScroll` with Animated.event to drive an `Animated.Value` and interpolate:
  - scale: center card 1.0, neighbors 0.94
  - translateY: center card 0, neighbors 10 (optional)
- Card layout:
  - Image background (Image)
  - Bottom gradient/overlay (can fake with a semi-transparent View)
  - Text stack: small location/subtitle, big title, rating row (star + rating + reviews)
  - “See more” pill/button at bottom center (optional)
  - Heart icon top-right (optional)

SIZING (match the feel of the screenshot)

- CARD_WIDTH = screenWidth \* 0.78
- CARD_HEIGHT = 260 (or proportional)
- SPACING = 16
- Border radius = 28
- Shadows: iOS shadow props + Android elevation
- Background behind deck should be light; cards float.

Make the code clean and copy-pastable. Don’t build the whole page, ONLY this component and a tiny usage example.
