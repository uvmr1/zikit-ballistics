# ZIKIT BALLISTICS

אפליקציית לימוד סטיות בליסטיות לפי נשק וכוונת. הנתונים נטענים מקובץ מקומי תחת `src/data` בזמן ריצה.

## התקנה

```powershell
npm install
```

## פיתוח

```powershell
npm run dev
```

## בנייה

```powershell
npm run build
```

## בדיקת גרסת פרודקשן מקומית

```powershell
npm run preview
```

## עדכון נתונים מהאקסל

אחרי עדכון `ballistics_table.xlsx`, מריצים:

```powershell
C:\Users\yuvva\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe scripts\convert_ballistics_from_excel.py
```
