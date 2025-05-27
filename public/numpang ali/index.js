
document.querySelector('index.html').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.querySelector('input[type="email"]').value;

  const res = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  const data = await res.json();
  if (res.status === 201) {
    alert("Akun berhasil dibuat: " + data.email);
    window.location.href = 'form2.html'; // atau sesuai langkah selanjutnya
  } else {
    alert(data.message);
  }
});

//             const password = document.getElementById('password').value;