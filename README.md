### Table of Contents 
* [Project Overview](#project-overview)
* [Demo](#demo)
* [Features](#features)
* [Documentation](#documentation)
* [Key Algorithm](#key-algorithm)
* [Application Layers and Key Classes](#application-layers-and-key-classes)
* [System Requirements](#system-requirements)
* [Installation Guide](#installation-guide)
* [Setup](#setup)
* [Deployment Guidelines](#deployment-guideline)
* [Changelog](#changelog)



### Project Overview

The aim of the project was to develop a web interface that allows academics to determine the authenticity of students submissions. The project was developed for our client Eduardo Oliveira, a faculty member at the University of Melbourne who requested an interface to utilize the stylometry algorithm they had developed. 

### Demo

The hosted website can be found at https://textdna.azurewebsites.net/
<p align ="center">
    <img src="images\front-page.jpg" width="600">
</p>

It is not currently up as deploying on Azure comes with costs and as such the client has informed us to avoid deploying it unless necessary

### Features

* Sprint 1
    * Develop a profile for a student to be used for analysis
    * Manage Class 

* Sprint 2
    * Add and View Student Profiles to the Class
    * Add and View Class Assignments to Class
    * View Assignment Submissions 

* Sprint 3
    * Upload Submissions 
    * Analyze text against a profile that is stored
        *  View Analysis Score 
        *  View Submitted Document
    * Create an account 
    * Log in and out of the interface




### Documentation

The key documentation regarding the project such as User Stories, Requirements, User Personas and Motivational Model can all be found in the [documentation](docs) folder. 

The test cases utilized when verifying the functionality can be found in the [tests](tests) folder 

### Key Algorithm
Each trained profile requires 4  items to be created: 
Word2Vec model
Previous essays turned to vectors by Word2Vec model
clf_network model [tensorflow]
base_network model [tensorflow]

The algorithm steps can be observed in "root\backend\algorithm_scripts\algorithm.py" 
Note: The file paths for the parametres of the trained models are supplied as parametres:

1. Converts unknown text into vectors using trained Word2Vec model
2. Extract text features using base_network model
3. Using clf_network model, Compares the text features to the trained profile's text features, and outputs a similarity score

In our project, we have decided to create one trained profile only (for simplicity), so every submission (regardless of the student) is compared against that same trained model, rather than a different trained model for each student.

To train new models for new profiles, store trained models and pass their filepaths to the function in "root\backend\algorithm_scripts\algorithm.py". 

To generate / train models, refer to the client's [Eduardo] python notebook in:
https://unimelbcloud-my.sharepoint.com/personal/eduardo_oliveira_unimelb_edu_au/_layouts/15/onedrive.aspx?ga=1&id=%2Fpersonal%2Feduardo_oliveira_unimelb_edu_au%2FDocuments%2F2023%2FProject_Code-20230815T025227Z%2FProject_Code%2FPAN14_Code 


### Application Layers and Key Classes

## Application Layers
<p align ="center">
    <img src="docs\Architectural Diagram.jpg" width="600">
</p>

## Key Application Classes and Pages
The key application pages and their connections can be seen below 
<p align ="center">
    <img src="images\application_pages.jpg" width="600">
</p>
To view appliation design and layout in more detail you can access the Figma:
* [Low Fidelity Prototype](https://www.figma.com/file/qmZvg96JrZJDOzqwITEPKl/Low-Fidelity-Protoype?type=design&node-id=0%3A1&mode=design&t=1DJqkPlTPLxTafgt-1)
* [High Fideltiy Protoype](https://www.figma.com/file/DWnINDGCW5ZfZITFtEow0p/High-Fidelity-Protoype?type=design&node-id=0%3A1&mode=design&t=9QwltwLYuzZ6Wo1A-1)

### System Requirements

* Tools
    * Front End Tools:
        * REACT : Used to design the web interface
        * HTML : Used to design the web interface
        * SCSS: Used to streamline the process of utilizing CSS for the website
    * Back End Tools:
        * Python: Used to develop our backend scripts to allow dynamic content on the webpages
        * Powershell: Used to create communication with the data storage and database hosted on Azure
    * Database and Server Tools:
        * Microsoft Azure: Used to deploy our interface
        * SQL : Used to query information stored within the database
* Databases
    * Entity- Relationship Diagram: 
    <p align ="center">
        <img src="docs\Database_Structure\Entity_Relationship_Diagram.png" width="600">
    </p>
    * Phyical Database Diagram
    <p align ="center">
        <img src="docs\Database_Structure\Physical_Database_Diagram.png" width="600">
    </p>

* Relevant dependencies and their versions can be found at [requirements.txt](requirements.txt)

### Installation Guide 
* Install dependencies: 
    * Backend:
        * Ensure you have python and pip installed 
        * "pip install -r requirements.txt" [Found in COMP30022 directory]
        * curl -O https://download.microsoft.com/download/e/4/e/e4e67866-dffd-428c-aac7-8d28ddafb39b/msodbcsql17_17.10.5.1-1_amd64.apk
        * curl -O https://download.microsoft.com/download/e/4/e/e4e67866-dffd-428c-aac7-8d28ddafb39b/mssql-tools_17.10.1.1-1_amd64.apk
        * sudo apk add --allow-untrusted msodbcsql17_17.10.5.1-1_amd64.apk
        * sudo apk add --allow-untrusted mssql-tools_17.10.1.1-1_amd64.apk
        * Download Powershell 7 and run Install-Module-name Az
    * Frontend: 
        1. Ensure you have NodeJS installed
        2. cd "COMP30022\root\frontend"
        3. npm install react-scripts --save
        4. npm install --save @fortawesome/free-solid-svg-icons
        5. npm install --save @fortawesome/react-fontawesome
* Log into https://portal.azure.com/ using credentials and go into sql server instance "sql-server-capstone-project" and add your IP address into firewall settings under "networking"


Credentials to access repository , storage account, server , databases
The interface uses the following services which can be accessed through https://portal.azure.com/:
* storage account [storage1itproject]
* SQL Database [sql-db-capstone-project]
* SQL Server [sql-server-capstone-project]
* Virtual Machine [VM-capstone-project] (to host the back-end in deployment)
* App service [textDNA] (for front-end and other credentials for back-end)

__Credentials are:__
* Username: Shaun@younismamoun2001gmail.onmicrosoft.com
* Password: Mosa2012351

### Setup
1. **Clone the Repository:**

   ```bash
   git clone https://github.com/shaunchowGO/COMP30022.git

2. Open 2 terminals, one to run front-end, and another to run back-end

3. Install dependencies and follow instructions in [Installation Guide](#installation-guide)

4. **Backend Setup:**

   ```bash
    cd root/backend
    pip install -r requirements.txt
    python app.py
5. **Frontend Setup:**

    ```bash
    cd root/frontend
    npm install
    npm install
    npm start

This should automatically open a new tab your localhost path, where you can interact  with the interface.

### Deployment Guideline:
    * Log into https://portal.azure.com/:
    * Open CLI in the cloud (Bash terminal hosted on Azure)
    * Go into textDNA appService
    * Navigate to the git repo [already cloned]
    * Run front-end by:
        * Start the instance of textDNA app
        * cd "COMP30022\root\frontend"
        * az webapp up [run this command  in frontend directory]
    * Run back-end by:
        * edit the link in file ...
        * navigate to [VM-capstone-project]  instance
    * Start it
        * Open CLI and run:
        * "az ssh vm --resource-group rg-capstone-project --vm-name VM-capstone-project --subscription 05dcda3f-04cb-4057-bfbe-472610744c79"
        * cd COMP30022
        * pip install -r requirements.txt
        * cd root\backend
        * python3 app.py
        * Go to website "textdna.azurewebsites.net"

### Changelog 
