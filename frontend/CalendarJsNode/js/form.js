const urlParams = new URLSearchParams(window.location.search);
const startDate = urlParams.get('startDate');
const endDate = urlParams.get('endDate');
const people = urlParams.get('people'); 

if (startDate) document.getElementById('startDate').textContent = startDate;
if (endDate) document.getElementById('endDate').textContent = endDate;

document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();  
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    console.log('Paramètres URL:', { startDate, endDate });

    const data = { firstName, lastName, email, startDate, endDate, people };

    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.textContent = 'Wait a moment...'; 

    fetch('http://localhost:5000/api/reservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('confirmationMessage').textContent = data.message;
    })
    .catch(error => {
        document.getElementById('confirmationMessage').textContent = 'An error occured';
    });
});