
## iHealth Accounts 

### Installation

`meteor add ihealth:accounts-core`

### Design

Current accounts only support username/password. Username can be either email (US) or mobile phone number (China), and verification is mandatory.

####Sign up is a two-step process:####
**Step 1: Email/Phone verification**
* User enter email or phone as username, and a verification email or text message will be sent, respectively.
* User click the link in the email or enter the code in the text message to verify the account

**Step 2: Account creation**
* User enter and confirm password to create the account


### Configuration (coming...)
