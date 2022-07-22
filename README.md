<h1>Piscope (Project 4, WCS CDA Java)</h1>

### Create a site for a real client by using Spring Boot


---

![PIScope](https://i.ibb.co/MnLhJhm/piscope.png)

## Piscope

### index

1. [Description](#Description)
2. [Prerequisites](#Prerequisites)
3. [Steps](#Steps)
5. [Authors](#Authors)

### Description

PIScope is an application linked to the European patent database : https://www.epo.org/searching-for-patents/data/web-services/ops_fr.html</br>
It's purpose is to allow the user to register his profile, to search for patents and to be able to keep his favorite ones and add comments to them

### Prerequisites

* [Angular CLI: 13.1.4](https://angular.io/) (check by running ng --version in your console)
* [Node.js 14+](https://nodejs.org/en/) (check by running node –version in your console)
* [Java 8.*](https://www.java.com/fr/) (check by running java --version in your console)
* [Maven 3.*](https://maven.apache.org/) (check by running mvn --version in your console)
* [MySQL 8.0.*](https://www.mysql.com/fr/) (check by running mysql --version in your console)
* [Git 2.*](https://git-scm.com/) (check by running git --version in your console)
* [WARNING : This app use Open Patent Services API](https://www.epo.org/searching-for-patents/data/web-services/ops.html), you also need to get an API key from this service

### Steps

#### I. To run the server, follow this steps

1. Clone the repo from GitHub : `git clone git@github.com:jaldabaoth-code/PIScope.git`
2. Enter the directory : `cd PIScope`
3. Install Maven dependencies : `mvn install`
4. Create the <b>.env</b> file, with <b>.env.model</b> file that can help you
5. Add environment variables into <b>.env</b> file you just created
    * You set database information : <b>JDBC_DATABASE_URL</b>, <b>DATABASE_USERNAME</b>, <b>DATABASE_PASSWORD</b> and <b>PORT</b>
    * For get <b>CONSUMMER_KEY</b> and <b>CONSUMMER_SECRET_KEY</b> you will need to go on <a href="https://www.epo.org/searching-for-patents/data/web-services/ops.html">API OPS</a> and Sign Up
    * You can choose <b>JWT_SECRET</b> and <b>JWT_EXPIRATION_MS</b> yourself
    * For get <b>MAIL_HOST</b>, <b>MAIL_PORT</b>, <b>MAIL_USERNAME</b> and <b>MAIL_PASSWORD</b> you can use <a href="https://mailtrap.io/inboxes">MAILTRAP</a>
      - Then you go to : -> <b>Inboxes</b> -> <b>My Inbox</b> -> <b>SMTP Settings</b> -> <b>Show Credentials</b>
    * If you are in local you can use `localhost` as <b>FRONT_SERVER_NAME</b> and `4200` as <b>FRONT_SERVER_PORT</b>
    * For <b>EPO_URL</b>, <b>PATENT_DATA_URL</b>, <b>PATENT_SEARCH_URL</b>, and <b>PATENT_SEARCH_URL</b> you can keep them as they are on <b>.env.model</b><br/>
    Note : On Windows: all variables must be inline separated by 1 space<br/>
    Note : Comments are not recommended on this file (That might provoke some problems to run the application)<br/>
6. Import the last version of the <b>dataVx.sql</b> file into your database
7. To run the server of the application
   * On Linux : Run the command `sh ./env_spring_boot_run.sh`
   * On Windows :  
     - Open Git Bash
     - Go to the root directory of the project <b>PIScope</b>
     - Run the command : `sh env_spring_boot_run.sh`

#### II. To run the client, follow this steps

1. Go into the client side folder by running the command : `cd angular`
2. Install Angular dependencies : `npm install`
3. Run the server : `ng serve -o`

### Technology Stack

<table>
    <tr>
        <th>Component</th>
        <th colspan="2">Technology</th>
    </tr>
   <tr>
       <td>Backend(REST)</td>
       <td>Spring boot 2 (Java)</td>
   </tr>
   <tr>
       <td>Frontend</td>
       <td>Angular 13</td>
   </tr>
   <tr>
       <td>Security</td>
       <td>JWT Authorization</td>
   </tr>
   <tr>
       <td>Database</td>
       <td>MySQL</td>
   </tr>
   <tr>
       <td>Persistence</td>
       <td>JPA</td>
   </tr>
   <tr>
       <td>Server Build Tools</td>
       <td>Maven</td>
   </tr>
   <tr>
       <td>Client Build Tools</td>
       <td>angular-cli, npm install</td>
   </tr>
</table>

### Authors

* [Lahcen Boukkoutti](https://github.com/misterdev45)
* [Zurabi Grialat](https://github.com/jaldabaoth-code)
* [Thuy Dieu](https://github.com/Thuydieutran)
* [Raphaël Billet Servoin](https://github.com/RaphaelBS-WCS)
* [Gersey Stelmach](https://github.com/gerseystelmach)

---

## The Links

<a href="https://github.com/WildCodeSchool/orleans-cda-sept2021-java-project-brevet">Link to the repository of project where we worked during <b>WCS CDA Project 4</b></a>
