const form = document.getElementById('transaction-form');
const responseContainer = document.getElementById('response-container');

form.addEventListener('submit', async (event) => {
	event.preventDefault();

	const recipientAddress = form.elements['recipient-address'].value;
	const amount = form.elements['amount'].value;

	const data = {
		to: recipientAddress,
		value: amount,
		namespace: 'pfb',
		version: '1.0.0',
		blob: 'Hello, world!'
	};

	const response = await fetch('https://api.celestia.org/transactions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (response.ok) {
		const responseData = await response.json();
		responseContainer.innerHTML = `
			<p>Transaction submitted successfully!</p>
			<pre>${JSON.stringify(responseData, null, 2)}</pre>
		`;
	} else {
		responseContainer.innerHTML = '<p>Transaction submission failed!</p>';
	}
});
