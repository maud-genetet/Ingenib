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
                    /*<div class="col-md-4 col-sm-6">
        <div class="thumbnail">
          <div class="caption">
            <h3>Afficher votre publicité</h3>
            <p>Un guide du visiteur et un site Internet sont à disposition des participants au forum sur lesquels vous
              pouvez réserver un encart publicitaire.</p>
          </div>
        </div>
      </div>*/
                    data.forEach((row, index) => {
                        const colDiv = document.createElement('div');
                        colDiv.className = 'col-md-4 col-sm-6';
                        const thumbnailDiv = document.createElement('div');
                        thumbnailDiv.className = 'thumbnail';
                        const captionDiv = document.createElement('div');
                        captionDiv.className = 'caption';
                        const h3 = document.createElement('h3');
                        h3.textContent = row['Nom de l\'entreprise'];
                        const p = document.createElement('p');
                        p.textContent = row['Stages Proposés'];
                        captionDiv.appendChild(h3);
                        captionDiv.appendChild(p);
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
