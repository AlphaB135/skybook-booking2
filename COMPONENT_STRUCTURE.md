# Skybook Airlines - Component Architecture (Separated by Page)

โครงสร้าง Components แยกเป็นแต่ละหน้า

## 1. หน้าแรก (Home Page)
**Route**: `/`
```text
          [ HomeView.vue ]
                  |
        ---------------------
        |                   |
  [ HeroSection ]   [ BookingComponent ]
                            |
                   --------------------
                   |                  |
             [ BookingForm ]    [ FlightCard ]
```

## 2. หน้าเข้าสู่ระบบ (Login Page)
**Route**: `/login`
```text
          [ LoginView.vue ]
                  |
           [ LoginPage ]
                  |
        ---------------------
        |                   |
  [ LoginHero ]       [ LoginForm ]
```

## 3. หน้าลงทะเบียน (Register Page)
**Route**: `/register`
```text
         [ RegisterView.vue ]
                  |
          [ RegisterForm ]
                  |
        ---------------------
        |                   |
 [ RegisterHero ]  (Inputs & Buttons)
```

## 4. หน้าข้อมูลผู้ใช้ (Passenger Page)
**Route**: `/booking/passenger`
```text
        [ PassengerView.vue ]
                  |
       --------------------------
       |                        |
[ UserFormComponent ]   [ BookingListComponent ]
       |
(Edit/Save Button)
```

## 5. หน้าสรุปตั๋ว (Ticket Preview Page)
**Route**: `/booking/preview`
```text
     [ TicketPreviewView.vue ]
                  |
           [ TicketCard ]
```

## 6. หน้าจองสำเร็จ (Success Page)
**Route**: `/booking/success`
```text
       [ SuccessView.vue ]
                  |
          [ BookingTicket ]
```

---
**Global Components (ใช้ทุกหน้า):**
```text
      [ App.vue ]
          |
      [ Navbar ]
```
