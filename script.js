const filieres = ["E", "M", "T", "I", "RSI", "SEE", "IHS", "ER", "F"];
const couleursFilieres = ["#337ab7", "#ff2929", "#e8c243", "#006600", "#ff66cc", "#9933ff", "#88ff75", "#eda13e", "#200766"];
const iconFilieres = ["fa-microchip", "fa-area-chart", "fa-wifi", "fa-laptop", "fa-sitemap", "fa-code-fork", "fa-universal-access", "fa-eye", "fa-users"];
const buttonFilieres = document.querySelectorAll('.btn');
const btnVoirPlus = document.querySelectorAll('.btn-voir-plus');

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

buttonFilieres.forEach(b => {
    b.addEventListener('click', function () {
        document.querySelector('.stage').innerHTML = "";
        chargeElement(b.id);
    });
});

btnVoirPlus.forEach(b => {
    b.addEventListener('click', function () {
        console.log(b.id);
        const contenu = document.getElementById("contenu_" + b.id.split("_")[1]);
        if (contenu.style.display == "none") {
            contenu.style.display = "flex";
            b.textContent = "Voir moins";
        } else {
            contenu.style.display = "none";
            b.textContent = "Voir plus";
        }
    });
});


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
                    data.forEach((row) => {
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

                            const contenu = document.createElement('div');
                            contenu.style = "display: none; flex-direction: column; width: 100%;";
                            contenu.id = "contenu_" + row['Entreprises'];
                            
                            contenu.innerHTML += getDivWithInfo("Présentation", row["Presentation"]);
                            contenu.innerHTML += getDivWithInfo("Métiers", row["Metiers"]);
                            contenu.innerHTML += getDivWithInfo("Profils", row["Profils"]);
                            contenu.innerHTML += getDivWithInfo("Offres", row["Offres"]);
                            contenu.innerHTML += getDivWithInfo("Evolutions", row["Evolutions"]);
                            
                            const filiere = document.createElement('div');
                            filiere.style = "margin: 5px;";
                            filieres.forEach(f => {
                                if (row[f] == "TRUE") {
                                    filiere.innerHTML += getFiliere(f);
                                }
                            });


                            captionDiv.appendChild(h3);
                            captionDiv.appendChild(filiere);
                            if (row['Site'] != ""){
                                const lienSite = document.createElement('a');
                                lienSite.href = row['Site'];
                                lienSite.textContent = "Site Web";
                                lienSite.target = "_blank";
                                lienSite.style = "margin: 10px; color: white; background-color: rgb(139 198 62); padding: 5px; border-radius: 5px;";
                                captionDiv.appendChild(lienSite);
                            }
                            
                            captionDiv.innerHTML += getDivWithInfo("Secteurs", row["Secteurs"]);
                            captionDiv.appendChild(contenu);
                            if (contenu.innerHTML != "") {
                                const buttonVoirPlus = document.createElement('button');
                                buttonVoirPlus.className = 'btn-voir-plus';
                                buttonVoirPlus.textContent = "Voir plus";
                                buttonVoirPlus.style = "margin: 10px;";
                                buttonVoirPlus.id = "btn_" + row['Entreprises'];
                                captionDiv.appendChild(buttonVoirPlus);
                            }
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
