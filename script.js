const filières = ["Elec", "Matméca", "Télécom", "Info", "RSI", "SEE"];
const nom_filières = ["Électronique", "Modélisation mathématiques et mécaniques", "Télécommunications", "Informatique", "Réseaux et Systèmes d'Information", "Systèmes Électroniques et Embarqués"];
const couleurs = ["#337ab7", "#ff2929", "#e8c243", "#006600", "#ff66cc", "#9933ff"];
const icon = ["fa-microchip", "fa-area-chart", "fa-wifi", "fa-laptop", "fa-sitemap", "fa-code-fork"];

function getFiliere(filière) {
    return `<span class="fa-stack" data-toggle="tooltip" data-placement="bottom" title="${nom_filières[filières.indexOf(filière)]}">
                <i class="fa fa-circle fa-stack-2x " style="color: ${couleurs[filières.indexOf(filière)]}"></i>
                <i class="fa ${icon[filières.indexOf(filière)]} fa-fw fa-stack-1x fa-inverse"></i>
              </span>`;
}

/**  <button id="tout" class="btn" style="margin: 10px;">Tout</button>
        <button id="Info" class="btn"
          style="margin: 10px; background-color: #006600; color: white;">Informatique</button>
        <button id="Elec" class="btn"
          style="margin: 10px; background-color: #337ab7; color: white;">Électronique</button>
        <button id="Télécom" class="btn"
          style="margin: 10px; background-color: #e8c243; color: white;">Télécommunications</button>
        <button id="Matméca" class="btn" style="margin: 10px; background-color: #ff2929; color: white;">Matmeca</button>
        <button id="RSI" class="btn" style="margin: 10p */
const button = document.querySelectorAll('.btn');

// si on clique sur un bouton on affiche les stages correspondants
if (button) {
    button.forEach(b => {
        b.addEventListener('click', function () {
            document.querySelector('.stage').innerHTML = "";
            chargeElement(b.id);
        });
    });
}



function chargeElement(type_filiere) {
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
                complete: function (results) {
                    const data = results.data;
                    const stageDiv = document.querySelector('.stage');
                    data.forEach((row, index) => {
                        if (type_filiere == "tout" || row['Filière'] == type_filiere || row['Filière'] == "Toutes filières") {

                            const colDiv = document.createElement('div');
                            colDiv.className = 'col-md-4 col-sm-6';
                            const thumbnailDiv = document.createElement('div');
                            thumbnailDiv.className = 'thumbnail';
                            const captionDiv = document.createElement('div');
                            captionDiv.className = 'caption';
                            const h3 = document.createElement('h3');
                            h3.textContent = row['Nom de l\'entreprise'];
                            const p = document.createElement('p');
                            row['Domaine de compétences'] == "" ? p.textContent = "Domaine de compétences : Non précisé" : p.textContent = "Domaine de compétences : " + row['Domaine de compétences'];
                            row['Stages Proposés'] == "" ? p.textContent = "Stages Proposés : Non précisé" : p.textContent = "Stages Proposés : " + row['Stages Proposés'];
                            const filiere = document.createElement('div');
                            if (row['Filière'] != "Toutes filières") {
                                filiere.innerHTML = getFiliere(row['Filière']);
                            } else {
                                filières.forEach(f => {
                                    filiere.innerHTML += getFiliere(f);
                                });
                            }


                            captionDiv.appendChild(h3);
                            captionDiv.appendChild(p);
                            captionDiv.appendChild(filiere);
                            thumbnailDiv.appendChild(captionDiv);
                            colDiv.appendChild(thumbnailDiv);
                            stageDiv.appendChild(colDiv);
                        }

                    });
                },
                error: function (error) {
                    console.error('Erreur lors de l\'analyse du fichier CSV:', error);
                }
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    chargeElement();
});
