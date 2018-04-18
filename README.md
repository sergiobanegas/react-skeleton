# React skeleton
This project is a React skeleton app, made to serve as the client of the SpringSkeleton app made by me: https://github.com/sergiobanegas/spring-skeleton

## Requirements

To use the application, the following setup is needed:
- NPM
- [Back-end server](https://github.com/sergiobanegas/spring-skeleton)
## Usage
To run the application, use the following commands:
```batch
cd react-skeleton
npm install
npm start
``` 
## Functionality

### Technical functionality
- **Redux:** the application uses Redux library for its architecture (https://redux.js.org/introduction).
- **Authentication and authorization**: the browser controls the user session thanks to the tokens sent by the back-end. To get the roles of an user, the app accesses the token called USER_INFO, which only contains non-sensitive data. Given this roles, the app handles the authorization for the different sub-routes.
- **i18n**: to achieve internationalization, this app uses the Yahoo library [react-intl](https://github.com/yahoo/react-intl). The available languages are the same the back-end uses: english, spanish, japanese and french. The user language is retrieved from the USER_INFO token.
### Web functionality
- **Sign in**: the user can sign in by using his email and password. He can select the "remember me" option to avoid being automatically logged out when closing the browser.
- **Sign up**: an user can be registered with an email, password, name and gender.
- **Reset password**: in case the user doesn't remember his password, he can reset it by entering his email and filling a password form.
- **Account details**: the user can see his account details: email, name, gender, avatar, language, date of creation and date of update.
- **Edit account**: the user can change his details:
   - Name and gender
   - Password (email confirmation needed)
   - Email (email confirmation neeed)
   - Avatar, by using file upload
   - Language
- **Delete account**: the user can delete his account (email confirmation needed)
- **Admin panel**: the admin user can administrate all the users of the application (excluding himself). The admin panel includes:
     - List of users paginated, displayed with infinite scroll
     - User info
     - Delete user
## Architecture
- **Components**: files that doesn't have any business logic, mostly related to UX: buttons, containers, grid system...
- **Containers**: the different pages, sub-pages or sections of the application. A container can be subscribed to one or multiple reducers.
- **Stores**: contains the main redux logic. The redux actions and the associated reducer are placed in the same file, following [redux ducks](https://github.com/erikras/ducks-modular-redux) proposal.
  - **Actions**: contains the business logic of the application. When a container dispatches an action, it invokes the asociated reducer dispatching an event with an action type. They include the HTTP calls to back-end.
  - **Reducers**: given an action, a reducer generates the next state (not modifying the previous one to achieve inmutability). The containers subscribed to this reducer will be updated receiving the next props.

#### Application made by Sergio Banegas for learning purposes
