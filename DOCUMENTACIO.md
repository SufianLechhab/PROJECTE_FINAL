
  DOCUMENTACIÓ DEL PROJECTE
Gestor de Viatges
1. Descripció del projecte

Aquest projecte és una aplicació web per poder organitzar viatges en grup. La idea és que diferents usuaris puguin crear viatges, afegir activitats i convidar a altres persones.

Està pensat sobretot per viatges d’oci, com caps de setmana o vacances, i així facilitar una mica la organització entre amics o grups.

2. Objectius
Fer una aplicació funcional amb frontend i backend
Poder crear i gestionar viatges
Fer login i registre d’usuaris
Treballar amb API REST
Practicar React i Laravel
🛠️ 3. Tecnologies utilitzades

- Frontend
React
JavaScript
Fetch per connectar amb el backend

- Backend
Laravel
Sanctum per autenticació amb token

- Base de dades
MySQL

4. Tipus d’usuaris
Organitzador
Pot crear viatges
Afegir activitats
Invitar participants
Participant
Pot veure el viatge
Veure activitats

5. Funcionalitats implementades

- Autenticació
Registre
Login
Token amb Sanctum
Rutes protegides

- Viatges
Crear viatges
Editar
Eliminar
Només es veuen els teus viatges

- Participants
Afegir participants amb email
Comprova si existeix l’usuari
Mostrar nom i correu

- Activitats
Afegir activitats
Posar data, hora i lloc
Veure-les dins del viatge

6. Base de dades

Taules principals:

users
viatges
participants
activitats

Relacions:

un usuari pot tenir molts viatges
un viatge pot tenir molts participants
un participant pertany a un usuari
un viatge té activitats

7. Seguretat
login amb token
rutes protegides amb sanctum
control de qui pot editar o eliminar

 8. API

Algunes rutes:

POST /api/register
POST /api/login
GET /api/viatges
POST /api/viatges
PUT /api/viatges/{id}
DELETE /api/viatges/{id}
POST /api/viatges/{id}/participants
POST /api/viatges/{id}/activitats
🖥️ 9. Frontend

El frontend està fet amb React.

s’utilitza useState i useEffect
es fan fetch al backend
el token es guarda al localStorage
es mostren dades dinàmicament

10. Errors
login incorrecte → dona error
si el participant no existeix → error
camps buits → avisa

11. Coses que no he fet

Per falta de temps:

despeses
votacions
mapes

Això es podria fer en un futur.

12. Millores possibles
millorar el disseny (ara és bastant simple)
poder editar activitats
eliminar activitats
més control de rols
13. Com executar
Backend
cd backend
composer install
php artisan migrate
php artisan serve
Frontend
cd frontend
npm install
npm start
14. Usuari de prova

Email: test@test.com

Password: 123456