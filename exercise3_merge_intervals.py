FUNCTION mergeIntervals(intervals):
    IF intervals is empty OR has 1 item THEN:
        RETURN intervals
    END IF

    sortedIntervals = sortIntervalsByStart(intervals)
    mergedList = [sortedIntervals[0]]

    FOR EACH current IN sortedIntervals (starting from 2nd item):
        lastMerged = GET_LAST_ELEMENT(mergedList)

        IF current.start <= lastMerged.end THEN:
            lastMerged.end = MAX(lastMerged.end, current.end)
        ELSE:
            mergedList.ADD(current)
        END IF
    END FOR

    RETURN mergedList
END FUNCTION
