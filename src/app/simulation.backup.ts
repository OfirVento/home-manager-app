export async function simulateAgentResponse(input: string) {
    // Delay to mimic network
    await new Promise(r => setTimeout(r, 600));

    // Normalize
    const txt = input.toLowerCase();

    // 1. Initial / Cleaner Request
    if (txt.includes('מנקה') || txt.includes('ניקיון') || txt.includes('cleaning')) {
        return {
            assistant_message: 'מתי אתם צריכים את הניקיון? (דוגמה: מחר בבוקר, יום חמישי, בהקדם)',
            quick_replies: ['מחר בבוקר', 'יום חמישי 09:00', 'בהקדם האפשרי']
        };
    }

    // 2. Date Selection -> Show Cards
    if (txt.includes('מחר') || txt.includes('חמישי') || txt.includes('בהקדם') || txt.includes('09:00')) {
        return {
            assistant_message: `מצאתי 3 אפשרויות טובות. תגיד לי מה דעתך:`,
            cards: [
                {
                    type: 'worker',
                    title: 'מריה ל.',
                    experience: '7 שנות ניסיון | בתים פרטיים',
                    strengths: ['ניקיון יסודי ושקט', 'נשארת עד שהכול גמור, גם אם צריך יותר זמן'],
                    price: '80 ₪ לשעה',
                    availability: 'זמינות: מחר 08:00–11:00',
                    verification_text: 'ת"ז + כתובת מאומתת, אמינות: 0 ביטולים ב־60 יום',
                    local_proof_text: '👥 עבד עם 15 אנשים באזור שלך',
                    external_ratings: ['⭐️ מידרג: 4.6 (14) | המקצוענים: 4.5 (9)'],
                    recommendation_quote: "תמיד מוצא איך להסתדר, גם בהתראה קצרה.",
                    recommendation_author: "זאב, נתניה",
                    buttons: [
                        { label: 'לבחור את מריה', action: 'select_maria', style: 'primary' },
                        { label: 'לא מתאים', action: 'dismiss_maria' }
                    ]
                },
                {
                    type: 'worker',
                    title: 'אלכס מ.',
                    experience: '5 שנות ניסיון',
                    strengths: ['זמינות גבוהה והתאמה מהירה לשינויים', 'עובד בקצב טוב ושומר על סדר תוך כדי'],
                    price: '80 ₪ לשעה',
                    availability: 'זמינות: מחר 11:00–14:00',
                    verification_text: 'ת"ז + כתובת מאומתת, אמינות: 0 ביטולים ב־60 יום',
                    local_proof_text: '👥 עבד עם 12 אנשים באזור שלך',
                    external_ratings: ['⭐️ מידרג: 4.8 (20) | המקצוענים: 4.7 (10)'],
                    recommendation_quote: "עובד יסודי, מגיע בזמן.",
                    recommendation_author: "רותם, רעננה",
                    buttons: [
                        { label: 'לבחור את אלכס', action: 'select_alex', style: 'primary' },
                        { label: 'לא מתאים', action: 'dismiss_alex' }
                    ]
                }
            ],
            quick_replies: ['עוד אופציות', 'לשנות זמן']
        };
    }

    // 3. Selection
    if (txt.includes('select') || txt.includes('לבחור') || txt.includes('בחרתי')) {
        const name = txt.includes('maria') || txt.includes('מריה') ? 'מריה' : 'אלכס';
        return {
            assistant_message: `מעולה! אני סוגר לך את ${name}. \n\nמסכם את ההעדפות שלך לפני יצירת קשר:`,
            quick_replies: ['מאשר, צור קשר', 'לערוך העדפות']
        };
    }

    // 4. Confirmation
    if (txt.includes('מאשר') || txt.includes('confirm')) {
        return {
            assistant_message: 'בוצע! 🎉 \nשלחתי את הפרטים לנותן השירות, אעדכן אותך ברגע שיהיה אישור סופי.',
            quick_replies: ['תודה!', 'חזרה לתפריט ראשי']
        };
    }

    // Default Fallback
    return {
        assistant_message: 'אני כאן כדי לעזור לך למצוא עובדי בית. נסה לכתוב "אני צריך מנקה" או "אינסטלטור".',
        quick_replies: ['לקבוע ניקיון', 'אינסטלטור']
    };
}
