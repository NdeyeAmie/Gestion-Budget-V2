function afficherDepenses() {
    const depenses = JSON.parse(localStorage.getItem('depenses')) || [];
    const tbodyDepenses = document.getElementById('tbodyDepenses');

    // let lignesDynamiques = tbody.querySelectorAll('[data-type="dynamic"]');
    // lignesDynamiques.forEach(ligne => ligne.remove());
    
    tbodyDepenses.innerHTML = '';

    depenses.forEach(depense => {
        const row = document.createElement('tr');
        
        // creer et ajouter td
        const tdTitre = document.createElement('td');
        tdTitre.textContent = depense.titre;
        
        const tdMontant = document.createElement('td');
        tdMontant.textContent = `${depense.montant} F CFA`;

        const tdActions = document.createElement('td');
        
        const btnSupprimer = document.createElement('button');
        btnSupprimer.textContent = 'Supprimer';
        btnSupprimer.classList.add('btn', 'btn-danger');
        btnSupprimer.onclick = () => supprimerDepense(depense.titre);  

        tdActions.appendChild(btnSupprimer);
        row.appendChild(tdTitre);
        row.appendChild(tdMontant);
        row.appendChild(tdActions);

        tbodyDepenses.appendChild(row);
    });

    document.getElementById('btn_ajoutD').addEventListener('click', function() {
        window.location.href = 'ajoutDepense.html';
    });
}

//afficher les revenus 
function afficherRevenus() {
    const revenus = JSON.parse(localStorage.getItem('revenus')) || [];
    const tbodyRevenus = document.getElementById('tbodyRevenus');
    
    tbodyRevenus.innerHTML = '';
    revenus.forEach(revenu => {
        const row = document.createElement('tr');
        const tdTitre = document.createElement('td');
        tdTitre.textContent = revenu.titre;
        
        const tdMontant = document.createElement('td');
        tdMontant.textContent = `${revenu.montant} F CFA`;

        const tdActions = document.createElement('td');
        const btnSupprimer = document.createElement('button');
        btnSupprimer.textContent = 'Supprimer';
        btnSupprimer.classList.add('btn', 'btn-danger');
        btnSupprimer.onclick = () => supprimerRevenu(revenu.titre);  

        tdActions.appendChild(btnSupprimer);
        row.appendChild(tdTitre);
        row.appendChild(tdMontant);
        row.appendChild(tdActions);
        tbodyRevenus.appendChild(row);
    });

    document.getElementById('btn_ajoutR').addEventListener('click', function() {
        window.location.href = 'ajoutRevenu.html';
    });
}

//supprimer une dépense
function supprimerDepense(titre) {
    let depenses = JSON.parse(localStorage.getItem('depenses')) || [];
    depenses = depenses.filter(depense => depense.titre !== titre); 
    console.log(depenses);
    localStorage.setItem('depenses', JSON.stringify(depenses)); 
    afficherDepenses();
    calculerTotalDepenses();
    calculerSolde();
}

// supprimer un revenu
function supprimerRevenu(titre) {
    let revenus = JSON.parse(localStorage.getItem('revenus')) || [];
    revenus = revenus.filter(revenu => revenu.titre !== titre); 
    localStorage.setItem('revenus', JSON.stringify(revenus)); 
    afficherRevenus();
    calculerTotalRevenus(); 
    calculerSolde();
}


function calculerTotalDepenses() {
    const depenses = JSON.parse(localStorage.getItem('depenses')) || [];
    let totalDepenses = 0;
    depenses.forEach(depense => {
        totalDepenses += depense.montant;
    });
    document.getElementById('totalsDepenses').textContent = `${totalDepenses} F CFA`;
}

function calculerTotalRevenus() {
    const revenus = JSON.parse(localStorage.getItem('revenus')) || [];
    let totalRevenus = 0;
    revenus.forEach(revenu => {
        totalRevenus += revenu.montant;
    });
    document.getElementById('totalsRevenus').textContent = `${totalRevenus} F CFA`;
}

// calcule solde
function calculerSolde() {
    const revenus = JSON.parse(localStorage.getItem('revenus')) || [];
    const depenses = JSON.parse(localStorage.getItem('depenses')) || [];

    let totalRevenus = 0;
    let totalDepenses = 0;

    revenus.forEach(revenu => {
        totalRevenus += revenu.montant;
    });
    depenses.forEach(depense => {
        totalDepenses += depense.montant;
    });

    const solde = Math.abs(totalRevenus - totalDepenses);

    const soldElement = document.getElementById('afficheSold');
    if (soldElement) {
        soldElement.textContent = `${solde} F CFA`;
    }
}


// Appeler les fonctions pour afficher les données
window.onload = function() {
    afficherDepenses();
    afficherRevenus();
    calculerTotalDepenses();
    calculerTotalRevenus();
    calculerSolde();
};
