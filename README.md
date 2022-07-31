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

## Dashboard
### Storyboard
[Presentation](https://docs.google.com/presentation/d/1g4S6FTzFQ1K1Ju-CnPEBZbU-fY2Y4ZVle-vF5rL6RwQ/edit#slide=id.p)

### Tools
- HTML5
- CSS
- JavaScript
- Bootstrap
- Google Font API
- Font Awesome
- PyScript

### Interactive Elements
Interactive elements will include a webpage with multiple pages, mobile responsiveness & interactive header, body and footer. There will be a table with statistics of the top 10 players of each offensive position on the Top Ten hmtl page. On the All Players html page, there will be a table with the top 200 players and a drop down with different fantasy scoring systems that can be selected. 

## Data Collection 
### Overview
Majority of this project's data resides on the [Fantasy Data website](https://fantasydata.com/), and is available through various downloadable tables with a subscription. The team also utilized web scraping and an existing GitHub table to gather supporting information.  

The intitial analysis for this project incorporates the past 4 years of the annual statistics for the main four fantasy football positions: quarterback (QB), running back (RB), wide receiver (WR), and tight end (TE). Supporting information includes the complete set of NFL teams and their basic information as well as the players' background information. All data sources were chosen due to the accuracy, and completeness of the data for previous years, and the effort of retreival.  

### Player Data 
#### Annual Statistics  
##### *Source: Downloaded from Fantasy Data*
Four of the database's tables are annual statistics for each position spanning 2018-2021 seasons, and the primary data input to the modeling.  Initially, the advanced metric tables were downloaded per position per year.  The CSV files per year were merged for each position, underwent initial clean up, and were uploaded to the SQLite database. Additional data for the players were available for download, which then were scrubbed and added to the database.  In order to streamline data usage, a full stats table for each position was created that merged the two separate tables together and removed duplicates columns.

```
# Query db w/ joins to get full stat tables
positions = ['qb', 'rb', 'te', 'wr']
df_list = []
for x in positions:
    df = f'{x}_df'
    table = f'{x.upper()}_Stats'
    table2 = f'{x.upper()}_Extra_Stats'
    df = pd.DataFrame(pd.read_sql_query(f'select * from {table} as a inner join {table2} as b on a.PlayerID = b.PlayerPlayerId and a.Year=b.Year', con))
    df_list.append(df)
```

#### Weekly Statistics
##### *Source: Downloaded from Fantasy Data*
The database includes 4 tables that contain the weekly stats for all positions per year. These tables comprise of downloaded data as well. 

#### Player Bios
##### *Source: Webscraped from Fantasy Data*
While the machine learning portion of the project solely utilizes the annual statistics, the player biographies are used to further evaluate trends in the data.  

### Teams
#### Team Summary
##### *Source: [github/cnizzardini/nfl_teams.csv](https://gist.github.com/cnizzardini/13d0a072adb35a0d5817)*
Since the weekly and annual player data relied on team abbreviations, this table is used to connect abbreviations to the team's full name, conference,  and division.

#### Depth Chart
##### *Source: [Our Lads' Depth Chart](https://www.ourlads.com/nfldepthcharts/)*


## Machine Learning Model
### Overview

As previously stated the end goal of the model is to predict which players will perform well next year. The model created takes in statistics from one full year and predicts the fantasy points end total for the year requested. 

#### Description of preliminary data preprocessing/Description of how data was split into training and testing sets

The program currently requests input that affect the target data such as how many points a quarterback receives for a passing touchdown, and does the league provide a point per reception. Then a training year is selected and a year to predict is selected (both via user input).
Once the training year is selected the data set is prepared by querying the data for the selected training year. The data is also queried for the following year and the fantasy point total for the following year is calculated based on that year's statistics.
The final fantasy results from the following year is merged with the dataframe for the selected training year. This is then appended to a list of dataframes. The process is repeated for each position.

After this process is completed the data for the prediction year feature data is aggregated and in a list of dataframes. Additional data is prepared in this function to provide an easy visual regarding how well the model performed on the year selected.
 
#### Description of preliminary feature engineering and preliminary feature selection, including decision-making process 

Initially all statistics we received was used as a feature in our feature selection. This led to overfitting and caused the model to provide poor results. After looking at the weights of each feature in the model we noticed that there were a few features that seemed to overpower the other features in the model.
In addition, we looked at the histograms of the feature distribution and saw that certain features were inconsistent between years and varied dramatically. We removed these features and then attempted to pare down the features to roughly the top 10 that we believed to affect the model using the coefficients as our guide.
The goal was to try remove features that seemed to be too influential, or too irrelevant and logically wouldn’t have much effect on the next years data.

#### Description of how data was split into training and testing sets

As mentioned earlier the user provides input and chooses the year they would like to train the model on. This process grabs the data of that year and merges it with the target which is derived by calculating the fantasy points for the next season based on the following years statistics.
The features are split from the target and a multiple linear regression model is trained on the requested data set. The testing set is also input by the user based on the input question "which year would you like to predict?".  

#### Explanation of model choice, including limitations and benefits

A multiple linear regression model was selected because a given year does not provide many data points. For instance, a given year would only have roughly 32 starting quarterbacks to train a model. This causes our model to be particularly susceptible to overfitting. 
As a result, we opted to try to use a more crude machine learning model (multiple linear regression) and limit the number of features. The downside of using this model is that the features do not have much interaction in a multiple linear regression model.
Each feature would have a weight that would map to a final projected fantasy output, but a feature touchdown efficiency would not be able to provide a different weight depending on how many touchdowns a player scored in a particular year.
In addition, many selected features can be intuitively determined not to be linear. The perfect example of this is age. As a player starts off early in their career, they are likely to have an adjustment period to the NFL.
This typically results in a slow start for rookies. The next couple of years good players tend to improve dramatically until they hit the prime of their career and then the decline varies per position. This is likely better modeled by a quadratic formula rather than a linear one.  

