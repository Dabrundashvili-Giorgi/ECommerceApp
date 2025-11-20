🍽️ Restaurant E-Commerce Platform — FullStack Project

📌 პროექტის სრული აღწერა

ეს არის რესტორნის ელექტრონული კომერციის პლატფორმა, სადაც მომხმარებელს შეუძლია:

✔ დარეგისტრირება / ავტორიზაცია (JWT Token)
✔ პაროლის აღდგენა
✔ მენიუს ნახვა (სლაიდერი + კატეგორიები)
✔ კერძების კალათაში დამატება
✔ შეფების ნახვა (სლაიდერი)
✔ ადმინის პანელი — პროდუქტებისა და შეფების მართვა

პროექტი აწყობილია FullStack არქიტექტურაზე, ორივე მხარე ერთმანეთთან მუშაობს API–ს მეშვეობით.

🛠 გამოყენებული ტექნოლოგიები
🔹 Backend — ASP.NET Core Web API

(SQLite)

JWT Authentication

Authorization (Admin/User როლები)

Password Reset (6-ნიშნა კოდით)

Swagger

🔹 Frontend — Angular

Angular Standalone Components


HttpClient — API–თან კავშირი

Responsive დიზაინი

LocalStorage ტოკენების სამართავად

🔗 არქიტექტურა
Frontend (Angular)
      ⬇⬆
    Backend
      ⬇
 SQLite Database

🚀 ძირითადი ფუნქციონალი
👤 მომხმარებელი

რეგისტრაცია / ავტორიზაცია (JWT Token)

პაროლის აღდგენა (Verification code + Reset)

სლაიდერი, პროდუქტების ლისტი

კალათა

შეკვეთის რედაქტირება

🧑‍🍳 შეფები

Chef slider

Backend თან კავშირი

ადმინ პანელი (შეფები) (დამატება / რედაქტირება / წაშლა)

🛒 პროდუქტები

სრული მენიუ Backend-თან კავშირში

კალათაში დამატება

ადმინ პანელი (პროდუქტები)  (ფასი, ფოტო, წონა, აღწერა…)

🛡 რა გვაქვს უსაფრთხოებაში ?

პაროლის hash + salt (HMACSHA512)

JWT Token გენერაცია

როლები: Admin/User

Backend endpoints დაცულია [Authorize]

🔐 პაროლის აღდგენის 3 საფეხური

👉 ამ ეტაპზე სატესტო რეჟიმში პაროლის აღდგენის კოდი ჩანს Browser Console-ში, ხოლო რეალურ მაილ–ზეც შესაძლებელია გაგზავნა, როცა პროექტი იქნება რეალური.

👉 პაროლის მოთხოვნები:

მინ. 4 სიმბოლო

მინ. 1 დიდი ასო

მინ. 1 რიცხვი

⚙️ Admin Panel 
✔ შეფების მართვა

დამატება / რედაქტირება / წაშლა

ფოტო, სახელი, სპეციალობა, აღწერა

✔ პროდუქტების მართვა

ფოტოს შეცვლა (სტრინგი)

ფასი, რაოდენობა, კატეგორია, ვეგეტარიანული: კი / არა 


Admin Panel  Backend API–ზეა დაკავშირებული.

📦 მონაცემთა ბაზის სტრუქტურა
User

Id, Username, PasswordHash, PasswordSalt, Role

Product

Id, Name, Description, Category, Price, Rating, Weight, ImageUrl

Chef

Id, Name, Specialty, Description, ImageUrl

PasswordResetCode

Username, Code, ExpiresAt, IsUsed

🖥 როგორ გავუშვათ პროექტი
🔹 Backend
cd BackEnd
cd ECommercePlatform
dotnet restore
dotnet build
dotnet run


გაეშვება აქ:
👉 გასატესად მუშაობს Insomnia-ში

🔹 Frontend
cd FrontEnd
npm install
ng serve


FrontEnd ხსნის:
👉 http://localhost:4200/

📷 Screenshots

👇 სურვილის შემთხვევაში დამalugu თანამედროვე screenshots სექცია Icons + Frames ფორმატით
(თუ გამომიგზავნი ფოტოებს — გაგიკეთებ 😎)

🧑‍💻 ავტორი

გიორგი დაბრუნდაშვილი
FullStack Web Developer
GitHub: Dabrundashvili-Giorgi
