## Data Design
***

#### Program
* name
* description (maybe html string)
* createTime
* updateTime


#### Session
* name
* startDate
* endDate
* registrationStartDate
* registrationEndDate (equal endDate)
* registrationStatus [Yes/No]
* createTime
* updateTime


#### Student
* accountID
* accountName
* nickname
* profile (see StudentProfile)
* status [Active/Inactive]
* skillLevel
* createTime
* updateTime

##### StudentProfile
* email
* firstName
* lastName
* image
* phone
* location
* emergencyPhone
* emergencyContact
* alternativePhone
* alternativeContact
* birthday
* gender [Male/Female]
* description
