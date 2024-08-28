const filieres = ["E", "M", "T", "I", "RSI", "SEE", "IHS", "ER", "F"];
const couleursFilieres = ["#337ab7", "#ff2929", "#e8c243", "#006600", "#9933ff", "#ff66cc", "#88ff75", "#eda13e", "#200766"];
const iconFilieres = ["fa-microchip", "fa-area-chart", "fa-wifi", "fa-laptop", "fa-sitemap", "fa-code-fork", "fa-universal-access", "fa-eye", "fa-users"];
const buttonFilieres = document.querySelectorAll('.btn');

function getFiliere(filière) {
    const color = couleursFilieres[filieres.indexOf(filière)];
    const icon = iconFilieres[filieres.indexOf(filière)];
    return `<span class="fa-stack" data-toggle="tooltip" data-placement="bottom">
                <i class="fa fa-circle fa-stack-2x filiere-circle" style="color: ${color};"></i>
                <i class="fa ${icon} fa-fw fa-stack-1x fa-inverse"></i>
            </span>`;
}

function getDivWithInfo(colonne, texte) {
    return texte ? `<div><h4>${colonne}</h4><span>${texte}</span></div>` : "";
}

buttonFilieres.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.stage').innerHTML = "";
        chargeElement(button.id);
    });
});

function chargeElement(type_filiere) {
    fetch('entreprises2024.csv')
        .then(response => {
            if (!response.ok) throw new Error('Erreur lors du chargement du fichier CSV');
            return response.text();
        })
        .then(csvContent => {
            Papa.parse(csvContent, {
                header: true,
                complete: function (results) {
                    const data = results.data;
                    const stageDiv = document.querySelector('.stage');

                    data.forEach((row, index) => {
                        if (type_filiere === "tout" || row[type_filiere] === "TRUE") {
                            const colDiv = document.createElement('div');
                            colDiv.className = "col-div";

                            const thumbnailDiv = document.createElement('div');
                            thumbnailDiv.className = 'thumbnail';

                            const captionDiv = document.createElement('div');
                            captionDiv.className = 'caption';

                            const h3 = document.createElement('h3');
                            h3.className = "entreprise-title";
                            h3.textContent = row['Entreprises'];

                            const contenu = document.createElement('div');
                            contenu.className = "contenu-caché";
                            contenu.id = "contenu_" + index;

                            contenu.innerHTML += getDivWithInfo("Présentation de l'entreprise", row["Presentation"]);
                            contenu.innerHTML += getDivWithInfo("Métiers des jeunes diplômés", row["Metiers"]);
                            contenu.innerHTML += getDivWithInfo("Description des profils recherchés", row["Profils"]);
                            contenu.innerHTML += getDivWithInfo("Offres de stages", row["Offres"]);
                            contenu.innerHTML += getDivWithInfo("Perspectives d'évolution au sein de l'entreprise", row["Evolutions"]);

                            const filiere = document.createElement('div');
                            filiere.className = "filiere";

                            if (row['Site']) {
                                const lienSite = document.createElement('a');
                                lienSite.href = row['Site'];
                                lienSite.textContent = "Site Web";
                                lienSite.target = "_blank";
                                lienSite.className = "lien-site";
                                filiere.appendChild(lienSite);
                            }

                            filieres.forEach(f => {
                                if (row[f] === "TRUE") {
                                    filiere.innerHTML += getFiliere(f);
                                }
                            });

                            captionDiv.appendChild(h3);
                            captionDiv.appendChild(filiere);
                            captionDiv.innerHTML += getDivWithInfo("Secteurs", row["Secteurs"]);
                            captionDiv.innerHTML += getDivWithInfo("Pays", row["Pays"]);
                            captionDiv.appendChild(contenu);

                            if (contenu.innerHTML) {
                                const buttonVoirPlus = document.createElement('button');
                                buttonVoirPlus.className = 'btn-voir-plus';
                                buttonVoirPlus.textContent = "Voir plus";
                                buttonVoirPlus.id = "btn_" + index;

                                buttonVoirPlus.addEventListener('click', () => {
                                    if (contenu.style.display === "none") {
                                        contenu.style.display = "flex";
                                        buttonVoirPlus.textContent = "Voir moins";
                                    } else {
                                        contenu.style.display = "none";
                                        buttonVoirPlus.textContent = "Voir plus";
                                    }
                                });

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
