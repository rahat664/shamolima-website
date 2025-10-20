/**
 * Typewriter animation utility
 * Creates a typing effect for text elements
 */

export interface TypewriterOptions {
  /** Speed in milliseconds per character */
  speed?: number;
  /** Delay before starting in milliseconds */
  startDelay?: number;
  /** Whether to show cursor during typing */
  showCursor?: boolean;
  /** Callback when typing completes */
  onComplete?: () => void;
}

/**
 * Animates text with a typewriter effect
 * @param element The HTML element to apply the effect to
 * @param text The text to type out
 * @param options Configuration options
 */
export function typewriterEffect(
  element: HTMLElement,
  text: string,
  options: TypewriterOptions = {}
): () => void {
  const {
    speed = 50,
    startDelay = 0,
    showCursor = true,
    onComplete
  } = options;

  let currentIndex = 0;
  let timeoutId: number;
  let cursorIntervalId: number;
  let textNode: Text;
  let cursorElement: HTMLSpanElement | null = null;

  // Store original text and clear element
  element.setAttribute('data-original-text', text);
  element.textContent = '';

  // Create text node first
  textNode = document.createTextNode('');
  element.appendChild(textNode);

  // Add cursor if enabled
  if (showCursor) {
    cursorElement = document.createElement('span');
    cursorElement.className = 'typewriter-cursor';
    cursorElement.textContent = '|';
    element.appendChild(cursorElement);

    // Blink cursor
    cursorIntervalId = window.setInterval(() => {
      if (cursorElement) {
        cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';
      }
    }, 500);
  }

  // Type one character at a time
  const typeCharacter = () => {
    if (currentIndex < text.length) {
      textNode.textContent = text.substring(0, currentIndex + 1);
      currentIndex++;
      timeoutId = window.setTimeout(typeCharacter, speed);
    } else {
      // Typing complete - ensure final text is set
      textNode.textContent = text;
      if (cursorIntervalId) {
        clearInterval(cursorIntervalId);
      }
      if (cursorElement && cursorElement.parentNode) {
        cursorElement.remove();
      }
      if (onComplete) {
        onComplete();
      }
    }
  };

  // Start typing after delay
  timeoutId = window.setTimeout(typeCharacter, startDelay);

  // Return cleanup function
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (cursorIntervalId) {
      clearInterval(cursorIntervalId);
    }
    element.textContent = text;
  };
}
