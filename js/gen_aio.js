if (window.location.pathname.endsWith('rdm_ticket.html')) {
  // Funkcja generująca losową 5-cyfrową liczbę
  function generateRandomNumber() {
    const min = 18729; // Minimalna wartość (włącznie)
    const max = 97264; // Maksymalna wartość (wyłącznie)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  // Pobranie elementu HTML, do którego wstawimy liczbę
  const randomNumberElement = document.getElementById("napisnumerbiletu");

  // Wywołanie funkcji i umieszczenie wyniku w elemencie HTML
  const randomNum = generateRandomNumber();
  randomNumberElement.textContent = randomNum;

  // Generowanie losowej liczby z zakresu od 91606185172 do 91606199999
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Losowanie liczby z podanego zakresu
  const randomNumber = getRandomNumber(11606185172, 91606199999);

  // Znalezienie elementu HTML, do którego chcemy wstawić wygenerowaną liczbę
  const element = document.getElementById('napiscurrentnumber');

  // Wstawienie wygenerowanej liczby do elementu HTML
  if (element) {
    element.textContent = randomNumber;
  } else {
    console.error('Element o podanym id nie został znaleziony.');
  }

  // Pobiera aktualną datę i godzinę, odejmuje od godziny 10 minut i wyświetla w elemencie HTML
  const now = new Date();
  now.setMinutes(now.getMinutes() - 10);

  // Formatowanie daty i godziny
  const formattedDate = now.toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedTime = now.toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Wyświetlenie danych w elemencie HTML
  const outputElement = document.getElementById('napisgodzinazakupu');
  outputElement.textContent = `${formattedDate} r. ${formattedTime}`;

  // Pobiera aktualną datę i godzinę (korzysta już z uprzednio pobranej i zmodyfikowanej), dodaje do aktualnej godziny 60 minut i wyświetla w elemencie HTML
  const now2 = new Date();
  now2.setMinutes(now2.getMinutes() + 50);

  // Formatowanie daty i godziny
  const formattedDate2 = now2.toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedTime2 = now2.toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Wyświetlenie danych w elemencie HTML
  const outputElement2 = document.getElementById('napisnumerwaznydo');
  outputElement2.textContent = `${formattedDate2} r. ${formattedTime2}`;

  // Funkcja generująca losowy identyfikator sesji
  function generateSessionId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let sessionId = '';
  const charactersLength = characters.length;

  for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      sessionId += characters.charAt(randomIndex);
  }

  return sessionId;
  }

  // Generowanie sessionID i przypisanie go do zmiennej
  const sessionId = generateSessionId();
  console.log("Generated Session ID:", sessionId);

  // Funkcja generująca kod QR
  function generateQRCode() {
  const url = `https://kanar.fun/sgtw/qr_code_ref.html?sessionID=${sessionId}`;
  const qrCodeContainer = document.getElementById("qrcode");

  // Konfiguracja kodu QR
  const qrCode = new QRCode(qrCodeContainer, {
      text: url,
      width: 600,
      height: 600,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.L  // Ustawienie niskiego poziomu korekcji błędów
  });
  }

  // Wywołaj funkcję generowania QR kodu po załadowaniu strony
  window.onload = function() {
  generateQRCode();

  // Przygotowanie danych do wysłania do PHP
  const data = {
    randomNum: randomNum,
    randomNumber: randomNumber,
    formattedDate: formattedDate,
    formattedTime: formattedTime,
    sessionId: sessionId
  };

  // Wysłanie danych do PHP za pomocą fetch
  fetch('/php/session_data_saver.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.text())
  .then(result => {
    console.log('Data successfully sent to PHP:', result);
  })
  .catch(error => {
    console.error('Error sending data to PHP:', error);
  });
  };

  fetch('/php/cleanup.php', {
    method: 'GET' // lub 'POST', w zależności od potrzeb
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Błąd sieciowy: ' + response.statusText);
    }
    return response.text(); // lub response.json() jeśli zwraca dane w formacie JSON
  })
  .then(data => {
      console.log('Skrypt PHP został aktywowany:', data);
  })
  .catch(error => {
      console.error('Wystąpił błąd:', error);
  });

  // Funkcja uruchamiająca skrypt PHP do szyfrowania
  async function runEncryptPHP(sessionID) {
    try {
        // Wywołujemy skrypt encrypt.php za pomocą Fetch API
        const response = await fetch('/php/encrypt.php', {
            method: 'POST', // Używamy metody POST do wysłania danych
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'sessionID': sessionID // Przekazujemy sessionID do PHP
            })
        });

        // Sprawdzamy odpowiedź z serwera
        if (!response.ok) {
            throw new Error('Błąd podczas wywoływania encrypt.php');
        }

        // Odbieramy odpowiedź jako tekst
        const result = await response.text();

        // Wyświetlamy odpowiedź serwera
        console.log('Odpowiedź z encrypt.php:', result);
        alert('Szyfrowanie zakończone sukcesem: ' + result);

    } catch (error) {
        console.error('Błąd:', error);
        alert('Wystąpił błąd podczas szyfrowania: ' + error.message);
    }
  }

  // Automatyczne wywołanie funkcji po załadowaniu strony
  const sessionID = prompt('Podaj sessionID, który chcesz zaszyfrować:');
  if (sessionID) {
      runEncryptPHP(sessionID);
  } else {
      alert('Musisz podać sessionID.');
  }
}



if (window.location.pathname.endsWith('qr_code_ref.html')) {
  document.addEventListener('DOMContentLoaded', function () {
    // Funkcja pomocnicza do pobierania parametrów z URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
  
    // Pobieramy sessionID z URL
    const sessionID = getQueryParam('sessionID');
    if (!sessionID) {
        console.error('Brak parametru sessionID w URL.');
        return;
    }
  
    // Funkcja do pobierania odszyfrowanych danych z pliku decrypt.php
    async function fetchDecryptedData() {
        try {
            const response = await fetch('/../php/decrypt.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'sessionID': sessionID
                })
            });

            if (!response.ok) {
                throw new Error('Błąd podczas pobierania odszyfrowanych danych.');
            }

            const data = await response.json();

            // Sprawdzamy czy dane zawierają oczekiwane właściwości
            if (data.randomNum && data.randomNumber && data.formattedTime && data.formattedDate) {
                // Wstawiamy wartości do odpowiednich elementów HTML
                document.getElementById('napisnumerbiletu').textContent = data.randomNum;
                document.getElementById('napiscurrentnumber').textContent = data.randomNumber;
                document.getElementById('napisgodzinazakupu').textContent = `${data.formattedDate} ${data.formattedTime}`;
                
                let formattedTime = data.formattedTime; // np. "14:30:45"
                let newFormattedTime = moment(formattedTime, "HH:mm:ss").add(60, 'minutes').format("HH:mm:ss");

                document.getElementById('napisgodzinaważności').textContent = `${data.formattedDate} ${newFormattedTime}`;
            } else {
                console.error('Odszyfrowane dane nie zawierają wymaganych właściwości.');
            }
        } catch (error) {
            console.error('Błąd:', error);
        }
    }
  
    // Wywołujemy funkcję fetchDecryptedData, aby pobrać odszyfrowane dane i wstawić je do HTML
    fetchDecryptedData();
  });
}
