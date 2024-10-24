if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
              console.log('Service Worker zarejestrowany z zakresem:', registration.scope);
          })
          .catch((error) => {
              console.error('Rejestracja Service Workera nie powiodła się:', error);
          });
  });
}
