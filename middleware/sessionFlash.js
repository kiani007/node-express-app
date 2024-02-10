// Flash messages middleware

const  flashMessages=(req, res, next) =>{
res.successFlash = (message) => req.flash('success', message);
res.errorFlash = (message) => req.flash('error', message);
res.warningFlash = (message) => req.flash('warning', message);
next();
}

export default flashMessages;
