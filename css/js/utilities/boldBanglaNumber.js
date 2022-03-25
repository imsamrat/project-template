export const boldBanglaNumber  = (text) => {
    return text
        ?.replace(/০/g, String("<strong>০</strong>"))
        ?.replace(/১/g, String("<strong>১</strong>"))
        ?.replace(/২/g, String("<strong>২</strong>"))
        ?.replace(/৩/g, String("<strong>৩</strong>"))
        ?.replace(/৪/g, String("<strong>৪</strong>"))
        ?.replace(/৫/g, String("<strong>৫</strong>"))
        ?.replace(/৬/g, String("<strong>৬</strong>"))
        ?.replace(/৭/g, String("<strong>৭</strong>"))
        ?.replace(/৮/g, String("<strong>৮</strong>"))
        ?.replace(/৯/g, String("<strong>৯</strong>"))
        ?.replace(/%/g, String("<strong>%</strong>"))    
}