library(ggplot2)
library(RMariaDB)

#Connection to the Fibit Database with credentials
db <- dbConnect(RMariaDB::MariaDB(),
                host = "scholar-db.rcac.purdue.edu",
                db = "merck",
                user = "merck_user",
                password = "Ph$rma_user")

#Creation of a dataframe with data from fibit
myDF <- dbGetQuery(db, "SELECT * FROM fitbit_data;")
head(myDF)


#Formatting of Date Data 
myDF$collection_date = as.Date(myDF$collection_date)
head(myDF)
#Formatting of month date to show names of month rather than the numbers in a new column
myDF$month <- factor(format(myDF$collection_date,'%B'), levels = month.name)

#Creation of Miles DF which includes the sum of the following variables : total_miles, lightly_active_miles, moderately_active_miles, very_active_miles sorted by the month
milesDF <- dbGetQuery(db, "SELECT 
                      SUM(total_miles) AS total_miles, 
                      SUM(lightly_active_miles) AS lightly_active_miles, 
                      SUM(moderately_active_miles) AS moderately_active_miles, 
                      SUM(very_active_miles) AS very_active_miles, 
                      MONTH(collection_date) AS month_number
                      FROM fitbit_data GROUP BY MONTH(collection_date);")

#Transform the month column to use the abbrivation of months
milesDF$month <- month.abb[milesDF$month_number]
head(milesDF)
#Ploty Library: Used to create interactive web-based graphs 
#Code for installation of package: install.packages("plotly")
#More Information on Plotly: https://plotly.com/r/
library(plotly)

#Creation of Active Miles Plot
#Grouped Bar Chart with the bar represeting, Lightly Active Miles, Moderately Active Miles, Very Active Miles
#Line Plot represeting the the total miles 
milesDF %>% 
  plot_ly(x = ~month) %>% 
  add_bars(y = ~lightly_active_miles,
           name = "Lightly Active Miles", color="cadetblue") %>% 
  add_bars(y = ~moderately_active_miles,
           name = "Moderately Active Miles",color="darkblue" ) %>%
  add_bars(y = ~very_active_miles,
           name = "Very Active Miles", color="darkcyan") %>%
  add_lines(y = ~total_miles,
            name = "Total Miles") %>% 
  layout(barmode = "group",
         yaxis2 = list(overlaying = "y",
                       side = "right"),
         barmode = "group",
         title = "Activity Levels")

