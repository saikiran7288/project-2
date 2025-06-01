document.getElementById('convert-btn').addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    
    if (isNaN(amount)) {
        alert("Please enter a valid number!");
        return;
    }

    try {
        // Fetch exchange rate from API
        const response = await fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`);
        const data = await response.json();
        
        if (!data.rates || !data.rates[toCurrency]) {
            throw new Error("Failed to fetch exchange rate.");
        }

        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        
        document.getElementById('result').innerHTML = `
            ${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}
        `;
    } catch (error) {
        document.getElementById('result').innerHTML = "Error fetching data. Try again later.";
        console.error(error);
    }
});
