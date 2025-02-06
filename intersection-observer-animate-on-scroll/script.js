// Select all elements with the class "card"
const cards = document.querySelectorAll(".card");

// Create a new Intersection Observer
// This observer will execute the callback every time an observed element's visibility changes (i.e., it enters or leaves the viewport)
const observer = new IntersectionObserver(
  (entries) => {
    // Loop through each entry in the list of observed elements
    entries.forEach((entry) => {
      // Toggle the "show" class on the element based on whether it is intersecting (visible in the viewport)
      entry.target.classList.toggle("show", entry.isIntersecting);

      // If the element is intersecting (i.e., it's visible), stop observing it to avoid multiple triggers
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });

    // Log the entries for debugging purposes
    console.log(entries);
  },
  {
    // Observer options
    threshold: 1, // The callback will trigger only when 100% of the element is visible in the viewport
  }
);

// Start observing each card element
cards.forEach((card) => {
  observer.observe(card);
});
/**
 * Explanation of Important Intersection Observer Entry Properties:
 * 1. `intersectionRatio`: A value between 0 and 1 that indicates how much of the element is visible on the screen.
 *    - 0: Not visible at all
 *    - 1: Fully visible
 * 2. `isIntersecting`: A boolean value (true/false) indicating whether the element is currently intersecting the viewport.
 * 3. `boundingClientRect`: The actual size and position of the element we are observing.
 * 4. `intersectionRect`: The portion of the element that is visible on the screen.
 * 5. `rootBounds`: The bounds of the viewport or the root element (usually the screen).
 * 6. `target`: The element being observed.
 *
 * Notes:
 * - The Intersection Observer triggers the callback as soon as even a single pixel of the element becomes visible.
 * - This behavior may cause animations to trigger prematurely if they rely on full visibility.
 * - Using a threshold of 1 ensures that the callback only runs when the element is fully visible.
 */
