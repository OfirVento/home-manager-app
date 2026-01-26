export async function simulateAgentResponse(input: string) {
    // Delay to mimic network
    await new Promise(r => setTimeout(r, 600));

    const txt = input.toLowerCase();

    // 1. Initial / Cleaner Request
    if (txt.includes('מנקה') || txt.includes('ניקיון') || txt.includes('cleaning')) {
        return {
            assistant_message: 'מתי אתם צריכים את הניקיון? (דוגמה: מחר בבוקר, יום חמישי, בהקדם)',
            quick_replies: ['מחר בבוקר', 'יום חמישי 09:00', 'בהקדם האפשרי']
        };
    }

    // 2. Date Selection -> Show Workers (Maria, Olga, Alex)
    if (txt.includes('מחר') || txt.includes('חמישי') || txt.includes('בהקדם') || txt.includes('09:00')) {
        return {
            assistant_message: `מצאתי 3 אפשרויות טובות. תגיד לי מה דעתך:`,
            cards: [
                {
                    type: 'worker',
                    title: 'מריה ל.',
                    experience: '7 שנות ניסיון | בתים פרטיים',
                    strengths: ['יסודית ושקטה', 'נשארת עד שהכול גמור'],
                    price: '75 ₪ לשעה',
                    availability: 'זמינות: חמישי 09:00',
                    verification_text: 'ת"ז + כתובת מאומתת, אמינות: 0 ביטולים ב־60 יום',
                    local_proof_text: '👥 עבד עם 12 אנשים באזור שלך',
                    external_ratings: ['⭐️ מידרג: 4.9 (14)'],
                    recommendation_quote: "לא הולכת לפני שהכל נקי.",
                    recommendation_author: "נועה",
                    buttons: [
                        { label: 'לבחור את מריה', action: 'select_maria', style: 'primary' },
                        { label: 'לא מתאים', action: 'dismiss_maria' }
                    ]
                },
                {
                    type: 'worker',
                    title: 'אולגה ק.',
                    experience: '10 שנות ניסיון',
                    strengths: ['ניקיונות גדולים', 'בלי קיצורי דרך'],
                    price: '70 ₪ לשעה',
                    availability: 'זמינות: חמישי 10:00',
                    verification_text: 'מאומתת',
                    local_proof_text: '👥 עבדה ב-8 בתים',
                    external_ratings: ['⭐️ מידרג: 4.7'],
                    recommendation_quote: "לניקיון רציני.",
                    recommendation_author: "רותם",
                    buttons: [
                        { label: 'לבחור את אולגה', action: 'select_olga', style: 'primary' },
                        { label: 'לא מתאים', action: 'dismiss_olga' }
                    ]
                },
                {
                    type: 'worker',
                    title: 'אלכס מ.',
                    experience: '5 שנות ניסיון',
                    strengths: ['זמינות גבוהה', 'יעיל'],
                    price: '80 ₪ לשעה',
                    availability: 'זמינות: מחר 08:00',
                    verification_text: 'מאומת',
                    local_proof_text: '👥 עבד עם 15 אנשים',
                    external_ratings: ['⭐️ מידרג: 4.6'],
                    recommendation_quote: "מסתדר תמיד.",
                    recommendation_author: "יואב",
                    buttons: [
                        { label: 'לבחור את אלכס', action: 'select_alex', style: 'primary' },
                        { label: 'לא מתאים', action: 'dismiss_alex' }
                    ]
                }
            ],
            quick_replies: ['עוד אופציות', 'לשנות זמן']
        };
    }

    // 3. Selection -> AUTOMATIC FLOW (Summary + Contact + Cards)
    if (txt.includes('select') || txt.includes('לבחור') || txt.includes('בחרתי')) {
        let name = 'מריה ל.';
        let price = '75 ₪';
        if (txt.includes('alex') || txt.includes('אלכס')) { name = 'אלכס מ.'; price = '80 ₪'; }
        if (txt.includes('olga') || txt.includes('אולגה')) { name = 'אולגה ק.'; price = '70 ₪'; }

        return {
            assistant_message: `מעולה! אני סוגר לך את ${name}..

מסכם את ההעדפות שלך לפני יצירת קשר:
מחפש ניקיון
מבקש להגיע "יום חמישי 09:00"
ומעוניין ליצור קשר עם ${name}

יוצר קשר עם ${name}...
אעדכן בדקות הקרובות ⏳`,
            quick_replies: ['מאשר', 'מעוניין לעדכן'],
            cards: [
                {
                    type: 'worker',
                    title: `יוצר קשר עם ${name}`,
                    image_url: 'https://cdn-icons-png.flaticon.com/512/3686/3686930.png',
                    experience: 'יוצר קשר...',
                    strengths: ['ממתין לאישור...'],
                    price: 'בעבודה ⏳',
                    availability: 'מיד',
                    buttons: []
                },
                {
                    type: 'worker',
                    title: 'התקבל אישור! 🎉',
                    image_url: 'https://cdn-icons-png.flaticon.com/512/148/148767.png',
                    experience: 'ההזמנה אושרה סופית',
                    strengths: [`הגעה: יום חמישי 09:00`, `כתובת: רוטשילד 62`, `מחיר: ${price} לשעה`],
                    price: 'אושר ✅',
                    availability: 'חמישי 09:00',
                    buttons: []
                },
                {
                    type: 'worker',
                    title: 'תזכורת למחר ⏰',
                    image_url: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
                    experience: 'תזכורת מערכת',
                    strengths: [`תזכורת הגעה: יום חמישי 09:00`, 'קאפיש?'],
                    price: 'ללא עלות',
                    availability: 'מחר',
                    buttons: [{ label: 'מאשר', action: 'confirm_reminder' }, { label: 'מעוניין לעדכן', action: 'update_reminder' }]
                }
            ]
        };
    }

    // 4. Final Confirmation (Yalla)
    if (txt.includes('confirm') || txt.includes('מאשר')) {
        return {
            assistant_message: "נתראה! 👋",
            cards: [
                {
                    type: 'worker',
                    title: `יאללה לעבודה!`,
                    image_url: 'https://cdn-icons-png.flaticon.com/512/3072/3072480.png',
                    experience: '✨ זמן לקסמים ✨',
                    strengths: ['תתחילי לנקות הבית מבולגן', '3 ילדים, אוכל על הרצפה'],
                    price: 'בהצלחה! 💪',
                    availability: 'עכשיו',
                    buttons: []
                }
            ],
            quick_replies: []
        };
    }

    // Default Fallback
    return {
        assistant_message: 'אני כאן כדי לעזור לך למצוא עובדי בית. נסה לכתוב "אני צריך מנקה" או "אינסטלטור".',
        quick_replies: ['לקבוע ניקיון', 'אינסטלטור']
    };
}
