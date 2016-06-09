
## Required(default) and optional Fields 
When using `DataServer.uploadMeasurementData`

### Common Fields
| KeyName       | Type        | Unit  | Explanation  
| ------------- |-------------| ----- | ----------- 
| `_id`              | String      | -     | Meteor.uuid()  
| __MDateUTC__       | Date        | -     | Diastolic
| __userId__         | String      | -     | user id
| __deviceType__     | String      | -     |  
| __deviceModel__    | String      | -     |  
| __deviceAddress__  | String      | -     |  
| __Lat__            | Number      | -     | Latitude
| __Lon__            | Number      | -     | Longitude
| __Alt__            | Number      | -     | Altitude


### Measurement Type Specific
#### BP

| KeyName     | Type        | Unit  | Explanation  
| ----------- |-------------| ----- | ----------- 
| __HR__      | Number      | -     | Heart Rate  
| __LP__      | Number      | mmHg  | Diastolic
| __HP__      | Number      | mmHg  | Systolic


#### BG
| KeyName             | Type        | Unit  | Explanation  
| -------------       |-------------| ----- | ----------- 
| __BG__              | Number      | mg/dl | Blood Glucose
| __DinnerSituation__ | String      | -     | Accepted Values: "Before_breakfast", "After_breakfast", "Before_lunch", "After_lunch", "Before_dinner", "After_dinner", "At_midnight", "After_snack"
| __DrugSituation__   | String      | -     | Accepted Values: "After_taking_pills", "Before_taking_pills"


#### Activity
| KeyName              | Type        | Unit  | Explanation  
| -------------        |-------------| ----- | ----------- 
| __Calories__         | Number      | Cal   |  
| __DistanceTraveled__ | Number      | km    | 
| __StepLength__       | Number      | (?)   | 


#### Sleep
| KeyName             | Type        | Unit  | Explanation  
| -------------       |-------------| ----- | ----------- 
| __StartTime__       | Date        |       |  
| __EndTime__         | Date        |       | 
| __FallSleep__       | Number      | (?)   | Time until asleep (?)
| __SleepEfficiency__ | -           | (?)   | 


#### Weight (in progress)
| KeyName             | Type        | Unit  | Explanation  
| -------------       |-------------| ----- | ----------- 
| __WeightValue__     | Number      | kg    |  
