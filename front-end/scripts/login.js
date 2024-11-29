document.getElementById('loginForm')
    .addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                document.getElementById('message').style.color = 'green';
                document.getElementById('message').textContent = 'Login Successful';
            }
            else {
                document.getElementById('message').style.color = 'red';
                document.getElementById('message').textContent = data.error || 'Login Failed';
            }
        } catch (error) {
            console.error('Error during login', error);
            document.getElementById('message').textContent = 'Server error';
        }
    });