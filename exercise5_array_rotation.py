def rotate_temp_array(vect: list[int], k: int) -> None:
    n = len(vect)
    if n <= 1:
        return
    k %= n
    if k == 0:
        return

    temp = [0] * n
    for i in range(n):
        temp[(i + k) % n] = vect[i]
    for i in range(n):
        vect[i] = temp[i]


def rotate_one_by_one(vect: list[int], k: int) -> None:
    n = len(vect)
    if n <= 1:
        return
    k %= n

    for _ in range(k):
        last = vect[-1]
        for i in range(n - 1, 0, -1):
            vect[i] = vect[i - 1]
        vect[0] = last


def reverse(arr: list[int], start: int, end: int) -> None:
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1

def rotate_reverse(vect: list[int], k: int) -> None:
    n = len(vect)
    if n <= 1:
        return
    k %= n
    if k == 0:
        return

    reverse(vect, 0, n - 1)
    reverse(vect, 0, k - 1)
    reverse(vect, k, n - 1)