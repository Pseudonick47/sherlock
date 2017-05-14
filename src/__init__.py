from flask import Flask
app = Flask(__name__)

@app.route("/")
def homepage():
    return "Let's travel!"

if __name__ == "__main__":
    app.run()
