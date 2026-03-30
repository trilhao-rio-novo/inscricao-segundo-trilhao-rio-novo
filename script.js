document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const cpfInput = document.getElementById('cpf');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    const spinner = document.getElementById('loading-spinner');
    const errorMessage = document.getElementById('error-message');
    const mainContainer = document.getElementById('main-container');
    const successMessage = document.getElementById('success-message');
    const resetBtn = document.getElementById('reset-btn');

    // MASK CPF: 000.000.000-00
    cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Keep only numbers
        if (value.length > 11) value = value.slice(0, 11); // Limit strictly to 11 numbers

        // Apply formatting
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        e.target.value = value;
    });

    // FORM SUBMISSION
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide errors
        errorMessage.classList.add('hidden');
        
        const name = document.getElementById('name').value.trim();
        const cpf = cpfInput.value.replace(/\D/g, ""); // Clean string directly mapping to DB

        // Basic validation
        if (name === '' || cpf.length !== 11) {
            errorMessage.textContent = "Nome e CPF (11 dígitos) são obrigatórios.";
            errorMessage.classList.remove('hidden');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.textContent = "Processando...";
        btnIcon.classList.add('hidden');
        spinner.classList.remove('hidden');

        try {
            // =========================================================
            //  AQUI É ONDE VOCÊ CONECTA COM O GOOGLE SHEETS API (Fetch)
            // =========================================================
            /* 
               Exemplo de POST num Google Apps Script (Web App):
               
               const URL_DA_SUA_API = "https://script.google.com/macros/s/SUA_CHAVE_AQUI/exec";
               
               await fetch(URL_DA_SUA_API, {
                   method: 'POST',
                   mode: 'no-cors',
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({ name: name, cpf: cpf, date: new Date().toISOString() })
               });
            */
            
            // Simulating API call for now (Remove later when API is ready)
            await new Promise(r => setTimeout(r, 1500)); 

            // SUCCESS FLOW
            
            // Animate transition between components
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
            
        } catch (error) {
            errorMessage.textContent = "Ocorreu um erro ao enviar. Tente novamente.";
            errorMessage.classList.remove('hidden');
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            btnText.textContent = "Garantir Vaga";
            btnIcon.classList.remove('hidden');
            spinner.classList.add('hidden');
        }
    });

    // RESET FORM TO REGISTER ANOTHER PERSON
    resetBtn.addEventListener('click', () => {
        form.reset();
        successMessage.classList.add('hidden');
        form.classList.remove('hidden');
    });
});
