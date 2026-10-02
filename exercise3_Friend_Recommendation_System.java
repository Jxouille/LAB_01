import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class InterestRecommender {

    /**
     * ALGORITHM CosineSimilarity
     * Retourne la similarité cosinus entre les profils de user_A et user_B.
     */
    public static double cosineSimilarity(int[][] matrix, int userA, int userB, int U, int I) {
        double dotProduct = 0.0; // Initialisé à 0
        double sumSqA = 0.0;
        double sumSqB = 0.0;

        for (int j = 0; j <= I - 1; j++) {
            int valA = matrix[userA][j]; // Valeur entre 0 et 10
            int valB = matrix[userB][j];

            // Somme A_i * B_i
            dotProduct = dotProduct + (valA * valB);
            sumSqA = sumSqA + (valA * valA);
            sumSqB = sumSqB + (valB * valB);
        }

        double normA = Math.sqrt(sumSqA); // Calcul de norm_A et norm_B
        double normB = Math.sqrt(sumSqB);

        if (normA == 0 || normB == 0) { // Évite la division par 0
            return 0.0;
        }

        return dotProduct / (normA * normB); // Similarité cosinus
    }

    /**
     * ALGORITHM GetTopKRecommendations
     * Retourne les K utilisateurs les plus similaires qui ne sont pas déjà amis.
     * Les cases sans candidat valent -1.
     */
    public static int[] getTopKRecommendations(int[][] matrix, boolean[][] isFriend,
                                               int targetUser, int K, int U, int I) {
        double[] similarities = new double[U]; // Scores de similarité pour tous les utilisateurs

        // Étape 1 : calcul des similarités avec tous les utilisateurs potentiels
        for (int otherUser = 0; otherUser <= U - 1; otherUser++) {
            if (otherUser == targetUser || isFriend[targetUser][otherUser]) {
                similarities[otherUser] = -1.0; // Ignore soi-même et les amis actuels
            } else {
                similarities[otherUser] = cosineSimilarity(matrix, targetUser, otherUser, U, I);
            }
        }

        // Étape 2 : extraction des K meilleurs scores
        int[] topCandidates = new int[K];

        for (int rank = 0; rank <= K - 1; rank++) {
            int maxIdx = -1;
            double maxScore = -1.0;

            for (int u = 0; u <= U - 1; u++) {
                if (similarities[u] > maxScore) {
                    maxScore = similarities[u]; // Mise à jour du meilleur score
                    maxIdx = u;                 // Mise à jour du meilleur utilisateur
                }
            }

            if (maxIdx != -1 && maxScore > 0.0) {
                topCandidates[rank] = maxIdx;     // Ajout du meilleur utilisateur
                similarities[maxIdx] = -1.0;      // Marqué comme choisi
            } else {
                topCandidates[rank] = -1;         // Plus de candidat disponible
            }
        }

        return topCandidates;
    }

    /**
     * ALGORITHM RecommendInterests
     * Recommande les intérêts peu notés par target_user mais bien notés par most_similar_user.
     */
    public static List<Integer> recommendInterests(int[][] matrix, int targetUser, int mostSimilarUser,
                                                   int ratingThreshold, int U, int I) {
        List<Integer> recommendedInterests = new ArrayList<>(); // Liste vide

        for (int j = 0; j <= I - 1; j++) {
            int valTarget = matrix[targetUser][j];       // Note de l'intérêt j (0 à 10)
            int valSimilar = matrix[mostSimilarUser][j];

            if (valTarget <= 2 && valSimilar >= ratingThreshold) { // Cible faible & similaire fort
                recommendedInterests.add(j);
            }
        }

        return recommendedInterests;
    }

    // Petit test avec les données de l'énoncé
    public static void main(String[] args) {
        String[] interests = {"Music", "Sports", "Tech", "Fashion", "Travel", "Food"};
        int[][] matrix = {
            {10, 0, 8, 2, 5, 7}, // User 0
            { 9, 1, 7, 3, 6, 8}, // User 1
            { 2, 9, 1, 8, 3, 0}  // User 2
        };
        int U = matrix.length;
        int I = interests.length;
        boolean[][] isFriend = new boolean[U][U]; // Aucune amitié au départ

        System.out.printf("Sim(0,1) = %.2f%n", cosineSimilarity(matrix, 0, 1, U, I));
        System.out.printf("Sim(0,2) = %.2f%n", cosineSimilarity(matrix, 0, 2, U, I));

        int[] top = getTopKRecommendations(matrix, isFriend, 0, 2, U, I);
        System.out.println("Top-2 pour user 0 : " + Arrays.toString(top));

        List<Integer> recos = recommendInterests(matrix, 2, 0, 6, U, I);
        System.out.print("Intérêts recommandés à user 2 :");
        for (int j : recos) System.out.print(" " + interests[j]);
        System.out.println();
    }
}