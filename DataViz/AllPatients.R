#ALL PATIENTS

## Directions to run program
## 1) Change R session to 3.6.3 (top right)
## 2) Next restart the R session (Session -> Restart R)
## 3) Download the required Packages by running the following code
#install.packages("shiny")
#install.packages("RMariaDB")
#install.packages("ggplot2")
#install.packages("reshape2")
#install.packages("highcharter")
#install.packages("dplyr")
#install.packages("shinythemes")
#install.packages("DT")
#install.packages("plotly")
## 4) If running does not work try to excecuting each piece of the code one at a time

library(RMariaDB)
library(shiny)
library(ggplot2)
library(reshape2)
library(highcharter)
library(dplyr)
library(shinythemes)
library(DT)


#Connect to the database 
db <- dbConnect(RMariaDB::MariaDB(),
                host = "scholar-db.rcac.purdue.edu",
                db = "merck",
                user = "merck_user",
                password = "Ph$rma_user")
#get fitbit data from the database
myDF <- dbGetQuery(db, "SELECT * FROM fitbit_data;")
#correctly format the dates
myDF$collection_date <- sapply(myDF$collection_date, substring, 0, 10)

# active miles (stacked)
miles1 <- subset(myDF, select = c('collection_date','lightly_active_miles', 'moderately_active_miles', 'very_active_miles'))
miles <- melt(miles1)
miles$collection_date <- as.Date(miles$collection_date)

# active minutes (stacked)
minutes1 <- subset(myDF, select = c('collection_date', 'sedentary_minutes', 'lightly_active_minutes', 'fairly_active_minutes', 'very_active_minutes'))
minutes <- melt(minutes1)
minutes$collection_date <- as.Date(minutes$collection_date)

# HR minutes (stacked)
hr1 <- subset(myDF, select = c('collection_date', 'hr30_100_minutes', 'hr100_140_minutes', 'hr140_170_minutes', 'hr170_220_minutes'))
hr <- melt(hr1)
hr$collection_date <- as.Date(hr$collection_date)

# myDF to date format
myDF$collection_date = as.Date(myDF$collection_date)
myDF$year <- format(myDF$collection_date,'%Y')
myDF$month <- factor(format(myDF$collection_date,'%B'), levels = month.name)
myDF$day_of_week <- weekdays(myDF$collection_date)


#create the averages data frame that contains average statistics per month
averagesDF <- data.frame(
  Var = c("Steps", "Total Miles", "Lightly Active Miles", "Moderately Active Miles",
          "Very Active Miles", "Sedentary Minutes", "Lightly Active Minutes", "Fairly Active Minutes",
          "Very Active Minutes"),
  Jan = c(mean(myDF$steps[myDF$month == "January"]), 
          mean(myDF$total_miles[myDF$month == "January"]), mean(myDF$lightly_active_miles[myDF$month == "January"]),
          mean(myDF$moderately_active_miles[myDF$month == "January"]), mean(myDF$very_active_miles[myDF$month == "January"]),
          mean(myDF$sedentary_minutes[myDF$month == "January"]), mean(myDF$lightly_active_minutes[myDF$month == "January"]),
          mean(myDF$fairly_active_minutes[myDF$month == "January"]), mean(myDF$very_active_minutes[myDF$month == "January"])
  ),
  Feb = c(mean(myDF$steps[myDF$month == "February"]), 
          mean(myDF$total_miles[myDF$month == "February"]), mean(myDF$lightly_active_miles[myDF$month == "February"]),
          mean(myDF$moderately_active_miles[myDF$month == "February"]), mean(myDF$very_active_miles[myDF$month == "February"]),
          mean(myDF$sedentary_minutes[myDF$month == "February"]), mean(myDF$lightly_active_minutes[myDF$month == "February"]),
          mean(myDF$fairly_active_minutes[myDF$month == "February"]), mean(myDF$very_active_minutes[myDF$month == "February"])
  ),
  Mar = c(mean(myDF$steps[myDF$month == "March"]), 
          mean(myDF$total_miles[myDF$month == "March"]), mean(myDF$lightly_active_miles[myDF$month == "March"]),
          mean(myDF$moderately_active_miles[myDF$month == "March"]), mean(myDF$very_active_miles[myDF$month == "March"]),
          mean(myDF$sedentary_minutes[myDF$month == "March"]), mean(myDF$lightly_active_minutes[myDF$month == "March"]),
          mean(myDF$fairly_active_minutes[myDF$month == "March"]), mean(myDF$very_active_minutes[myDF$month == "March"])
  ),
  Apr = c(mean(myDF$steps[myDF$month == "April"]), 
          mean(myDF$total_miles[myDF$month == "April"]), mean(myDF$lightly_active_miles[myDF$month == "April"]),
          mean(myDF$moderately_active_miles[myDF$month == "April"]), mean(myDF$very_active_miles[myDF$month == "April"]),
          mean(myDF$sedentary_minutes[myDF$month == "April"]), mean(myDF$lightly_active_minutes[myDF$month == "April"]),
          mean(myDF$fairly_active_minutes[myDF$month == "April"]), mean(myDF$very_active_minutes[myDF$month == "April"])
  ),
  May = c(mean(myDF$steps[myDF$month == "May"]),
          mean(myDF$total_miles[myDF$month == "May"]), mean(myDF$lightly_active_miles[myDF$month == "May"]),
          mean(myDF$moderately_active_miles[myDF$month == "May"]), mean(myDF$very_active_miles[myDF$month == "May"]),
          mean(myDF$sedentary_minutes[myDF$month == "May"]), mean(myDF$lightly_active_minutes[myDF$month == "May"]),
          mean(myDF$fairly_active_minutes[myDF$month == "May"]), mean(myDF$very_active_minutes[myDF$month == "May"])
  ),
  Jun = c(mean(myDF$steps[myDF$month == "June"]), 
          mean(myDF$total_miles[myDF$month == "June"]), mean(myDF$lightly_active_miles[myDF$month == "June"]),
          mean(myDF$moderately_active_miles[myDF$month == "June"]), mean(myDF$very_active_miles[myDF$month == "June"]),
          mean(myDF$sedentary_minutes[myDF$month == "June"]), mean(myDF$lightly_active_minutes[myDF$month == "June"]),
          mean(myDF$fairly_active_minutes[myDF$month == "June"]), mean(myDF$very_active_minutes[myDF$month == "June"])
  ),
  Jul = c(mean(myDF$steps[myDF$month == "July"]),
          mean(myDF$total_miles[myDF$month == "July"]), mean(myDF$lightly_active_miles[myDF$month == "July"]),
          mean(myDF$moderately_active_miles[myDF$month == "July"]), mean(myDF$very_active_miles[myDF$month == "July"]),
          mean(myDF$sedentary_minutes[myDF$month == "July"]), mean(myDF$lightly_active_minutes[myDF$month == "July"]),
          mean(myDF$fairly_active_minutes[myDF$month == "July"]), mean(myDF$very_active_minutes[myDF$month == "July"])
  ),
  Aug = c(mean(myDF$steps[myDF$month == "August"]),
          mean(myDF$total_miles[myDF$month == "August"]), mean(myDF$lightly_active_miles[myDF$month == "August"]),
          mean(myDF$moderately_active_miles[myDF$month == "August"]), mean(myDF$very_active_miles[myDF$month == "August"]),
          mean(myDF$sedentary_minutes[myDF$month == "August"]), mean(myDF$lightly_active_minutes[myDF$month == "August"]),
          mean(myDF$fairly_active_minutes[myDF$month == "August"]), mean(myDF$very_active_minutes[myDF$month == "August"])
  ),
  Sep = c(mean(myDF$steps[myDF$month == "September"]), 
          mean(myDF$total_miles[myDF$month == "September"]), mean(myDF$lightly_active_miles[myDF$month == "September"]),
          mean(myDF$moderately_active_miles[myDF$month == "September"]), mean(myDF$very_active_miles[myDF$month == "September"]),
          mean(myDF$sedentary_minutes[myDF$month == "September"]), mean(myDF$lightly_active_minutes[myDF$month == "September"]),
          mean(myDF$fairly_active_minutes[myDF$month == "September"]), mean(myDF$very_active_minutes[myDF$month == "September"])
  ),
  Oct = c(mean(myDF$steps[myDF$month == "October"]), 
          mean(myDF$total_miles[myDF$month == "October"]), mean(myDF$lightly_active_miles[myDF$month == "October"]),
          mean(myDF$moderately_active_miles[myDF$month == "October"]), mean(myDF$very_active_miles[myDF$month == "October"]),
          mean(myDF$sedentary_minutes[myDF$month == "October"]), mean(myDF$lightly_active_minutes[myDF$month == "October"]),
          mean(myDF$fairly_active_minutes[myDF$month == "October"]), mean(myDF$very_active_minutes[myDF$month == "October"])
  ),
  Nov = c(mean(myDF$steps[myDF$month == "November"]),
          mean(myDF$total_miles[myDF$month == "November"]), mean(myDF$lightly_active_miles[myDF$month == "November"]),
          mean(myDF$moderately_active_miles[myDF$month == "November"]), mean(myDF$very_active_miles[myDF$month == "November"]),
          mean(myDF$sedentary_minutes[myDF$month == "November"]), mean(myDF$lightly_active_minutes[myDF$month == "November"]),
          mean(myDF$fairly_active_minutes[myDF$month == "November"]), mean(myDF$very_active_minutes[myDF$month == "November"])
  ),
  Dec = c(mean(myDF$steps[myDF$month == "December"]),
          mean(myDF$total_miles[myDF$month == "December"]), mean(myDF$lightly_active_miles[myDF$month == "December"]),
          mean(myDF$moderately_active_miles[myDF$month == "December"]), mean(myDF$very_active_miles[myDF$month == "December"]),
          mean(myDF$sedentary_minutes[myDF$month == "December"]), mean(myDF$lightly_active_minutes[myDF$month == "December"]),
          mean(myDF$fairly_active_minutes[myDF$month == "December"]), mean(myDF$very_active_minutes[myDF$month == "December"])
  )
)
#create the averages data frame that contains average statistics per weekday
averagesDF2 <- data.frame(
  Var = c("Steps", "Total Miles", "Lightly Active Miles", "Moderately Active Miles",
          "Very Active Miles", "Sedentary Minutes", "Lightly Active Minutes", "Fairly Active Minutes",
          "Very Active Minutes"),
  Mon = c(mean(myDF$steps[myDF$day_of_week == "Monday"]),
          mean(myDF$total_miles[myDF$day_of_week == "Monday"]), mean(myDF$lightly_active_miles[myDF$day_of_week == "Monday"]),
          mean(myDF$moderately_active_miles[myDF$day_of_week == "Monday"]), mean(myDF$very_active_miles[myDF$day_of_week == "Monday"]),
          mean(myDF$sedentary_minutes[myDF$day_of_week == "Monday"]), mean(myDF$lightly_active_minutes[myDF$day_of_week == "Monday"]),
          mean(myDF$fairly_active_minutes[myDF$day_of_week == "Monday"]), mean(myDF$very_active_minutes[myDF$day_of_week == "Monday"])
  ),
  Tue = c(mean(myDF$steps[myDF$day_of_week == "Tuesday"]),
          mean(myDF$total_miles[myDF$day_of_week == "Tuesday"]), mean(myDF$lightly_active_miles[myDF$day_of_week == "Tuesday"]),
          mean(myDF$moderately_active_miles[myDF$day_of_week == "Tuesday"]), mean(myDF$very_active_miles[myDF$day_of_week == "Tuesday"]),
          mean(myDF$sedentary_minutes[myDF$day_of_week == "Tuesday"]), mean(myDF$lightly_active_minutes[myDF$day_of_week == "Tuesday"]),
          mean(myDF$fairly_active_minutes[myDF$day_of_week == "Tuesday"]), mean(myDF$very_active_minutes[myDF$day_of_week == "Tuesday"])
  ),
  Wed = c(mean(myDF$steps[myDF$day_of_week == "Wednesday"]),
          mean(myDF$total_miles[myDF$day_of_week == "Wednesday"]), mean(myDF$lightly_active_miles[myDF$day_of_week == "Wednesday"]),
          mean(myDF$moderately_active_miles[myDF$day_of_week == "Wednesday"]), mean(myDF$very_active_miles[myDF$day_of_week == "Wednesday"]),
          mean(myDF$sedentary_minutes[myDF$day_of_week == "Wednesday"]), mean(myDF$lightly_active_minutes[myDF$day_of_week == "Wednesday"]),
          mean(myDF$fairly_active_minutes[myDF$day_of_week == "Wednesday"]), mean(myDF$very_active_minutes[myDF$day_of_week == "Wednesday"])
  ),
  Thu = c(mean(myDF$steps[myDF$day_of_week == "Thursday"]), 
          mean(myDF$total_miles[myDF$day_of_week == "Thursday"]), mean(myDF$lightly_active_miles[myDF$day_of_week == "Thursday"]),
          mean(myDF$moderately_active_miles[myDF$day_of_week == "Thursday"]), mean(myDF$very_active_miles[myDF$day_of_week == "Thursday"]),
          mean(myDF$sedentary_minutes[myDF$day_of_week == "Thursday"]), mean(myDF$lightly_active_minutes[myDF$day_of_week == "Thursday"]),
          mean(myDF$fairly_active_minutes[myDF$day_of_week == "Thursday"]), mean(myDF$very_active_minutes[myDF$day_of_week == "Thursday"])
  ),
  Fri = c(mean(myDF$steps[myDF$day_of_week == "Friday"]),
          mean(myDF$total_miles[myDF$day_of_week == "Friday"]), mean(myDF$lightly_active_miles[myDF$day_of_week == "Friday"]),
          mean(myDF$moderately_active_miles[myDF$day_of_week == "Friday"]), mean(myDF$very_active_miles[myDF$day_of_week == "Friday"]),
          mean(myDF$sedentary_minutes[myDF$day_of_week == "Friday"]), mean(myDF$lightly_active_minutes[myDF$day_of_week == "Friday"]),
          mean(myDF$fairly_active_minutes[myDF$day_of_week == "Friday"]), mean(myDF$very_active_minutes[myDF$day_of_week == "Friday"])
  ),
  Sat = c(mean(myDF$steps[myDF$day_of_week == "Saturday"]), 
          mean(myDF$total_miles[myDF$day_of_week == "Saturday"]), mean(myDF$lightly_active_miles[myDF$day_of_week == "Saturday"]),
          mean(myDF$moderately_active_miles[myDF$day_of_week == "Saturday"]), mean(myDF$very_active_miles[myDF$day_of_week == "Saturday"]),
          mean(myDF$sedentary_minutes[myDF$day_of_week == "Saturday"]), mean(myDF$lightly_active_minutes[myDF$day_of_week == "Saturday"]),
          mean(myDF$fairly_active_minutes[myDF$day_of_week == "Saturday"]), mean(myDF$very_active_minutes[myDF$day_of_week == "Saturday"])
  ),
  Sun = c(mean(myDF$steps[myDF$day_of_week == "Sunday"]),
          mean(myDF$total_miles[myDF$day_of_week == "Sunday"]), mean(myDF$lightly_active_miles[myDF$day_of_week == "Sunday"]),
          mean(myDF$moderately_active_miles[myDF$day_of_week == "Sunday"]), mean(myDF$very_active_miles[myDF$day_of_week == "Sunday"]),
          mean(myDF$sedentary_minutes[myDF$day_of_week == "Sunday"]), mean(myDF$lightly_active_minutes[myDF$day_of_week == "Sunday"]),
          mean(myDF$fairly_active_minutes[myDF$day_of_week == "Sunday"]), mean(myDF$very_active_minutes[myDF$day_of_week == "Sunday"])
  )
)

#theme of dashboard set to flatly
ui<-fluidPage(theme = shinytheme("flatly"),
              navbarPage("Fitbit Dashboard",
                         # tabPanel 1
                         # title page
                         tabPanel("How to Use",
                                  img(src = "https://assets.phenompeople.com/CareerConnectResources/MERCUS/social/1200x630-1552902977090.jpg", height = 120, width = 220),
                                  h1("Biometric Data Dashboard"),
                                  mainPanel(
                                    strong("Refer to the website here for more information:"),
                                    a("https://www.merck.com/index.html"),
                                    h3("How to Use My Dashboard"),
                                    htmlOutput("text2")
                                  )                      
                         ), 
                         
                         # tabPanel 2
                         #Average statistics panel
                         tabPanel("Average Statistics",
                                  sidebarLayout(
                                    sidebarPanel(br(), br(), br(),
                                                 h3("Average Daily Statistics Per Month"),
                                                 p("Pick a variable to view the average daily amount of steps, 
                                     floors climbed... etc taken each month."),
                                                 br(), br(),
                                                 selectizeInput("variables", "Variables (Month)", choices = unique(averagesDF$Var), selected = unique(averagesDF$Var)[1]),
                                                 br(), br(), br(), br(), br(), br(), br(), br(), br(),
                                                 h3("Average Daily Statistics Per Weekday"),
                                                 p("Pick a variable to view the average daily amount of steps, 
                                     floors climbed... etc taken each week."),
                                                 br(), br(),
                                                 selectizeInput("variables2", "Variables (Weekdays)", choices = unique(averagesDF2$Var), selected = unique(averagesDF2$Var)[1]),
                                                 br(), br(), br(), br()
                                    ),
                                    mainPanel(
                                      highchartOutput("plotAvgs"),
                                      highchartOutput("plotAvgs2")
                                    )
                                  )
                         ),
                         
                         #tabPanel 3
                         #Contains the data table
                         tabPanel("Data Table",
                                  sidebarLayout(
                                    sidebarPanel(
                                      conditionalPanel(
                                        'input.dataset === "myDF"',
                                        checkboxGroupInput("show_vars", "Columns of information to show:",
                                                           names(myDF), selected = list("patient_id", "collection_date", "steps"))
                                      ),
                                    ),
                                    mainPanel(
                                      tabsetPanel(
                                        id = 'dataset',
                                        tabPanel("myDF", DT::dataTableOutput("mytable1"))
                                      
                                      )
                                    )
                                  )
                         )
                         
                         
                         
              )
)

server <- function(input, output) {
  
  # You can access the values of the widget (as a vector of Dates)
  # with input$dates, 
  # e.g. output$value <- renderPrint({ input$dates })
  
  # text on tabPanel 1 
  output$text2 <- renderUI({    
    HTML(paste("", "1. Average Statistics", 
               "- Displays the average daily statistics per month or day of week",
               "- Monthly Data: select which variable you want to see average statistics for",
               "- Weekday Data: select which variable you want to see average statistics for",
               "", "2. Data Table ", 
               "- Select which variables you want visible for each data point",
               "- Able to filter through data using filter as well as placing them in order by any variable",
               "- Steps and Data are pre chosen variables",
               sep="<br/>"))
  })
  
  
  # choose columns to display
  myDF2 = myDF[sample(nrow(myDF), nrow(myDF), replace = FALSE), ]
  
  # Creates data table depending on what variable is chosen
  output$mytable1 <- DT::renderDataTable({
    DT::datatable(myDF2[, input$show_vars, drop = FALSE], rownames = FALSE, filter = 'top')
  })
  
  #Commented out code for mean data table
  # sorted columns are colored now because CSS are attached to them
  #output$mytable2 <- DT::renderDataTable({
  #  DT::datatable(finalDataFrame, options = list(orderClasses = TRUE), rownames = FALSE)
  #})
  
  #creates bar plot using monthly averages data frame
  reactivedf <- reactive({
    filtereddf <- averagesDF %>%
      #chooses what variable needs to be displayed
      dplyr::filter(Var == input$variables)
    filtereddf
  })
  #creates bar plot using weekly averages data frame
  reactivedf2 <- reactive({
    filtereddf2 <- averagesDF2 %>%
      #chooses what variable needs to be displayed
      dplyr::filter(Var == input$variables2)
    filtereddf2
  })
  #actually outputs the plot object
  output$plotAvgs <- renderHighchart({
    highchart() %>%
      #each column made for each month of the year
      hc_add_series(type = "column", reactivedf()$Jan, name = "Jan") %>%
      hc_add_series(type = "column", reactivedf()$Feb, name = "Feb") %>%
      hc_add_series(type = "column", reactivedf()$Mar, name = "Mar") %>%
      hc_add_series(type = "column", reactivedf()$Apr, name = "Apr") %>%
      hc_add_series(type = "column", reactivedf()$May, name = "May") %>%
      hc_add_series(type = "column", reactivedf()$Jun, name = "Jun") %>%
      hc_add_series(type = "column", reactivedf()$Jul, name = "Jul") %>%
      hc_add_series(type = "column", reactivedf()$Aug, name = "Aug") %>%
      hc_add_series(type = "column", reactivedf()$Sep, name = "Sep") %>%
      hc_add_series(type = "column", reactivedf()$Oct, name = "Oct") %>%
      hc_add_series(type = "column", reactivedf()$Nov, name = "Nov") %>%
      hc_add_series(type = "column", reactivedf()$Dec, name = "Dec") %>%
      hc_xAxis(labels = list(enabled = FALSE)) %>%
      hc_title(text = input$variables)
  })
  #actually outputs the plot object
  output$plotAvgs2 <- renderHighchart({
    highchart() %>%
      #each column made for each day of the week
      hc_add_series(type = "column", reactivedf2()$Mon, name = "Mon") %>%
      hc_add_series(type = "column", reactivedf2()$Tue, name = "Tue") %>%
      hc_add_series(type = "column", reactivedf2()$Wed, name = "Wed") %>%
      hc_add_series(type = "column", reactivedf2()$Thu, name = "Thu") %>%
      hc_add_series(type = "column", reactivedf2()$Fri, name = "Fri") %>%
      hc_add_series(type = "column", reactivedf2()$Sat, name = "Sat") %>%
      hc_add_series(type = "column", reactivedf2()$Sun, name = "Sun") %>%
      hc_xAxis(labels = list(enabled = FALSE)) %>%
      hc_title(text = input$variables2)
  })
  
}
shinyApp(ui, server)
