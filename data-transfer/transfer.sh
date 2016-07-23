#=====================
# make sure the following columns are saved in excel "Text" format
# class.xlsx: startTime
# student.xlsx: birthday, start time, registration date
#
#transfer data
cd transfer
#Step 1: install node packages
npm install
#Step 2: start transfer process
node index.js
cd ..