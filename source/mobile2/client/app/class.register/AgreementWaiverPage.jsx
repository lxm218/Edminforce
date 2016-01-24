/**
 * Created on 10/17/15.
 */
{
    let AgreementWaiverPageStore;
    Dependency.autorun(function () {
        AgreementWaiverPageStore = Dependency.get('classRegister.AgreementWaiverPage.store');
    });

    Cal.CRAgreementWaiverPage = React.createClass({
        mixins: [ReactMeteorData],
        getMeteorData() {
            return {
                hasNewSwimmer:AgreementWaiverPageStore.hasNewSwimmer.get(),
                swimmerIds:AgreementWaiverPageStore.swimmerIds.get()
            }
        },

        submit(e){
            e.preventDefault();

            DB.Waiver.insert({
                accountId:Meteor.userId(),
                swimmers:this.data.swimmerIds

            },function(err){
                if(err){
                    console.error(err.error)
                }

                let href="/classRegister/paymentOptionsPage"
                FlowRouter.go(href);
            })
        },


        /*

         __X_______________________________________________________________________________________________________________________________________________
         Please List ALL Swimmers’ Names

         __X___________________________________________		__X________________________________________	      __X__________________________________
         Name of Parent or Legal Guardian if Under 18           	Swimmer’s Signature(s)			      Date
         (Sig


         * */

        render: function () {
            return <div className="padding">

                <h2>Swimmer Agreement & Waiver (SAW)</h2>


                <p>
                    The following enrollment & release agreement (“Agreement”) is effective as of the date written on this form, and shall remain effective for as long as the Swimmer (“Swimmer”) is enrolled in a Calphin Aquatic Club (“CALPHIN”) (formally known as California Dolphin Swim School) class/program. Where the swimmer is under 18 of age, “Swimmer” herein shall mean Swimmer’s parent or guardian (“Parent/Guardian”), where appropriate.

                </p>

                ENROLLMENT & REGISTRATION POLICIES
                Registration
                Registration is a first come first served basis, so please plan accordingly.
                We give all swimmers enrolled in the current session a two weeks advance priority registration period for the upcoming session.
                All New/Returning swimmers will begin registration the following week.
                We register swimmers in their current level and will automatically update their levels after testing.
                The registration fee is due once a year according to the session you first registered.
                Please provide at least 3 valid class time preferences within your availability. (There is a possibility you could get your last preference depending on class changes)
                Class schedules are not confirmed at the time of early registration until email confirmations are sent out.
                Class Schedules
                Email confirmations will be sent out a week before the next session begins to confirm your upcoming session schedule. If you do not receive an email from us or receive multiple confirmations, please give us a call as soon as possible.
                The minimum number of swimmers to open a class is 4 for all levels (2 for Bubbler).
                Classes will be made with every effort to optimize pool usage by combining adjacent levels or rescheduling classes with low enrollment.  Instructors are trained to give customized instructions to each individual swimmer. (i.e. Glider 2 & 3 combined, Sprinter & Racer combined, etc.)
                Parents must pick up their swimmers on time after class.
                Additional Fees
                Tuition must be paid in full at the time of registration for an available class.
                If your child's level changes causing a price adjustment, you will be contacted and the rate adjustment will be collected.
                Any price difference or remaining tuition must be paid before attending the first class. Failure to make payment on time will result in a $20 late fee after the second class.
                Each swimmer is allotted one free permanent schedule change per session. Any additional schedule changes after will result in a $20 fee.
                Bounced checks are subjected to a $25 charge.
                Cancellation
                Cancellations for full refunds need to be submitted 3 days before the session begins. After the cut-off date and the start of the session, the annual registration fee is non-refundable and refunds are subjected to a $30/swimmer/class transaction fee.
                Club Credit (or in-store credit) is available for future enrollment in Calphin programs without a transaction fee. Once opting for credit, the credited amount cannot be refunded, but can be transferred to family or friends.

                SWIM LESSONS RULES
                General
                Parents are not allowed on deck without Calphin permission. Parent Coach Conferences available upon request.
                Pictures are not allowed until the last day of class.  Video recording is prohibited at all times.
                Goggles are mandatory. Caps are mandatory for swimmers with hair length past their ears.
                Have your caps and goggles on BEFORE class starts. Bring your own gear; borrowing can be a health hazard.
                Only swim attire can be worn into the pool; NO t-shirts, jeans, street clothes, etc.
                Rash guards are OK for temperature purposes, but are not recommended unless properly fitted, as it can weigh the swimmer down and make it difficult to swim.
                Wetsuits are not allowed; they are extremely buoyant & provide a false sense of ability.
                Before Class
                Swimmers should use the restroom before class to avoid any unnecessary accidents.
                Avoid eating or drinking before class or allow one hour between start of swimmer's class and their last meal.
                Do NOT apply any type of lotion, sunscreen, or oils before entering the water as they react with the chlorine and cause rashes.
                Restrooms
                Showers are for RINSING only, please NO shampoo, NO conditioner, and NO soap of any kind.
                Please help Calphin keep the restrooms nice and clean. Notify the staff if any supplies need to be replenished.
                Camera phone use is prohibited in the locker rooms.
                No girls over 4 years old allowed in boys' restroom. No boys over 4 years old allowed in girls' restroom. (2 shower head rinse stations are available on the pool deck)
                Family bathroom & changing room time is limited to 5 minutes.
                Missed Classes
                YOU MUST CALL OR EMAIL (info@calphin.com) THE FRONT DESK AND NOTIFY STAFF OF ANY ABSENCE PRIOR TO THE START TIME OF THE SWIMMER’S CLASS. ONLY THEN WILL YOU BE ELIGIBLE TO RECEIVE A SELF-PRACTICE TICKET OR CLUB CREDIT (with a doctor’s note).
                We do not offer makeup classes, but Self-Practice will be available for any missed classes (Wednesday 8-9p & Sunday 12-1p) upon advance notification for currently enrolled students.
                If classes are cancelled due to pool maintenance or accidents, club credit (if more than half of the class is cancelled) or self-practice will be issued, no makeup classes.
                Self-Practice will be issued for missed classes due to menstruation.
                If your swimmer is showing symptoms of serious illness, including nausea, please do not attend the class. Only self-practice tickets will be issued for medical related absences without doctor’s notes
                If a class is missed and excused by a doctor, then a doctor's note must be submitted within two weeks of the first missed class. The note must state the class dates missed to receive credit towards the next session (exams, check-ups, dental hygiene appointments do NOT count as excused and self-practice will be issued).
                Summer Session Vacation Policy: if 3 or more consecutive classes are missed per family for vacation out of the Bay Area, Club Credit may be received with submission of vacation documentation. (Only valid in Summer.)
                Self-Practice
                Calphin cannot accommodate more than 30 swimmers in the small pool, and 150 swimmers in the big pool.
                Self-practice times are only available to swimmers who are enrolled in the current session. Returning swimmers or friends NOT registered in the current program will NOT be allowed in.
                Self-practice tickets cannot be redeemed for cash, cannot be transferred, and cannot be extended.
                Self-practice tickets must be used within the session they are issued.
                No swim instructors will be available during the practice time to help swimmers.
                All parents MUST sit on the bench while watching; standing/walking in front of the viewing area, walking on pool deck, or the pathway between pools is prohibited.
                All swimmers must utilize the pool that they currently take lessons in.
                Swimmers, who are in Glider 2 class or lower, must swim with an adult (over the age of 18). Parents of Sprinter & higher levels are not allowed in the water.
                A parent is allowed to supervise only 2 children maximum and must stay within arm’s reach at all times.
                No personal property (i.e. swim bags, laptops, and strollers) other than towels, water bottles, shoes, and personal kickboards are permitted on the pool deck.
                No toys or equipment are allowed during self-practice swim other than kickboards.

                Testing
                Test week is the third to last class of the session.  Encourage swimmers to do their best as they have been working hard all session!
                If test week is missed, there will be a make-up evaluation the following week during your regular class time. There are no tests administered the last class of the session. Missing test week will hinder your registration priority.
                No retests will be conducted for swimmers who have taken the test.

                CLUB POLICIES & POOL RULES
                General
                Use the pool at your own risk when a lifeguard is not on duty and Calphin is not responsible for accidents or injuries.
                Distracting the attention of the lifeguard is prohibited. Lifeguards are on duty to enforce rules for your safety and to respond to emergencies. Please cooperate with their requests.
                No running, pushing, or other dangerous horseplay.
                Please keep calm and follow Calphin staff instructions in an emergency situation.
                No playing or hanging on lane lines.
                Management reserves the right to deny use of pool to anyone at any time.
                Dive only in designated areas under supervision of Calphin certified instructor (not allowed during membership).
                No glass, food, or drink (except water) in pool area.
                Smoking, alcoholic beverages and pets are not allowed.
                Be considerate - no yelling, vulgar language or other loud noises.
                Remove all bandages and dispose of all chewing gum before entering the pool area.
                Hair length past swimmers' ears needs to be put up in a swim cap.
                Children under the age of three are required to use a Calphin approved reusable swim diaper.
                All swimmers must wear swimsuits that are specifically made for swimming. Street clothes are not allowed.
                Everyone is responsible for the equipment used and must return it when finished.
                Personal flotation devices are not allowed.
                Individuals with severe open cuts or bleeding are prohibited from using the pool.
                Persons with any type of illness appearing to be unable to care for him or herself will not be allowed in the pool.
                Viewers must stay out of pool area and sit down on the benches in order to keep pathways clear.
                Calphin Aquatic Club is not responsible for any lost or stolen items. All valuables and personal property must be locked in the locker rooms (Calphin does NOT provide locks; patrons must bring their own lock).
                All children 5 years & under are not permitted in big pool. (Unless qualified for appropriate level)
                Parents are required to remain seated while watching swimming, no loitering on deck allowed during lessons/self-practice.
                Membership
                Any outside equipment must be approved by Aquatic Staff (fins, snorkels, and training equipment).
                Swimmers under 7 years old need to be accompanied by a responsible adult.
                Inexperienced young swimmers must be within an arm’s reach of an adult.
                Only tested capable swimmers can use the large deep pool during membership swim.
                No toys or equipment are allowed during membership swim except kickboards.
                Membership swimmers must follow the lane use designation and lifeguards' directions.
                Please be courteous to other swimmers and share lanes when needed.
                Parking
                Please be considerate to other patrons and park within the white lines of the single parking spots.
                There is additional parking available in the Lucky shopping center (near the recycling center).
                DO NOT park at Motel 6 or behind the white sign; your car will be towed at your own expense.
                DO NOT park, stop, or leave your car in the red FIRE zone as it is a danger hazard.
                Make sure to lock your car and hide all valuables as Calphin is not responsible for any lost/stolen items.
                Please drive with caution for many children and patrons are crossing and there are limited sidewalks.
                As a swimmer (or parent of), I have been consulted in regards to mine (or my child’s) swim level & mentioned health condition(s). I am aware that adjustments might be made on/after the first lesson to place the swimmer into a swim class that fits best and is the safest. Such adjustments might include a change in level, day, or time of schedule.   __________ (Initials)

                I give Calphin Aquatic Club full permission to take pictures/videos of my child(ren) listed above for marketing only purposes. I understand that the pictures taken will be used by Calphin Aquatic Club only and will not be distributed to other parties. _________ (Initials)

                By signing the form below, I certify that the Swimmer is in good health to swim in chlorinated water. I also confirm that the Swimmer have received, understood, and will comply with all the safety rules and club policies (see website www.Calphin.com for complete policy) established by CALPHIN. I, the undersigned, understand and assume all incidental risks involved in swimming and its facility, and agree that CALPHIN cannot be held accountable for any knowledge of any medical conditions of any swimmer that is not listed and communicated. In case of injury to the Swimmer. I, the undersigned, do hereby release, indemnify, hold harmless and waive all claims against the pool facility owners, management organizations, CALPHIN, their officers and employees. I also certify that I have read, understood the foregoing message, and sign this form voluntarily.


                nature of Parent or Legal Guardian if Under 18)

                <RC.Button name="button" type="submit" bgColor="brand1"
                            onClick={this.submit}
                            theme="full" buttonColor="brand">
                     Confirm
                 </RC.Button>


            </div>
        }

    });
}
