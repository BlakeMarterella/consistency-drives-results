# Consistency Drives Results

Author: Blake Marterella
Created: 2024-04-28

A proof-of-concept web application that allows users to track their daily habits in order to build a consistent routine that drives results. This project was made as the first installment of my 1-day POC challenge.

## Project Overview

| Dependancy Name | Version |
| -------- | -------- |
| NPM    | `v10.5.1`     |
| Angular CLI    |  `v16.0.0`    |


## Getting Started

### Configure Firebase

If you wish to deploy the project to your own Firebase project, you will need to create a new Firebase project, enable authentication, firestore, and hosting and then follow the instructions below:

#### Update `.env` file

Using the provided `example.env` file, create a new `.env` file in the root of the project and update the values with your Firebase project details. The script located in `src/scripts/setEnv.ts` will automatically update the environment.ts file with the values from the `.env` file.