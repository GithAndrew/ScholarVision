
# ScholarVision

**ScholarVision** is a **Content Management System template** that can be dynamically used by schools for their own scholarship databases. The web application is made to be duplicated and changed according to the needs of each school.

This file will serve as a tutorial on how to create your own web application from the template that will be provided, along with its different features.

The applications that are required are as follows:
- Github Desktop (to store the codebase)
- Vercel (to deploy the application)
- MongoDB Atlas (to serve as the database)

## Setting up a Github account and Github Desktop
- *SOURCE FOR STEPS 1-2: https://www.youtube.com/watch?v=Gn3w1UvTx0A*
1. Go to https://github.com/ and click *"Sign Up"* if you don't have an account yet.
2. Follow the steps found in the website.
- *SOURCE FOR STEPS 3-5: https://www.youtube.com/watch?v=8Dd7KRpKeaE*
3. After creating an account, go to https://desktop.github.com/ and press Download.
4. Double-click the installer file and follow the prompts to install Github Desktop.
5. After downloading the app, open Github Desktop and open **File -> Options -> Accounts -> Continue with browser** and sign in using the account you just made.
6. **You now have Github Desktop**!

## Downloading the template
1. Go to https://github.com/GithAndrew/ScholarVision and press the green button with <Code> written on it.
2. Press *"Open with Github Desktop"* and then press "*Clone*" once the application opens.
**NOTE**: You can change where you can place your files for ScholarVision, but for convenience, you can leave it as is. These files can now be found in *Documents/Github/ScholarVision*

## Creating a MongoDB Atlas account
- *SOURCE FOR STEPS 1-9: https://www.youtube.com/watch?v=ME3tMy5Q2qo* 11:20

1. Go to https://account.mongodb.com/account/login and sign up using **Google** (preferably the email linked with your Github account).
2. Once inside, go to https://cloud.mongodb.com/v2#/preferences/organizations and press the first organization.
3. Press **New Project** and follow the steps.
4. Press **Build a Database** and **Create Free**.
5. Press **Google Cloud** and **Hong Kong** for Cloud Provider & Region then **Create Cluster**.
6. Create your username and password (keep these in mind) and create user. Add your current IP address and finish & close.
7. This will bring you to *Database Deployments*. Press **Connect** next to **Cluster 0** and choose **Connect your application**.
8. The Driver should be Node.js 4.1 and later.
9. Copy the domain link of the database, we'll call it ***mongo_db*** (e.g., *mongodb+srv://<username>:<password>@cluster0.ofjvy36.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0*) and save it for later.

## Install MongoDB Compass
1. Go to https://www.mongodb.com/try/download/shell and download MongoDB Compass.
2. Double-click the installer file and follow the prompts to install MongoDB Compass.
3. Opening the app will lead you to **New Connection**. Paste the ***mongo_db*** in URI and press **Save & Connect**.
4. Press **_MONGOSH** found at the bottom and copy-paste the code below and press Enter.

```
use sv_database
db.createCollection("scholars")
db.createCollection("schools")
db.createCollection("uploads")
db.createCollection("users")
db.createCollection("scholarships")
db.createCollection("donors")
db.createCollection("applicants")
db.createCollection("logs")
db.createCollection("deleteds")
```
5. **Your database is now set up!**

## Server deployment using the Vercel app
- *SOURCE FOR ALL THE STEPS FOR VERCEL DEPLOYMENT: https://www.geeksforgeeks.org/how-to-deploy-mern-application-on-vercel/*

1. Go to https://www.programiz.com/javascript/online-compiler/, copy and run the code below. Copy the output, we'll call it ***token***.
    ```
    const crypto = require('crypto');
    const token = crypto.randomBytes(32).toString('hex');
    console.log(token)
    ```
2. Go to https://vercel.com/signup and click *"Hobby"* then *"Continue with Github"*. Complete the verification steps.
3. First, deploy the backend portion of ScholarVision. Go to the Vercel dashboard and click *"Add New..."* and select *"Project"*.
4. Import your Github repository for ScholarVision.
5. Enter the project name as (e.g., *sv-schoolname-backend*) and select *"Other"* in the framework option.
6. In root directory, choose the backend folder of Github.
7. Add these environmental variables:
- **PORT:** 3001
- **DB:** ****mongo_db*** or your MongoDB Atlas database*
- **JWT_SECRET_KEY:** ***token*** *or the output of the code above*
- **SECRET_ACCESS_TOKEN:**: ***token*** *or the output of the code above*
8. Press *"Deploy"*.
9. Save the domain link of backend, we'll call it ***backend_deployment*** (e.g., *https://sv-uplb-backend.vercel.app*).

## Frontend deployment using the Vercel app
1. Do Steps 3 and 4 from the *server deployment* section above.
2. Enter the project name as (e.g., *sv-schoolname*) and select *"Create-React-App"* in the framework option.
3. In root directory, choose the frontend folder of Github.
4. For security and performance reasons, add this mandatory environmental variable
- **GENERATE_SOURCEMAP:** false
5. Press *"Deploy"*.
6. Save the domain link of frontend, we'll call it ***frontend_deployment*** (e.g., *https://sv-uplb.vercel.app*).

## Changing local files
NOTE: Keep in mind your ***backend_deployment*** and ***frontend_deployment***.
1. On your local computer, go to *Documents/Github/ScholarVision/backend* and open *app*. You can open this file using *Notepad* if you do not have an integrated development environment like *Sublime* or *VisualCode*.
2. In line 16, replace
```res.setHeader("Access-Control-Allow-Origin", "https://scholar-vision.vercel.app")``` 

with

```res.setHeader("Access-Control-Allow-Origin", "frontend_deployment")```

and save.

3. Next, go to *Documents/Github/ScholarVision/frontend/src* and open *apiUrl*.
4. In line 2, replace 
```const url = "https://scholar-vision-backend.vercel.app"```

with

```const url = "backend_deployment"```

and save.

5. Next, go to *Documents\GitHub\ScholarVision\frontend\src\components\components*
6. Open **Donor Application.xlsx**.
- View the file. If there are some information you would want to know from your donors that isn't written in the file, continue here. Otherwise, proceed to Step 8.
- After the green row **ADDITIONAL INFORMATION**, insert as many rows as needed depending on how many more information you want to know.
- At the left column, enter what kind of information you want to know from them (e.g., Work, Education, etc.)
- If the information is required, add a space and asterisk after the word. (e.g., Work *).
- Keep the right column blank.
- Save the .xslx file.
7. Open **Donor Application Many.xlsx**
- Proceed to Column M (the column after the black line). 
- Insert as many columns as the data you added in the xslx file above in between the line and Scholarship Name *.
- Keep the data consistent between **Donor Application** and **Donor Application Many**.
- Save the .xslx file.
8. Open **Scholar Application.xlsx**
- View the file. If there are some information you would want to know from your applicants/scholars that isn't written in the file, continue here. Otherwise, proceed to Step 10.
- After the green row **ADDITIONAL INFORMATION**, insert as many rows as needed depending on how many more information you want to know.
- At the left column, enter what kind of information you want to know from them (e.g., Work, Orgs, etc.)
9. Open **Scholar Application Many.xlsx**
- Proceed to Column U (the column after the black line). 
- Insert as many columns as the data you added in the xslx file above in between the line and Father's Name.
- Keep the data consistent between **Scholar Application** and **Scholar Application Many**.

10. Open **Github Desktop** and commit your changes. At the bottom left, write down *fix: entered domains* in *Summary (required)*.
11. Press *commit to main* and after a few seconds, press *push origin* found at the top.

12. **IMPORTANT**: Email ncteope@up.edu.ph the domains of both frontend and backend (e.g., https://scholar-vision.vercel.app/ & https://scholar-vision-backend.vercel.app/) so you can utilize the **Google login button**.

Once he has replied, ***your application will be fully deployed!!!***

### Setting up your school data
- When opening the application for the first time, you should be met with a prompt asking for school information:
    - Enter the required data of your school, the email of the admin, and emails of all the scholarship committee members.
    - Upload the logo, wait for a few seconds, and press Confirm.
    - The school should now be set as the school for ScholarVision.

### Adding applicants/donors
You can add applicants/donors in their respective fields using two ways:
- via web forms
    - Entering the Application Form proceeds to a web form which can be filled up by the user.
- via CSV file
    - Single
        - Pressing **Download Blank Application Form** leads to a popup which has instructions on how to enter a CSV file.
    - Multiple
        - For the admin and committee members, pressing **Submit Multiple** under **Download Blank Application Form** leads to a popup which has instructions on how to enter a CSV file with multiple information.

### Accepting and assigning applicants
- There are three stages of being a scholar in the system: *applicants*, *accepted*, and *scholars*.
- In the ***View Applicants*** portion, you can accept an applicant through the green button. You can also accept multiple applicants through the checkboxes on the left of the green buttons.
- The same can be said if you want to delete applicants using the red button and the checkboxes on the right of them.
- In the ***View Accepted*** portion, you can assign an accepted applicant to a donor using the green **Assign** button. This will open a list of the donors that can be assigned to a scholar.
- In the ***View Scholars*** portion, you view all final scholars.
- You can also view a specific person's information by clicking on their name, which can lead to their profiles.

- The search field at the top has a dropdown next to it that can be used to view specific information about a person.
- There are also dropdowns on the top that can be used to view specific categories or order them.
    - Under the order by dropdown, a person can add a field from the database that can be used to order the people in the list.

### Editing user roles
- Pressing on the ***Users*** button from Home can lead to a list of the users of the system. Only an admin has the power to open this page.
- They also have the power to edit roles of the users or delete them.
- Simply press the edit or delete button at the upper right and buttons will appear next to the users. Press the necessary button and changes should be made.

## Developer Information
If you have any inquiries, do not hesitate to contact me through any of the following platforms:

- **Facebook:** fb.com/teope1601
- **Email:** ncteope@up.edu.ph

I hope ScholarVision can help you in managing the data of your scholars and scholarships.