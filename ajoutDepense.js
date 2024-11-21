const formDepense = document.getElementById('formDepense');
const titreDepenseInput = document.getElementById('titreDepense');
const montantDepenseInput = document.getElementById('montantDepense');
let depenses = JSON.parse(localStorage.getItem('depenses')) || []; 

function ajouterDepense() {
    const titre = titreDepenseInput.value;
    const montant = parseFloat(montantDepenseInput.value);

    // Vérifier que le titre n'est pas vide et que le montant est un nombre valide et positif
    if (titre.trim() === '' || isNaN(montant) || montant <= 0) {
        alert('Veuillez entrer un titre et un montant valide.');
        return false; 
    }

    depenses.push({ titre, montant });
    console.log(depenses);
    localStorage.setItem('depenses', JSON.stringify(depenses));
    return true;
}

// soumission du formulaire
formDepense.addEventListener('submit', function(e) {
    e.preventDefault(); 
    if (ajouterDepense()) {
        alert('Dépense ajoutée avec succès !');

        titreDepenseInput.value = "";
        montantDepenseInput.value = "";
        // Redirection
        window.location.href = 'index.html';
    }
});
