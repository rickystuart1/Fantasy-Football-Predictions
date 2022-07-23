# Fantasy Football Predictions
## Selected Topic 
Predicting player fantasy football output in the upcoming 2022 season.  

## Reasons 
Fantasy Football is a game that allows a person to be the owner, manager and coach of their very own professional football team. You can compete against your friends, by drafting a team made up of NFL players and score points based on their weekly on field performance. At the start of each week you are placed in a head to head match up with another person in your league and the team's points are added up, and whichever team with the most points that week wins. We want to create a supervised machine learning model that predicts the potential output of players in the upcoming year using previous seasons statistics, allowing people who use our results to have an upper hand and help them make an informed decision when selecting their team during their draft this fall. 

## Communication Protocol 
We have set up a group on Slack and iMessage to communicate any issues or ideas with one another. We plan to meet at least twice a week as a group to set up weekly goals and tasks that each member will work on for each deliverable. 

## Questions to be Answered 
- How many total points will a player have in the 2022 football season?  
- Can we determine what the top five picks are for each offensive positions, to help people make draft decisions?
- How many breakout games could they have? Against which teams?
- Do they have a history of underperforming early in the season? Later on? Inconsistent?
- Can we estimate their week to week production? 

## Data Collection 
### Overview
Majority of this project's data resides on the [Fantasy Data website](https://fantasydata.com/), and is available through various downloadable tables with a subscription. The team also utilized web scraping and an existing GitHub table to gather supporting information.  
The intitial analysis for this project incorporates the past 4 years of the annual statistics for the main four fantasy football positions: quarterback (QB), running back (RB), wide receiver (WR), and tight end (TE). Supporting information includes the complete set of NFL teams and their basic information as well as the players' background information.

### Player Data 
#### Annual Statistics  
##### *Source: Downloaded from Fantasy Data*
Four of the database's tables are annual statitics for each position spanning 2018-2021 seasons, and the primary data input to the modeling.  Initially, the advanced metric tables were downloaded per position per year.  The CSV files per year were merged for each position, underwent initial clean up, and were uploaded to the SQLite database. Additional data for the players were available for download, which then were scrubbed and added to the database.  In order to streamline data usage, a full stats table for each position was created that merged the two separate tables together and removed duplicates.
Annual Clean Up 
#### Weekly Statistics
##### *Source: Downloaded from Fantasy Data*
The database includes 4 tables that contain the weekly stats for all positions per year. These tables comprise of downloaded data as well. 

#### Player Bios
##### *Source: Webscraped from Fantasy Data*
While the machine learning portion of the project solely utilizes the annual statistics, the player biographies are used to further evaluate trends in the data.  

### Teams
#### Team Summary
##### *Source: [github/cnizzardini/nfl_teams.csv](https://gist.github.com/cnizzardini/13d0a072adb35a0d5817) *
Since the weekly and annual player data relied on team abbreviations, this table is used to connect abbreviations to the team's full name, conference,  and division.

#### Depth Chart
##### *Source: [DEPTH CHART WEBSITE HERE](https://www.depthchartinfo.com) *
