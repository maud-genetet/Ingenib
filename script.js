document.addEventListener('DOMContentLoaded', function() {
    fetch('ingenib2023entreprises.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement du fichier CSV');
            }
            return response.text();
        })
        .then(csvContent => {
            Papa.parse(csvContent, {
                header: true,
                complete: function(results) {
                    const data = results.data;
                    const stageDiv = document.querySelector('.stage');
                    data.forEach((row, index) => {
                        const rowDiv = document.createElement('div');
                        rowDiv.textContent = `Ligne ${index + 1}: ${JSON.stringify(row)}`;
                        stageDiv.appendChild(rowDiv);
                    });
                },
                error: function(error) {
                    console.error('Erreur lors de l\'analyse du fichier CSV:', error);
                }
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
});
