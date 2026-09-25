FUNCTION firstUniqueChar(s):
    IF s is empty THEN RETURN -1

    CREATE map counts
    FOR EACH char IN s DO:
        counts[char] = counts[char] + 1
    END FOR

    FOR i FROM 0 TO length(s) - 1 DO:
        IF counts[s[i]] == 1 THEN:
            RETURN i
        END IF
    END FOR

    RETURN -1
END FUNCTION
