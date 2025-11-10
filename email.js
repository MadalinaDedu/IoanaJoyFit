
//   // Inițializează EmailJS cu Public Key-ul tău
//   emailjs.init("UQK5zAp-ZYKW7KkcG"); // Public Key din contul tău EmailJS

//   // Formularul de contact
//   const form = document.getElementById("contact-form");
//   const status = document.getElementById("form-status");

//   form.addEventListener("submit", function(event) {
//     event.preventDefault();

//     emailjs.send("service_z9hkfyi", "template_4iwragf")
//       .then(function(response) {
//         console.log("Mesaj trimis cu succes!", response.status, response.text);
//         status.style.display = "block";
//         status.style.color = "green";
//         status.textContent = "Mesajul a fost trimis cu succes!";
//         form.reset();
//       }, function(error) {
//         console.error("Eroare la trimiterea mesajului:", error);
//         status.style.display = "block";
//         status.style.color = "red";
//         status.textContent = "A apărut o problemă. Te rugăm să încerci din nou.";
//       });
//   });

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.style.display = "block";
        status.style.color = "green";
        status.textContent = "Mesajul a fost trimis cu succes!";
        form.reset();
      } else {
        status.style.display = "block";
        status.style.color = "red";
        status.textContent = "A apărut o problemă. Te rugăm să încerci din nou.";
      }
    } catch (error) {
      console.error("Eroare:", error);
      status.style.display = "block";
      status.style.color = "red";
      status.textContent = "Eroare de rețea. Te rugăm să reîncerci.";
    }
  });