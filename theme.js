(() => {
  const key = 'bagdat-theme';
  const themes = ['system', 'light', 'dark'];
  let theme = 'system';
  try {
    const saved = localStorage.getItem(key);
    if (themes.includes(saved)) theme = saved;
  } catch { /* System theme still works when storage is unavailable. */ }

  const apply = (value) => {
    theme = themes.includes(value) ? value : 'system';
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('[data-theme-picker]').forEach((picker) => {
      picker.value = theme;
    });
  };
  // Run in the head so the saved theme is set before the first paint.
  apply(theme);
  document.addEventListener('DOMContentLoaded', () => {
    apply(theme);
    document.querySelectorAll('[data-theme-picker]').forEach((picker) => {
      picker.addEventListener('change', () => {
        apply(picker.value);
        try { localStorage.setItem(key, theme); } catch { /* Keep the in-page choice. */ }
      });
    });
  });
  window.addEventListener('storage', (event) => {
    if (event.key === key || event.key === null) apply(event.newValue);
  });
})();
