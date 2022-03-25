// Regular expressions pattern to use in the app
const regex = {
    email : /^ ?[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,} ?$/i ,
    password : /^.{6,}$/,
    phone : /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,

    url: /^(https?|ftp):\/\/[^\s$.?#].[^\s]*$/i,

    github: /^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9-_/.]{1,})+\/?$/i,

    linkedIn: /(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com\/in\/(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i

}

export default regex;