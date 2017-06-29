import User from '../models/user.model';
import ensureAuthenticated from '../helpers/user.auth';

const UserAuthRoute = (app, passport) => {

    app.get('/session/', function (req, res) {
        res.json({ 
            title: "Social Authentication",
            status: req.session.passport ? req.session.passport.user || 'Logged out' : 'Not logged in'
         });
    });

    app.get('/account', ensureAuthenticated, function (req, res) {
        User.findById(req.session.passport.user, function (err, user) {
            if (err) {
                console.log(err);  // handle errors
            } else {
                res.json({ user });
            }
        });
    });

    app.get('/auth/google',
        passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        }
        ));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/account');
        });

    app.get('/logout', function (req, res) {
        console.log("logout : ", req.logout);
        req.logout();
        res.redirect('/session/');
    });

}

export default UserAuthRoute;