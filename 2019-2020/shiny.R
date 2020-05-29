library(shiny)
library(ggplot2)
library(reshape2)

# biometric data
# 'bioFinal.csv' for biometric data from 2020 Feb. to present? - Merckteam's data
# 'DrWardData.csv' for biometric data from 2016 to 2019 April - Dr. Ward's data
myDF <- read.csv("/class/datamine/data/corporate/merck/0352t06fm97rcpc58vpjpruo5ahh8803/Biometric_Data/bioFinal.csv")

# active miles (stacked)
miles1 <- subset(myDF, select = c('Date','Lightly.Active.Miles', 'Moderately.Active.Miles', 'Very.Active.Miles'))
miles <- melt(miles1)
miles$Date <- as.Date(miles$Date)

# active minutes (stacked)
minutes1 <- subset(myDF, select = c('Date', 'Sedentary.Minutes', 'Lightly.Active.Minutes', 'Fairly.Active.Minutes', 'Very.Active.Minutes'))
minutes <- melt(minutes1)
minutes$Date <- as.Date(minutes$Date)

# HR minutes (stacked)
hr1 <- subset(myDF, select = c('Date', 'HR.30.100.Minutes', 'HR.100.140.Minutes', 'HR.140.170.Minutes', 'HR.170.220.Minutes'))
hr <- melt(hr1)
hr$Date <- as.Date(hr$Date)

# myDF to date format
myDF$Date = as.Date(myDF$Date)

ui<-fluidPage(

  navbarPage("Fitbit Dashboard",          
    # tabPanel 1
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
    tabPanel("Activity Progress",
      sidebarLayout(
        sidebarPanel(h3("Activity Progress"),
          dateRangeInput("dates", ("Date range")),
          varSelectInput("variables", ("Variable:"), myDF[c(-1, -2)]),
          selectInput("stack", ("Variable (Stacked):"),
          c("N/A" = "nana", "Active Miles" = "miles", "Active minutes" = "minutes", "HR minutes" = "hr")),
        ),
        mainPanel(
          em("Select a date range and a variable!"),
          strong("Refer to the website here for more information:"),
          a("https://www.merck.com/index.html"),
          plotOutput(outputId = "bioBarGraph")
        )
      )
    ), 
             
    # tabPanel 3
    tabPanel("Step Goals",
      sidebarPanel(h3("10,000-Step Goal"),
        dateInput("goaldate", ("Date"))
      ),
      mainPanel(
        strong("Refer to the website here for more information:"),
        a("https://www.merck.com/index.html"),                        
        plotOutput(outputId = "bioDoughnut")
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
    HTML(paste("", "1. Activity Progress with Bar Charts",
               "- Date Range: select a start and an end date to set a date range of the activity progress",
               "- Variables: use the drop-down to select a variable of the activity progress you wish to see",
               "- Variables (Stacked): use the drop-down to select a variable of the activity progress you wish to see as a stacked bar chart",
               "", "2. Step Goals with Doughnut Charts", 
               "- Date: select a date of the activity progress you wish to see",
               sep="<br/>"))
  })
  
  # bar charts on tabPanel 2
  output$bioBarGraph <- renderPlot({

    # counter for the start date - date range
    counter1 = 0
    for (myDate in as.character(myDF$Date)){
      counter1 = counter1 + 1
      if (myDate == input$dates[1]) {
        break
      }
    }
    
    # counter for the end date - date range
    counter2 = 0
    for (myDate in as.character(myDF$Date)){
      counter2 = counter2 + 1
      if (myDate == input$dates[2]) {
        break
      }
    }
    
    # subset of myDF with the selected date range
    mySubset <- myDF[c(counter1:counter2),]    
      if (input$stack == "nana"){ # single bar chart - if stacked bar is N/A
        ggplot(data=mySubset, aes(x=Date, y=!!input$variables)) + geom_bar(stat="identity", width = .5, fill = "#13A999")
      }else if(input$stack == "miles"){ # stacked bar chart - active miles
        ggplot(data=miles, aes(x=Date, y=value, fill=variable)) + geom_bar(stat="identity", width = .5)
      }else if(input$stack == "minutes"){ # stacked bar chart - active minutes
        ggplot(data=minutes, aes(x=Date, y=value, fill=variable)) + geom_bar(stat="identity", width = .5)
      }else if(input$stack == "hr"){ # stacked bar chart - HR minutes
        ggplot(data=hr, aes(x=Date, y=value, fill=variable)) + geom_bar(stat="identity", width = .5)
      }
  })
  
  # doughnut chart on tabPanel 3
  output$bioDoughnut <- renderPlot({
    
    # counter for the date - daily goals
    counter3 = 0 
    for (myDate in as.character(myDF$Date)){
      counter3 = counter3 + 1
      if (myDate == input$goaldate) {
        break
      }
    }
    
    # doughnut bar
    # daily steps of the selected date
    steps <- myDF[c(counter3:counter3),c("Steps")]
    # get a percentage - daily steps out of 10000 steps
    data <- data.frame(
      category=c("Steps","N/A"),
      count=c(steps, 10000-steps)
    )
    data$fraction = data$count / 100
    data$ymax = cumsum(data$fraction)
    data$ymin = c(0, head(data$ymax, n=-1))
    ggplot(data, aes(ymax=ymax, ymin=ymin, xmax=4, xmin=3, fill=category)) + geom_rect() + coord_polar(theta="y") + xlim(c(2, 4))
  })
}

shinyApp(ui, server)
