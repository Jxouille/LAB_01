def friend_request_timeline(message):
    message_type = ""
    nombre_maj = 0
    nombre_char = 0
    for char in message:
        if char.isupper():
            nombre_maj += 1
        if char.isalpha():
            nombre_char += 1
    urgency = 0
    for char in message:
        if char in ['!', '?']:
            urgency += 1
    caps_ratio = nombre_maj / nombre_char if nombre_char > 0 else 0
    if caps_ratio < 0.3 and urgency < 3:
        message_type = "CALM"
    elif caps_ratio >= 0.6 or urgency >= 5:
        message_type = "AGGRESSIVE"
    elif caps_ratio >= 0.3 or urgency >= 3:
        message_type = "URGENT"
    
    spam = False
    for i in range(len(message) - 2):
        if message[i] == message[i + 1] == message[i + 2]:
            spam = True
    return message_type, spam

test1 = "Hey, want to connect?"
test2 = "PLEASE ACCEPT MY REQUEST!!!"
test3 = "Are you free? I need to talk!!!"

print(friend_request_timeline(test1)) # Expected output: ("CALM", False)
print(friend_request_timeline(test2))  # Expected output: ("URGENT", False)
print(friend_request_timeline(test3))  # Expected output: ("URGENT", False)