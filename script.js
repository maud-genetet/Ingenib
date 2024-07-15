const filières = ["Elec", "Matméca", "Télécom", "Info", "RSI", "SEE"];
const nom_filières = ["Électronique", "Modélisation mathématiques et mécaniques", "Télécommunications", "Informatique", "Réseaux et Systèmes d'Information", "Systèmes Électroniques et Embarqués"];
const couleurs = ["#337ab7", "#ff2929", "#e8c243", "#006600", "#ff66cc", "#9933ff"];


function getFiliere(filière) {
    return `<span class="fa-stack" data-toggle="tooltip" data-placement="bottom" title="${nom_filières[filières.indexOf(filière)]}">
                <i class="fa fa-circle fa-stack-2x " style="color: ${couleurs[filières.indexOf(filière)]}"></i>
                <i class="fa fa-laptop fa-fw fa-stack-1x fa-inverse"></i>
              </span>`;
}

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
                        h3.textContent = row['Nom de l\'entreprise'];
                        const p = document.createElement('p');
                        p.textContent = "<b>Stages Proposés</b> : " + row['Stages Proposés'];
                        const filiere = document.createElement('div');
                        if (row['Filière'] != "Toutes filières") {
                            filiere.innerHTML = getFiliere(row['Filière']);
                        } else {
                            filières.forEach(filiere => {
                                filiere.innerHTML += getFiliere(filiere);
                            });
                        }

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
