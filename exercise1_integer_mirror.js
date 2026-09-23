function reverseInteger(n) {
    let reversed = 0; 
    
    while (n > 0) { //On crée une boucle qui tourne tant qu'il reste des chiffres à traiter dans n.
        let digit = n % 10; //On extrait le dernier chiffre de n grâce au modulo 10 (ex: 315 % 10 = 5).
        
        reversed = (reversed * 10) + digit; //On décale les chiffres de 'reversed' vers la gauche (*10) et on y ajoute le nouveau chiffre.
        
        n = Math.floor(n / 10); //On supprime le dernier chiffre de n en faisant une division entière (Math.floor évite de garder les décimales).
    }
    
    return reversed; 
}
