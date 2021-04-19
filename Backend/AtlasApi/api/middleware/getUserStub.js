const userId = (req) =>{
    let fullSub = req.user.sub.split('|');
    return fullSub[fullSub.length - 1];
}

module.exports = userId;