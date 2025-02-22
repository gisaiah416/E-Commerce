document.getElementById('registerForm')
    .addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;

        try {

            const response = await fetch('http://localhost:3000/api/users/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.status === 201) {
                document.getElementById('message').textContent = 'User Created Successfully';
                document.getElementById('message').style.color = 'green';
                //console.log('SUCCESS');
            }
            else {
                document.getElementById('message').textContent = data.error || 'Creation Failed';
                document.getElementById('message').style.color = 'red';
                //console.log('ERROR');
                //console.log(data.error)
            }

        } catch (error) {
            console.log('Error while creating User', error);
        }




    })