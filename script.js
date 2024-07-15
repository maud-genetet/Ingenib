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
                        const colDiv = document.createElement('div');
                        colDiv.className = 'col-md-4 col-sm-6';

                        const thumbnailDiv = document.createElement('div');
                        thumbnailDiv.className = 'thumbnail';

                        const captionDiv = document.createElement('div');
                        captionDiv.className = 'caption';

                        const h3 = document.createElement('h3');
                        h3.textContent = row["Nom de l'entreprise"];

                        const pDomaine = document.createElement('p');
                        pDomaine.textContent = row["Domaine de compétences"];

                        const pStages = document.createElement('p');
                        pStages.textContent = row["Stages Proposés"];

                        const pAnnee = document.createElement('p');
                        pAnnee.textContent = row["Année de création"];

                        const pEmployes = document.createElement('p');
                        pEmployes.textContent = row["Nombre d'employés"];

                        const pChiffre = document.createElement('p');
                        pChiffre.textContent = row["Chiffre d'Affaires"];

                        captionDiv.appendChild(h3);
                        captionDiv.appendChild(pDomaine);
                        captionDiv.appendChild(pStages);
                        captionDiv.appendChild(pAnnee);
                        captionDiv.appendChild(pEmployes);
                        captionDiv.appendChild(pChiffre);
                        
                        thumbnailDiv.appendChild(captionDiv);
                        colDiv.appendChild(thumbnailDiv);
                        stageDiv.appendChild(colDiv);
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
