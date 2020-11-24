## [Full Stack Developer Challenge](https://github.com/Pay-Baymax/FullStackEngineerChallenge)

### Before setup
1. Node >= version 10
2. npm

### Setup
1. Clone repo
```shell
git clone https://github.com/ByronLian/FullStackEngineerChallenge.git
cd FullStackEngineerChallenge
```
2. Install all dependencies packages
```shell
npm install
```

### Run
This will run both api server and application, If you want to run with initial DB then  `npm run start-init-db`
```shell
npm run start
```
**Open**: http://localhost:3500/

**Login**
Click demo account to quick login as Admin or Normal user
You can also check other accounts in `/server/db/testingData.js` or create new one after login as Admin

![Login](https://github.com/ByronLian/FullStackEngineerChallenge/blob/master/_assets/login.png)


### Tech
#### Server side
- Express JS as API server
- SQLite as DB

#### Client side
- React with Hooks, useContext & useReducer for global state on login function
- React bootstrap: component style
- React router dom: client side routing
- Jest & Enzyme: client side unit testing

### Design Concept
#### Assumptions
- Internal system with maximum connections less than 100 per minute
- No SEO requirement so no server side rendering for client side
- Admin can't delete employee but only set employee as inactive
- Admin can't delete review period but only can set period as closed
- Admin can view or assign employee to a review but can't modify review content
- In each review period, each employee will have only one auditor

#### Server side
##### Tables
![Tables](https://github.com/ByronLian/FullStackEngineerChallenge/blob/master/_assets/DB_schema.png)

  - **USERS**: It records all employees data with unique **email** and **id** as PK, active 1 mean employee is still in company and 0 is not, **role** means system role ( Admin or normal user )
  
  - **REVIEW_MAIN**: It records all review periods with **id** as PK, **is_closed** 1 means this review period has been closed by Admin. When Admin create new review period, system will create new review data into **REVIEWS** for all active employees 
  
  - **REVIEWS**: It records all review data, **review_id** is FK for **REVIEW_MAIN** **id**, **auditor_id** and **candidate_id** are FK for **USERS** **id**

##### APIs
**API Server**: http://localhost:8888/  Below are API endpoints in express server, check `/server/apis/` folder for more information

   - **login api**: For login and only allow employee who is active to login
```javascript
get("/api/users", [userApi.getUsers]);
post("/api/users", [userApi.addNewUser]);
patch("/api/users/:id", [userApi.updateUser]);
```

   - **user api**: For add / edit employee data
```javascript
get("/api/users", [userApi.getUsers]);
post("/api/users", [userApi.addNewUser]);
patch("/api/users/:id", [userApi.updateUser]);
```

   - **review api**: For  add / edit all reviews and review period data
```javascript
get("/api/reviews/:id", [reviewApi.getReviewsByUser]);
patch("/api/reviews/:id", [reviewApi.updateReviewByUser]);
get("/api/review-periods/", [reviewApi.getAllPerformancePeriods]);
post("/api/review-periods/", [reviewApi.addNewPerformancePeriod]);
patch("/api/review-periods/:id", [reviewApi.updatePerformancePeriod]);
get("/api/all-reviews/:id", [reviewApi.getReviewsByPeriodId]);
```

#### Client side
- ##### useContext & useReducer
  I implement global state management for login function with useContext and useReducer, so we can use that state in entire application for authorization. I didn't use redux or flow because this applicaiton don't have complicated states, check `/client/contexts/` for more

- ##### API call
  I extra api calls to serveral modules to match server side api, so each api can have no dependencies with react components, check `/clients/apis/` for more

- ##### React bootstrap
  I chose react bootstrap as CSS lib cause it can help us to build a system with set of styled components in short time and we can also custom some attributes

- ##### React router dom
  I use this to do client side routing, it's quick cause we can switch between pages without waiting server side reloading

- ##### Jest & Enzyme
  For unit testing, I only did some basic unit testings due to time limitation

### What can be better ?
#### Security
 I didn't check if there's any potenial issue for system security or not since it launch as an internal system. But we should at least make sure below 2 cases for those public system

 - Clent side, for example XSS
 - Server side, for example SQL injection

#### UX
  - Pagination for table: It could be a performance issue when data growth without pagination from API
  - Spinner: When system is doing action after user trigger, we should to let user know now system is working
  - Form Validation: React form validation can be quiet trouble some but we can use some libs like formik or react-hook-form

#### Feature
 - Enhance review feature: We only have comment input for review now, we can add something like performance level 50%~200% to show how hard that this employee did for this period
 - Delete period function: Let Admin can delete those review periods which were created by mistakenly
 
#### Others
 - Unit testing coverage
 - webpack finish production build
 - seperate js for each page for reducing js size

### Folder Structure
All client side codes are under `client/` and all api & DB codes are under` server/`
```
 .
 |__client
       |__ _tests          // Client side unit testing
       |__apis             // Client side api modules
       |__common           // Common components
       |__contexts         // Context for managment global login state
       |__pages            // Page components
       |__App.css
       |__App.jsx
       |__index.html
       |__index.js
       |__utils.js
       ...
 |__server
       |__apis            // Server side api codes
       |__db              // Database relsted
       |__constants.js
       |__server.js       // Express server main file
       |__sql.js
|...
|...

```
