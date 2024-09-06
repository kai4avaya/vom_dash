function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      element.textContent = currentValue.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  export function initializeCounters() {
    // Initialize counters with 0 or any default values
    document.getElementById('us-counter').textContent = '0';
    document.getElementById('ru-counter').textContent = '0';
    document.getElementById('cn-counter').textContent = '0';
    document.getElementById('other-counter').textContent = '0';
  }
  
  export function updateCounters(data) {
    const duration = 2000; // 2 seconds for the animation
  
    animateCounter(document.getElementById('us-counter'), 0, data.us, duration);
    animateCounter(document.getElementById('ru-counter'), 0, data.ru, duration);
    animateCounter(document.getElementById('cn-counter'), 0, data.cn, duration);
    animateCounter(document.getElementById('other-counter'), 0, data.other, duration);
  }



  // Example of updating counters after 2 seconds
  setTimeout(() => {
    updateCounters({
      us: 12934,
      ru: 5877,
      cn: 1409,
      other: 2368
    });
  }, 2000);