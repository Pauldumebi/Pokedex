/*jslint browser:true */
"use strict";
function addMonths(elem) {
   var annualUsekw=0, dailyUsekw=0, i=0, x=0;
   var months= document.getElementById(elem).getElementsByTagName('input');

      for (i=0; i<months.length; i++) {
         x = Number(months[i].value);
         annualUsekw += x;
      } //end loop
      dailyUsekw = annualUsekw/365;
      return dailyUsekw;
} //end of function 

function sunHours() {
   var hrs;
   var theZone = document.solarForm.zone.selectedIndex;
   theZone =+ 1;
      switch (theZone) {
         case 1:
            hrs=6;
            break;

         case 2:
            hrs=5.5
            break;
         
         case 3:
            hrs=5
            break;

         case 4:
            hrs=4.5;
            break;

         case 5:
            hrs=4
            break;
         
         case 6:
            hrs=3.5
            break;

         default:
            hrs=0;
      } //end of switch statement
   return hrs
};

function calculatePanel () {
   var userChoice = document.solarForm.panel.selectedIndex;
   var panelOptions = document.solarForm.panel.options;
   var power = panelOptions[userChoice].value;
   var name = panelOptions[userChoice].text;
   var x = [power, name];
   return x;
};

function calculateSolar() {
   var dailyUsekw = addMonths('mpc');
   //console.log(dailyUsekw);

   var sunHoursPerDay = sunHours();
   //console.log(sunHoursPerDay);

   var minKwNeeds = dailyUsekw/sunHoursPerDay;
   //console.log(minKwNeeds);

   var realKwNeeds = minKwNeeds * 1.25;
   //console.log(realKwNeeds);

   var realWtNeeds = realKwNeeds * 1000
   //console.log(realWtNeeds);

   var panelInfo = calculatePanel();
   var panelOutput = panelInfo[0];
   var panelName = panelInfo[1];
   //console.log(panelOutput);
   //console.log(panelName);

   var panelNeeded = Math.ceil(realWtNeeds/panelOutput);
   //console.log(panelNeeded);

   var feedback="";
   feedback += "<p>Based on your average daily use of "+Math.ceil(dailyUsekw)+"Kwh, you will need to purchase "+ panelNeeded +" "+ panelName +" solar panels to offset 100% of your electricity bills.</p>";
   feedback += "<h2>Additional Details</h2>";
   feedback += "<p>Your average daily electricity consumption: "+ Math.round(dailyUsekw) +" Kwh per day. </P>";
   feedback += "<p>Average sunshine hours per day: "+ Math.round(sunHoursPerDay) +" hours</p>"
   feedback += "<p>Realistic watts needed per hour: "+ Math.ceil(realWtNeeds) +" watts/hr  </P>"
   feedback += "<p>The "+ panelName +" panel you selected generates about: "+ Math.round(panelOutput) +" watts per hour </P>";

   document.getElementById('feedback').innerHTML = feedback;
}