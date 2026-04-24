# Test Cases

## Smoke

1. Open `index.html`.
2. Verify the page shows the manifesto image, Finder panel, Collection filters, Leadership lens filters, situation buttons, and tool cards.
3. Verify there are no visible browser script errors.

## Manifesto Image Hotspots

1. Click each of the eight manifesto statements in the top image.
2. Verify a drawer opens for the clicked statement.
3. Verify the drawer shows `Source: Excel Final sheet`.
4. Verify the text in Attitude description, Team Behaviours, Organizational Result, and Example Tools matches the Excel source exactly.
5. Click `Find related tools`.
6. Verify the page scrolls to Finder and shows related tool cards.

## Situation Buttons

1. Click `Direction is fuzzy`.
2. Verify the result count changes and related cards such as `Why, What, How Canvas`, `Intent Briefs`, and `Outcome Framing` are shown.
3. Click `Need participation fast`.
4. Verify Liberating Structures results such as `1-2-4-All`, `15% Solutions`, and `What I Need From You (WINFY)` are shown.
5. Click `Flow is too slow`.
6. Verify `Value Stream Mapping` and `Ecocycle Planning` are shown.

## Filter Reset Behavior

1. Click any situation button.
2. Click a Leadership lens filter, for example `Whole-System View`.
3. Verify the old situation result set is cleared and the result count reflects the selected lens.
4. Click a Collection filter, for example `Liberating Structures`.
5. Verify the old situation result set is cleared and results reflect the selected collection.
6. Click `Clear filters`.
7. Verify the full catalog is shown again.

## Search

1. Type `flow bottlenecks` in the search box.
2. Verify relevant flow/system tools appear.
3. Type `psychological safety`.
4. Verify relevant trust/safety tools or structures appear.
5. Clear the search.
6. Verify the full catalog returns when no other filters are active.

