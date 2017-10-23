# cyf-finalProject-LondonClass2
The most intelligent matchmaking system for mentors and students that maximises convenience and minimises waste.
 
                                                    Convenient
                                 Mentor-Student Matching Project Specification
Product Vision
 The most intelligent matchmaking system for mentors and students that maximises convenience and minimises waste.
Problem Statement
CodeYourFuture needs to allow students to access support from mentors outside of group sessions so that they can get help solving problems they encounter during the week. Students and mentors are distributed in their locations and inconsistent in their availability, as well as being busy, making it especially difficult to schedule meetings.
Personas

Joseph (Student)

 Joseph is a 27 year old refugee from Syria who was previously an electronics engineer and is now learning to code with CodeYourFuture. He lives with his wife and works different shifts at a coffee shop during the week. Joseph’s schedule is erratic, and so outside of the group sessions, he can be doing the set homework in the morning before work or at the end of the day. When he hits a problem, he researches it on the internet and access on-demand support through the Slack group, but for larger conceptual challenges, he would like a more in-depth explanation from a mentor.
 
Samantha (Mentor)
 Samantha is a 31 year old full stack developer who currently works at a growing tech startup in London. She has been mentoring with CodeYourFuture for 2 months whenever she can, but has other activities that sometimes take priority over the group sessions. She lives an active life, developing her skills by frequently experimenting with new technologies while frequently exercising, spending time with friends and family, and travelling. Samantha is keen to use her skills to help 
others, and would like to offer more of her time to students to assist their learning outside of group sessions.


Daniel (Organiser)

 Daniel has been helping to organise CodeYourFuture for the past 6 months. He is a 28 year old marketing manager who has dabbled in coding but is not a developer. He enjoys introducing new mentors to the programme and organising students so that they have access to as much support as possible. He also works as a freelancer for multiple companies, so is able to be responsive during the week to queries. He performs many different tasks for CodeYourFuture, so needs to minimise manual repetitive tasks and have visibility of students’ and mentors’ meetings.
Proposed Solution
Convenient is a platform that automatically connects students seeking assistance to mentors, depending on their location and availability. The full product can provide notifications of upcoming meetings, allow meeting rescheduling, support interaction through Slack, integrate with third party calendars and provide reports for organisers. It should also be possible in future to white label the system, so that organisations other than CodeYourFuture can utilise it.

The primary goal of Convenient is to dynamically arrange meetings between students and mentors at mutually convenient times. The scope of this project is purely to deliver the first version of the product, also known as a minimum viable product.
Sitemap


Requirements
Wireframes

https://app.moqups.com/laurieainley/6j6s4gcL5h/view
User Stories

As a student, mentor or organiser,
I need to be able to log in using my GitHub account,
So that I can use the system

Description

This story covers logging into the platform using GitHub’s OAuth authentication. By using this button, it is not necessary to create a registration/sign in system for the platform, but instead users should be able to be authenticated by GitHub via OAuth, with the user’s email being returned upon authentication. It is possible to then match users’ emails with the role that have been assigned in the Convenient database and to give them the appropriate options.

Acceptance Criteria

1. Given that I don’t have a GitHub account, when I arrive on the login page then I should find a link to contact the organisers
2. Given that I don’t have an active GitHub account, when I try to log in with GitHub then I should see a friendly message telling me that I need to have a valid GitHub account signed up to the CodeYourFuture team
3. Given that I have an active GitHub account, when I log in then the system should allow me to access the dashboard
4. Given that I have been assigned as a student, when I look at my dashboard then I should be able to access the page to request a meeting
5. Given that I have been assigned as a mentor, when I look at my dashboard then I should be able to access the page to set my availability
6. Given that I have been assigned as an organiser, when I look at my dashboard then I should be able to access the pages to set roles and review meetings



As a student
I need to be able to request a meeting with a mentor
So that I can get access to learning support

Description

Students need an interface to indicate that they would like to request a meeting with a mentor. They should be able to specify the days, times and location that they would be prepared to meet. They should also be required to enter a brief summary of the problem they would like to discuss, including any relevant links.

Acceptance Criteria

1. Given that I have logged in successfully, when I access the booking page then I should be given the ability to mark my availability for the next 14 days
2. Given that I have availability for a certain time range on a specific day, when I mark my availability then the system should allow me to specify a start and end time on any day
3. Given that I have already marked my availability on a specific day, when I try to add another availability period that overlaps with an existing slot, then I should be prompted to merge the two slots together and update any differing details such as location
4. Given that I have marked at least one available slot, when I view the booking page then I should be able to request a meeting
5. Given that I have marked only 1 or 2 available slots in the next 14 days, when I view the booking page then I should get a warning that I should try to supply more available slots



As a mentor
I need to be able to specify my availability
So that I am only contacted about times I might be available

Description

Similarly to students, mentors need to be able to mark their availability for meetings with students to be booked. It should be possible to reuse some of the code from the previous user story when building these interfaces.

Acceptance Criteria

1. Given that I have logged in successfully, when I access the booking page then I should be given the ability to mark my availability for the next 14 days
2. Given that I have availability for a certain time range on a specific day, when I mark my availability then the system should allow me to specify a start and end time on any day
3. Given that I have already marked my availability on a specific day, when I try to add another availability period that overlaps with an existing slot, then I should be prompted to merge the two slots together and update any differing details such as location
4. Given that I have marked only 1 or 2 available slots in the next 14 days, when I view the booking page then I should get a warning that I should try to supply more available slots




As a mentor or student
I need to be notified when a match has been made
So that I know where and when I am supposed to meet

Description

The matchmaking process should be run every Sunday for the upcoming week. Meetings should be booked according to the availability of both students and mentors, taking into account location and workload as well. Email notifications should be sent once a meeting has been booked.



As a mentor or student
I need to be able to cancel a planned meeting
So that I don’t inconvenience my partner

Description

Once a meeting has been booked, should a student or mentor be unable to attend, they should be able to rebook the meeting. If it is the mentor who cancels, a meeting should be rebooked for the student with a different mentor.

Acceptance Criteria

1. Given that a meeting has been booked, when the student cancels the meeting then the mentor should receive a notification that the meeting has been cancelled.
2. Given that a meeting has been booked, when the mentor cancels the meeting then the student should have the meeting re-booked by with a different mentor.
3. Given that a meeting has been cancelled, when the meeting is re-booked then both parties (the existing student and the new mentor) should receive a notification informing them of the new details.





As an organiser
I need to be able to see the upcoming schedule
So that I can monitor engagement and resolve issues

TBD


As an organiser
I need to be able to assign access to the system for students and mentors
So that they can use it

TBD

Stretch Goal #1
Create bespoke registration and login system
Stretch Goal #2
Integrate the Sign in with Slack button

