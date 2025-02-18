import React, { useState } from "react";
import FurnitureChat from "./fur";
import { SendBirdProvider } from "@sendbird/uikit-react";
import emailjs from "emailjs-com";

// const Tests = () => {
//   const userId = "Admin";
//   const accessToken = "accessTokenHere";

//   return (
//     <SendBirdProvider
//       appId="894E1E6C-8871-47A1-935D-B9B0BDB46A25"
//       userId={userId}
//       accessToken={accessToken || undefined}
//     >
//       <FurnitureChat />
//     </SendBirdProvider>
//   );
// }

// export default Tests;

const Tests = () => {
  return (
    <div>
    </div>
  );
};

export default Tests;




// import React from 'react';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const PdfGenerator: React.FC = () => {
//   const handleDownload = () => {
//     const doc = new jsPDF();

//     // Sarlavha
//     doc.setFont('Arial', 'bold');
//     doc.setFontSize(14);
//     // doc.text('AARCH64 Instruktsiyalari va Tushuntirishlari', 20, 20);
//     // doc.text('C ++ Instruktsiyalari va Tushuntirishlari', 20, 20);
//     // doc.text('C Instruktsiyalari va Tushuntirishlari', 20, 20);
//     // doc.text('Python Instruktsiyalari va Tushuntirishlari', 20, 20);
//     doc.text('Javascript Instruktsiyalari va Tushuntirishlari', 20, 20);

//     // const data = [
//     //   ["Instruktsiya", "Tavsifi", "Misol", "Izoh"],
//     //   [
//     //     "MOV",
//     //     "Registerga qiymatni ko’chirish",
//     //     "MOV X0, #5",
//     //     "X0 registeriga 5 qiymatini yozadi. Bu operatsiya orqali ma’lum bir qiymatni registerga yuklash mumkin."
//     //   ],
//     //   [
//     //     "ADD",
//     //     "Qo’shish operatsiyasi",
//     //     "ADD X1, X2, X3",
//     //     "X1 registeriga X2 va X3 registerlarining yig’indisi yoziladi."
//     //   ],
//     //   [
//     //     "SUB",
//     //     "Ayirish operatsiyasi",
//     //     "SUB X1, X2, X3",
//     //     "X1 registeriga X2 va X3 registerlarining farqi yoziladi."
//     //   ],
//     //   [
//     //     "AND",
//     //     "Bitwise AND",
//     //     "AND X0, X1, X2",
//     //     "X0 registeriga X1 va X2 registerlarining AND natijasini yozadi."
//     //   ],
//     //   [
//     //     "ORR",
//     //     "Bitwise OR",
//     //     "ORR X0, X1, X2",
//     //     "X0 registeriga X1 va X2 registerlarining OR natijasini yozadi."
//     //   ],
//     //   [
//     //     "EOR",
//     //     "Bitwise XOR",
//     //     "EOR X0, X1, X2",
//     //     "X0 registeriga X1 va X2 registerlarining XOR natijasini yozadi."
//     //   ],
//     //   [
//     //     "LSL",
//     //     "Logical Shift Left",
//     //     "LSL X0, X1, #2",
//     //     "X1 registerini chapga 2 bit siljitib, natijani X0 registeriga yozadi."
//     //   ],
//     //   [
//     //     "LSR",
//     //     "Logical Shift Right",
//     //     "LSR X0, X1, #2",
//     //     "X1 registerini o’ngga 2 bit siljitib, natijani X0 registeriga yozadi."
//     //   ],
//     //   [
//     //     "ROR",
//     //     "Rotate Right",
//     //     "ROR X0, X1, #2",
//     //     "X1 registerini o’ngga 2 bit aylantirib, natijani X0 registeriga yozadi."
//     //   ],
//     //   [
//     //     "LDUR",
//     //     "Xotiradan ma’lumot yuklash",
//     //     "LDUR X0, [X1, #0]",
//     //     "X1 manzilidan ma’lumotni X0 registeriga yuklaydi."
//     //   ],
//     //   [
//     //     "STUR",
//     //     "Xotiraga ma’lumot saqlash",
//     //     "STUR X0, [X1, #0]",
//     //     "X0 registeridagi ma’lumotni X1 manzildan boshlanadigan joyga saqlaydi."
//     //   ],
//     //   [
//     //     "B",
//     //     "Bevosita sho’ng’ish (jump)",
//     //     "B Label",
//     //     "Kodni Label manziliga sho’ng’ish qiladi."
//     //   ],
//     //   [
//     //     "BL",
//     //     "Funktsiyaga sho’ng’ish (jump with link)",
//     //     "BL function",
//     //     "function deb nomlangan funktsiyaga sho’ng’ish qiladi."
//     //   ],
//     //   [
//     //     "CMP",
//     //     "Solishtirish operatsiyasi",
//     //     "CMP X0, X1",
//     //     "X0 va X1 registerlarini solishtirib, bayroqlarni yangilaydi."
//     //   ],
//     //   [
//     //     "TST",
//     //     "Bitwise test (AND)",
//     //     "TST X0, X1",
//     //     "X0 va X1 registerlarini bitwise AND bilan tekshiradi."
//     //   ],
//     //   [
//     //     "MUL",
//     //     "Ko’paytirish operatsiyasi",
//     //     "MUL X0, X1, X2",
//     //     "X0 registeriga X1 va X2 registerlarining ko’paytmasini yozadi."
//     //   ],
//     //   [
//     //     "UDIV",
//     //     "Unsigned division",
//     //     "UDIV X0, X1, X2",
//     //     "X0 registeriga X1ni X2ga bo’lish natijasini yozadi."
//     //   ],
//     //   [
//     //     "SDIV",
//     //     "Signed division",
//     //     "SDIV X0, X1, X2",
//     //     "X0 registeriga X1ni X2ga bo’lish natijasini yozadi."
//     //   ],
//     //   [
//     //     "FMUL",
//     //     "Floating-point multiplication",
//     //     "FMUL S0, S1, S2",
//     //     "S0 registeriga S1 va S2 floating-point ko’paytmasini yozadi."
//     //   ],
//     //   [
//     //     "FADD",
//     //     "Floating-point addition",
//     //     "FADD S0, S1, S2",
//     //     "S0 registeriga S1 va S2 floating-point yig’indisini yozadi."
//     //   ],
//     //   [
//     //     "FSUB",
//     //     "Floating-point subtraction",
//     //     "FSUB S0, S1, S2",
//     //     "S0 registeriga S1 va S2 floating-point farqini yozadi."
//     //   ],
//     //   [
//     //     "FNEG",
//     //     "Floating-point negation",
//     //     "FNEG S0, S1",
//     //     "S1 registeridagi floating-point qiymatini teskari qilib, S0 registeriga yozadi."
//     //   ],
//     //   [
//     //     "FABS",
//     //     "Floating-point absolute value",
//     //     "FABS S0, S1",
//     //     "S1 registeridagi floating-point qiymatning mutlaq qiymatini S0 registeriga yozadi."
//     //   ],
//     //   [
//     //     "CBZ",
//     //     "Compare and branch if zero",
//     //     "CBZ X0, Label",
//     //     "Agar X0 nolga teng bo’lsa, Label manziliga sho’ng’ish qiladi."
//     //   ],
//     //   [
//     //     "CBNZ",
//     //     "Compare and branch if non-zero",
//     //     "CBNZ X0, Label",
//     //     "Agar X0 nolga teng bo’lmasa, Label manziliga sho’ng’ish qiladi."
//     //   ],
//     //   [
//     //     "BIC",
//     //     "Bitwise Clear",
//     //     "BIC X0, X1, X2",
//     //     "X1 va X2 registerlarining AND natijasini olish va X0 registeridan olib tashlash."
//     //   ],
//     //   [
//     //     "MOVT",
//     //     "Moving 16-bit immediate value to register",
//     //     "MOVT X0, #value",
//     //     "X0 registerining yuqori 16 bitiga qiymatni yuklash."
//     //   ],
//     //   [
//     //     "MOVW",
//     //     "Moving 16-bit immediate value to register",
//     //     "MOVW X0, #value",
//     //     "X0 registerining pastki 16 bitiga qiymatni yuklash."
//     //   ],
//     //   [
//     //     "CLZ",
//     //     "Count Leading Zeros",
//     //     "CLZ X0, X1",
//     //     "X1 registeridagi nol bitlarini sanab, natijani X0 registeriga yozadi."
//     //   ],
//     //   [
//     //     "SBFM",
//     //     "Signed bitfield move",
//     //     "SBFM X0, X1, #size",
//     //     "X1 registeridagi bit maydonini X0 registeriga ko’chirish."
//     //   ],
//     //   [
//     //     "UBFM",
//     //     "Unsigned bitfield move",
//     //     "UBFM X0, X1, #size",
//     //     "X1 registeridagi bit maydonini X0 registeriga ko’chirish."
//     //   ],
//     //   [
//     //     "LDR",
//     //     "Ma’lumotni xotiradan yuklash",
//     //     "LDR X0, [X1, #offset]",
//     //     "X1 manzildan boshlanadigan ma’lumotni X0 registeriga yuklash."
//     //   ],
//     //   [
//     //     "STR",
//     //     "Xotiraga ma’lumot saqlash",
//     //     "STR X0, [X1, #offset]",
//     //     "X0 registeridagi ma’lumotni xotiraga saqlash."
//     //   ]
//     // ];

//     // const data = [
//     //   [
//     //     "printf",
//     //     "Konsolga ma'lumot chiqarish",
//     //     "printf(\"Hello World!\");",
//     //     "printf operatori yordamida konsolga matn yoki o'zgaruvchilarni chiqarish mumkin.",
//     //     "printf(\"Hello World!\");"
//     //   ],
//     //   [
//     //     "scanf",
//     //     "Konsoldan ma'lumot kiritish",
//     //     "scanf(\"%d\", &a);",
//     //     "scanf operatori yordamida foydalanuvchidan ma'lumot kiritish mumkin.",
//     //     "scanf(\"%d\", &a);"
//     //   ],
//     //   [
//     //     "if",
//     //     "Shartli operator",
//     //     "if (x > 0) { printf(\"Positive\"); }",
//     //     "if operatori orqali ma'lum shart bajarilganda amal bajariladi.",
//     //     "if (x > 0) { printf(\"Positive\"); }"
//     //   ],
//     //   [
//     //     "else",
//     //     "Shartni inkor qilish operatori",
//     //     "if (x > 0) { printf(\"Positive\"); } else { printf(\"Non-positive\"); }",
//     //     "else operatori agar if sharti bajarilmasa ishlaydi.",
//     //     "if (x > 0) { printf(\"Positive\"); } else { printf(\"Non-positive\"); }"
//     //   ],
//     //   [
//     //     "for",
//     //     "Takrorlash sikli",
//     //     "for (int i = 0; i < 10; i++) { printf(\"%d\", i); }",
//     //     "for operatori yordamida takrorlashni amalga oshirish mumkin.",
//     //     "for (int i = 0; i < 10; i++) { printf(\"%d\", i); }"
//     //   ],
//     //   [
//     //     "while",
//     //     "Takrorlash sikli (shartli)",
//     //     "while (x < 10) { printf(\"%d\", x); x++; }",
//     //     "while sikli shart bajarilguncha takrorlanadi.",
//     //     "while (x < 10) { printf(\"%d\", x); x++; }"
//     //   ],
//     //   [
//     //     "do-while",
//     //     "Takrorlash sikli (kamida bitta takrorlash)",
//     //     "do { printf(\"%d\", x); x++; } while (x < 10);",
//     //     "do-while sikli kamida bir marta bajariladi va keyin shartni tekshiradi.",
//     //     "do { printf(\"%d\", x); x++; } while (x < 10);"
//     //   ],
//     //   [
//     //     "break",
//     //     "Takrorlashdan chiqish",
//     //     "for (int i = 0; i < 10; i++) { if (i == 5) break; }",
//     //     "break operatori siklni yoki switch operatorini to'xtatishga imkon beradi.",
//     //     "for (int i = 0; i < 10; i++) { if (i == 5) break; }"
//     //   ],
//     //   [
//     //     "continue",
//     //     "Takrorlashni davom ettirish",
//     //     "for (int i = 0; i < 10; i++) { if (i == 5) continue; printf(\"%d\", i); }",
//     //     "continue operatori siklni davom ettiradi va keyingi iteratsiyani o'tkazib yuboradi.",
//     //     "for (int i = 0; i < 10; i++) { if (i == 5) continue; printf(\"%d\", i); }"
//     //   ],
//     //   [
//     //     "return",
//     //     "Funktsiyani tugatish",
//     //     "return 0;",
//     //     "return operatori funktsiyani yakunlash va qiymat qaytarishga imkon beradi.",
//     //     "int func() { return 0; }"
//     //   ],
//     //   [
//     //     "int",
//     //     "Butun son turini e'lon qilish",
//     //     "int a = 5;",
//     //     "int tipi butun sonlarni saqlash uchun ishlatiladi.",
//     //     "int a = 5;"
//     //   ],
//     //   [
//     //     "float",
//     //     "O'nlik son turini e'lon qilish",
//     //     "float a = 5.6;",
//     //     "float tipi o'nlik sonlarni saqlash uchun ishlatiladi.",
//     //     "float a = 5.6;"
//     //   ],
//     //   [
//     //     "char",
//     //     "Belgi turini e'lon qilish",
//     //     "char a = 'A';",
//     //     "char tipi bitta belgini saqlash uchun ishlatiladi.",
//     //     "char a = 'A';"
//     //   ],
//     //   [
//     //     "double",
//     //     "Kengaytirilgan o'nlik son turini e'lon qilish",
//     //     "double a = 5.6;",
//     //     "double tipi yuqori aniqlikdagi o'nlik sonlarni saqlash uchun ishlatiladi.",
//     //     "double a = 5.6;"
//     //   ],
//     //   [
//     //     "const",
//     //     "O'zgarmas o'zgaruvchi e'lon qilish",
//     //     "const int a = 5;",
//     //     "const operatori yordamida o'zgarmas qiymatga ega o'zgaruvchi e'lon qilinadi.",
//     //     "const int a = 5;"
//     //   ],
//     //   [
//     //     "sizeof",
//     //     "O'zgaruvchining hajmini olish",
//     //     "printf(\"%lu\", sizeof(a));",
//     //     "sizeof operatori yordamida o'zgaruvchining yoki turining xotirada qancha joy egallashini bilish mumkin.",
//     //     "printf(\"%lu\", sizeof(a));"
//     //   ],
//     //   [
//     //     "malloc",
//     //     "Dinamik xotira ajratish",
//     //     "int* ptr = (int*)malloc(sizeof(int));",
//     //     "malloc operatori yordamida xotirada joy ajratish mumkin.",
//     //     "int* ptr = (int*)malloc(sizeof(int));"
//     //   ],
//     //   [
//     //     "free",
//     //     "Dinamik xotiradan joyni ozod qilish",
//     //     "free(ptr);",
//     //     "free operatori yordamida dinamik xotiradagi joyni ozod qilish mumkin.",
//     //     "free(ptr);"
//     //   ],
//     //   [
//     //     "struct",
//     //     "Struktura yaratish",
//     //     "struct MyStruct { int x; float y; };",
//     //     "struct operatori yordamida yangi strukturani yaratish mumkin.",
//     //     "struct MyStruct { int x; float y; };"
//     //   ],
//     //   [
//     //     "typedef",
//     //     "Turlarni nomlash",
//     //     "typedef int MyInt;",
//     //     "typedef operatori yordamida yangi tur nomini yaratish mumkin.",
//     //     "typedef int MyInt;"
//     //   ],
//     //   [
//     //     "enum",
//     //     "Enumeratsiya yaratish",
//     //     "enum MyEnum { RED, GREEN, BLUE };",
//     //     "enum operatori yordamida bir necha qiymatga ega bo'lgan yangi tur yaratish mumkin.",
//     //     "enum MyEnum { RED, GREEN, BLUE };"
//     //   ],
//     //   [
//     //     "goto",
//     //     "Kodga yo'naltirish",
//     //     "goto label;",
//     //     "goto operatori yordamida dasturga belgilangan joyga o'tish mumkin.",
//     //     "goto label;"
//     //   ]
//     // ];

//     // const data = [
//     //   [
//     //     "Console.WriteLine",
//     //     "Konsolga ma'lumot chiqarish",
//     //     "Console.WriteLine(\"Hello World!\");",
//     //     "Console.WriteLine metodi konsolga matn yoki o'zgaruvchilarni chiqarishga imkon beradi.",
//     //     "Console.WriteLine(\"Hello World!\");"
//     //   ],
//     //   [
//     //     "Console.ReadLine",
//     //     "Konsoldan ma'lumot kiritish",
//     //     "string input = Console.ReadLine();",
//     //     "Console.ReadLine metodi foydalanuvchidan matnli ma'lumotni olish uchun ishlatiladi.",
//     //     "string input = Console.ReadLine();"
//     //   ],
//     //   [
//     //     "if",
//     //     "Shartli operator",
//     //     "if (x > 0) { Console.WriteLine(\"Positive\"); }",
//     //     "if operatori orqali shart bajarilsa, ma'lum amal bajariladi.",
//     //     "if (x > 0) { Console.WriteLine(\"Positive\"); }"
//     //   ],
//     //   [
//     //     "else",
//     //     "Shartni inkor qilish operatori",
//     //     "if (x > 0) { Console.WriteLine(\"Positive\"); } else { Console.WriteLine(\"Negative\"); }",
//     //     "else operatori agar if sharti bajarilmasa, ishlaydi.",
//     //     "if (x > 0) { Console.WriteLine(\"Positive\"); } else { Console.WriteLine(\"Negative\"); }"
//     //   ],
//     //   [
//     //     "for",
//     //     "Takrorlash sikli",
//     //     "for (int i = 0; i < 10; i++) { Console.WriteLine(i); }",
//     //     "for operatori yordamida takrorlashni amalga oshirish mumkin.",
//     //     "for (int i = 0; i < 10; i++) { Console.WriteLine(i); }"
//     //   ],
//     //   [
//     //     "foreach",
//     //     "Massiv yoki kolleksiya elementlarini tekshirish",
//     //     "foreach (var item in array) { Console.WriteLine(item); }",
//     //     "foreach operatori massivlar yoki kolleksiyalarni takrorlash uchun ishlatiladi.",
//     //     "foreach (var item in array) { Console.WriteLine(item); }"
//     //   ],
//     //   [
//     //     "while",
//     //     "Takrorlash sikli (shartli)",
//     //     "while (x < 10) { Console.WriteLine(x); x++; }",
//     //     "while operatori shart bajarilguncha takrorlashni amalga oshiradi.",
//     //     "while (x < 10) { Console.WriteLine(x); x++; }"
//     //   ],
//     //   [
//     //     "do-while",
//     //     "Takrorlash sikli (kamida bitta takrorlash)",
//     //     "do { Console.WriteLine(x); x++; } while (x < 10);",
//     //     "do-while sikli kamida bir marta bajariladi va shundan so'ng shartni tekshiradi.",
//     //     "do { Console.WriteLine(x); x++; } while (x < 10);"
//     //   ],
//     //   [
//     //     "break",
//     //     "Takrorlashdan chiqish",
//     //     "for (int i = 0; i < 10; i++) { if (i == 5) break; }",
//     //     "break operatori siklni to'xtatishga imkon beradi.",
//     //     "for (int i = 0; i < 10; i++) { if (i == 5) break; }"
//     //   ],
//     //   [
//     //     "continue",
//     //     "Takrorlashni davom ettirish",
//     //     "for (int i = 0; i < 10; i++) { if (i == 5) continue; Console.WriteLine(i); }",
//     //     "continue operatori siklni davom ettiradi va keyingi iteratsiyani o'tkazib yuboradi.",
//     //     "for (int i = 0; i < 10; i++) { if (i == 5) continue; Console.WriteLine(i); }"
//     //   ],
//     //   [
//     //     "return",
//     //     "Funktsiyani tugatish",
//     //     "return 0;",
//     //     "return operatori funktsiyani yakunlash va qiymat qaytarishga yordam beradi.",
//     //     "int func() { return 0; }"
//     //   ],
//     //   [
//     //     "int",
//     //     "Butun son turini e'lon qilish",
//     //     "int a = 5;",
//     //     "int tipi butun sonlarni saqlash uchun ishlatiladi.",
//     //     "int a = 5;"
//     //   ],
//     //   [
//     //     "string",
//     //     "Matn turini e'lon qilish",
//     //     "string name = \"John\";",
//     //     "string tipi matnlarni saqlash uchun ishlatiladi.",
//     //     "string name = \"John\";"
//     //   ],
//     //   [
//     //     "double",
//     //     "Kengaytirilgan o'nlik son turini e'lon qilish",
//     //     "double a = 5.6;",
//     //     "double tipi o'nlik sonlarni saqlash uchun ishlatiladi.",
//     //     "double a = 5.6;"
//     //   ],
//     //   [
//     //     "bool",
//     //     "Mantiqiy qiymatni e'lon qilish",
//     //     "bool isActive = true;",
//     //     "bool tipi mantiqiy qiymatlarni (true yoki false) saqlash uchun ishlatiladi.",
//     //     "bool isActive = true;"
//     //   ],
//     //   [
//     //     "new",
//     //     "Yangi obyekt yaratish",
//     //     "MyClass obj = new MyClass();",
//     //     "new operatori yordamida yangi obyekt yaratish mumkin.",
//     //     "MyClass obj = new MyClass();"
//     //   ],
//     //   [
//     //     "class",
//     //     "Sinf yaratish",
//     //     "class MyClass { public int x; }",
//     //     "class operatori yordamida yangi sinf yaratish mumkin.",
//     //     "class MyClass { public int x; }"
//     //   ],
//     //   [
//     //     "interface",
//     //     "Interfeys yaratish",
//     //     "interface IMyInterface { void MyMethod(); }",
//     //     "interface operatori yordamida interfeys yaratish mumkin.",
//     //     "interface IMyInterface { void MyMethod(); }"
//     //   ],
//     //   [
//     //     "enum",
//     //     "Enumeratsiya yaratish",
//     //     "enum MyEnum { Red, Green, Blue }",
//     //     "enum operatori yordamida qiymatlar to'plamini yaratish mumkin.",
//     //     "enum MyEnum { Red, Green, Blue }"
//     //   ],
//     //   [
//     //     "try-catch",
//     //     "Xatoliklarni ushlash",
//     //     "try { int a = 5 / 0; } catch (DivideByZeroException ex) { Console.WriteLine(ex.Message); }",
//     //     "try-catch bloklari yordamida xatoliklarni ushlab, ularni ishlashga imkon beradi.",
//     //     "try { int a = 5 / 0; } catch (DivideByZeroException ex) { Console.WriteLine(ex.Message); }"
//     //   ],
//     //   [
//     //     "throw",
//     //     "Xatolikni chiqarish",
//     //     "throw new Exception(\"Xatolik yuz berdi\");",
//     //     "throw operatori yordamida xatolikni tashlash mumkin.",
//     //     "throw new Exception(\"Xatolik yuz berdi\");"
//     //   ],
//     //   [
//     //     "using",
//     //     "Resurslarni boshqarish",
//     //     "using (var file = new StreamReader(\"file.txt\")) { }",
//     //     "using operatori resurslarni to'g'ri boshqarish uchun ishlatiladi.",
//     //     "using (var file = new StreamReader(\"file.txt\")) { }"
//     //   ],
//     //   [
//     //     "async",
//     //     "Asinxron metodlar yaratish",
//     //     "async Task MyMethod() { await Task.Delay(1000); }",
//     //     "async operatori yordamida asinxron metodlar yaratish mumkin.",
//     //     "async Task MyMethod() { await Task.Delay(1000); }"
//     //   ],
//     //   [
//     //     "await",
//     //     "Asinxron metodni kutish",
//     //     "await MyMethod();",
//     //     "await operatori yordamida asinxron metodni kutib, natijani olish mumkin.",
//     //     "await MyMethod();"
//     //   ],
//     //   [
//     //     "delegate",
//     //     "Delegat yaratish",
//     //     "delegate void MyDelegate();",
//     //     "delegate operatori yordamida metodga ishora qilish mumkin.",
//     //     "delegate void MyDelegate();"
//     //   ],
//     //   [
//     //     "event",
//     //     "Voqea yaratish",
//     //     "public event EventHandler MyEvent;",
//     //     "event operatori yordamida voqealarni yaratish mumkin.",
//     //     "public event EventHandler MyEvent;"
//     //   ] ,  [
//     //     "struct",
//     //     "Struktura yaratish",
//     //     "struct MyStruct { public int x; }",
//     //     "struct operatori yordamida yengil vaznli ma'lumot turlarini yaratish mumkin.",
//     //     "struct MyStruct { public int x; }"
//     //   ],
//     //   [
//     //     "record",
//     //     "Qayd yaratish",
//     //     "record MyRecord(int X, int Y);",
//     //     "record operatori yordamida o'zgarmas, immutable obyektlarni yaratish mumkin.",
//     //     "record MyRecord(int X, int Y);"
//     //   ],
//     //   [
//     //     "null",
//     //     "Hech qanday qiymatga ega emas",
//     //     "string? name = null;",
//     //     "null qiymati o'zgaruvchining hech qanday qiymatga ega emasligini bildiradi.",
//     //     "string? name = null;"
//     //   ],
//     //   [
//     //     "pattern matching",
//     //     "Namuna bo'yicha solishtirish",
//     //     "if (obj is string s) { Console.WriteLine(s); }",
//     //     "pattern matching operatori obyektlarni turiga ko'ra tekshirish va o'zgartirish imkonini beradi.",
//     //     "if (obj is string s) { Console.WriteLine(s); }"
//     //   ],
//     //   [
//     //     "LINQ",
//     //     "Ma'lumotlarni so'rash",
//     //     "var result = from n in numbers where n > 5 select n;",
//     //     "LINQ operatori yordamida kolleksiyalarni so'rash va ularga ishlov berish mumkin.",
//     //     "var result = from n in numbers where n > 5 select n;"
//     //   ],
//     //   [
//     //     "Task",
//     //     "Asinxron vazifalarni yaratish",
//     //     "Task.Run(() => Console.WriteLine(\"Hello Task\"));",
//     //     "Task operatori yordamida asinxron hisoblashlarni boshqarish va yaratish mumkin.",
//     //     "Task.Run(() => Console.WriteLine(\"Hello Task\"));"
//     //   ],
//     //   [
//     //     "Span<T>",
//     //     "Tezkor va xavfsiz xotira ishlovchi",
//     //     "Span<int> span = new int[5];",
//     //     "Span<T> turidan foydalangan holda tez va samarali xotira segmentlarini boshqarish mumkin.",
//     //     "Span<int> span = new int[5];"
//     //   ],
//     //   [
//     //     "Tuple",
//     //     "Bir nechta qiymatni bir vaqtning o'zida saqlash",
//     //     "var person = (Name: \"John\", Age: 30);",
//     //     "Tuple turidan foydalanib, bir nechta qiymatni bitta o'zgaruvchida saqlash mumkin.",
//     //     "var person = (Name: \"John\", Age: 30);"
//     //   ],
//     // ];

//     // const data = [
//     //   ["print", "Ekranga ma'lumot chiqarish", "print('Hello World!')", "print funksiyasi konsolga matn yoki o'zgaruvchilarni chiqarishga imkon beradi.", "print('Hello World!')"],
//     //   ["input", "Foydalanuvchidan ma'lumot kiritish", "user_input = input('Please enter something: ')", "input funksiyasi foydalanuvchidan ma'lumot olish uchun ishlatiladi.", "user_input = input('Please enter something: ')"],
//     //   ["if", "Shartli operator", "if x > 0: print('Positive')", "if operatori shart bajarilsa, ma'lum amal bajariladi.", "if x > 0: print('Positive')"],
//     //   ["else", "Shartni inkor qilish operatori", "if x > 0: print('Positive') else: print('Negative')", "else operatori agar if sharti bajarilmasa, ishlaydi.", "if x > 0: print('Positive') else: print('Negative')"],
//     //   ["for", "Takrorlash sikli", "for i in range(10): print(i)", "for operatori yordamida takrorlashni amalga oshirish mumkin.", "for i in range(10): print(i)"],
//     //   ["while", "Takrorlash sikli (shartli)", "while x < 10: print(x); x += 1", "while operatori shart bajarilguncha takrorlashni amalga oshiradi.", "while x < 10: print(x); x += 1"],
//     //   ["break", "Takrorlashdan chiqish", "for i in range(10): if i == 5: break", "break operatori siklni to'xtatishga imkon beradi.", "for i in range(10): if i == 5: break"],
//     //   ["continue", "Takrorlashni davom ettirish", "for i in range(10): if i == 5: continue; print(i)", "continue operatori siklni davom ettiradi va keyingi iteratsiyani o'tkazib yuboradi.", "for i in range(10): if i == 5: continue; print(i)"],
//     //   ["return", "Funktsiyani tugatish", "def my_function(): return 0", "return operatori funktsiyani yakunlash va qiymat qaytarishga yordam beradi.", "def my_function(): return 0"],
//     //   ["int", "Butun son turini e'lon qilish", "x = 5", "int tipi butun sonlarni saqlash uchun ishlatiladi.", "x = 5"],
//     //   ["str", "Matn turini e'lon qilish", "name = 'John'", "str tipi matnlarni saqlash uchun ishlatiladi.", "name = 'John'"],
//     //   ["float", "O'nlik son turini e'lon qilish", "x = 5.6", "float tipi o'nlik sonlarni saqlash uchun ishlatiladi.", "x = 5.6"],
//     //   ["bool", "Mantiqiy qiymatni e'lon qilish", "is_active = True", "bool tipi mantiqiy qiymatlarni (True yoki False) saqlash uchun ishlatiladi.", "is_active = True"],
//     //   ["class", "Sinf yaratish", "class MyClass: pass", "class operatori yordamida yangi sinf yaratish mumkin.", "class MyClass: pass"],
//     //   ["def", "Funksiya yaratish", "def my_function(): pass", "def operatori yordamida yangi funksiya yaratish mumkin.", "def my_function(): pass"],
//     //   ["try-except", "Xatoliklarni ushlash", "try: a = 5 / 0 except ZeroDivisionError: print('Division by zero!')", "try-except bloklari yordamida xatoliklarni ushlab, ularni ishlashga imkon beradi.", "try: a = 5 / 0 except ZeroDivisionError: print('Division by zero!')"],
//     //   ["raise", "Xatolikni chiqarish", "raise Exception('Error occurred!')", "raise operatori yordamida xatolikni tashlash mumkin.", "raise Exception('Error occurred!')"],
//     //   ["with", "Resurslarni boshqarish", "with open('file.txt', 'r') as file: pass", "with operatori resurslarni to'g'ri boshqarish uchun ishlatiladi.", "with open('file.txt', 'r') as file: pass"],
//     //   ["lambda", "Anonim funksiya yaratish", "square = lambda x: x ** 2", "lambda operatori yordamida anonim funksiya yaratish mumkin.", "square = lambda x: x ** 2"],
//     //   ["map", "Funksiyani kolleksiya elementlariga qo'llash", "result = map(lambda x: x ** 2, [1, 2, 3])", "map funksiyasi yordamida biror funksiyani kolleksiya elementlariga qo'llash mumkin.", "result = map(lambda x: x ** 2, [1, 2, 3])"],
//     //   ["filter", "Shartga asoslangan elementlarni tanlash", "result = filter(lambda x: x > 5, [1, 6, 3, 7])", "filter funksiyasi yordamida shartga mos keluvchi elementlarni tanlash mumkin.", "result = filter(lambda x: x > 5, [1, 6, 3, 7])"],
//     //   ["list", "Ro'yxat yaratish", "my_list = [1, 2, 3]", "list tipi o'zgaruvchilarni saqlash uchun ishlatiladi.", "my_list = [1, 2, 3]"],
//     //   ["Modules", "Modullarni import qilish", "import math", "import math va sys kabi modullarni import qilish orqali qo'shimcha funksiyalarni ishlatish mumkin.", "import math"],
//     //   ["Exceptions", "Xatoliklarni boshqarish", "try: x = 5 / 0 except ZeroDivisionError: print('Division by zero!')", "Xatoliklarni ushlash uchun try-except bloklari ishlatiladi.", "try: x = 5 / 0 except ZeroDivisionError: print('Division by zero!')"],
//     //   ["File Handling", "Fayllar bilan ishlash", "with open('file.txt', 'r') as file: content = file.read()", "Fayllarni ochish, o'qish, yozish va yopish uchun open, read, write, close ishlatiladi.", "with open('file.txt', 'r') as file: content = file.read()"],
//     //   ["Comprehensions", "List, Set, va Dictionary Comprehensions", "squares = [x ** 2 for x in range(5)]", "List, set, yoki dictionary comprehensions yordamida qisqacha va samarali tarzda ma'lumotlar yaratish mumkin.", "squares = [x ** 2 for x in range(5)]"],
//     //   ["Decorators", "Funksiyalarni bezash", "@my_decorator\ndef my_function(): pass", "Decorators yordamida funksiyalarni bezash va ularning xatti-harakatlarini o'zgartirish mumkin.", "@my_decorator\ndef my_function(): pass"],
//     //   ["Generators", "Generatorlar va yield", "def my_generator(): yield 1; yield 2", "Generators yordamida qatorlarni yaratish va yield bilan qiymatlar qaytarish mumkin.", "def my_generator(): yield 1; yield 2"],
//     //   ["Asyncio", "Asinxron dasturlash", "async def my_function(): await something()", "Asyncio yordamida asinxron funksiyalar va await operatorini ishlatish mumkin.", "async def my_function(): await something()"],
//     //   ["Inheritance", "Meros olish", "class MyClass: pass\nclass MySubClass(MyClass): pass", "Inheritance yordamida sinflar orasida xususiyatlarni va metodlarni meros qilib olish mumkin.", "class MyClass: pass\nclass MySubClass(MyClass): pass"],
//     //   ["Polymorphism", "Polimorfizm", "class Animal: def speak(self): pass\nclass Dog(Animal): def speak(self): print('Bark!')", "Polimorfizm yordamida bir xil interfeys orqali turli xil turlarni qo'llash mumkin.", "class Animal: def speak(self): pass\nclass Dog(Animal): def speak(self): print('Bark!')"]
//     // ]

//     const data = [
//       // O'zgaruvchilar va operatorlar
//       ["var", "O'zgaruvchi e'lon qilish", "var x = 5;", "var yordamida o'zgaruvchi e'lon qilinadi, lekin bu global yoki funksiya doirasida ishlaydi."],
//       ["let", "O'zgaruvchi e'lon qilish (blok doirasida)", "let y = 10;", "let yordamida blok doirasida o'zgaruvchi e'lon qilish mumkin."],
//       ["const", "Doimiy o'zgaruvchi e'lon qilish", "const z = 15;", "const yordamida o'zgarmas qiymatga ega bo'lgan o'zgaruvchi e'lon qilish mumkin."],
//       ["if", "Shartli operator", "if (x > 0) { console.log('Positive'); }", "if operatori shart bajarilsa, belgilangan amal bajariladi."],
//       ["else", "Shartni inkor qilish operatori", "if (x > 0) { console.log('Positive'); } else { console.log('Negative'); }", "else operatori shart bajarilmasa ishlaydi."],
//       ["else if", "Qo'shimcha shartli operator", "if (x > 0) { console.log('Positive'); } else if (x == 0) { console.log('Zero'); } else { console.log('Negative'); }", "else if operatori qo'shimcha shartlarni tekshiradi."],
//       ["switch", "Ko'plab shartlarni tekshirish operatori", "switch (x) { case 1: console.log('One'); break; case 2: console.log('Two'); break; default: console.log('Other'); }", "switch operatori bir nechta holatni tekshiradi."],
//       ["for", "Takrorlash sikli", "for (let i = 0; i < 10; i++) { console.log(i); }", "for sikli yordamida takrorlashni amalga oshirish mumkin."],
//       ["while", "Takrorlash sikli (shartli)", "while (x < 10) { console.log(x); x++; }", "while sikli shart bajarilguncha amalni takrorlaydi."],
//       ["do-while", "Takrorlash sikli (kamida bitta takrorlash)", "do { console.log(x); x++; } while (x < 10);", "do-while sikli kamida bitta amalni bajaradi, so'ngra shartni tekshiradi."],
//       ["break", "Takrorlashdan chiqish", "for (let i = 0; i < 10; i++) { if (i === 5) break; }", "break operatori siklni yoki switch blokini to'xtatadi."],
//       ["continue", "Takrorlashni davom ettirish", "for (let i = 0; i < 10; i++) { if (i === 5) continue; console.log(i); }", "continue operatori siklni davom ettiradi va keyingi iteratsiyani o'tkazib yuboradi."],
//       ["return", "Funktsiyani yakunlash", "return 0;", "return operatori funktsiyani tugatib, qiymat qaytaradi."],
//       ["function", "Funksiya yaratish", "function greet() { console.log('Hello'); }", "function yordamida funksiya e'lon qilinadi."],
//       ["arrow function", "Yorliq uslubidagi funksiya", "const add = (a, b) => a + b;", "Arrow function sintaksisi yordamida qisqaroq funksiya yaratish mumkin."],
//       ["call", "Funksiyani chaqirish", "greet.call(this);", "call metodi yordamida funktsiyalarni chaqirish mumkin."],
//       ["apply", "Funksiyani parametrlar bilan chaqirish", "greet.apply(this, [a, b]);", "apply metodi yordamida funktsiyani parametrlar bilan chaqirish mumkin."],
//       ["bind", "Funksiyaga kontekstni belgilash", "const boundFunc = greet.bind(obj);", "bind metodi yordamida funksiya kontekstini o'rnatish mumkin."],

//       // Obyektlar va massivlar bilan ishlash
//       ["new", "Yangi obyekt yaratish", "const obj = new Object();", "new operatori yordamida yangi obyekt yaratish mumkin."],
//       ["Object", "Obyekt yaratish", "const obj = { key: 'value' };", "Object yordamida yangi obyekt yaratish mumkin."],
//       ["keys", "Obyektning kalitlarini olish", "const keys = Object.keys(obj);", "keys metodi obyektning barcha kalitlarini olish imkonini beradi."],
//       ["values", "Obyektning qiymatlarini olish", "const values = Object.values(obj);", "values metodi obyektning barcha qiymatlarini olish imkonini beradi."],
//       ["entries", "Obyektning kalit-qiymat juftliklarini olish", "const entries = Object.entries(obj);", "entries metodi obyektning barcha kalit-qiymat juftliklarini olish imkonini beradi."],
//       ["assign", "Obyektlarni birlashtirish", "const obj2 = Object.assign({}, obj, { key2: 'value2' });", "assign metodi yordamida obyektlarni birlashtirish mumkin."],
//       ["map", "Massivdagi elementlarga funksiya qo'llash", "const result = arr.map(x => x * 2);", "map metodi massivning har bir elementiga funksiya qo'llash imkonini beradi."],
//       ["filter", "Shartga asoslangan elementlarni tanlash", "const result = arr.filter(x => x > 5);", "filter metodi yordamida massivdan shartga mos elementlar tanlanadi."],
//       ["reduce", "Massivni yig'ish", "const sum = arr.reduce((acc, x) => acc + x, 0);", "reduce metodi yordamida massivning barcha elementlarini yig'ish mumkin."],
//       ["forEach", "Massivdagi har bir elementni ishlash", "arr.forEach(x => console.log(x));", "forEach metodi yordamida massivdagi har bir elementni ishlash mumkin."],
//       ["some", "Massivdagi shartni tekshirish", "const result = arr.some(x => x > 10);", "some metodi massivda kamida bitta element shartga mos kelishini tekshiradi."],
//       ["every", "Massivdagi barcha elementlarni tekshirish", "const result = arr.every(x => x > 0);", "every metodi massivdagi barcha elementlar shartga mos kelishini tekshiradi."],
//       ["sort", "Massivni tartiblash", "arr.sort((a, b) => a - b);", "sort metodi yordamida massivni tartiblash mumkin."],
//       ["push", "Massivga element qo'shish", "arr.push(5);", "push metodi yordamida massivga yangi element qo'shiladi."],
//       ["pop", "Massivdan oxirgi elementni olib tashlash", "arr.pop();", "pop metodi yordamida massivdan oxirgi element olib tashlanadi."],
//       ["shift", "Massivdan birinchi elementni olib tashlash", "arr.shift();", "shift metodi massivdan birinchi elementni olib tashlaydi."],
//       ["unshift", "Massivga birinchi elementni qo'shish", "arr.unshift(1);", "unshift metodi massivning boshiga element qo'shadi."],
//       ["concat", "Massivlarni birlashtirish", "const newArr = arr1.concat(arr2);", "concat metodi yordamida ikki yoki undan ortiq massivlarni birlashtirish mumkin."],
//       ["join", "Massivni stringga aylantirish", "const str = arr.join(',');", "join metodi massivni stringga aylantiradi."],
//       ["slice", "Massivning qismidan nusxa olish", "const newArr = arr.slice(1, 3);", "slice metodi yordamida massivdan ma'lum qismini nusxalash mumkin."],
//       ["splice", "Massivni o'zgartirish", "arr.splice(2, 1, 5);", "splice metodi massivda elementlarni o'zgartiradi yoki olib tashlaydi."],
//       ["includes", "Massivda element mavjudligini tekshirish", "const result = arr.includes(5);", "includes metodi massivda element mavjudligini tekshiradi."],
//       ["indexOf", "Massivda elementning indeksini topish", "const index = arr.indexOf(5);", "indexOf metodi massivda elementning indeksini topadi."],

//       // Boshqa yordamchi metodlar
//       ["JSON.stringify", "JSON formatida stringga aylantirish", "JSON.stringify(obj);", "JSON.stringify yordamida obyektni JSON formatiga aylantirish mumkin."],
//       ["JSON.parse", "JSON stringini obyektga aylantirish", "JSON.parse('{'key': 'value}');", "JSON.parse yordamida JSON formatidagi stringni obyektga aylantirishingiz mumkin."],
//       ["setTimeout", "Vaqt o‘tganidan keyin amal bajarish", "setTimeout(() => { console.log('Hello'); }, 1000);", "setTimeout yordamida ma'lum vaqt o‘tganidan keyin amal bajariladi."],
//       ["setInterval", "Vaqti-vaqti bilan amal bajarish", "setInterval(() => { console.log('Hello'); }, 1000);", "setInterval yordamida ma'lum vaqt oralig'ida amal bajariladi."],

//       // Asenkron dasturlash
//       ["async", "Asenkron funktsiya e'lon qilish", "async function fetchData() { const response = await fetch(url); }", "async yordamida asenkron funktsiya yaratish mumkin."],
//       ["await", "Asenkron operatsiyani kutish", "const data = await fetch(url);", "await yordamida asenkron operatsiyaning yakunlanishini kutish mumkin."],
//       ["Promise", "Asenkron operatsiyalarni boshqarish", "const promise = new Promise((resolve, reject) => { resolve('Success'); });", "Promise yordamida asenkron operatsiyalarni boshqarish mumkin."],
//       ["then", "Promise'dan qiymat olish", "promise.then(result => console.log(result));", "then yordamida Promise'dan qiymat olish mumkin."],
//       ["catch", "Promise'da xatoliklarni ushlash", "promise.catch(error => console.log(error));", "catch yordamida Promise'dagi xatoliklarni ushlash mumkin."],

//       // Yangi qo'shilgan mavzular
//       ["DOM manipulation", "DOM bilan ishlash", "document.getElementById('myElement').innerText = 'Hello';", "DOM manipulyatsiyasi yordamida sahifadagi elementlarni o'zgartirish mumkin."],
//       ["Event Handling", "Voqealarni boshqarish", "document.getElementById('myButton').addEventListener('click', function() { console.log('Button clicked'); });", "Event Handling yordamida foydalanuvchi bilan interaktivlik yaratish mumkin."],
//       ["ES6+", "ES6+ xususiyatlari", "const obj = { name: 'John', greet() { console.log('Hello'); } };", "ES6+ yordamida yangi sintaksis va imkoniyatlardan foydalanish mumkin."],
//       ["Modules", "Modullar va import/export", "import { myFunction } from './myModule';", "Modul yordamida kodni ajratish va import/export orqali ishlatish mumkin."]
//     ];

//     // const data = [
//     //   [
//     //     "cin",
//     //     "Konsolga ma'lumot kiritish",
//     //     "cin >> a;",
//     //     "Bu operator yordamida foydalanuvchidan qiymat kiritiladi va o'zgaruvchiga saqlanadi.",
//     //     "int a; cin >> a;"
//     //   ],
//     //   [
//     //     "cout",
//     //     "Konsolga ma'lumot chiqarish",
//     //     "cout << \"Hello World!\";",
//     //     "cout yordamida konsolga chiqarish amalga oshiriladi.",
//     //     "cout << \"Hello World!\";"
//     //   ],
//     //   [
//     //     "if",
//     //     "Shartli operator",
//     //     "if (x > 0) { cout << \"Positive\"; }",
//     //     "Agar x musbat bo'lsa, shart bajariladi va \"Positive\" chiqariladi.",
//     //     "if (x > 0) { cout << \"Positive\"; }"
//     //   ],
//     //   [
//     //     "else",
//     //     "Shartni inkor qilish operatori",
//     //     "if (x > 0) { cout << \"Positive\"; } else { cout << \"Non-positive\"; }",
//     //     "Agar x manfiy yoki nol bo'lsa, else bo'limi bajariladi.",
//     //     "if (x > 0) { cout << \"Positive\"; } else { cout << \"Non-positive\"; }"
//     //   ],
//     //   [
//     //     "switch",
//     //     "Ko'plab shartlarni tekshirish operatori",
//     //     "switch (x) { case 1: cout << \"One\"; break; default: cout << \"Other\"; }",
//     //     "switch operatori bir nechta shartlarni tekshirish va ularning mos kelishiga qarab chiqish imkonini beradi.",
//     //     "switch (x) { case 1: cout << \"One\"; break; default: cout << \"Other\"; }"
//     //   ],
//     //   [
//     //     "for",
//     //     "Takrorlash sikli",
//     //     "for (int i = 0; i < 10; i++) { cout << i; }",
//     //     "for sikli yordamida ma'lum bir amalni ko'plab marta takrorlash mumkin.",
//     //     "for (int i = 0; i < 10; i++) { cout << i; }"
//     //   ],
//     //   [
//     //     "while",
//     //     "Takrorlash sikli (shartli)",
//     //     "while (x < 10) { cout << x; x++; }",
//     //     "while sikli shart to'g'ri bo'lgunga qadar amalni takrorlaydi.",
//     //     "while (x < 10) { cout << x; x++; }"
//     //   ],
//     //   [
//     //     "do-while",
//     //     "Takrorlash sikli (kamida bitta takrorlash)",
//     //     "do { cout << x; x++; } while (x < 10);",
//     //     "do-while sikli kamida bir marta amal bajaradi, so'ngra shartni tekshiradi.",
//     //     "do { cout << x; x++; } while (x < 10);"
//     //   ],
//     //   [
//     //     "break",
//     //     "Takrorlashdan chiqish",
//     //     "for (int i = 0; i < 10; i++) { if (i == 5) break; }",
//     //     "break operatori siklni yoki switch operatorini tugatishga imkon beradi.",
//     //     "for (int i = 0; i < 10; i++) { if (i == 5) break; }"
//     //   ],
//     //   [
//     //     "continue",
//     //     "Takrorlashni davom ettirish",
//     //     "for (int i = 0; i < 10; i++) { if (i == 5) continue; cout << i; }",
//     //     "continue operatori siklni davom ettirishni ta'minlaydi, ammo keyingi iteratsiyani o'tkazib yuboradi.",
//     //     "for (int i = 0; i < 10; i++) { if (i == 5) continue; cout << i; }"
//     //   ],
//     //   [
//     //     "return",
//     //     "Funktsiyani tugatish",
//     //     "return 0;",
//     //     "return operatori yordamida funktsiya natijasini qaytarish mumkin.",
//     //     "int example() { return 0; }"
//     //   ],
//     //   [
//     //     "int",
//     //     "Butun son turini e'lon qilish",
//     //     "int a = 5;",
//     //     "int tipi butun sonlarni saqlash uchun ishlatiladi.",
//     //     "int a = 5;"
//     //   ],
//     //   [
//     //     "float",
//     //     "O'nlik son turini e'lon qilish",
//     //     "float a = 5.6;",
//     //     "float tipi o'nlik sonlarni saqlash uchun ishlatiladi.",
//     //     "float a = 5.6;"
//     //   ],
//     //   [
//     //     "char",
//     //     "Belgi turini e'lon qilish",
//     //     "char a = 'A';",
//     //     "char tipi bitta belgini saqlash uchun ishlatiladi.",
//     //     "char a = 'A';"
//     //   ],
//     //   [
//     //     "string",
//     //     "Matn turini e'lon qilish",
//     //     "string s = \"Hello\";",
//     //     "string tipi matnlarni saqlash uchun ishlatiladi.",
//     //     "string s = \"Hello\";"
//     //   ],
//     //   [
//     //     "const",
//     //     "O'zgarmas o'zgaruvchi e'lon qilish",
//     //     "const int a = 5;",
//     //     "const o'zgaruvchisi yaratishda qiymatni o'zgartirib bo'lmaydigan o'zgaruvchi yaratish mumkin.",
//     //     "const int a = 5;"
//     //   ],
//     //   [
//     //     "sizeof",
//     //     "O'zgaruvchining hajmini olish",
//     //     "cout << sizeof(a);",
//     //     "sizeof operatori yordamida o'zgaruvchining yoki turining xotirada qancha joy egallashini bilish mumkin.",
//     //     "cout << sizeof(a);"
//     //   ],
//     //   [
//     //     "new",
//     //     "Dinamiktik xotiraga joy ajratish",
//     //     "int* ptr = new int;",
//     //     "new operatori xotirada yangi joy ajratadi.",
//     //     "int* ptr = new int;"
//     //   ],
//     //   [
//     //     "delete",
//     //     "Dinamiktik xotiradan joyni ozod qilish",
//     //     "delete ptr;",
//     //     "delete operatori orqali dinamik ajratilgan xotirani ozod qilish mumkin.",
//     //     "delete ptr;"
//     //   ],
//     //   [
//     //     "class",
//     //     "Sinf yaratish",
//     //     "class MyClass { public: int x; };",
//     //     "class operatori yordamida yangi sinf yaratish mumkin.",
//     //     "class MyClass { public: int x; };"
//     //   ],
//     //   [
//     //     "public",
//     //     "Jamoatdagi xususiyat yoki metodni belgilash",
//     //     "class MyClass { public: int x; };",
//     //     "public operatori sinf xususiyatlarini va metodlarini ochiq qiladi.",
//     //     "class MyClass { public: int x; };"
//     //   ],
//     //   [
//     //     "private",
//     //     "Maxfiy xususiyat yoki metodni belgilash",
//     //     "class MyClass { private: int x; };",
//     //     "private operatori sinf xususiyatlarini va metodlarini faqat sinf ichidan kirish imkonini beradi.",
//     //     "class MyClass { private: int x; };"
//     //   ],
//     //   [
//     //     "protected",
//     //     "Himoyalangan xususiyat yoki metodni belgilash",
//     //     "class MyClass { protected: int x; };",
//     //     "protected operatori sinf ichida yoki undan meros olgan sinflarda foydalanish imkonini beradi.",
//     //     "class MyClass { protected: int x; };"
//     //   ],
//     //   [
//     //     "virtual",
//     //     "Merosi sinfda o'zgartirilgan metodni belgilash",
//     //     "virtual void func() { cout << \"Hello\"; }",
//     //     "virtual operatori metodni meros olishda o'zgartirish imkonini beradi.",
//     //     "class Base { public: virtual void display() = 0; };"
//     //   ],
//     //   [
//     //     "override",
//     //     "Metodni merosdan o'zgartirish",
//     //     "void func() override { cout << \"Hello\"; }",
//     //     "override operatori yordamida virtual metodni sinfda o'zgartirish mumkin.",
//     //     "void func() override { cout << \"Hello\"; }"
//     //   ],
//     //   [
//     //     "friend",
//     //     "Do'st sinf yoki funksiya yaratish",
//     //     "friend class MyClass;",
//     //     "friend operatori sinf yoki funksiyani boshqa sinf ichidan foydalanishiga imkon beradi.",
//     //     "friend class MyClass;"
//     //   ],
//     //   [
//     //     "static",
//     //     "Statik xususiyat yoki metodni yaratish",
//     //     "static int count = 0;",
//     //     "static operatori yordamida sinf darajasida o'zgaruvchilarni yaratish mumkin.",
//     //     "static int count = 0;"
//     //   ],
//     //   [
//     //     "namespace",
//     //     "Xalqaro nomlar maydonini yaratish",
//     //     "namespace MyNamespace { int x = 5; }",
//     //     "namespace operatori yordamida nomlar maydoni yaratilib, nomlar to'qnashuvining oldini oladi.",
//     //     "namespace MyNamespace { int x = 5; }"
//     //   ],
//     //   [
//     //     "template",
//     //     "Generik funktsiyalar yoki sinflar yaratish",
//     //     "template <typename T> void func(T a) { cout << a; }",
//     //     "template operatori yordamida umumiy sinf yoki funktsiya yaratish mumkin.",
//     //     "template <typename T> void func(T a) { cout << a; }"
//     //   ],
//     //   [
//     //     "try-catch",
//     //     "Xatolikni ushlash mexanizmi",
//     //     "try { throw 10; } catch (int e) { cout << e; }",
//     //     "try-catch bloklari yordamida xatoliklarni ushlab, ular bilan ishlash mumkin.",
//     //     "try { throw 10; } catch (int e) { cout << e; }"
//     //   ],
//     //   [
//     //     "throw",
//     //     "Xatolikni tashlash",
//     //     "throw 10;",
//     //     "throw operatori yordamida istalgan xatolikni tashlash mumkin.",
//     //     "throw 10;"
//     //   ]
//     // ]

//     const headers = ['Method', 'Description', 'Code', 'info', 'Misol'];

//     // Jadvalni yaratish
//     autoTable(doc, {
//       startY: 30, // Jadvalni 30px pastdan boshlash
//       head: [headers], // Sarlavhalar
//       body: data.slice(1), // Jadval ma'lumotlari
//       theme: 'striped', // Jadvalning tasvirini belgilash
//       bodyStyles: {
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0],
//         textColor: [0, 0, 0],
//         fillColor: '#FFF',
//       },
//       headStyles: {
//         fillColor: '#395cf8',
//         textColor: [255, 255, 255],
//         fontSize: 12,
//         halign: 'center',
//       },
//       tableId: '#FFF',
//       tableLineColor: [0, 0, 0],
//       tableLineWidth: 0.1,
//     });

//     // PDFni yuklash
//     doc.save('aarch64_instructions.pdf');
//   };

//   return (
//     <div>
//       <button onClick={handleDownload}>PDF yuklash</button>
//     </div>
//   );
// };

// export default PdfGenerator;
