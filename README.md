# PROJECT1-SEC-2-Mairuu

## Member List:

- 65130500073 Watchara Santawee (mail: watchara.sant@kmutt.ac.th)
- 65130500105 Natthaphol Nirattsaikul (mail: natthaphol.nira@kmutt.ac.th)
- 65130500124 Pasit  Winyan (mail: pasit.winy@kmutt.ac.th)

# บันทึกการประชุม
## วันที่ 24/01/2024 เวลา 21:00 น.

### ระยะเวลาการประชุม
- ระยะเวลา: 1 ชั่วโมง
- ที่ประชุม: Discord (ช่องสำหรับการสนทนา "ประชุม")

### เนื้อหาการประชุม
1. **รูปแบบการประชุม**
   - วันและเวลา: 3 ครั้งต่อสัปดาห์ (วันจันทร์, พุธ, เสาร์) เริ่มต้นที่ 21:00 น.
   - การประชุมเร่งด่วน: แจ้งล่วงหน้าก่อน 5 ชั่วโมง
   - การไม่สามารถเข้าร่วม: แจ้งล่วงหน้าก่อน 1 วันหรือแจ้งเหตุภายหลังกับสมาชิกภายในทีมทุกคน
   - การรอสมาชิกถึง 21:30 น. หากมีการขาดสมาชิก

2. **การแบ่งหน้าที่ความรับผิดชอบ**
   - ออกแบบ UI: นายพสิษฐ์ วิญญาณ
   - จัดทำ Requirement: นายณัฐพล นิรัตติศัยกุล
   - ประเมินโครงสร้างโค้ดและกระจายฟังก์ชัน: นายวัชระ สันทวี

3. **การประชุมเพื่อกำหนดหัวข้อและรูปแบบของ Project**
   - ประชุมเพื่อกำหนดหัวข้อและรูปแบบของ Project โดยดูจาก Ref. งานของรุ่นพี่ showcase2023
   - หัวข้อ Project ที่น่าสนใจ: Game A B C, Aimlap
   - ธีมของ Project: เกมต่อสู้, ตีมอนสเตอร์, เกมยิงเป้า, ปราสาท, อัศวิน, โครงกระดูก

### มอบหมายงานสำหรับครั้งต่อไป
1. **นายพสิษฐ์ วิญญาณ**
   - งาน: นำ asset ที่ใช้ในการออกแบบ UI อัปโหลดขึ้นบน Github ในโฟลเดอร์ชื่อ "assets"

2. **นายณัฐพล นิรัตติศัยกุล**
   - งาน: เขียน requirment จากต้นแบบของเกมที่ได้ทำการออกแบบไว้แล้วในโฟลเดอร์ชื่อ "prototypes" และทำการอัปโหลดขึ้นบน Github ภายในโฟลเดอร์เดียวกัน

### REMARK
- ทุกคนควรเข้าใจหน้าที่และความรับผิดชอบของตนเอง
- การประชุมมีบทบาทสำคัญในความสำเร็จของ Project

*บันทึกโดย: [นายพสิษฐ์ วิญญาณ]*

## วันที่ 27/01/2024 เวลา 21:00 น.

### ระยะเวลาการประชุม
- ระยะเวลา: 30 นาที
- ที่ประชุม: Discord (ช่องสำหรับการสนทนา "ประชุม")

### เนื้อหาการประชุม
- ทำให้เกมมีความทันสมัยมากขึ้นบางส่วนแต่คงลักษณะเดิมเอาไว้  เช่นปรับให้บางส่วนดู minimal ไม่รกจนเกินไป
- ขอบเขต project คือต้องมี theme(select ball color), change cursor, 1 monster, match history, responsive 
- แบ่งการทำ function บางส่วนให้แต่ละคนไปทำเพื่อให้เกมสามารถเล่นได้

### มอบหมายงานสำหรับครั้งต่อไป
ทุกคนไปทำ function ในส่วนความรับผิดชอบของตนเองแล้วอัพขึ้น brach ของตน และหลังจากที่ทุกคนตรวจสอบดูเรียบร้อยจึง merge ไปที่ main

**นายวัชระ สันทวี**
- Home, Game

**นายพสิษฐ์ วิญญาณ**
- Result

**นายณัฐพล นิรัตติศักุล**
- Match History

ให้แต่ละคนไปออกแบบแต่ละหน้ามา โดยสร้าง เป็น section ของแต่ละเพจ สมมุติว่าหน้า home ก็จะมี id ของ section เป็น homePage
<section id="homePage"></section>

*บันทึกโดย: [นายณัฐพล นิรัตติศัยกุล]*

## วันที่ 31/01/2024 เวลา 21:00 น.

### ระยะเวลาการประชุม
- ระยะเวลา: 1 ชั่วโมง
- ที่ประชุม: Discord (ช่องสำหรับการสนทนา "ประชุม")

### เนื้อหาการประชุม
- ติดตามและอัพเดทงานที่แต่ละคนได้รับมอบหมายจากครั้งก่อน
- พูดคุยปัญหาที่แต่ละคนได้เจอในงานส่วนของตนและร่วมหาแนวทางแก้ไข
- มอบหมายงานเพิ่มเติมให้แต่ละคน

### มอบหมายงานสำหรับครั้งต่อไป
- ให้ทุกคนนำงานของตนไปทำต่อให้เสร็จเรียบร้อย
- ให้ทุกคนเริ่ม commit งานลงใน bramch ของตนเองและทยอย merge ขึ้น main branch 

### REMARK
- ก่อนแก้ไขข้อมูลใดๆก็ตามควร fetch ข้อมูลจาก main branch มาใส่ใน branch ของตนก่อนทุกครั้งเพื่อให้ข้อมูลเป็นปัจจุบัน
- ก่อน pull request ทุกครั้ง ควรเช็คให้เรียบร้อยก่อนว่าข้อมูลทุกอย่างนั้นเป็นปัจจุบันและถูกต้องครบถ้วน
*บันทึกโดย: [นายณัฐพล นิรัตติศัยกุล]*

