
<div id="top"></div>

<h1 align="center">Zendesk 2021 Coding Challenge</h1>
<p align="center">
    A simple ticket viewer that connects to the Zendesk API to retrieve tickets and display them.
</p>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>

  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
This application is a simple ticket viewer that retrieves a list of tickets by connecting to the Zendesk API. It displays them in a browser based UI. Each page displays up to 25 tickets. Furthermore, when a ticket is clicked more details are shown.

###  Code Design
#### Querying Tickets
There are two ways to go about this design. We could use the Zendesk's API integration of paginate and receive 25 tickets at each call. Or, we could get all the tickets using Zendesk's API each time there is a get request at `/` and update the tickets we currently have stored. With the first option, dynamic changes would be supported and it would be better on a much larger scale, however with the second option, tickets fetched at once could provide less lagtime for the user going through pages and there is no limit for tickets per page (as this can be manually selected). Additionally, since this would require an integration of some local pagination, we could know the number of pages which would allow skipping to pages to intermediate pages. 

 For a more effective design in terms of scalability, when we reach some number of tickets for a certain number of pages and paginate afterward (this would allow access to some intermediate pages while not fetching all tickets). However, due to the size of our test data, this isn't appropriate. Due to a focus on user experience and speed (since tickets will be cached), I chose to do the second option.  

#### Displaying Ticket Details
In a support system, ticket details are either: displayed in a separate tab, displayed on some side window in the current tab, or displayed in some popup modal. Some users might want to completely isolate the support ticket while other would want to pan through other tickets while viewing one.  I chose to display the tickets in a modal popup to act as a median between the two. A modal would allow users a quick access to details while also being able to quickly leave and view other tickets. This works as a best of both worlds since users could open another tab to pan through tickets or focus on the modal popup.

#### Choosing Ticket Details to Display
Since we query all tickets at the beginning and paginate locally, I extract specific information and only push what we need to the frontend. This helps ensure that the frontend is only given information that is needed and nothing more. When the home page is first loaded, tickets are sorted in descending order by created date where each ticket panel displays the subject, the time created, 

Something important to note is that the tickets loaded from the ticket.json weren't assigned a priority or a type, however with real tickets, these would be necessary to understand a ticket. Thus, each ticket's type and priority , if it has a type and priority, will be displayed in the panel. Additionally, if it an urgent priority, it will highlighted in red (while other priorities will be in a yellow).

When an individual clicks on a ticket, it gives the description, the person who created it, the subject, a list of tags, the type, and priority. I believe these are the most essential for a simple ticket viewer since it would provide all base level information. If we were to make this more than just a ticket viewer, other information would be useful (but in this case I don't believe it is essential).

#### Express Skeleton and Scalability 
First, there is a public folder that holds the css and js for the browser to help separate what is being seen by the user in the frontend. The views folder contains the template for seeing the tickets and all the information we desire. Then, we have the routes folder to separate the middleware of the application. Finally, we have a tests folder for our tests and an app.js file to be the main entry point for the server.

While this application is just a simple ticket viewer, it is important to develop in a scalable way. First, we used EJS (Embedded JavaScript Templates) to generate dynamic pages based on the context we have. If there were 100 pages of tickets, this helps ensure that we don't need a million html files to represent each of these pages. Instead, we can create one template to work for each particular page. Second, if we were to increase the complexity of this application, the division of files helps an individual and collaborators know where the certain files should be. This helps reduce clutter and helps isolate errors, if they exist.

####  UI Style 
Since we were tasked to create a simple ticket viewer, I went for a very minimalist approach. The goal was to allow each user to understand the subject of the ticket, the status, and priority, and if they wanted to know more about the ticket then they could open it and see its tags and description. While this might lack information like the time updated, the goal was to make a simple viewer where the user would get as the maximum information to understand the ticket without it being too much.

When styling the interface, I wanted something very lightweight. A lot of the work will go into fetching the tickets once in the beginning, so I wanted to ensure that a user could easily and quickly open tickets and flip through pages. Thus, I used Bulma, a modern css framework (which includes no javascript). Furthermore, I created a ticket for take up an entire row to ensure the user can follow the order. 

While the UI may seem very basic, the minimal approach helps the user read tickets without feeling overwhelmed.

#### Error Handling
When handling errors, a user would either get redirected or displayed an error page. The current design does not redirect users. This helps ensure that a user knows they tried to enter something invalid or reached some invalid error. Additionally, for scalable services, this helps make our website more robot friendly while also helping with search engine optimization to only allow for the correct URL.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* Backend built with [Express.js](https://expressjs.com)
* Styling done wih [Bulma](https://bulma.io).
* Some functionalities integrated with [JQuery](https://jquery.com).
* Tickets fetched with [axios](https://github.com/axios/axios).
* Testing done with [Jest](https://jestjs.io/) and [SuperTest](https://github.com/visionmedia/supertest).
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
To get a local copy up and running follow these simple example steps.

### Prerequisites


* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/akshatmshah/Zendesk-Challenge.git
   ```
2. Go to the cloned directory
   ```sh
   cd Zendesk-Challenge
   ```
4. Install dependencies 
   ```sh
   npm install
   ```
  

#### Environment Setup
1. Create a .env file in the project directory (~/Zendesk-Challenge)
   ```sh
   touch .env
   ```
  
2. Copy and paste the following details into the .env file
   ```sh
   DOMAIN = "subdomain"
   USERNAME = "username"
   PASSWORD = "password"
   ```
   Replace subdomain, username, and password, with the correct information (given in submission).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. Use the following to **test** the Application
   ```sh
   npm test
   ```

2. Use the following to **run**  the Application
   ```sh
   npm start
   ``` 
   After running the application it will run at "http://localhost:8080/". 
   
  #### Homepage
![alt text](<images/homepage.png>)
  #### Paging
  ![alt text](<images/pagination.png>)
   #### Ticket Details
   ![alt text](<images/popup.png>)
   #### Errors 
  ![alt text](<images/401error.png>)
  
  ![alt text](<images/404error.png>)
  
  ![alt text](<images/408error.png>)
  
  ![alt text](<images/500error.png>)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap
Some potential features to improve this current ticket viewer (if extra features were allowed).
- This could be deployed to some service.
- Tickets could be filtered and sorted by priority.
- The number of tickets shown on each page can be modified by the user.
- Tickets can be modified and updated asynchronously. 

<p align="right">(<a href="#top">back to top</a>)</p>


