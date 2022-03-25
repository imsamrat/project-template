const getImage = (src, option="") => {
    let baseURL = process.env.REACT_APP_IMAGE_BASE_URL;
    if(option === "promoCertificate"){
        let subLocation = process.env.REACT_APP_ENV === "development" || process.env.REACT_APP_ENV === "uat"  ? "promo-certificate-uat" : "promo-certificate";
        if(src) {
            // return `${baseURL}${option ? option + "/" : ""}${src}`
            return `${baseURL}/${subLocation}/${src}`
        }
    }
    if(option === "blackBeltPoster"){
        let subLocation = process.env.REACT_APP_ENV === "development" || process.env.REACT_APP_ENV === "uat"  ? "uat-blackbelt-images" : "prod-blackbelt-images";
        if(src) {
            // return `${baseURL}${option ? option + "/" : ""}${src}`
            return `${"https://phero-web.nyc3.digitaloceanspaces.com"}/${subLocation}/${src}`
        }
    }
    let subLocation = process.env.REACT_APP_ENV === "development" || process.env.REACT_APP_ENV === "uat"  ? "uat-images" : "website-prod-images";
    // let formattedSrc = src?.replace('public/files', 'remote')
    if(src) {
        // return `${baseURL}${option ? option + "/" : ""}${src}`
        return `${baseURL}/${subLocation}/${src}`
    }
}

export default getImage