let isScrolling = false;
let scrollInterval;
let currentIndex = 0;
let previousElement = null;

// Array of element IDs that should not receive the 'make-big' class
const excludedElements = ['animated-line-graph-panel', 'animated-area-graph-panel'];

export function orchestrateScrolling(elementIds, interval) {
  if (isScrolling) {
    console.log("Stopping previous scroll");
    stopScrolling();
  }

  isScrolling = true;
  currentIndex = 0;

  function scrollToNextElement() {
    console.log(`Scrolling to element ${currentIndex}`);
    if (!isScrolling) {
      console.log("Scrolling stopped");
      return;
    }

    if (currentIndex >= elementIds.length) {
      console.log("Resetting to beginning");
      currentIndex = 0;
    }

    // Remove 'make-big' class from previous element
    if (previousElement && !excludedElements.includes(previousElement.id)) {
      previousElement.classList.remove('make-big');
    }

    const currentElement = document.getElementById(elementIds[currentIndex]);
    if (!currentElement) {
      console.error(`Element with id ${elementIds[currentIndex]} not found`);
      currentIndex = (currentIndex + 1) % elementIds.length;
      scrollInterval = setTimeout(scrollToNextElement, interval);
      return;
    }

    // Add 'make-big' class to current element if it's not in the excluded list
    if (!excludedElements.includes(currentElement.id)) {
      currentElement.classList.add('make-big');
    }
    previousElement = currentElement;

    // Scroll to the element
    currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Move to next element after interval
    currentIndex = (currentIndex + 1) % elementIds.length;
    scrollInterval = setTimeout(scrollToNextElement, interval);
  }

  // Start the scrolling process
  scrollToNextElement();
}

export function stopScrolling() {
  console.log("Stopping scroll");
  isScrolling = false;
  clearTimeout(scrollInterval);
  
  // Remove 'make-big' class from the last element if it's not in the excluded list
  if (previousElement && !excludedElements.includes(previousElement.id)) {
    previousElement.classList.remove('make-big');
  }
}

// Example usage:
// const elementIds = ['element1', 'element2', 'animated-line-graph-panel', 'animated-area-graph-panel', 'element3'];
// const interval = 5000; // 5 seconds
// 
// // Start scrolling
// orchestrateScrolling(elementIds, interval);