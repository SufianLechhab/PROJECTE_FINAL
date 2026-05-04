DOCUMENTACIÓ DEL PROJECTE
GestoViatges

1. Descripció del projecte

Aquest projecte és una aplicació web per poder organitzar viatges en grup. La idea es que diferents usuaris puguin crear viatges, afegir activitats i convidar a altres persones.

Esta pensat sobretot per viatges com caps de setmana o vacances, i així facilitar una mica la organització entre amics, familiars o grups.

2. Objectius

Fer una aplicació funcional amb frontend i backend
Poder crear i gestionar viatges
Fer login i registre d’usuaris
Treballar amb API = unsplash
Practicar React i Laravel

3. Tecnologies utilitzades

* Frontend
  React
  JavaScript
  Vite (entorn de desenvolupament modern i ràpid)
  Fetch per connectar amb el backend

* Backend
  Laravel
  Sanctum per autenticació amb token

* Base de dades
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

* Autenticació
  Registre
  Login
  Token amb Sanctum
  Rutes protegides

* Viatges
  Crear viatges
  Editar
  Eliminar
  Només es veuen els teus viatges

* Participants
  Afegir participants amb email
  Comprova si existeix l’usuari
  Mostrar nom i correu

* Activitats
  Afegir activitats
  Posar data, hora i lloc
  Veure-les dins del viatge

* Imatges
  Ús de l’API d’Unsplash per mostrar imatges segons el destí

6. Base de dades

Taules principals:

users
viatges
participants
activitats
activitat_user (relació molts a molts per votacions)

Relacions:

un usuari pot tenir molts viatges
un viatge pot tenir molts participants
un participant pertany a un usuari
un viatge té activitats
una activitat pot tenir molts usuaris (apuntats)

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
PUT /api/viatges/{id

DELETE /api/viatges/{id}
POST /api/viatges/{id}/participants
POST /api/viatges/{id}/activitats
POST /api/activitats/{id}/apuntar
POST /api/activitats/{id}/desapuntar

9. Frontend

El frontend està fet amb React i Vite.

s’utilitza useState i useEffect
es fan peticions amb fetch al backend
el token es guarda al localStorage
es mostren dades dinàmicament
component reutilitzable useFetch per gestionar les peticions
component UnsplashImage per mostrar imatges

10. Entorn de desenvolupament (Vite)

El frontend s’ha creat amb Vite en lloc de Create React App perquè és més ràpid i modern.

Per crear el projecte:

npm create vite@latest
npm install
npm run dev

Avantatges de Vite:

Carrega molt més ràpid
Hot reload instantani
Millor rendiment
Eina més actual

11. Errors

login incorrecte → dona error
si el participant no existeix → error
camps buits → avisa
errors de CORS solucionats amb configuració del backend

12. Coses que no he fet encara

Per falta de temps:

despeses
mapes
millorar votacions

13. Millores possibles

millorar el disseny
editar activitats
eliminar activitats
millor sistema de votació
més control de rols

14. Com executar

Backend
cd backend
composer install
php artisan migrate
php artisan serve

Frontend
cd vite_frontend
npm install
npm run dev

15. Usuari de prova

Email: [test@test.com]
Password: 123456

16. Arquitectura

El projecte segueix una arquitectura client-servidor:

Frontend → React amb Vite
Backend → Laravel API REST

---

---

## LINKS DE LA DOCUMENTACIÓ OFICIAL

Vite
https://vitejs.dev/guide/

React
https://react.dev/learn

useState
https://react.dev/reference/react/useState

useEffect
https://react.dev/reference/react/useEffect

React Router
https://reactrouter.com/en/main/start/tutorial
useNavigate
https://reactrouter.com/en/main/hooks/use-navigate

useParams
https://reactrouter.com/en/main/hooks/use-params

Fetch API
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

fetch()
https://developer.mozilla.org/en-US/docs/Web/API/fetch

Promises
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

Laravel
https://laravel.com/docs

Laravel Sanctum
https://laravel.com/docs/sanctum

Eloquent (relacions)
https://laravel.com/docs/eloquent-relationships

Unsplash API
https://unsplash.com/documentation

Bootstrap
https://getbootstrap.com/docs/5.3/getting-started/introduction/
