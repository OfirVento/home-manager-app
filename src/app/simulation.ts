export async function simulateAgentResponse(input: string, history: any[] = []) {
    // Delay to mimic network
    await new Promise(r => setTimeout(r, 600));

    const txt = input.toLowerCase();

    // Safe extraction of last assistant message
    let lastAssistantMsg = "";
    if (history.length > 0) {
        try {
            lastAssistantMsg = history[history.length - 1].text || "";
        } catch (e) { }
    }

    // 1. Initial / Cleaner Request
    if (txt.includes('מנקה') || txt.includes('ניקיון') || txt.includes('cleaning')) {
        return {
            assistant_message: 'מתי אתם צריכים את הניקיון? (דוגמה: מחר בבוקר, יום חמישי, בהקדם)',
            quick_replies: ['מחר בבוקר', 'יום חמישי 09:00', 'בהקדם האפשרי']
        };
    }
    // 1.1 Plumber
    if (txt.includes('אינסטלטור') || txt.includes('נזילה') || txt.includes('שרברב')) {
        return {
            assistant_message: "מתי תרצו שהאינסטלטור יגיע?",
            quick_replies: ["עכשיו דחוף", "היום בערב"]
        };
    }
    // 1.2 Babysitter
    if (txt.includes('בייביסיטר')) {
        return {
            assistant_message: "מתי אתם צריכים את הבייביסיטר?",
            quick_replies: ["עכשיו דחוף", "היום בערב"]
        };
    }

    // 2. Date Selection -> Show Workers (Maria, Olga, Alex) OR Plumber/Babysitter
    if (txt.includes('מחר') || txt.includes('חמישי') || txt.includes('בהקדם') || txt.includes('09:00') || txt.includes('עכשיו') || txt.includes('ערב')) {

        // Check Context from History
        const isPlumber = lastAssistantMsg.includes('אינסטלטור') || history.some(h => h.text.includes('אינסטלטור'));
        const isBabysitter = lastAssistantMsg.includes('בייביסיטר') || history.some(h => h.text.includes('בייביסיטר'));

        if (isPlumber) {
            return {
                assistant_message: `מצאתי 3 אינסטלטורים זמינים. דניאל המועדף עליי:`,
                cards: [
                    { type: 'worker', title: 'דניאל מ.', image_url: 'https://cdn-icons-png.flaticon.com/512/307/307887.png', experience: '15 שנות ניסיון', strengths: ['אמין מאוד', 'נקי'], price: '250₪', availability: 'היום 18:00', verification_text: 'מוסמך', local_proof_text: '22 עבודות', ratings_text: '4.9 ⭐', buttons: [{ label: 'לבחור דניאל', action: 'select_daniel' }] },
                    { type: 'worker', title: 'רועי ש.', image_url: 'https://cdn-icons-png.flaticon.com/512/4825/4825038.png', experience: '8 שנות ניסיון', strengths: ['מחיר הוגן'], price: '220₪', availability: 'מחר 12:00', verification_text: 'מאומת', local_proof_text: '5 שכנים', ratings_text: '4.7 ⭐', buttons: [{ label: 'לבחור רועי', action: 'select_roy' }] },
                    { type: 'worker', title: 'אבי ל.', image_url: 'https://cdn-icons-png.flaticon.com/512/1995/1995493.png', experience: '20 שנות ניסיון', strengths: ['ציוד מתקדם'], price: '300₪', availability: 'תוך שעה', verification_text: 'קבלן', local_proof_text: '3 דירות', ratings_text: '4.8 ⭐', buttons: [{ label: 'לבחור אבי', action: 'select_avi' }] }
                ],
                quick_replies: ["עוד אופציות"]
            };
        }

        if (isBabysitter) {
            return {
                assistant_message: `מצאתי 3 בייביסיטריות. שירה המועדפת עליי:`,
                cards: [
                    { type: 'worker', title: 'שירה (22)', subtitle: 'תוך 45 דק • 70₪/שעה', image_url: 'https://cdn-icons-png.flaticon.com/512/2922/2922579.png', experience: 'סטודנטית', strengths: ['רגועה', 'אוהבת כלבים'], price: '70 ₪', availability: '45 דק', verification_text: 'המלצות', local_proof_text: 'משפחת כהן', ratings_text: '5.0 ⭐', buttons: [{ label: 'לבחור את שירה', action: 'select_shira' }] },
                    { type: 'worker', title: 'מאיה (19)', subtitle: 'תוך 25 דק • 65₪/שעה', image_url: 'https://cdn-icons-png.flaticon.com/512/2922/2922561.png', experience: 'תיכוניסטית', strengths: ['אנרגטית', 'קרובה'], price: '65 ₪', availability: '25 דק', verification_text: 'אישור הורים', local_proof_text: '4 משפחות', ratings_text: '4.8 ⭐', buttons: [{ label: 'לבחור את מאיה', action: 'select_maya' }] },
                    { type: 'worker', title: 'דנה (27)', subtitle: 'תוך 70 דק • 80₪/שעה', image_url: 'https://cdn-icons-png.flaticon.com/512/2922/2922565.png', experience: 'גננת', strengths: ['מקצועית', 'בטיחות'], price: '80 ₪', availability: '70 דק', verification_text: 'תעודת יושר', local_proof_text: '20 משפחות', ratings_text: '4.9 ⭐', buttons: [{ label: 'לבחור את דנה', action: 'select_dana' }] }
                ],
                quick_replies: ["הכי מהירה"]
            };
        }

        // Default to Cleaners
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
        let serviceType = 'ניקיון';

        if (txt.includes('alex') || txt.includes('אלכס')) { name = 'אלכס מ.'; price = '80 ₪'; }
        if (txt.includes('olga') || txt.includes('אולגה')) { name = 'אולגה ק.'; price = '70 ₪'; }
        if (txt.includes('daniel') || txt.includes('דניאל')) { name = 'דניאל מ.'; price = '250 ₪'; serviceType = 'אינסטלטור'; }
        if (txt.includes('roy') || txt.includes('רועי')) { name = 'רועי ש.'; price = '220 ₪'; serviceType = 'אינסטלטור'; }
        if (txt.includes('shira') || txt.includes('שירה')) { name = 'שירה'; price = '70 ₪'; serviceType = 'בייביסיטר'; }


        return {
            assistant_message: `מעולה! אני סוגר לך את ${name}..

מסכם את ההעדפות שלך לפני יצירת קשר:
מחפש ${serviceType}
מבקש להגיע "במועד המבוקש"
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
                    strengths: [`הגעה: במועד המבוקש`, `כתובת: רוטשילד 62`, `מחיר: ${price} לשעה`],
                    price: 'אושר ✅',
                    availability: 'במועד המבוקש',
                    buttons: []
                },
                {
                    type: 'worker',
                    title: 'תזכורת למחר ⏰',
                    image_url: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
                    experience: 'תזכורת מערכת',
                    strengths: [`תזכורת הגעה: במועד המבוקש`, 'קאפיש?'],
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
                    strengths: ['הכל ערוך ומוכן', 'ניפגש במועד'],
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
        quick_replies: ['לקבוע ניקיון', 'אינסטלטור', 'בייביסיטר']
    };
}
