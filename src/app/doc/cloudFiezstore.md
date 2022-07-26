
# Url

https://firebase.google.com/docs/rules/rules-and-auth

# regles

rules_version = '2'; service cloud.firestore { match /databases/{database}/documents { match /{document=**} { allow read, write, update: if request.time < timestamp.date(2022, 6, 29); } match /pages/{document} { allow read: if true; allow write, update : if false; } match /users/{document} { allow write, update: if request.auth != null && get(/databases/$(database)/documents/comptes/$(request.auth.uid)).data.statut == 1007; allow read: if request.auth != null; } } } 

# Langage des règles de sécurité 

https://firebase.google.com/docs/rules/rules-language