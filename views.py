from flask import Flask, render_template, redirect, request, g, session, url_for, flash
from model import User, Level
from flask.ext.login import LoginManager, login_required, login_user, current_user, logout_user
from flaskext.markdown import Markdown
import config
import forms
import model

app = Flask(__name__)
app.config.from_object(config)

# Stuff to make login easier
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
    print str(form)
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

# @app.route("/create_account", methods=["POST"])
# def createAccount():
#     username = request.form.get("username")
#     password = request.form.get("password")
#     pettype = request.form.get("pettype")
#     petgender = request.form.get("petgender")
#     petname = request.form.get("petname")
#     return render_template(url_for("canvas"))



# @app.route("/post/new", methods=["POST"])
# @login_required
# def create_post():
#     form = forms.NewPostForm(request.form)
#     if not form.validate():
#         flash("Error, all fields are required")
#         return render_template("new_post.html")

#     post = Post(title=form.title.data, body=form.body.data)
#     current_user.posts.append(post) 
    
#     model.session.commit()
#     model.session.refresh(post)

#     return redirect(url_for("view_post", id=post.id))





@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)
# End login stuff

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

@app.route("/completed")
def completed():
    pass






if __name__ == "__main__":
    app.run(debug=True)