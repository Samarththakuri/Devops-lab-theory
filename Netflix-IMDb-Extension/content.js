// content.js

// --- Configuration ---
const OMDb_API_KEY = "";

// --- Caching ---
// Simple cache to store fetched ratings and avoid repeated API calls for the same title.
const ratingCache = new Map();

// --- Debouncing ---
// Debounce function to limit how often the API is called.
// This prevents sending a request for every slight mouse movement.
let debounceTimer;
function debounce(func, delay) {
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * Fetches the IMDb rating for a given movie or show title.
 * @param {string} title - The title of the movie or show.
 * @returns {Promise<string|null>} - A promise that resolves to the IMDb rating or null if not found.
 */
async function fetchRating(title) {
  if (!title) {
    return null;
  }

  // 1. Check cache first
  if (ratingCache.has(title)) {
    return ratingCache.get(title);
  }

  // 2. Fetch from OMDb API if not in cache
  try {
    // const apiUrl = ""`https://www.omdbapi.com/?t=${encodeURIComponent(
    //   title
    // )}&apikey=${OMDb_API_KEY}`";
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (
      data.Response === "True" &&
      data.imdbRating &&
      data.imdbRating !== "N/A"
    ) {
      const rating = data.imdbRating;
      // Store in cache for future use
      ratingCache.set(title, rating);
      return rating;
    } else {
      // Store 'N/A' to avoid re-fetching titles that aren't found
      ratingCache.set(title, "N/A");
      return "N/A";
    }
  } catch (error) {
    console.error("Error fetching IMDb rating:", error);
    return null;
  }
}

/**
 * Creates and displays the rating badge on a movie card element.
 * @param {HTMLElement} targetElement - The element to attach the rating badge to.
 * @param {string} rating - The IMDb rating to display.
 */
function displayRating(targetElement, rating) {
  // Remove any existing badge first to prevent duplicates
  removeRating(targetElement);

  if (!rating) return;

  const badge = document.createElement("div");
  badge.className = "imdb-rating-badge";
  badge.innerHTML = `&#9733; ${rating}`; // Star character

  // Style and position the badge
  badge.style.position = "absolute";
  badge.style.top = "8px";
  badge.style.right = "8px";
  badge.style.zIndex = "100"; // Ensure it's on top

  targetElement.style.position = "relative"; // Needed for absolute positioning of the child
  targetElement.appendChild(badge);
}

/**
 * Removes the rating badge from a movie card element.
 * @param {HTMLElement} targetElement - The element from which to remove the badge.
 */
function removeRating(targetElement) {
  const existingBadge = targetElement.querySelector(".imdb-rating-badge");
  if (existingBadge) {
    existingBadge.remove();
  }
}

/**
 * The main event handler for mouseover events.
 * It finds the title and triggers the rating fetch and display.
 * @param {Event} event - The mouseover event.
 */
async function handleMouseOver(event) {
  // Netflix uses various class names, so we look for a common parent of the title card.
  // The 'slider-item' class is often a good, stable target.
  const movieCard = event.target.closest(".slider-item");

  if (movieCard) {
    // The title is often in an 'aria-label' attribute on a child element.
    const titleElement = movieCard.querySelector("[aria-label]");
    const title = titleElement ? titleElement.getAttribute("aria-label") : null;

    if (title) {
      const rating = await fetchRating(title);
      if (rating) {
        // We display the rating on the movieCard itself to ensure proper positioning.
        displayRating(movieCard, rating);
      }
    }
  }
}

/**
 * The main event handler for mouseout events.
 * It removes the rating badge.
 * @param {Event} event - The mouseout event.
 */
function handleMouseOut(event) {
  const movieCard = event.target.closest(".slider-item");
  if (movieCard) {
    // Clear any pending debounced calls
    clearTimeout(debounceTimer);
    removeRating(movieCard);
  }
}

// --- Event Listeners ---
// We listen on the whole document because Netflix loads content dynamically.
// This technique is called event delegation.
document.addEventListener("mouseover", debounce(handleMouseOver, 300));
document.addEventListener("mouseout", handleMouseOut);
