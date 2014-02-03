from flask import Flask, render_template, redirect, request, g, session, url_for, flash, jsonify
from model import User, Level
from flask.ext.login import LoginManager,login_required,login_user,current_user,logout_user
from flaskext.markdown import Markdown
import config
import forms
import model

app = Flask(__name__)
app.config.from_object(config)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=["POST"])
def authenticate():
    form = forms.LoginForm(request.form)
    error = None
    if not form.validate(): 
        return render_template("index.html", error="Invalid username or password")

    username = form.username.data
    password = form.password.data

    user = User.query.filter_by(username=username).first()
    if not user or not user.authenticate(password):
        return render_template("index.html", error="Incorrect username or password")

    login_user(user)
    return redirect(url_for("canvas"))

@app.route("/register", methods=["POST"])
def goToRegPage():
    return render_template("register.html")

@app.route("/create_account", methods=["POST"])
def createAccount():
    error = None
    username = request.form.get("username")
    password = request.form.get("password")
    pettype = request.form.get("pettype")
    petname = request.form.get("petname")
    if username and password and pettype and petname:
        user = model.register_new_user(username, pettype, petname, password)
        level = Level.query.get(1)
        user = User.query.filter_by(username=username).first()
        login_user(user)
        return redirect(url_for("canvas"))
    else:
        return render_template("register.html", error="** All Fields Required **")


#afterRegMessage="Great! Now sign in and start playing!"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("index"))

@app.route("/canvas")
@login_required
def canvas():
    user = current_user.get_id()
    user = User.query.get(user)
    if user.current_level:
        level = Level.query.get(user.current_level)
    else:
        level = Level.query.get(1)
    return render_template("canvas.html", user=user, level=level)

@app.route("/tutorial")
def tutorial():
    return render_template("teach_me_to_play.html")

@app.route("/completed_level")
@login_required
def completed():
    user_id = current_user.get_id()
    user = User.query.get(user_id)
    new_level = user.increment_current_level()
    if new_level >= 7:
        return jsonify(level_map = None,
            level_petStart = None,
            level_treatPos = None,
            user_pettype = user.pettype,
            user_petname = user.petname,
            done=True)
    else:
        level_obj = Level.query.get(new_level)    
        # get map, treatpos, petstart for new_level and turn into json dictionary
        return jsonify(level_map = level_obj.map,
            level_petStart = level_obj.petStart,
            level_treatPos = level_obj.treatPos,
            user_pettype = user.pettype,
            user_petname = user.petname,
            done=False)
        
@app.route("/you_won")
@login_required
def you_won():
    user_id = current_user.get_id()
    user = User.query.get(user_id)
    level = user.current_level
    if level >= 7:
        return render_template("you_won.html", user=user)
    else:
        return redirect(url_for("canvas"))

if __name__ == "__main__":
    app.run(debug=True)