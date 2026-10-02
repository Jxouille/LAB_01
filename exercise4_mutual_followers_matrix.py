class FollowerMatrix:
    def __init__(self, size, user_count):
        self.size = size
        self.user_count = user_count
        self.matrix = []
        for i in range(size):
            ligne = []
            for j in range(size):
                ligne.append(False)
            self.matrix.append(ligne)

    def follow(self, follower, followee):
        if follower < self.size and followee < self.size:
            self.matrix[follower][followee] = True

    def unfollow(self, follower, followee):
        if follower < self.size and followee < self.size:
            self.matrix[follower][followee] = False

    def is_following(self, follower, followee):
        if follower < self.size and followee < self.size:
            return self.matrix[follower][followee]
        return False

    def get_followers(self, user):
        followers_list = []
        for i in range(self.user_count):
            if self.matrix[i][user] == True:
                followers_list.append(i)
        return followers_list

    def get_following(self, user):
        following_list = []
        for j in range(self.user_count):
            if self.matrix[user][j] == True:
                following_list.append(j)
        return following_list

    def get_mutual_follows(self):
        mutuals = []
        for i in range(self.user_count):
            for j in range(i + 1, self.user_count):
                if self.matrix[i][j] == True and self.matrix[j][i] == True:
                    mutuals.append((i, j))
        return mutuals

    def get_influence_score(self, user):
        followers_count = len(self.get_followers(user))
        following_count = len(self.get_following(user))
        return (followers_count + following_count) / self.user_count


if __name__ == "__main__":
    reseau = FollowerMatrix(3, 3)
    reseau.follow(0, 1) 
    reseau.follow(1, 0)
    reseau.follow(1, 2)
    
    print("Mutuals:", reseau.get_mutual_follows()) 
    print("Influence User 1 (index 0):", reseau.get_influence_score(0)) 