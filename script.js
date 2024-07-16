const filieres = ["E", "M", "T", "I", "RSI", "SEE", "IHS", "ER", "F"];
const couleursFilieres = ["#337ab7", "#ff2929", "#e8c243", "#006600", "#ff66cc", "#9933ff", "#88ff75", "#eda13e", "#200766"];
const iconFilieres = ["fa-microchip", "fa-area-chart", "fa-wifi", "fa-laptop", "fa-sitemap", "fa-code-fork", "fa-universal-access", "fa-eye", "fa-users"];
const buttonFilieres = document.querySelectorAll('.btn');

function getFiliere(filière) {
    return `<span class="fa-stack" data-toggle="tooltip" data-placement="bottom">
                <i class="fa fa-circle fa-stack-2x " style="color: ${couleursFilieres[filieres.indexOf(filière)]}"></i>
                <i class="fa ${iconFilieres[filieres.indexOf(filière)]} fa-fw fa-stack-1x fa-inverse"></i>
              </span>`;
}

function getDivWithInfo(colonne, texte) {
    if (texte != "") {
        return `<div>
                    <h4>${colonne}</h4>
                    <span>${texte}</span>
                </div>`;
    }
    return "";
}

if (buttonFilieres) {
    buttonFilieres.forEach(b => {
        b.addEventListener('click', function () {
            document.querySelector('.stage').innerHTML = "";
            chargeElement(b.id);
        });
    });
}



function chargeElement(type_filiere) {
    fetch('entreprises2024.csv')
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
                        if (type_filiere == "tout" || row[type_filiere] == "TRUE") {

                            const colDiv = document.createElement('div');
                            colDiv.className = 'col-md-4 col-sm-6';

                            const thumbnailDiv = document.createElement('div');
                            thumbnailDiv.className = 'thumbnail';

                            const captionDiv = document.createElement('div');
                            captionDiv.className = 'caption';

                            const h3 = document.createElement('h3');
                            h3.textContent = row['Entreprises'];
                            h3.style = "margin: 5px;";

                            const lienSite = document.createElement('a');
                            lienSite.href = row['Site'];
                            lienSite.textContent = "Site Web";
                            lienSite.target = "_blank";
                            lienSite.style = "margin-right: 10px; color: white; background-color: rgb(139 198 62); padding: 5px; border-radius: 5px;";

                            const contenu = document.createElement('div');
                            contenu.style = "display: flex; flex-direction: column; width: 100%;";
                            
                            contenu.innerHTML += getDivWithInfo("Secteurs", row["Secteurs"]);
                            contenu.innerHTML += getDivWithInfo("Présentation", row["Presentation"]);
                            contenu.innerHTML += getDivWithInfo("Métiers", row["Metiers"]);
                            contenu.innerHTML += getDivWithInfo("Profils", row["Profils"]);
                            contenu.innerHTML += getDivWithInfo("Offres", row["Offres"]);
                            contenu.innerHTML += getDivWithInfo("Evolutions", row["Evolutions"]);
                            
                            const filiere = document.createElement('div');
                            filiere.style = "margin-bottom: 5px;";
                            filieres.forEach(f => {
                                if (row[f] == "TRUE") {
                                    filiere.innerHTML += getFiliere(f);
                                }
                            });


                            captionDiv.appendChild(h3);
                            captionDiv.appendChild(filiere);
                            captionDiv.appendChild(lienSite);
                            captionDiv.appendChild(contenu);
                            
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
    chargeElement("tout");
});
