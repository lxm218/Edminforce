Plan-A 

- We need to store start/end date, lesson date in a timezone neutral format (as Kevin suggested), it's timezone independent, even 
  in case of store timezone change, no adjustment is required to previously saved start/end datetime.
  
  We could use one of the following two options to store timezone independent date time:
  1. A JSON structure like this
    { 
        y: 
        m:
        d:
        h:
        mn:
        s:
    }
  2. A string in ISO8601 format, without the timezone info at the end.
     YYYY-MM-DDThh:mm:ss.s (eg 1997-07-16T19:20:30.45)
     
     YYYY = four-digit year
     MM   = two-digit month (01=January, etc.)
     DD   = two-digit day of month (01 through 31)
     hh   = two digits of hour (00 through 23) (am/pm NOT allowed)
     mm   = two digits of minute (00 through 59)
     ss   = two digits of second (00 through 59)
     s    = one or more digits representing a decimal fraction of a second

     reference: https://www.w3.org/TR/NOTE-datetime
     
   I'm leaning toward option#2, because it can be easily stored and parsed using momentJS.  
       
 - Update the following collections to use this new dateTime format
 
   1. Session
               startDate : KG.schema.default({
                   type : Date
               }),
               endDate : KG.schema.default({
                   type : Date
               }),
               blockOutDay : KG.schema.default({
                   type : [Date],
                   optional : true
               }),
               registrationStartDate : KG.schema.default({
                   type : Date
               }),
               registrationEndDate : KG.schema.default({
                   type : Date,
                   optional : true
               }),

   2. ClassStudent
   
        lessonDate : {
            type : Date,
            optional : true
        },
   
   3. Coupon
        startDate : KG.schema.default({
            type : Date
        }),
        endDate : KG.schema.default({
            type : Date
        }),
   
 -  Update admin / mobile code to handle date time based on school timezone
    this is the time-consuming part.
    
 -  Upgrade existing data. There will be a short period of system downtime. ( ~10 minutes)
 
 
 
 Plan-B
 
 - No change to existing database schema
 - Store date time in JavaScript "Date" 
 - Start/End date, lesson date adjusted to school timezone before sending to server, will be stored to MongoDB in UTC
 - When receive "Date" from server at client, display "Date" in school timezone
 - 