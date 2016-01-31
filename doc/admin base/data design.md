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
* nickName
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
* school
* medicalInfo
* note


#### Class
* name
* program
* session
* status
* level
* teacher
* schedule (include "day, time")
* length
* tuition (include "type [each/total], money")
* numberOfClass
* maxStudent
* minStudent
* trialStudent
* genderRequire
* maxAgeRequire
* minAgeRequire
* createTime
* updateTime

#### ClassStudent
* classID
* studentID
* status [register, wait]
* payment (see ClassStudentPayment)
* createTime
* updateTime
* dynamicKey (hold for future)

##### ClassStudentPayment
* time
* status [hold/success]
* money
* type (unnecessary now)
