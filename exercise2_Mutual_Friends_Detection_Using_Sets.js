//Intersection: Find mutual friends (people both users know)
function getIntersection(set1, set2) {
    let intersectionSet = new Set(); 
    
    for (let item of set1) { // Loop through each friend ID in the first set
        if (set2.has(item)) { // Check if the second user's friend list also contains this ID
            intersectionSet.add(item); // If yes, it's a mutual friend, so add it to the new set
        }
    }
    
    return intersectionSet; 
}

// Difference: Find unique friends of user 1 (friends in set1 that are not in set2)
function getDifference(set1, set2) {
    let differenceSet = new Set(set1); 
    
    for (let item of set2) { // Loop through each friend ID in the second set
        differenceSet.delete(item); // Remove the ID from our set (if it exists, no error if it doesn't)
    }
    
    return differenceSet; 
}

// Union: Combine all unique friends across both users
function getUnion(set1, set2) {
    let unionSet = new Set(set1); // Copy all elements from the first set into a new set
    
    for (let item of set2) { // Loop through each friend ID in the second set
        unionSet.add(item); // Add the ID (JavaScript Sets automatically ignore duplicates, so mutual friends are only added once)
    }
    
    return unionSet; 
}

// Jaccard Similarity (Mutual friend coefficient): |Intersection| / |Union|
function getJaccardSimilarity(set1, set2) {
    let intersectionSize = getIntersection(set1, set2).size; // Get the total count of mutual friends
    let unionSize = getUnion(set1, set2).size; // Get the total count of all unique friends combined
    
    if (unionSize === 0) return 0; // Safety check: avoid division by zero if both sets are empty
    
    return intersectionSize / unionSize; 
}