document.querySelector('#submit-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const formContainer = document.getElementById('form-container');
    const errorDiv = document.getElementById('error-message');
    const successDiv = document.getElementById('success-message');

    const formData = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        phone: document.querySelector('#phone').value
    }

    try{
        const res = await fetch('submit.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        
        const result = await res.json()

        if (result.success) {
            formContainer.classList.add('hidden');
            successDiv.classList.remove('hidden');
        } else {
            errorDiv.textContent = result.message;
            errorDiv.classList.remove('hidden');
        }
    } catch(error){
        errorDiv.textContent = 'Произошла ошибка при отправке. Попробуйте позже.';
        errorDiv.classList.remove('hidden');
        console.log(error);
    }
})