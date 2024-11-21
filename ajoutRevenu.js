const formRevenu = document.getElementById('formRevenu');
let revenus = JSON.parse(localStorage.getItem('revenus')) || [];

function valeurDeRevenu() {
    const titre = document.getElementById('titreRevenu').value;
    const montant = parseFloat(document.getElementById('montantRevenu').value);

    return { titre, montant };
}

// function inputRevenu(titre, montant) {
//     if (titre.trim() === '' || isNaN(montant) || montant <= 0) {
//         alert('Veuillez entrer un titre et un montant valide.');
//         return false; 
//     }
//     return true;
// }

function saveRevenuToLocalStorage(titre, montant) {
    revenus.push({ titre, montant });

    localStorage.setItem('revenus', JSON.stringify(revenus));
}

formRevenu.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const { titre, montant } = valeurDeRevenu();

    // if (!inputRevenu(titre, montant)) {
    //     return;
    // }

    saveRevenuToLocalStorage(titre, montant);

    // alert('Revenu ajouté avec succès !');

    titreRevenu.value= "";
    montantRevenu.value = "";
    // Redirection
    window.location.href = 'index.html';
});
