function verifytok(usercookie){
    // console.log(usercookie);
    var name = usercookie.name;
    var tokendata = JSON.parse(atob(usercookie.token.split(".")[1]));
    if(tokendata.name===name && (tokendata.iss==="accounts.google.com" || tokendata.iss==="https://accounts.google.com") && tokendata.aud==="727089831121-gpsgina9etaqqbb8a97av6gn3uo6t0f9.apps.googleusercontent.com"){
        return true
    }else{
        return false
    }
}
export default verifytok;